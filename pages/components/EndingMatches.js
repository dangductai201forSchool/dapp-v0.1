import EndingMatch from './EndingMatch';
import useEndingMatchList from './useEndingMatchList';


const EndingMatches = () => {
    const endingMatchList = useEndingMatchList();
    
    return(
        <ul className='flex-1 sm:flex-none'>
            {endingMatchList.map((match) => 
                <EndingMatch key={Number.parseInt(match.matchId)}
                matchId={match.matchId}
                stTeam={match.stTeam} 
                ndTeam={match.ndTeam}
                startTime={match.startTime}
                result={match.result}>
               </EndingMatch>
            )}
        </ul>
    );
}
    

export default EndingMatches;