import React, { useState, useContext } from 'react';

import GlobalState from '../state/GlobalState';

const StartGame = props => {
    const [userNumber, setUserNumber] = useState('');
    const { state, dispatch } = useContext(GlobalState.Context);

    const { lowerLimit, upperLimit } = state;

    const userNumberHandler = event => {
        const newNumber = event.target.value.replace(/[^0-9]/g, '');
        if(newNumber === '' || (newNumber <= upperLimit && newNumber >= lowerLimit)) {
            setUserNumber(newNumber);
        }
    };

    const confirmButtonHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        const confirmedNumber = parseInt(userNumber);
        if(!isNaN(confirmedNumber) && confirmedNumber >= lowerLimit && confirmedNumber <= upperLimit) {
            dispatch(GlobalState.createAction.setTargetNumber(confirmedNumber));
        }
    };

    const useRandomButtonHandler = event => {
        const randNumber = Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
        dispatch(GlobalState.createAction.setTargetNumber(randNumber));
    };

    return (
        <div>
            Pick a number to guess! ({lowerLimit} - {upperLimit})
            <div>
                <form onSubmit={confirmButtonHandler}>
                    <input value={userNumber} onChange={userNumberHandler} autoFocus />
                    <button type="submit">Confirm</button>
                    <button onClick={useRandomButtonHandler} type="button">Use Random</button>
                </form>
            </div>
        </div>
    );
}

export default StartGame;
