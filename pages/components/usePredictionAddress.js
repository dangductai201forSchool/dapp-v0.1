import { useState, useEffect } from 'react';
import { useNetwork } from 'wagmi';
import config from "../contracts/config.json";


export default function usePredictionAddress(){
    const { chain, chains } = useNetwork();
    const [predictionGameAddr,setPredictionGameAddr] = useState();
    function testnet(){
        console.log('switch to bsc test net');
        setPredictionGameAddr(config['sfs-testnet']['prediction-game-address']);
    }

    function bsc(){
        console.log('switch to bsc');
        setPredictionGameAddr(config['sfs-mainnet']['prediction-game-address']);
    }

    useEffect(() =>{
        if(chain!=null && chain.network =='bsc testnet'){
            testnet();
        }else{
            bsc()
        }
    },[chain]);

    return predictionGameAddr;
}