import React, { useContext } from 'react';
import './App.css';

import GlobalState from './state/GlobalState';

import StartGame from './components/StartGame';
import PlayGame from './components/PlayGame';
import GameResults from './components/GameResults';

const ScreenManager = props => {
  const { state } = useContext(GlobalState.Context);
  let content;
  switch(state.status) {
    case GlobalState.gameStatus.STARTED:
    default:
      content = <StartGame />;
      break;
    case GlobalState.gameStatus.PLAYING:
      content = <PlayGame target={state.targetNumber} />
      break;
    case GlobalState.gameStatus.FINISHED:
      content = <GameResults />
      break;
  }

  return (
    <div>
      {content}
    </div>
  );
};

const App = props => {
  return (
    <div className="App">
      <GlobalState.Provider>
        <ScreenManager />
      </GlobalState.Provider>
    </div>
  );
}

export default App;
