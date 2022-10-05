import { useAccount, useContractRead,usePrepareContractWrite,useContractWrite } from 'wagmi'
import predictionGameABI from '../contracts/PredictionGame_abi.json';
const predictionGameAddr = '0xA49c5cD7200303c410A1E4656503688D490Ffa60';
import teams from '../teams/team-infor.json';

const EndingMatch = (props) => {
    const { address, isConnected } = useAccount();
    //function
    const TeamName = (name) => {
        return (
            teams[name] == null ? (name) : (teams[name]['name'])
        );
    }
    const TeamLogo = (name) => {
        return (
            teams[name] == null ? (teams['default1']['logo-url']) : (teams[name]['logo-url'])
        );
    }
    const StartTime = (unix) => {
        return (new Date(Number.parseInt(unix) * 1000)).toLocaleString('en-US', { timeZone: "UTC" });
    }
    const IsClaimAble = (matchId) => {
        const { data, error, isLoading } = useContractRead({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'isClaimAble',
            args: address,
        });
        return data;
    }

    //child component
    const MatchInfo = (props)=> {
        return (
            <a target="_self" className='item--link font-easport w-full block py-2 text-white'>
                <div className="match-id-div"><p className="font-easport">Match Id: {props.matchId}</p></div>
                <div className="item-content">
                    <div className={props.result === 1 ? "team-card-win" : "team-card"}>
                        <p className="font-easport team-name"> {props.stTeamName}</p>
                        <img className="team-img" src={props.stTeamLogo}></img>
                        <div className="team-result-div"><p className={props.result === 1 ? "team-result-text-win" : "team-result-text-lose"}>
                            {props.result == 1 && 'Win'}
                            {props.result == 2 && 'Lose'}
                            {props.result == 3 && 'Draw'}
                        </p></div>
                    </div>
                    <div className="vs-card"><p className="font-easport">vs</p></div>

                    <div className={props.result === 2 ? "team-card-win" : "team-card"}><p className="font-easport team-name">{props.ndTeamName}</p>
                        <img className="team-img" src={props.ndTeamLogo}></img>
                        <div className="team-result-div"><p className={props.result === 2 ? "team-result-text-win" : "team-result-text-lose"}>
                            {props.result == 1 && 'Lose'}
                            {props.result == 2 && 'Win'}
                            {props.result == 3 && 'Draw'}
                        </p></div>
                    </div>
                    <div className="match-time-start">
                        <p className="font-easport">{props.startTime} (UTC)</p>
                    </div>
                    {props.isClaimAble && <ClaimDiv matchId={props.matchId}></ClaimDiv>}
                </div>

            </a>
        );
    }
    const ClaimDiv = (props) => {
        const ClaimButton = (props) => {
            const { config } = usePrepareContractWrite({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'claimReward',
                args: [props.matchId],
            });

            const { data, isLoading, isSuccess, write } = useContractWrite(config);

            return (
                <button className='claim-btn' onClick={() => write()}>
                {isLoading ? 'Claiming...' : (
                    isSuccess ? 'Claimed' : 'Claim')}
               </button>
            );
        }

        return (
            <div class="claim-btn-div">
                <ClaimButton matchId={props.matchId}></ClaimButton>
            </div>
        );
    }

    if (IsClaimAble(props.matchId)) {
        return (
            <li className='match-item-claim-able' key={props.key}>
                <MatchInfo matchId={props.matchId}
                result = {Number.parseInt(props.result)}
                stTeamName={TeamName(props.stTeam)}
                ndTeamName={TeamName(props.ndTeam)}
                stTeamLogo={TeamLogo(props.stTeam)}
                ndTeamLogo={TeamLogo(props.ndTeam)}
                startTime={StartTime(props.startTime)}
                isClaimAble={true}>
                </MatchInfo>
            </li>
        );
    }
    else {
        return (
            <li className='match-item-claim-unable' key={props.key}>
                <MatchInfo matchId={props.matchId}
                result = {Number.parseInt(props.result)}
                stTeamName={TeamName(props.stTeam)}
                ndTeamName={TeamName(props.ndTeam)}
                stTeamLogo={TeamLogo(props.stTeam)}
                ndTeamLogo={TeamLogo(props.ndTeam)}
                startTime={StartTime(props.startTime)}
                isClaimAble={false}
                ></MatchInfo>
            </li>
        );
    }
}

export default EndingMatch;