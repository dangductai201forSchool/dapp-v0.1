import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi'
import predictionGameABI from '../contracts/PredictionGame_abi.json';
const predictionGameAddr = '0xA49c5cD7200303c410A1E4656503688D490Ffa60';
import { useProvider } from 'wagmi'
import CurrentMatch from './CurrentMatch';


const CurrentMatches = () => {
    const { address, isConnected } = useAccount();
    //function
    const IsEnounghSFS = () => {
        const { data, error, isLoading } = useContractRead({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'isEnounghSFS',
            args: address,
        });
        return data;
    }
    
    //child component
    const CurrentMatchList = () => {
        const { data, error, isLoading } = useContractRead({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'getCurrentMatches'
        });

        if(data == null){
            return(<div></div>);
        }else{
            if(IsEnounghSFS()){
                return(
                    data.slice().sort((a,b) => Number.parseInt(b.matchId) - Number.parseInt(a.matchId))
                    .map((match) =>{
                        const matchId = Number.parseInt(match.matchId);
                        return(
                        <CurrentMatch key={matchId} 
                        matchId={matchId}
                        stTeam={match.stTeam} 
                        ndTeam={match.ndTeam}
                        startTime={match.startTime}
                        isEnounghSFS={true}
                        ></CurrentMatch>);
                    })
                );
            }else{
                return(
                    data.slice().sort((a,b) => Number.parseInt(b.matchId) - Number.parseInt(a.matchId))
                    .map((match) =>{
                        const matchId = Number.parseInt(match.matchId);
                        return(
                        <CurrentMatch key={matchId} 
                        matchId={matchId}
                        stTeam={match.stTeam} 
                        ndTeam={match.ndTeam}
                        startTime={match.startTime}
                        isEnounghSFS={false}
                        ></CurrentMatch>);
                    })
                );
            }
        }
    }

    
    // component
    return (
    <ul className='flex-1 sm:flex-none'>
        <CurrentMatchList></CurrentMatchList>
    </ul>
    );
}

export default CurrentMatches;