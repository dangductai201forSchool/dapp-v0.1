import Welcome from "./Welcome";

const Home = () => {
	return (
		<div className="home-content">
			<Welcome></Welcome>
			<div className="about-content">
				<div className="about-text">
					<p className="font-easport">
						Soccer is the king of sport. It
						has nearly 4 billion fans
						worldwide. And now Worldcup is
						coming!!!
					</p>
					<br></br>
					<p className="font-easport">
						Sport Fantasy is an ecosystem
						built on web3 platform with the
						central token SFS:
					</p>
					<br></br>
					<i className="playingpredictiongame-item las la-angle-double-right"></i>
					<p className="playingpredictiongame-item about-content-list font-easport">
						playing prediction game
					</p>
					<br></br>
					<i className="buynftcardgame-item las la-angle-double-right"></i>
					<p className="buynftcardgame-item about-content-list font-easport">
						buy nft card game
					</p>
					<br></br>
					<i className="busdreward-item las la-angle-double-right"></i>
					<p className="busdreward-item about-content-list font-easport">
						Busd reward
					</p>
				</div>
				<div className="about-buynow">
					<img src="\logo.png"></img>
					<div className="home-buynow-btn-div">
						<div className="home-buynow-btn">
							<a target="_blank" rel="noreferrer" href="https://pancakeswap.finance">
								<span className="font-easport">Buy now!!!</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;