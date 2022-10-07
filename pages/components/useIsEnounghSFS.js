import { useContractRead, useAccount } from 'wagmi';
import usePredictionAddress from './usePredictionAddress';
import { useState } from 'react';
import predictionGameABI from '../contracts/prediction_game_abi.json';

export default function useIsEnounghSFS(){
    const { address, isConnected } = useAccount();
    const predictionGameAddr = usePredictionAddress();
    const [isEnounghSFS,setIsEnounghSFS] = useState(false);


    const {data, error,isLoading} = useContractRead({
        addressOrName: predictionGameAddr,
        contractInterface: predictionGameABI,
        functionName: 'isEnounghSFS',
        args: address,
        onSuccess: (data) => {
            setIsEnounghSFS(data);
        }});

    return isEnounghSFS;

}