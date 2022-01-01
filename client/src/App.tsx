import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageRender from './customRouter/PageRender';
import Header from './components/global/Header';
import Alert from './components/alert/Alert';
import { refreshToken } from './redux/actions/authActions'
import { getCategories } from './redux/actions/categoryActions'
import { RootStore } from './utils/TypeScript'
import { auth } from 'google-auth-library';
function App() {
    const { alert } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(refreshToken())
        dispatch(getCategories())
    }, [])

    useEffect(() => {
        if (alert.loading) {
            // Disable Scroll
            // To get the scroll position of current webpage
            const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
            const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;

            // if scroll happens, set it to the previous value
            window.onscroll = function () {
                window.scrollTo(LeftScroll, TopScroll);
            };

        } else {
            // Endable Scroll
            window.onscroll = function () { };
        }
    }, [alert.loading])

    return (
        <div className="App">
            <Router>
                <Header />        {/* Alert and Header */}
                <Alert />
                <Switch>
                    <Route path='/' exact component={PageRender}></Route>
                    <Route path='/:page' exact component={PageRender}></Route>
                    <Route path='/:page/:slug' exact component={PageRender}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
