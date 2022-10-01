const ReactButton = () => {
    const { data, error, isLoading } = useContractRead({
        addressOrName: predictionGameAddr,
        contractInterface: predictionGameABI,
        functionName: 'isEnounghSFS',
        args: address,
    });

    // const isMatchEnded = (matchId) =>{
    //     const {data, error, isLoading} = useContractRead({
    //         addressOrName: predictionGameAddr,
    //         contractInterface: predictionGameABI,
    //         functionName: 'isMatchEnded',
    //         args: matchId,
    //     });

    //     return data;

    // }


    // console.log(isMatchEnded(props.matchId));


    return (
        data === true ? (
            <div>
                <button>T1 Win </button>
                <button>Draw</button>
                <button>T2 Win</button>
            </div>
        ) : (
            <div>
                <p>Not enoungh SFS</p>
            </div>
        )
    );
}

export default ReactButton;