import { useAccount, useContractRead } from 'wagmi'
import sfsABI from '../contracts/SFS_abi.json';
const sfsTestnetAddr = '0x74cA4408af615cC95cc2aA9a80071e8694A0dC9D';
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
    const { address, isConnected } = useAccount();

    const { data, error, isLoading } = useContractRead({
        addressOrName: sfsTestnetAddr,
        contractInterface: sfsABI,
        functionName: 'balanceOf',
        args: address,
    });
    return (
        <div className='DAO__header pl-4 pr-4 py-4 lg:px-11'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center border-b-2 border-gray-300'>
                <div className='text-rose-3000 relative md:static'>
                    <h2 className='text-3xl !font-bold text-rose-3000 mb-2'>
                        Hello
                        <span className='font-tommy-bold'>{isConnected ? ', SFS hodler' : ''}</span>
                    </h2>
                    {isConnected ? (
                        <p className="text-sm text-gray-500 md:text-pink-900 mb-3">
                            Your wallet:&ensp;
                            <span>{address}</span>
                        </p>
                    ) : (
                        <p className="text-sm text-gray-500 md:text-pink-900 mb-3">Please connect to your wallet&ensp;</p>
                    )}
                </div>
                <div className='flex flex-col md:flex-row space-x-3'>
                    {isConnected ? (
                        <div>
                            <h3>Your Balance:</h3>
                            <div>
                                <span>
                                    <strong>{Number.parseFloat(data) / (10 ** 8)}</strong>
                                    &ensp;SFS
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <ConnectButton className='flex justify-center items-center !mb-3 md:!mb-0' />
                </div>
            </div>
        </div>
    );
}

export default Header;