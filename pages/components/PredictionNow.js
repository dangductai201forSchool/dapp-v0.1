import TotalReward from "./TotalReward";
import UserReward from "./UserReward";
import { useState } from 'react';
import Matches from "./Matches";
import Endings from "./Endings";


const PredictionNow = () => {
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


    const Prediction = () => {
        const [isEndedClick, setIsEndedClick] = useState(false);
        const MatchesButton = () => {
           return(
            <div className='predict-match-btn-div'>
            <button onClick={() => setIsEndedClick(false)} target="_self" className={isEndedClick ? 'predict-match-btn' : 'predict-match-btn-target'}>
                Current Matches
            </button>
        </div>
           );
        }

        const EndingsButton = () => {
            return(
                <div className='predict-match-btn-div'>
                <button onClick={() => setIsEndedClick(true)} target="_self" className={isEndedClick ? 'predict-match-btn-target' : 'predict-match-btn'}>
                    Endings Matches
                </button>
            </div>
            );
        }

        return (
            <div className='mx-4 lg:mx-11 mt-8 mb-3 overflow-auto'>
                <h3 className='mb-5 text-rose-3000 text-2xl font-tommy-semibold uppercase'>
                    Predict now and earn reward
                </h3>
                <div className='DAO__table bg-rose-5000 rounded-2xl p-3 mb-7 '>
                    <div className='match-list'>
                        <MatchesButton></MatchesButton>
                        <EndingsButton></EndingsButton>
                        {isEndedClick ? (
                            <Endings></Endings>
                        ) : (<Matches></Matches>)}
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
            <Prediction></Prediction>
        </div>
    );
}

export default PredictionNow;