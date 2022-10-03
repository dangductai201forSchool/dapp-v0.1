import { useAccount, useContractRead,usePrepareContractWrite,useContractWrite } from 'wagmi'
import predictionGameABI from '../contracts/PredictionGame_abi.json';
import teams from '../teams/team-infor.json';
const predictionGameAddr = '0xA49c5cD7200303c410A1E4656503688D490Ffa60';

const Endings = () => {
    const EndedMatchItems = () => {
        const { address, isConnected } = useAccount();

        const { data, error, isLoading } = useContractRead({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'getEndedMatches'
        });

        const isClaimAble = (matchId) => {
            const { data, error, isLoading } = useContractRead({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'isClaimAble',
                args: address,
            });
            return data;
        }

        const ClaimButton = (props) =>{
            const { config } = usePrepareContractWrite({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'claimReward',
                args: [props.matchId],
              });

            const { data, isLoading, isSuccess, write } = useContractWrite(config);

            return <button className= 'claim-btn'  onClick={() => write()}>
            {isLoading? 'Claiming...':(
                isSuccess?'Claimed':'Claim' 
            )}
            </button>;
        }

        
        return data== null?(
            <div></div>
        ):(
            data.slice().sort((a,b) => Number.parseInt(b.matchId) - Number.parseInt(a.matchId)).map((dt) =>{
                const matchId = Number.parseInt(dt.matchId);
                const claimAble = isClaimAble(matchId);
                const stTeam = dt.stTeam;
                const ndTeam = dt.ndTeam;
                const stTeamLogo = teams[dt.stTeam]['logo-url'];
                const ndTeamLogo = teams[dt.ndTeam]['logo-url'];
                const startTime = (new Date(Number.parseInt(dt.startTime) * 1000)).toLocaleString('en-US', { timeZone: "UTC" });
                const result = Number.parseInt(dt.result);
                return(
                    <li className={claimAble?'match-item-claim-able':'match-item-claim-unable'}>
                <a target="_self" className='item--link font-easport w-full block py-2 pl-3 text-white'>
                <div className="match-id-div"><p className="font-easport">Match Id: {matchId}</p></div>
                <div className="item-content">
                    <div className={result === 1?"team-card-win":"team-card"}>
                        <p className="font-easport team-name"> {stTeam}</p>
                         <img className="team-img" src= {stTeamLogo}></img>
                         <div className="team-result-div"><p className={result === 1?"team-result-text-win":"team-result-text-lose"}>
                        {result == 1&&'Win' }
                        {result == 2&&'Lose' }
                        {result == 3&&'Draw' }
                        </p></div>
                    </div>
                    <div className="vs-card"><p className="font-easport">vs</p></div>
                    
                    <div className={result ===2? "team-card-win":"team-card"}><p className="font-easport team-name">{ndTeam}</p>
                        <img className="team-img" src= {ndTeamLogo}></img>
                        <div className="team-result-div"><p className={result === 2?"team-result-text-win":"team-result-text-lose"}>
                        {result == 1&&'Lose' }
                        {result == 2&&'Win' }
                        {result == 3&&'Draw' }
                        </p></div>
                    </div>
                    <div className="match-time-start">
                        <p className="font-easport">{startTime} (UTC)</p>
                        </div>
                    
                    </div>
                
                    {claimAble &&
                       <div class="claim-btn-div">
                        <ClaimButton matchId={matchId}></ClaimButton>
                       </div> 
                    }
                </a>
            </li>
                );
            }
            
        ));

    }
    return (
        <ul className='flex-1 sm:flex-none'>
            <EndedMatchItems></EndedMatchItems>
        </ul>
    );
}

export default Endings;