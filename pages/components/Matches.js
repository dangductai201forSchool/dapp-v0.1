import { useAccount, useContractRead } from 'wagmi'
import predictionGameABI from '../contracts/PredictionGame_abi.json';
import ReactButton from './ReactButton';
const predictionGameAddr = '0x23e3B0b551be6FEAD211a007E44Ed8365787bFa9';

const Matches = () => {
    const AllMatchItems = () => {
        const { data, error, isLoading } = useContractRead({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'getAllMatchs'
        });

        console.log(data);

        return data.map((dt) =>
            <li className='match__item  '>
                <a target="_self" className='item--link font-easport w-full block py-2 pl-3 text-white'>
                    <p>Index: {Number.parseFloat(dt.index)}</p>
                    <p>Id: {dt.matchId.toString()}</p>
                    <p>Is ended: {dt.isEnded.toString()}</p>
                    <p>Start time: {(new Date(Number.parseInt(dt.startTime) * 1000)).toLocaleString('en-US', { timeZone: "UTC" })} (UTC)</p>
                    <p>Result: {Number.parseInt(dt.result)}</p>
                </a>
                <ReactButton></ReactButton>
            </li>
        );

    }
    return (
        <ul className='flex-1 sm:flex-none'>
            <AllMatchItems></AllMatchItems>
        </ul>
    );

}

export default Matches;