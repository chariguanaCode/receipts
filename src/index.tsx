import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'modules/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'reduxState/store';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
