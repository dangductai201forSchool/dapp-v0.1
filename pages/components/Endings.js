import { useAccount, useContractRead } from 'wagmi'
import predictionGameABI from '../contracts/PredictionGame_abi.json';
const predictionGameAddr = '0x23e3B0b551be6FEAD211a007E44Ed8365787bFa9';

const Endings = () => {
    const EndedMatchItems = () => {
        const { data, error, isLoading } = useContractRead({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'getEndedMatchs',
        });

        console.log(data);

        const ClaimButton = () => {
            const { data, error, isLoading } = useContractRead({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'isClaimAble',
                args: address,
            });

            return (
                data === true ? (
                    <div>
                        <button>Claim</button>
                    </div>
                ) : (
                    <div></div>
                )
            );
        }

        return data.map((dt) =>
            <li className='match__item  '>
                <a target="_self" className='item--link font-easport w-full block py-2 pl-3 text-white'>
                    <p>Index: {Number.parseFloat(dt.index)}</p>
                    <p>Id: {dt.matchId.toString()}</p>
                    <p>Is ended: {dt.isEnded.toString()}</p>
                    <p>Start time: {(new Date(Number.parseInt(dt.startTime) * 1000)).toLocaleString('en-US', { timeZone: "UTC" })} (UTC)</p>
                    <p>Result: {Number.parseInt(dt.result)}</p>
                </a>
                <ClaimButton></ClaimButton>
            </li>
        );
    }
    return (
        <ul className='flex-1 sm:flex-none'>
            <EndedMatchItems></EndedMatchItems>
        </ul>
    );
}

export default Endings;