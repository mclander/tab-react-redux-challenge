import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux' 

import './_app.css';
import WorkPlace from './components/work-place'
import NotFound from './components/not-found'
import createStore from './store/configure-store'
const store = createStore()

///import createBrowserHistory from 'history/createBrowserHistory';
// import asyncComponent from './AsyncComponent'

// const Blog = asyncComponent(() =>
//    import('./Blog/Blog').then(module => module.default)
// )


class App extends Component {
    render () {
        return (
            <Provider store={store}>
            <Router>
                <div>
                    <section className="content">
                        <Switch>
                            <Route exact path="/" component={WorkPlace} />
                            <Route path="/article/:article" component={WorkPlace} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </section>
                </div>
            </Router>
            </Provider>
        )
    }
}

export default App;
