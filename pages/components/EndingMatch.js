import {usePrepareContractWrite,useContractWrite } from 'wagmi'
import teams from '../teams/team-infor.json';
import config from "../contracts/config.json";
import usePredictionAddress from './usePredictionAddress';
import useClaimAble from './useIsClaimAble';


const EndingMatch = ({matchId,stTeam,ndTeam,startTime,result}) => {
    const isClaimAble = useClaimAble(matchId);
    
    const MatchInfo = ({matchId,result,stTeam,ndTeam,startTime})=> {
        return (
            <a target="_self" className='item--link font-easport w-full block py-2 text-white'>
                <div className="match-id-div"><p className="font-easport">Match Id: {Number.parseInt(matchId)}</p></div>
                <div className="item-content">
                    <div className={result === 1 ? "team-card-win" : "team-card"}>
                        <p className="font-easport team-name"> {teams[stTeam] == null ? (stTeam) : (teams[stTeam]['name'])}</p>
                        <img className="team-img" src={teams[stTeam] == null ? (teams['default1']['logo-url']) : (teams[stTeam]['logo-url'])}></img>
                        <div className="team-result-div"><p className={result === 1 ? "team-result-text-win" : "team-result-text-lose"}>
                            {result == 1 && 'Win'}
                            {result == 2 && 'Lose'}
                            {result == 3 && 'Draw'}
                        </p></div>
                    </div>
                    <div className="vs-card"><p className="font-easport">vs</p></div>

                    <div className={result === 2 ? "team-card-win" : "team-card"}>
                        <p className="font-easport team-name">{teams[ndTeam] == null ? (ndTeam) : (teams[ndTeam]['name'])}</p>
                        <img className="team-img" src={teams[ndTeam] == null ? (teams['default1']['logo-url']) : (teams[ndTeam]['logo-url'])}></img>
                        <div className="team-result-div"><p className={result === 2 ? "team-result-text-win" : "team-result-text-lose"}>
                            {result == 1 && 'Lose'}
                            {result == 2 && 'Win'}
                            {result == 3 && 'Draw'}
                        </p></div>
                    </div>
                    <div className="match-time-start">
                        <p className="font-easport">{(new Date(Number.parseInt(startTime) * 1000)).toLocaleString('en-US', { timeZone: "UTC" })} (UTC)</p>
                    </div>
                </div>

            </a>
        );
    }
    const ClaimButton = ({matchId}) => {
        const predictionGameAddr = usePredictionAddress();
        const { config } = usePrepareContractWrite({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'claimReward',
            args: [matchId],
        });

        const { data, isLoading, isSuccess, write } = useContractWrite(config);

        return (
            <button className='claim-btn' onClick={() => write()}>
            {isLoading ? 'Claiming...' : (
                isSuccess ? 'Claimed' : 'Claim')}
           </button>
        );
    }

    const ClaimDiv = ({matchId}) => {    
        return (
            <div class="claim-btn-div">
                <ClaimButton matchId={pmatchId}></ClaimButton>
            </div>
        );
    }

    return(
        <li className={isClaimAble? 'match-item-claim-able':'match-item-claim-unable'}>
            <MatchInfo matchId={matchId}
                stTeam={stTeam}
                ndTeam={ndTeam}
                startTime={startTime}
                result={result}></MatchInfo>
            {isClaimAble && <ClaimDiv matchId={matchId}></ClaimDiv>}
        </li>
    );
}

export default EndingMatch;