import { useAccount, useContractRead,usePrepareContractWrite,useContractWrite } from 'wagmi'
import predictionGameABI from '../contracts/PredictionGame_abi.json';
import teams from '../teams/team-infor.json';
import EndingMatch from './EndingMatch';
const predictionGameAddr = '0xA49c5cD7200303c410A1E4656503688D490Ffa60';

const EndingMatches = () => {
    //child component
    const EndMatchList =() =>{
        const { data, error, isLoading } = useContractRead({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'getEndedMatches'
        });

        if(data == null){
            return(<div></div>);
        }else{
            return (
                data.slice().sort((a,b) => Number.parseInt(b.matchId) - Number.parseInt(a.matchId))
                .map((match) => {
                    const matchId = Number.parseInt(match.matchId);
                    return(
                        <EndingMatch key={matchId}
                         matchId={matchId}
                         stTeam={match.stTeam} 
                         ndTeam={match.ndTeam}
                         startTime={match.startTime}
                         result={match.result}>
                        </EndingMatch>);
                    })
                );
        }
    }


    //component
    return (
        <ul className='flex-1 sm:flex-none'>
            <EndMatchList></EndMatchList>           
        </ul>
        );
}
    

export default EndingMatches;