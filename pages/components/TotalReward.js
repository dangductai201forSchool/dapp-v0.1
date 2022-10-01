import { useAccount, useContractRead } from 'wagmi'
import predictionGameABI from '../contracts/PredictionGame_abi.json';
const predictionGameAddr = '0x23e3B0b551be6FEAD211a007E44Ed8365787bFa9';

const TotalReward = () => {
    const { data, error, isLoading } = useContractRead({
        addressOrName: predictionGameAddr,
        contractInterface: predictionGameABI,
        functionName: 'getTotalReward',
    });
    return (
        <div className='flex flex-col md:flex-row mx-4 mt-2 lg:mx-11 justify-between'>
            <div className='basis-1/2'>
                <h3 className='text-rose-3000 text-2xl font-tommy-semibold'>Total Reward Pool</h3>
                <p>
                    <strong className='text-rose-3000 font-tommy-bold text-3xl'>
                        {Number.parseFloat(data) / (10 ** 8)}                </strong>
                    <p className='SFS-symbol text-rose-3000 font-tommy-bold'>SFS</p>

                </p>
            </div>
        </div>

    );
}

export default TotalReward;