import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import Calendar from '../Calendar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Calendar />
    </Provider>
  );
}

export default App;
