import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageRender from './customRouter/PageRender';
import Header from './components/global/Header';
import Alert from './components/alert/Alert';
import { refreshToken } from './redux/actions/authActions'
function App() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshToken())
  }, [])

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
