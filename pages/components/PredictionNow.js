import TotalReward from "./TotalReward";
import UserReward from "./UserReward";
import { useState } from 'react';
import CurrentMatches from "./CurrentMatches";
import EndingMatches from "./EndingMatches";
import config from "../contracts/config.json";
import {useNetwork} from "wagmi";




const PredictionNow = () => {
    const { chain, chains } = useNetwork();
    let sfsAddr =config['sfs-mainnet']['prediction-game-address'];
    let sfsBsc ='https://bscscan.com/address/'+sfsAddr; 
    let sfsStr= sfsAddr;
    if(chain !=null &&chain.network == 'bsc testnet'){
        sfsAddr = config['sfs-testnet']['prediction-game-address'];
        sfsStr = sfsAddr+' (Testnet)';
        sfsBsc ='https://testnet.bscscan.com/address/'+sfsAddr;
    }
    //child component
    const Block1 = () => {
        return (<div className='page__title mx-4 mt-2 lg:mx-11'>
            <h2 className='text-rose-3000 text-xl font-tommy-medium'>
            </h2>
        </div>);
    }
    const Block2 = () => {
        return (
            <div className='hidden flex flex-col md:flex-row bg-primary-pink-5000 text-primary-white-1000 px-4 lg:px-11 py-3 pt-7 mt-5 space-y-5 md:space-y-0 md:space-x-3'>
                <div className='basis-1/3 space-y-1 border-b border-gray-500 md:border-none pb-3 pb-md-0'>
                    <span className='block'></span>
                    <span className='block'>
                        <strong className='text-primary-white-1000 font-tommy-bold text-2xl'></strong>
                        <em className='font-tommy-medium text-rose-1000'></em>
                    </span>
                </div>
                <div className='basis-1/3 space-y-1 border-b border-gray-500 md:border-none pb-3 pb-md-0'>
                    <span className='block'></span>
                    <span className='block'>
                        <strong className='text-primary-white-1000 font-tommy-bold text-2xl'></strong>
                        <em className='font-tommy-medium text-rose-1000'></em>
                    </span>
                </div>
                <div className='basis-1/3 space-y-1'>
                    <span className='block'></span>
                    <span className='block'>
                        <strong className='text-primary-white-1000 font-tommy-bold text-2xl'></strong>
                        <em className='font-tommy-medium text-rose-1000'></em>
                    </span>
                </div>
            </div>
        );
    }


    const PredictionContent = () => {
        const [isEndedClick, setIsEndedClick] = useState(false);
        const CurrentMatchesButton = () => {
           return(
            <div className='predict-match-btn-div bg-rose-5000'>
            <button onClick={() => setIsEndedClick(false)} target="_self" className={isEndedClick ? 'predict-match-btn' : 'predict-match-btn-target'}>
                Current Matches
            </button>
        </div>
           );
        }

        const EndingMatchesButton = () => {
            return(
                <div className='predict-match-btn-div bg-rose-5000'>
                <button onClick={() => setIsEndedClick(true)} target="_self" className={isEndedClick ? 'predict-match-btn-target' : 'predict-match-btn'}>
                    Ended Matches
                </button>
            </div>
            );
        }

        return (
            <div className='mx-4 lg:mx-11 mt-8 mb-3 overflow-auto'>
                <h3 className='mb-5 text-rose-3000 text-2xl font-easport uppercase'>
                    Predict now and earn reward 
                </h3>
                <div className = "contract-text-div mb-5"><a target ="_blank" rel="noreferrer" href ={sfsBsc} >
                    <span className='contract-text text-1xl font-easport'>Contract: {sfsStr}</span>
                </a></div>
                <div className='DAO__table bg-rose-5000 rounded-2xl p-3 mb-7 TableTopStaker_wrapperTable__zPrbO'>
                    <div className='match-list'>
                        <CurrentMatchesButton></CurrentMatchesButton>
                        <EndingMatchesButton></EndingMatchesButton>
                        {isEndedClick ? (
                            <EndingMatches></EndingMatches>
                        ) : (<CurrentMatches></CurrentMatches>)}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-content bg-[url('/images/bg/bg-lotus.png')] md:bg-[length:75%_100%] bg-no-repeat bg-right">
            <Block1></Block1>
            <TotalReward></TotalReward>
            <Block2></Block2>
            <UserReward></UserReward>
            <PredictionContent></PredictionContent>
        </div>
    );
}

export default PredictionNow;