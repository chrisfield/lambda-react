import React from 'react';
import ReactDOM from 'react-dom';

console.log('app.jsx has run');

const appRoot = document.getElementById('app-id');

ReactDOM.hydrate(<div><p>first line</p><p>second line</p></div>, appRoot);
