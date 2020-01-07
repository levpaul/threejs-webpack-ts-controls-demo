import './css/style.css';
import React from 'react'
import ReactDOM from "react-dom";
import App from './components/App';

function testMobile(): boolean {
    return /mobile/i.test(window.navigator.userAgent);
}

ReactDOM.render(
    <App isMobile={testMobile()} />,
    document.getElementById('root')
);
