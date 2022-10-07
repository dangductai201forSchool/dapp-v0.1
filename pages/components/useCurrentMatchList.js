import { useContractRead } from 'wagmi';
import usePredictionAddress from './usePredictionAddress';
import { useState } from 'react';
import predictionGameABI from '../contracts/prediction_game_abi.json';


export default function useCurrentMatchList(){
    const predictionGameAddr = usePredictionAddress();
    const [currentMatchList,setCurrentMatchList] = useState([]);

    const {data,error,isLoading} = useContractRead({
        addressOrName: predictionGameAddr,
        contractInterface: predictionGameABI,
        functionName: 'getCurrentMatches',
        onSuccess: (data) => {
            if(data !=null)  setCurrentMatchList(data.slice().sort((a,b) => b.matchId - a.matchId));
        }
    });

    return currentMatchList;
}