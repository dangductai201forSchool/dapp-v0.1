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
                isSuccess?'Claimed':'' 
            )}
            </button>;
        }

        
        return data== null?(
            <div></div>
        ):(
            data.slice().sort((a,b) => Number.parseInt(b.matchId) - Number.parseInt(a.matchId)).map((dt) =>
            <li className={isClaimAble(Number.parseInt(dt.matchId))?'match-item-claim-able':'match__item  '}>
                <a target="_self" className='item--link font-easport w-full block py-2 pl-3 text-white'>
                    <p>Id: {Number.parseInt(dt.matchId)}</p>
                    <p> {dt.stTeam}
                        <img src= {teams[dt.stTeam]['logo-url']}></img> </p>
                    <p>vs</p>
                    <p>{dt.ndTeam}
                        <img src= {teams[dt.ndTeam]['logo-url']}></img></p>
                    <p>Start time: {(new Date(Number.parseInt(dt.startTime) * 1000)).toLocaleString('en-US', { timeZone: "UTC" })} (UTC)</p>
                    <p>Result: {Number.parseInt(dt.result)}</p>
                    {isClaimAble(Number.parseInt(dt.matchId))?(
                       <div>
                        <ClaimButton matchId={Number.parseInt(dt.matchId)}></ClaimButton>
                       </div> 
                    ):(<div><p>Wrong prediction</p></div>)}
                </a>
            </li>
        ));

    }
    return (
        <ul className='flex-1 sm:flex-none'>
            <EndedMatchItems></EndedMatchItems>
        </ul>
    );
}

export default Endings;