import React, { useReducer } from 'react';

const SET_TARGET = 'SET_TARGET';
const MAKE_GUESS = 'MAKE_GUESS';
const FINISH_GAME = 'FINISH_GAME';
const RESET_GAME = 'RESET_GAME';

const gameStatus = {
    STARTED: 'start',
    PLAYING: 'playing',
    FINISHED: 'finished'
};

const initialState = {
    upperLimit: 99,
    lowerLimit: 1,
    status: gameStatus.STARTED,
    targetNumber: undefined,
    userGuess: undefined,
    closestGuess: undefined,
    guessCount: 0
};

const createAction = {
    setTargetNumber: (targetNumber) => ({
        type: SET_TARGET,
        payload: targetNumber
    }),
    makeGuess: (guess) => ({
        type: MAKE_GUESS,
        payload: guess
    }),
    finishGame: () => ({
        type: FINISH_GAME
    }),
    restart: () => ({
        type: RESET_GAME
    })
};

const reducer = (state, action) => {
    switch(action.type) {
        case SET_TARGET:
            return {
                ...state,
                targetNumber: action.payload,
                status: gameStatus.PLAYING
            };
        case MAKE_GUESS:
            const newGuess = action.payload;
            let newClosestGuess = state.closestGuess;
            if(!state.closestGuess || Math.abs(state.closestGuess - state.targetNumber) > Math.abs(newGuess - state.targetNumber)) {
                newClosestGuess = newGuess;
            }
            return {
                ...state,
                userGuess: newGuess,
                guessCount: state.guessCount + 1,
                closestGuess: newClosestGuess
            };
        case FINISH_GAME:
            return {
                ...state,
                status: gameStatus.FINISHED
            };
        case RESET_GAME:
            return initialState;
        default:
            return state;
    }
};

const Context = React.createContext({
    state: initialState,
    dispatch: () => {}
});

const Provider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{state, dispatch}}>
            {props.children}
        </Context.Provider>
    );
};

export default {
    Provider,
    Context,
    createAction,
    gameStatus
};
