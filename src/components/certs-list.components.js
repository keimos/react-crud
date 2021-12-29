import React, { Component } from "react";
import CertsDataService from "../services/certs.service";
import { Link } from "react-router-dom";

export default class CertificateList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchVP = this.onChangeSearchVP.bind(this);
        this.retrieveCerts = this.retrieveCerts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCertificate = this.setActiveCertificate.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            certificates: [],
            currentCerts: null,
            currentIndex: -1,
            searchVP: ""
        };
    }

    componentDidMount() {
        this.retrieveCerts();
    }

    onChangeSearchVP(e) {
        const searchVP = e.target.value;

        this.setState({
            searchVP: searchVP
        });
    }

    retrieveCerts() {
        CertsDataService.getAll()
            .then(response => {
                this.setState({
                    certificate: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveCerts();
        this.setState({
            currentCerts: null,
            currentIndex: -1
        });
    }

    setActiveCertificate(certificates, index) {
        this.setState({
            currentTutorial: certificates,
            currentIndex: index
        });
    }

    searchTitle() {
       CertsDataService.findByVP(this.state.searchVP)
            .then(response => {
                this.setState({
                    certificates: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchVP, certificates, currentCerts, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by VP"
                            value={searchVP}
                            onChange={this.onChangeSearchVP}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchVP}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Certificates List</h4>

                    <ul className="list-group">
                        {certificates &&
                            certificates.map((certificates, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveCertificate(certificates, index)}
                                    key={index}
                                >
                                    {certificates.vp}
                                </li>
                            ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    {currentCerts ? (
                        <div>
                            <h4>Certificates List</h4>
                            <div>
                                <label>
                                    <strong>Certificate:</strong>
                                </label>{" "}
                                {currentCerts.cname}
                            </div>
                            <div>
                                <label>
                                    <strong>VP:</strong>
                                </label>{" "}
                                {currentCerts.vp}
                            </div>
                            <div>
                                <label>
                                    <strong>Application:</strong>
                                </label>{" "}
                                {currentCerts.application}
                            </div>

                            <div>
                                <label>
                                    <strong>Issuer:</strong>
                                </label>{" "}
                                {currentCerts.issuer}
                            </div>

                            <div>
                                <label>
                                    <strong>Expiration:</strong>
                                </label>{" "}
                                {currentCerts.expiration}
                            </div>

                            <Link
                                to={"/certificates/" + currentCerts.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Certificates...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}