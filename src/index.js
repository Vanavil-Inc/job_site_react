import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Layout from './components/Layout';
// import App from './App'
import RegisterLayout from './components/RegisterLayout';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard'
import Recent from './components/RecentJobs'
import Contact from './components/Contact'
import Profile from './components/ProfileEdit'
import * as serviceWorker from './serviceWorker';




const routing = (
    <Router>
      
        <div>
                  {/* <Layout> */}
                    <Route path="/login"  component={Login} />
                    <Route path="/registration"  component={RegisterLayout} />
                    <Route path="/" exact component={Home} />
                    <Route path="/dashboard"  component={Dashboard} />
                    <Route path="/recentjobs"  component={Recent} />
                    <Route path="/contact"  component={Contact} />
                    <Route path="/editprofile"  component={Profile} />
                 {/* </Layout> */}
        </div>  
        
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
