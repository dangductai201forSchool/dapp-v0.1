import predictionGameABI from '../contracts/prediction_game_abi.json';
import usePredictionAddress from './usePredictionAddress';
import { useState } from 'react';
import { useContractRead } from 'wagmi';

export default function useEndingMatchList(){
    const predictionGameAddr = usePredictionAddress();
    const [endingMatchList,setEndingMatchList] = useState([]);

    const { data, error, isLoading } = useContractRead({
        addressOrName: predictionGameAddr,
        contractInterface: predictionGameABI,
        functionName: 'getEndedMatches',
        onSuccess: (data) => {
            if(data !=null)  setEndingMatchList(data.slice().sort((a,b) => b.matchId - a.matchId));
        }
    });

    return endingMatchList;

}