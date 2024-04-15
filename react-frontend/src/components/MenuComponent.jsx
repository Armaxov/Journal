import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import UserService from '../services/UserService';

class MenuComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRole: ''
        }

        this.redirectGroups = this.redirectGroups.bind(this);
        this.redirectJournal = this.redirectJournal.bind(this);
        this.redirectStudents = this.redirectStudents.bind(this);
        this.redirectAddStudent = this.redirectAddStudent.bind(this);
        this.redirectAddGroup = this.redirectAddGroup.bind(this);
    }

    componentDidMount(){
        if(AuthenticationService.isUserLoggedIn())
            UserService.getCurrentUserRole().then(res => {
                this.setState({currentRole: res.data});
            });
    }


    redirectStudents(){
        this.props.history.push("/students");
    }

    redirectAddStudent(){
        this.props.history.push("/add-student/-1");
    }

    redirectGroups(){
        this.props.history.push("/groups");
    }

    redirectAddGroup(){
        this.props.history.push("/add-group/-1");
    }

    redirectJournal(){
        this.props.history.push("/journals");
    }

    createAddStudentButton(){
        if(AuthenticationService.isUserLoggedIn() && this.state.currentRole == 'Admin')
            return <div className="mb-3"><button id="menuButton" onClick={this.redirectAddStudent}>Создать обучающегося</button></div>
    }

    createAddGroupButton(){
        if(AuthenticationService.isUserLoggedIn()  && this.state.currentRole == 'Admin')
            return <div className="mb-3"><button id="menuButton" onClick={this.redirectAddGroup}>Создать группу</button></div>;
    }

    render() {
        return (
            <div>
               <div className="my-5 px-4 py-3" id="menuContent">
                   {AuthenticationService.isUserLoggedIn()?<div className="mb-3"><button id="menuButton" onClick={this.redirectJournal}>Журналы</button></div>:<></>}
                   {AuthenticationService.isUserLoggedIn()?<div className="mb-3"><button id="menuButton" onClick={this.redirectStudents}>Обучающиеся</button></div>:<></>}
                   {AuthenticationService.isUserLoggedIn()?<div className="mb-3"><button id="menuButton" onClick={this.redirectGroups}>Группы</button></div>:<></>}
                   {this.createAddStudentButton()}
                   {this.createAddGroupButton()}
                   <div className="border border-success bg-success">«Электронный дневник и журнал» — сервис, позволяющий участникам образовательного процесса получать информацию об учебных расписаниях, текущих и итоговых отметках и домашних заданиях в режиме онлайн.</div>
                   <div className="border border-success bg-success pt-3">Для получения доступа к журналу свяжитесь со своим куратором/классным руководителем</div>
               </div>
            </div>
        );
    }
}


export default MenuComponent;