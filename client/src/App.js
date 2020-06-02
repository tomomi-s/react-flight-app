import React, {useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './assets/style/style.css';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Result from './components/result/Results';

import { Provider } from 'react-redux';
import store from './store';

const App = ()=> {
  useEffect(() => {

  })
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/result" component={Result}/>
          </div>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
