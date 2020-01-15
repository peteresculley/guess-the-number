import React, { useContext } from 'react';

import GlobalState from '../state/GlobalState';

const GameResults = props => {
    const { state, dispatch } = useContext(GlobalState.Context);

    const restartButtonHandler = () => {
        dispatch(GlobalState.createAction.restart());
    };

    const numberOfTries = state.guessCount > 1 ? state.guessCount + ' tries!' : 'one try!';

    return (
        <div>
            <div>
                You guessed { state.targetNumber } in { numberOfTries }
            </div>
            <button onClick={restartButtonHandler} autoFocus>Restart Game</button>
        </div>
    );
};

export default GameResults;
