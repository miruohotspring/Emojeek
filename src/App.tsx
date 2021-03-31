import React from 'react';
import logo from './logo.svg';
import { Main, UserProfile, Single, Navigator } from './components';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

function App(): JSX.Element {
    return (
        <>
            <BrowserRouter>
                <Route exact path = "/" component = { Main } />
                <Route exact path = "/user" component = { UserProfile } />
                <Route exact path = "/:username/:article_id" component = { Single } />
                <Navigator />
            </BrowserRouter>
        </>
    );
}

export default App;
