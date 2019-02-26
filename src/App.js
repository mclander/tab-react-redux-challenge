import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'
// // Import the Home component to be used below
// import Home from './Home/Home'
// // Import the Maps component to be used below
// import Maps from './Maps/Maps'
// // Import the Blogs component to be used below
// import Blog from './Blog/Blog'

import NotFound from './NotFound/NotFound'
import './App.css';
import WorkPlace from './components/work-place'
import createBrowserHistory from 'history/createBrowserHistory';
import asyncComponent from './AsyncComponent'
// require('styled-components')
require('bootstrap/dist/css/bootstrap.css')

const Blog = asyncComponent(() =>
    import('./Blog/Blog').then(module => module.default)
)


class App extends Component {
    render () {
        return (
            <Router>
                <div>
                    <section className="content">
                        <Switch>
                            <Route exact path="/" component={WorkPlace} />
                            <Route path="/article/:article" component={WorkPlace} />
                            <Route path="/blog" component={Blog} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </section>
                </div>
            </Router>
        )
    }
}

export default App;
