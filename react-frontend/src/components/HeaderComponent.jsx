import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import {
    Link
  } from "react-router-dom";
import UserService from '../services/UserService';

class HeaderComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            userId: '',
            currentRole: ''
        }
        
    }

    async componentDidMount(){
        if(AuthenticationService.isUserLoggedIn())
        AuthenticationService.checkToken().then(res => {
            if(res == 401 && AuthenticationService.isUserLoggedIn()){
                localStorage.removeItem("token");
                let conf = window.alert("Время вашей сессий истекло");
                
                window.open("/login");
                window.location.reload();
                
            }
        });


        if(AuthenticationService.isUserLoggedIn()){
            let username = '';
            let getUsernameByTokenRequest = await AuthenticationService.getUsernameByToken();
            username = getUsernameByTokenRequest.data;
            let userId = '';
            let getIdByUsernamerRequest = await UserService.getIdByUsername(username);
            userId = getIdByUsernamerRequest.data;
            this.setState({userId: userId});
        

            UserService.getCurrentUserRole().then(res => {
                this.setState({currentRole: res.data})
            });
        }
    }
    
    isHaveFullAccess(userId){
        if(userId == '')
            return false;
        if(this.state.currentRole.toLocaleLowerCase() == "admin")
            return true;
        else 
            return false;
        
    }

    logoutLink(){
        if(AuthenticationService.isUserLoggedIn())
        return <li style={{marginLeft:"10px"}}><Link id="headerLink" to="/logout">Выйти</Link></li>
    }

    loginLink(){
        if(!AuthenticationService.isUserLoggedIn())
        return <li style={{marginLeft:"10px"}}><Link id="headerLink" to="/login">Войти</Link></li>
    }

    createUserLink(){
        if(AuthenticationService.isUserLoggedIn() && this.isHaveFullAccess(this.state.userId))
        return <li style={{marginLeft:"10px"}}><Link id="headerLink" to="/add-user/-1">Добавить пользователя</Link></li>;
    }

    journalLink(){
        if(AuthenticationService.isUserLoggedIn()){
            return <li style={{marginLeft:"10px"}}><Link id="headerLink" to="/journals">Журналы</Link></li>;
        }
    }

    groupsLink(){
        if(AuthenticationService.isUserLoggedIn()){
            return <li style={{marginLeft:"10px"}}><Link id="headerLink" to="/groups">Группы</Link></li>;
        }
    }

    studentsLink(){
        if(AuthenticationService.isUserLoggedIn()){
            return <li style={{marginLeft:"10px"}} className="active"><Link id="headerLink" to="/students">Обучающиеся</Link></li>;
        }
    }

    statisticLink(){
        if(AuthenticationService.isUserLoggedIn()  && this.isHaveFullAccess(this.state.userId)){
            return <li style={{marginLeft:"10px"}} className="active"><Link id="headerLink" to="/statistic">Статистка</Link></li>;
        }
    }

    lessonLibraryLink(){
        if(AuthenticationService.isUserLoggedIn()){
            return <li style={{marginLeft:"10px"}} className="active"><Link id="headerLink" to="/lessonLibrary">Мои дисциплины</Link></li>;
        }
    }

    userListLink(){
        if(AuthenticationService.isUserLoggedIn() && this.isHaveFullAccess(this.state.userId)){
            return <li style={{marginLeft:"10px"}} className="active"><Link id="headerLink" to="/user-list">Список пользователей</Link></li>;
        }
    }

    render() {
        return (
            <div>
                <div>
                <header>
                    <div className="navbar navgab-expand-lg navbar-dark bg-success">
                        <div className="navbar-inner">
                            <a className="navbar-brand" href="/">Онлайн журнал</a>
                        </div>
                        <ul className="nav">
                            {this.studentsLink()}
                            {this.groupsLink()}
                            {this.journalLink()}
                            {this.createUserLink()}
                            {this.lessonLibraryLink()}
                            {this.statisticLink()}
                            {this.userListLink()}
                            {this.loginLink()}
                            {this.logoutLink()}
                            <li></li>
                        </ul>
                    </div>
                </header>
            </div>
            </div>
        );
    }
}

export default HeaderComponent;