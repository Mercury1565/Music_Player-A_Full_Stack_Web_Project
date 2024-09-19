import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import App from './App.jsx'

import rootSaga from './redux/sagas';  
import rootReducer from './redux/store.js'; 

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),  
});

sagaMiddleware.run(rootSaga);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
