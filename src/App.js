import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddCertificate from "./components/add-certs.component";
import CertificateList from "./components/certs-list.components";
import Certificate from "./components/certs.component";


class App extends Component {
  render() {
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/certificates" className="navbar-brand">
              GPC Certificate Tracker
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add Certificates
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
              <Router>
                  <Route exact path={["/", "/certificates"]} component={CertificateList} />
                  <Route exact path="/add" component={AddCertificate} />
                  <Route path="/certificates/:id" component={Certificate} />
              </Router>
          </div>
        </div>
    );
  }
}

export default App;
