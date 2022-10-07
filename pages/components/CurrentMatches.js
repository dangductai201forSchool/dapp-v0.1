import CurrentMatch from './CurrentMatch';
import useCurrentMatchList from './useCurrentMatchList';

const CurrentMatches = () => {
    const currentMatchList = useCurrentMatchList();
   
    return (
    <ul className='flex-1 sm:flex-none'>
        {currentMatchList.map((match) =>
            <CurrentMatch key ={Number.parseInt(match.matchId)}
            matchId={match.matchId}
            stTeam={match.stTeam} 
            ndTeam={match.ndTeam}
            startTime={match.startTime}>      
            </CurrentMatch>)}
    </ul>
    );
}

export default CurrentMatches;