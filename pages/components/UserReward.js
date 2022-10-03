import { useAccount, useContractRead } from 'wagmi'
import predictionGameABI from '../contracts/PredictionGame_abi.json';
const predictionGameAddr = '0xA49c5cD7200303c410A1E4656503688D490Ffa60';

const UserReward = () => {
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
                        <h3 className='text-3xl font-easport !font-bold text-rose-3000 mb-2'>
                            Your current reward

                        </h3>
                        <p>
                            <strong className='text-rose-3000 font-tommy-bold text-3xl'>
                                {Number.parseFloat(data) / (10 ** 8)}                </strong>
                            <p className='SFS-symbol text-rose-3000 font-tommy-bold'>SFS</p>

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