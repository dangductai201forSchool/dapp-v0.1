import { useAccount, useContractRead } from 'wagmi'
import predictionGameABI from '../contracts/PredictionGame_abi.json';
const predictionGameAddr = '0xA49c5cD7200303c410A1E4656503688D490Ffa60';

const TotalReward = () => {
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