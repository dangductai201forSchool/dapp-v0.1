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

        const isMatchStarted = (matchId) => {
            const { data, error, isLoading } = useContractRead({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'isMatchStarted',
                args: matchId,
            });

            return data;
        }

        const isEnounghSFS = () => {
            const { data, error, isLoading } = useContractRead({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'isEnounghSFS',
                args: address,
            });

            return data;
        }

        const isMatchEnded = (matchId) => {
            const { data, error, isLoading } = useContractRead({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'isMatchEnded',
                args: matchId,
            });

            return data;
        }

        const isPredicted = (matchId) => {
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
                const isStarted = isMatchStarted(matchId);
                const stTeam =dt.stTeam;
                const ndTeam =dt.ndTeam;
                const stTeamLogo = teams[stTeam]['logo-url'];
                const ndTeamLogo = teams[ndTeam]['logo-url'];
                const startTime =  (new Date(Number.parseInt(dt.startTime) * 1000)).toLocaleString('en-US', { timeZone: "UTC" });
                const isUserPredicted = isPredicted(matchId); 
                return (                    
            <li className= {isStarted?'match-item-started ':'match__item'}>
                <a target="_self" className='item--link font-easport w-full block py-2 pl-3 text-white'>
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
                {isEnounghSFS()?(
                        isStarted?(
                            <div className="match-time-start"><p className="font-easport">Match has started already!!!</p></div>
                        ):(
                            isUserPredicted?(
                                <div className="match-time-start"><p className="font-easport">Predicted already</p></div>
                            ):(
                                <div className="predict-btn-div">
                                <PredictButton  matchId={Number.parseInt(dt.matchId)} result={1} value={dt.stTeam}></PredictButton>
                                <PredictButton  matchId={Number.parseInt(dt.matchId)} result={3} value={'Draw'}> draw</PredictButton>
                                <PredictButton  matchId={Number.parseInt(dt.matchId)} result={2} value= {dt.ndTeam}></PredictButton>
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