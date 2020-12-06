import React,{ Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './components/Home/home';

class Routes extends Component {

    
    render(){
        console.log(this.props);
        return(
            <Switch>
                <Route path='/' exact component={Home} />
            </Switch>
        )
    }
}

export default Routes;

