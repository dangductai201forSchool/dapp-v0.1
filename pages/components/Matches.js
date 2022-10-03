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

            return <button className= 'predict-btn'  onClick={() => write()}>
                                    {isLoading? 'Predicting...':(
                                        isSuccess?'Predicted': props.value 
                                    )}
                                </button>
        }

        

        return data == null?(<div></div>):(
            data.slice().sort((a,b) => Number.parseInt(b.matchId) - Number.parseInt(a.matchId)).map((dt) =>
            <li className={isMatchStarted(Number.parseInt(dt.matchId))?'match-item-started':'match__item'}>
                <a target="_self" className='item--link font-easport w-full block py-2 pl-3 text-white'>
                    <p>Id: {Number.parseInt(dt.matchId)}</p>
                    <p> {dt.stTeam}
                        <img src= {teams[dt.stTeam]['logo-url']}></img> </p>
                    <p>vs</p>
                    <p>{dt.ndTeam}
                        <img src= {teams[dt.ndTeam]['logo-url']}></img></p>
                    <p>Start time: {(new Date(Number.parseInt(dt.startTime) * 1000)).toLocaleString('en-US', { timeZone: "UTC" })} (UTC)</p>
                </a>
                {isEnounghSFS()?(
                        isMatchStarted(Number.parseInt(dt.matchId))?(
                            <div></div>
                        ):(
                            isPredicted(Number.parseInt(dt.matchId))?(
                                <div><p>You has predicted yet</p></div>
                            ):(
                                <div>
                                    <PredictButton  matchId={Number.parseInt(dt.matchId)} result={1} value={dt.stTeam+' Win'}></PredictButton>
                                <PredictButton  matchId={Number.parseInt(dt.matchId)} result={3} value={'Draw'}> draw</PredictButton>
                                <PredictButton  matchId={Number.parseInt(dt.matchId)} result={2} value= {dt.ndTeam+ ' Win'}></PredictButton>
                                </div>
                            )
                        )
                    ):(<div><p>Not enoungh SFS</p></div>)}
            </li>
        ));


    }
    return (
        <ul className='flex-1 sm:flex-none'>
            <AllMatchItems></AllMatchItems>
        </ul>
    );

}

export default Matches;