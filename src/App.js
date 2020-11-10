import React from 'react';
import NNav from './Components/NNav/NNav';
import routes from './routes';
import {withRouter} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <div className="App">
      {props.location.pathname !== '/'
        ? <NNav />
        : null}
      {routes}
    </div>
  );
}

export default withRouter(App);
