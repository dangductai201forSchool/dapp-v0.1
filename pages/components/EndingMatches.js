import { useNetwork, useAccount, useContractRead,usePrepareContractWrite,useContractWrite } from 'wagmi'
import teams from '../teams/team-infor.json';
import EndingMatch from './EndingMatch';
import config from "../contracts/config.json";
import predictionGameABI from '../contracts/prediction_game_abi.json';


const EndingMatches = () => {
    const { chain, chains } = useNetwork();
    let predictionGameAddr = config['sfs-mainnet']['prediction-game-address'];
    
    if(chain !=null &&chain.network == 'bsc testnet'){
        predictionGameAddr = config['sfs-testnet']['prediction-game-address'];
    }
    
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