import React, { useState, useContext } from 'react';

import GlobalState from '../state/GlobalState';

const PlayGame = props => {
    const { target } = props;
    const { state, dispatch } = useContext(GlobalState.Context);
    const { guessCount, userGuess: lastGuess, closestGuess, lowerLimit, upperLimit } = state;

    const [userGuess, setUserGuess] = useState('');

    const userGuessHandler = event => {
        const newGuess = event.target.value.replace(/[^0-9]/g, '');
        if(newGuess === '' || (newGuess <= upperLimit && newGuess >= lowerLimit)) {
            setUserGuess(newGuess);
        }
    };

    const guessButtonHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(GlobalState.createAction.makeGuess(userGuess));
        setUserGuess('');
    };
    
    let guessResult;
    if(lastGuess) {
        if(lastGuess < target) {
            guessResult = (<div>Target is <b>higher</b> than {lastGuess}</div>);
        } else if(lastGuess > target) {
            guessResult = (<div>Target is <b>lower</b> than {lastGuess}</div>);
        } else {
            dispatch(GlobalState.createAction.finishGame());
        }
    }

    let closestGuessDisplay;
    if(closestGuess) {
        closestGuessDisplay = (
            <div>
                Your closest guess is {closestGuess}
            </div>
        );
    }

    return (
        <div>
            Make a guess! ({lowerLimit} - {upperLimit})
            <div>
                <form onSubmit={guessButtonHandler}>
                    <input value={userGuess} onChange={userGuessHandler} autoFocus />
                    <button type="submit">Guess!</button>
                </form>
            </div>
            <div>
                {guessResult}
            </div>
            {closestGuessDisplay}
            <div>
                Guess Count: {guessCount}
            </div>
        </div>
    );
};

export default PlayGame;
