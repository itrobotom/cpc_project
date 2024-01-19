import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> //из за этого режима рендерится 2 раза и запроса делается тоже два
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);


