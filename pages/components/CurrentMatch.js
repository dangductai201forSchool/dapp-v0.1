import { useNetwork, useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi'
import config from "../contracts/config.json";
import teams from '../teams/team-infor.json';
import predictionGameABI from '../contracts/prediction_game_abi.json';



const CurrentMatch = (props) => {
    const { chain, chains } = useNetwork();
    let predictionGameAddr = config['sfs-mainnet']['prediction-game-address'];
    
    if(chain !=null &&chain.network == 'bsc testnet'){
        predictionGameAddr = config['sfs-testnet']['prediction-game-address'];
    }


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
    const IsMatchStarted = (matchId) => {
        const { data, error, isLoading } = useContractRead({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'isMatchStarted',
            args: matchId,
        });
        return data;
    }
    const IsPredicted = (matchId) => {
        const { data, error, isLoading } = useContractRead({
            addressOrName: predictionGameAddr,
            contractInterface: predictionGameABI,
            functionName: 'isPredicted',
            args: [matchId, address],
        });
        return data;
    }

    // child component
    const MatchInfo = (props) => {
        return (
            <a target="_self" className='item--link font-easport w-full block py-2 text-white'>
                <div className="match-id-div"><p className="font-easport">Match Id: {props.matchId}</p></div>
                <div className="item-content">
                    <div className="team-card"><p className="font-easport team-name"> {props.stTeamName}</p>
                        <img className="team-img" src={props.stTeamLogo}></img>
                    </div>
                    <div className="vs-card"><p className="font-easport">vs</p></div>
                    <div className="team-card"><p className="font-easport team-name">{props.ndTeamName}</p>
                        <img className="team-img" src={props.ndTeamLogo}></img>
                    </div>
                    <div className="match-time-start">
                        <p className="font-easport">{props.startTime} (UTC)</p>
                    </div>
                </div>
            </a>
        );
    }
    const PredictDiv = (props) => {
        const PredictButton = (props) => {
            const { config } = usePrepareContractWrite({
                addressOrName: predictionGameAddr,
                contractInterface: predictionGameABI,
                functionName: 'predict',
                args: [props.matchId, props.result],
            });

            const { data, isLoading, isSuccess, write } = useContractWrite(config);

            return <button className='font-easport predict-btn' onClick={() => write()}>
                {isLoading ? 'Predicting...' : (
                    isSuccess ? 'Predicted' : props.value)}
            </button>
        }

        if (props.isEnounghSFS) {
            if (!props.isStarted) {
                if (!IsPredicted(props.matchId)) {
                    return (
                        <div className="predict-btn-div">
                            <PredictButton matchId={props.matchId} result={1} value={props.stTeamName}></PredictButton>
                            <PredictButton matchId={props.matchId} result={3} value={'Draw'}> draw</PredictButton>
                            <PredictButton matchId={props.matchId} result={2} value={props.ndTeamName}></PredictButton>
                        </div>
                    );
                } else {
                    return (
                        <div className="match-time-start"><p className="prediction-alert font-easport">Predicted already</p></div>
                    );
                }
            } else {
                return (
                    <div className="match-time-start"><p className="prediction-alert font-easport">Match has started already!!!</p></div>
                );
            }
        } else {
            return (<div className="match-time-start"><p className="prediction-alert font-easport">You must hold atleast 600 SFS to predict!!!</p></div>);
        }
    }
    // component
    if (IsMatchStarted(props.matchId)) {
        return (
            <li className='match-item-started ' key={props.key}>
                <MatchInfo matchId={props.matchId}
                    stTeamName={TeamName(props.stTeam)}
                    ndTeamName={TeamName(props.ndTeam)}
                    stTeamLogo={TeamLogo(props.stTeam)}
                    ndTeamLogo={TeamLogo(props.ndTeam)}
                    startTime={StartTime(props.startTime)}></MatchInfo>
                <PredictDiv matchId={props.matchId}
                    isEnounghSFS={props.isEnounghSFS}
                    isStarted={true}
                    stTeamName={TeamName(props.stTeam)}
                    ndTeamName={TeamName(props.ndTeam)}
                    stTeamLogo={TeamLogo(props.stTeam)}
                    ndTeamLogo={TeamLogo(props.ndTeam)} ></PredictDiv>
            </li>
        );
    }
    else {
        return (
            <li className='match__item' key={props.key}>
                <MatchInfo matchId={props.matchId}
                    stTeamName={TeamName(props.stTeam)}
                    ndTeamName={TeamName(props.ndTeam)}
                    stTeamLogo={TeamLogo(props.stTeam)}
                    ndTeamLogo={TeamLogo(props.ndTeam)}
                    startTime={StartTime(props.startTime)}></MatchInfo>
                <PredictDiv matchId={props.matchId}
                    isEnounghSFS={props.isEnounghSFS}
                    isStarted={false}
                    stTeamName={TeamName(props.stTeam)}
                    ndTeamName={TeamName(props.ndTeam)}
                    stTeamLogo={TeamLogo(props.stTeam)}
                    ndTeamLogo={TeamLogo(props.ndTeam)} ></PredictDiv>
            </li>);
    }
}


export default CurrentMatch;    