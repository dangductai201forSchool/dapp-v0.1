import { useNetwork, useAccount, useContractRead } from 'wagmi'
import config from "../contracts/config.json";
import predictionGameABI from '../contracts/prediction_game_abi.json';



const UserReward = () => {
    const { chain, chains } = useNetwork();
    let predictionGameAddr = config['sfs-mainnet']['prediction-game-address'];;
    
    if(chain !=null &&chain.network == 'bsc testnet'){
        predictionGameAddr = config['sfs-testnet']['prediction-game-address'];
    }
    
    const { address, isConnected } = useAccount();
    
    const { data, error, isLoading } = useContractRead({
        addressOrName: predictionGameAddr,
        contractInterface: predictionGameABI,
        functionName: 'getCurrentUserReward',
        args: address
    });


    return (
        <div className='mx-4 lg:mx-11 my-4 mt-7 flex flex-wrap space-y-3 md:space-y-0'>
            <div className='border-[5px] border-rose-3000 p-3 md:px-8 rounded-2xl w-full md:w-auto md:mr-11'>
                <div className='balance-reward-div'>
                    <div className='your-current-reward-div'>
                        <h2 className='text-3xl font-easport !font-bold text-rose-3000 mb-2'>
                            Your current reward

                        </h2>
                        <p className="inline-block">
                            <strong className='text-rose-3000 font-easport text-3xl'>
                                {(Number.parseFloat(data) / (10 ** 8)).toLocaleString('en-US')}                </strong>
                            <p className='SFS-symbol text-rose-3000 font-easport'>SFS</p>

                        </p>
                    </div>
                </div>
                <p className='reward-formula text-sm text-primary-gray-2000 my-1'>
                    (total_hold / total_suply) * reward_pool_amount
                </p>
            </div>
        </div>
    );
}

export default UserReward;