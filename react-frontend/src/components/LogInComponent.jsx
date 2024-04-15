import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';

class LogInComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            userNotFound: false,
            incorrectUsername: false,
            incorrectPassword: false
        }

        this.changeLoginHandler = this.changeLoginHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.login = this.login.bind(this);
        this.userNotFoundMessage = this.userNotFoundMessage.bind(this);
    }

    

    changeLoginHandler = (event) =>{
        let username = event.target.value;
        this.setState({username: username, userNotFound:false});
        if(username.length < 4 && username.length > 0)
            this.setState({incorrectUsername:true});
        else
            this.setState({incorrectUsername:false});
    }
    
    changePasswordHandler = (event) =>{
        let password = event.target.value;
        this.setState({password: password, userNotFound:false});
        if(password.length < 4 && password.length > 0)
            this.setState({incorrectPassword:true});
        else
            this.setState({incorrectPassword:false});
    }

    login = e =>{
        e.preventDefault();
        let login = AuthenticationService.login(this.state.username, this.state.password);
        login.then(res => {
            if(res == 401)
                this.setState({userNotFound: true});
            if(this.state.userNotFound == false){
                this.props.history.push('/');
                document.location.reload();
            }
        });
    }

    userNotFoundMessage(){
        if(this.state.userNotFound)
            return <div className="form-group"  style={{backgroundColor:"RGBA(250, 0, 0,.7)", borderRadius:6}}><label style={{marginLeft:12}}>Не правильное имя пользователя или пароль</label></div>
    }

    incorrectUsernameMessage(){
        if(this.state.incorrectUsername)
            return <div className="form-group"  style={{backgroundColor:"RGBA(250, 0, 0,.7)", borderRadius:6}}><label style={{marginLeft:12}}>Слишком маленькое имя пользователя</label></div>
    }

    incorrectPasswordMessage(){
        if(this.state.incorrectPassword)
            return <div className="form-group"  style={{backgroundColor:"RGBA(250, 0, 0,.7)", borderRadius:6}}><label style={{marginLeft:12}}>Слишком маленький пароль</label></div>
    }

    cancel(){
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Войти</h3>
                            <div className="card-body">
                                <form>
                                    {this.userNotFoundMessage()}
                                    <div className="form-group">
                                        <label>Логин</label>
                                        <input placeholder="Логин" name="login" className="form-control"
                                        value={this.state.login} onChange={this.changeLoginHandler}/>
                                    </div>
                                    {this.incorrectUsernameMessage()}

                                    <div className="form-group">
                                        <label>Пароль</label>
                                        <input type = "password" placeholder="Пароль" name="password" className="form-control"
                                        value={this.state.password} onChange={this.changePasswordHandler}/>
                                    </div>
                                    {this.incorrectPasswordMessage()}

                                    <button className="btn btn-success" onClick={this.login}>Войти</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Отмена</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogInComponent;