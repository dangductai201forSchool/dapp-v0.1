import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi'
import predictionGameABI from '../contracts/PredictionGame_abi.json';
import teams from '../teams/team-infor.json';
const predictionGameAddr = '0xA49c5cD7200303c410A1E4656503688D490Ffa60';

import { useProvider } from 'wagmi'


const Matches = () => {
    const AllMatchItems = () => {
        const { address, isConnected } = useAccount();

        const { data, error, isLoading } = useContractRead({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'getCurrentMatches'
        });

        const IsMatchStarted = (matchId) => {
            const { data, error, isLoading } = useContractRead({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'isMatchStarted',
                args: matchId,
            });

            return data;
        }

        const IsEnounghSFS = () => {
            const { data, error, isLoading } = useContractRead({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'isEnounghSFS',
                args: address,
            });

            return data;
        }


        const IsPredicted = (matchId) => {
            const { data, error, isLoading } = useContractRead({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'isPredicted',
                args: [matchId,address],
            });

            return data;
        }
        

        const PredictButton = (props) =>{
            const { config } = usePrepareContractWrite({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'predict',
                args: [props.matchId,props.result],
            });

            const { data, isLoading, isSuccess, write } = useContractWrite(config);

            return <button className= 'font-easport predict-btn'  onClick={() => write()}>
                                    {isLoading? 'Predicting...':(
                                        isSuccess?'Predicted': props.value 
                                    )}
                                </button>
        }

        

        return data == null?(<div></div>):(
            data.slice().sort((a,b) => Number.parseInt(b.matchId) - Number.parseInt(a.matchId)).map((dt) => {
                const matchId = Number.parseInt(dt.matchId);
                const isStarted = IsMatchStarted(matchId);
                const stTeam = teams[dt.stTeam]['name']==null?(dt.stTeam):(teams[dt.stTeam]['name']);
                const ndTeam = teams[dt.ndTeam]['name']==null?(dt.ndTeam):(teams[dt.ndTeam]['name']);
                const stTeamLogo = teams[dt.stTeam]['logo-url']==null?(teams['default1']['logo-url']):(teams[dt.stTeam]['logo-url']);
                const ndTeamLogo = teams[dt.ndTeam]['logo-url']==null?(teams['default1']['logo-url']):(teams[dt.ndTeam]['logo-url']);
                const startTime =  (new Date(Number.parseInt(dt.startTime) * 1000)).toLocaleString('en-US', { timeZone: "UTC" });
                const isUserPredicted = IsPredicted(matchId); 
                return (                    
            <li className= {isStarted?'match-item-started ':'match__item'} key={matchId}>
                <a target="_self" className='item--link font-easport w-full block py-2 text-white'>
                    <div className="match-id-div"><p className="font-easport">Match Id: {matchId}</p></div>
                    <div className="item-content">
                        <div className="team-card"><p className="font-easport team-name"> {stTeam}</p>
                    <img className="team-img" src= {stTeamLogo}></img>
                    </div>
                    <div className="vs-card"><p className="font-easport">vs</p></div>
                    
                    <div className="team-card"><p className="font-easport team-name">{ndTeam}</p>
                    <img className="team-img" src= {ndTeamLogo}></img>
                    </div>
                    <div className="match-time-start">
                        <p className="font-easport">{startTime} (UTC)</p>
                        </div>
                    
                    </div>
                </a>
                {IsEnounghSFS()?(
                        isStarted?(
                            <div className="match-time-start"><p className="font-easport">Match has started already!!!</p></div>
                        ):(
                            isUserPredicted?(
                                <div className="match-time-start"><p className="font-easport">Predicted already</p></div>
                            ):(
                                <div className="predict-btn-div">
                                <PredictButton  matchId={Number.parseInt(dt.matchId)} result={1} value={stTeam}></PredictButton>
                                <PredictButton  matchId={Number.parseInt(dt.matchId)} result={3} value={'Draw'}> draw</PredictButton>
                                <PredictButton  matchId={Number.parseInt(dt.matchId)} result={2} value= {ndTeam}></PredictButton>
                                </div>
                            )
                        )
                    ):(<div><p>Not enoungh SFS</p></div>)}
            </li>
                );
            }
        ));


    }
    return (
        <ul className='flex-1 sm:flex-none'>
            <AllMatchItems></AllMatchItems>
        </ul>
    );

}

export default Matches;