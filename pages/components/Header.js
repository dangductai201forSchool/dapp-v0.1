import {useNetwork, useAccount, useContractRead} from "wagmi";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import config from "../contracts/config.json";
import sfsABI from '../contracts/sfs_abi.json';


const Header = () => {
	const { chain, chains } = useNetwork();
    let sfsTestnetAddr =config['sfs-mainnet']['token-address'];;
    if(chain !=null &&chain.network == 'bsc testnet'){
        sfsTestnetAddr = config['sfs-testnet']['token-address'];
    }
	
	const {address, isConnected} = useAccount();

	const {data, error, isLoading} = useContractRead({
		addressOrName: sfsTestnetAddr,
		contractInterface: sfsABI,
		functionName: "balanceOf",
		args: address,
	});

	return (
		<div className="DAO__header pl-4 pr-4 py-4 lg:px-11">
			<div className="flex flex-col md:flex-row md:justify-between md:items-center border-b-2 border-gray-300">
				<div className="mb-4 md:hidden">
					<img className="w-[60px] m-auto" src="./logo-crop.png"></img>
				</div>
					{isConnected ? (
						<div className=" text-rose-3000 relative md:static">
							<h2 className="text-3xl font-easport !font-bold text-rose-3000 mb-2">
								Hello
								<span className="font-easport">
									{isConnected
										? ", SFS hodler"
										: ""}
								</span>
							</h2>
							<p className=" wallet-address text-1xl font-easport !font-bold text-rose-1000 mb-2">
								Your
								wallet:&ensp;
								{address}
							</p>

						</div>
					) : (
						<div className="text-rose-3000 relative md:static">
							<p className=" text-3xl font-easport !font-bold text-rose-1000 mb-2">
								Please connect
								to your
								wallet!!!&ensp;
							</p>
							
						</div>
						
					)}
			
				<div className="flex flex-col md:flex-row space-x-3">
					{isConnected ? (
						<div>
							<h3 className="text-1xl font-easport !font-bold text-rose-3000 mb-2">
								Your Balance:
							</h3>
							<div>
								<span>
									<strong className="text-1xl font-easport !font-bold text-rose-2000 mb-2">
										{(Number.parseFloat(
											data
										) /
											10 **
												8).toLocaleString('en-US')}{" "}
										&ensp;SFS
									</strong>
								</span>
							</div>
						</div>
					) : (
						<div></div>
					)}
					<ConnectButton className="" />

				</div>
			</div>
		</div>
	);
};

export default Header;
