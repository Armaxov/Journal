import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService';

class LogoutComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
        }

        this.logout = this.logout.bind(this);
    }

    logout(){
        AuthenticationService.logout();
        this.props.history.push('/');
        document.location.reload();
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Выйти</h3>
                            <div className="card-body">
                                <h2>Вы уверены что хотите выйти</h2>
                                <form>
                                    <div className="text-center">
                                        <button className="btn btn-success" onClick={this.logout}>Выйти</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LogoutComponent