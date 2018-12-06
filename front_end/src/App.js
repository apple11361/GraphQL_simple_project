import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Home from './pages/Home';
import List from './pages/List';
import Users from './pages/Users';

class App extends Component {
    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/list' component={List}/>
                    <Route path='/users' component={Users}/>
                </Switch>
            </div>
        );
        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}

export default App;
