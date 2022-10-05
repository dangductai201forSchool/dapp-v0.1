import { useNetwork, useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi'
import config from "../contracts/config.json";
import predictionGameABI from '../contracts/prediction_game_abi.json';

import { useProvider } from 'wagmi'
import CurrentMatch from './CurrentMatch';


const CurrentMatches = () => {
    const { chain, chains } = useNetwork();
    let predictionGameAddr = config['sfs-mainnet']['prediction-game-address'];
    
    if(chain !=null &&chain.network == 'bsc testnet'){
        predictionGameAddr = config['sfs-testnet']['prediction-game-address'];
    }

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