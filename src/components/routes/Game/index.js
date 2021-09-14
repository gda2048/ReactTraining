import '../button.css'

const GamePage = ({onChangePage}) => {
    const handleClickButton = (page) => {
        console.log('GP', <GamePage />);
        onChangePage && onChangePage('app');
    }
    return (
        <div>
            <div>This is Game Page!!</div>
            <button onClick={handleClickButton}>
                Return Home
            </button>
        </div>
    )
}

export default GamePage;