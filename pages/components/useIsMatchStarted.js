import usePredictionAddress from './usePredictionAddress';
import { useState } from 'react';
import { useContractRead } from 'wagmi';
import predictionGameABI from '../contracts/prediction_game_abi.json';


export default function useIsMatchStarted(matchId){
    const predictionGameAddr = usePredictionAddress();
    const [isStarted,setIsStarted] = useState(false);
    
    const {data,error,isLoading} = useContractRead({
        addressOrName: predictionGameAddr,
        contractInterface: predictionGameABI,
        functionName: 'isMatchStarted',
        args: Number.parseInt(matchId),
        onSuccess: (data) => {
            setIsStarted(data);
        }});
    
    return isStarted;
}