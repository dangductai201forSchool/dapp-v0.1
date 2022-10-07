import { useAccount, useContractRead } from 'wagmi';
import usePredictionAddress from './usePredictionAddress';
import { useState } from 'react';
import predictionGameABI from '../contracts/prediction_game_abi.json';

export default function useClaimAble(matchId){
    const { address, isConnected } = useAccount();
    const predictionGameAddr = usePredictionAddress();
    const [isClaimAble,setIsClaimAble] = useState(false);

    const { data, error, isLoading } = useContractRead({
        addressOrName: predictionGameAddr,
        contractInterface: predictionGameABI,
        functionName: 'isClaimAble',
        args: [Number.parseInt(matchId), address],
        onSuccess: (data) => {
            setIsClaimAble(data);
        }});

    return isClaimAble;

}