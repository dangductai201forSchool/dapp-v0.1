import { useAccount } from 'wagmi';
import { useState } from 'react';
import usePredictionAddress from './usePredictionAddress';
import predictionGameABI from '../contracts/prediction_game_abi.json';
import { useContractRead } from 'wagmi';

export default function useIsMatchPredicted(matchId){
    const { address, isConnected } = useAccount();
    const predictionGameAddr = usePredictionAddress();
    const [isPredicted,setIsPredicted] = useState(false);

    const {data,error,isLoading} = useContractRead({
        addressOrName: predictionGameAddr,
        contractInterface: predictionGameABI,
        functionName: 'isPredicted',
        args: [Number.parseInt(matchId), address],
        onSuccess: (data) => {
            setIsPredicted(data);
        }});

    return isPredicted;

}