import React, { Component } from "react";
import DatePicker from "react-datepicker";
import CertsDataService from "../services/certs.service";

export default class AddCertificate extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeVP = this.onChangeVP.bind(this);
        this.onChangeApplication = this.onChangeApplication.bind(this);
        this.onChangeIssuer = this.onChangeIssuer.bind(this);
        this.onChangeExpirationDate = this.onChangeExpirationDate.bind(this);
        this.saveCertificate = this.saveCertificate.bind(this);
        this.newCertificate = this.newCertificate.bind(this);

        this.state = {
            id: null,
            cname: "",
            vp: "",
            application: "",
            issuer: "",
            expiration: "",
            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            cname: e.target.value
        });
    }

    onChangeVP(e) {
        this.setState({
            vp: e.target.value
        });
    }

    onChangeApplication(e) {
        this.setState({
            application: e.target.value
        });
    }

    onChangeIssuer(e) {
        this.setState({
            issuer: e.target.value
        });
    }

    onChangeExpirationDate(e) {
        this.setState({
            expiration: e.target.value
        });
    }

    saveCertificate() {
        var data = {
            cname: this.state.cname,
            vp: this.state.vp,
            application: this.state.application,
            issuer: this.state.issuer,
            expiration: this.state.expiration
        };

        CertsDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    cname: response.data.cname,
                    vp: response.data.vp,
                    application: response.data.application,
                    issuer: response.data.issuer,
                    expiration: response.data.expiration,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newCertificate() {
        this.setState({
            id: null,
            cname: "",
            vp: "",
            application: "",
            issuer: "",
            expiration: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newCertificate}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="cname">Certificate</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cname"
                                required
                                value={this.state.cname}
                                onChange={this.onChangeName}
                                name="cname"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vp">VP</label>
                            <input
                                type="text"
                                className="form-control"
                                id="vp"
                                required
                                value={this.state.vp}
                                onChange={this.onChangeVP}
                                name="vp"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="application">Application</label>
                            <input
                                type="text"
                                className="form-control"
                                id="application"
                                required
                                value={this.state.application}
                                onChange={this.onChangeApplication}
                                name="application"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="issuer">Issuer</label>
                            <input
                                type="text"
                                className="form-control"
                                id="issuer"
                                required
                                value={this.state.issuer}
                                onChange={this.onChangeIssuer}
                                name="issuer"
                            />
                        </div>

                        <div className="form-group">
                            <DatePicker
                                selected={ this.state.startDate }
                                onChange={ this.onChangeExpirationDate }
                                name="expiration"
                                dateFormat="MM-dd-yyyy"
                            />
                        </div>

                        <button onClick={this.saveCertificate} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}