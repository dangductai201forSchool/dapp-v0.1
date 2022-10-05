import {useNetwork, useAccount, useContractRead } from 'wagmi'
import config from "../contracts/config.json";
import predictionGameABI from '../contracts/prediction_game_abi.json';


const TotalReward = () => {
    const { chain, chains } = useNetwork();
    let predictionGameAddr = config['sfs-mainnet']['prediction-game-address'];;
    
    if(chain !=null &&chain.network == 'bsc testnet'){
        predictionGameAddr = config['sfs-testnet']['prediction-game-address'];
    }
    const { data, error, isLoading } = useContractRead({
        addressOrName: predictionGameAddr,
        contractInterface: predictionGameABI,
        functionName: 'getTotalReward',
    });
    return (
        <div className='flex flex-col md:flex-row mx-4 mt-2 lg:mx-11 justify-between'>
            <div className='basis-2/3'>
                <h3 className='text-3xl font-easport !font-bold text-rose-3000 mb-2'>Total Reward Pool</h3>
                <p>
                    <strong className='text-1xl font-easport !font-bold text-rose-1000 mb-2'>
                        {(Number.parseFloat(data) / (10 ** 8)).toLocaleString('en-US')}         SFS       </strong>

                </p>
            </div>
        </div>

    );
}

export default TotalReward;