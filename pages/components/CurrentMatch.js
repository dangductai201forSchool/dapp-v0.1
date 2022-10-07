import {usePrepareContractWrite, useContractWrite } from 'wagmi'
import config from "../contracts/config.json";
import teams from '../teams/team-infor.json';
import predictionGameABI from '../contracts/prediction_game_abi.json';
import { useState, useEffect } from 'react';
import usePredictionAddress from './usePredictionAddress';
import useIsMatchStarted from './useIsMatchStarted';
import useIsMatchPredicted from './usIsMatchPredicted';
import useIsEnounghSFS from './useIsEnounghSFS';

const CurrentMatch = ({matchId, stTeam, ndTeam, startTime }) => {
    const isStarted = useIsMatchStarted(matchId);
    const isPredicted = useIsMatchPredicted(matchId);
    const isEnounghSFS = useIsEnounghSFS();

    const MatchInfo = ({matchId, stTeam, ndTeam, startTime}) => {
        return (
            <a target="_self" className='item--link font-easport w-full block py-2 text-white'>
                <div className="match-id-div"><p className="font-easport">Match Id: {Number.parseInt(matchId)}</p></div>
                <div className="item-content">
                    <div className="team-card"><p className="font-easport team-name"> {teams[stTeam] == null ? (stTeam) : (teams[stTeam]['name'])}</p>
                        <img className="team-img" src={teams[stTeam] == null ? (teams['default1']['logo-url']) : (teams[stTeam]['logo-url'])}></img>
                    </div>
                    <div className="vs-card"><p className="font-easport">vs</p></div>
                    <div className="team-card"><p className="font-easport team-name">{teams[ndTeam] == null ? (ndTeam) : (teams[ndTeam]['name'])}</p>
                        <img className="team-img" src={teams[ndTeam] == null ? (teams['default1']['logo-url']) : (teams[ndTeam]['logo-url'])}></img>
                    </div>
                    <div className="match-time-start">
                        <p className="font-easport">{(new Date(Number.parseInt(startTime) * 1000)).toLocaleString('en-US', { timeZone: "UTC" })} (UTC)</p>
                    </div>
                </div>
            </a>
        );
    }

    const PredictButton = ({matchId, result, value}) => {
        const predictionGameAddr = usePredictionAddress();
        const { config } = usePrepareContractWrite({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'predict',
            args: [matchId, result],
        });

        const { data, isLoading, isSuccess, write } = useContractWrite(config);

        return <button className='font-easport predict-btn' onClick={() => write()}>
            {isLoading ? 'Predicting...' : (
                isSuccess ? 'Predicted' : value)}
        </button>
    }

    const PredictDiv = ({matchId, stTeam, ndTeam}) => {
        if(isStarted) return (<div className="match-time-start"><p className="prediction-alert font-easport">Match has started already!!!</p></div>);
        else if(isPredicted) return (<div className="match-time-start"><p className="prediction-alert font-easport">Predicted already!!!</p></div>);
        else if(!isEnounghSFS) return (<div className="match-time-start"><p className="prediction-alert font-easport">You must hold atleast 600 SFS!!!</p></div>); 
        return(
            <div className="predict-btn-div">
                <PredictButton matchId={Number.parseInt(matchId)} result={1} value={teams[stTeam] == null ? (stTeam) : (teams[stTeam]['name'])}></PredictButton>
                <PredictButton matchId={Number.parseInt(matchId)} result={3} value={'Draw'}> draw</PredictButton>
                <PredictButton matchId={Number.parseInt(matchId)} result={2} value={teams[ndTeam] == null ? (ndTeam) : (teams[ndTeam]['name'])}></PredictButton>
            </div>
        );
    }
    
    return (
        <li className={isStarted? 'match-item-started':'match__item'}>
            <MatchInfo matchId={matchId}
                stTeam={stTeam}
                ndTeam={ndTeam}
                startTime={startTime}></MatchInfo>
            <PredictDiv matchId={matchId}
                stTeam={stTeam}
                ndTeam={ndTeam} >
            </PredictDiv>
        </li>
    );
}


export default CurrentMatch;    