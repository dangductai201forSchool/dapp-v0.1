
const NFTCard = () => {
	const NFTCardGameText = () =>{
		return (
			<div className="welcome-div mx-4 mt-2 lg:mx-11">
		<div className=" text-2xl"><p className="nftcg-text font-easport">NFT Card game</p></div>
	
			</div>);
	}

	return (
		<div>
			<NFTCardGameText></NFTCardGameText>
			<div className="mx-4 lg:mx-11 my-4 mt-7 flex flex-wrap space-y-3 md:space-y-0">
				<div className="p-3 md:px-8 rounded-2xl w-full md:w-auto md:mr-11">
					<div className="nftcg-content-text p-3 font-easport text-rose-3000 text-3xl">Buy your favorite super star NFT card</div>
                    <div className="nftcg-content-text p-3 font-easport text-rose-3000 text-3xl">Build your dream team</div>
                    <div className="nftcg-content-text p-3 font-easport text-rose-3000 text-3xl">And compete with other players in our SFS league</div>
                    <img className="nftcg-img p-3" src="/nftcg.png"></img>
				</div>
			</div>
		</div>
	);
};

export default NFTCard;