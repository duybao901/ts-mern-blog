import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageRender from './PageRender';
import Header from './components/global/Header';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {/* Alert and Header */}
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
