import React, { Component } from 'react'
import GroupService from '../services/GroupService';
import StudentService from '../services/StudentService';
import UserService from "../services/UserService";

class CreateUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            username: '',
            passoword: '',
            role: '',
            rolesArray: [],
            openedStudentId: [],
            studentList: [],
            groups: [],
            roleName: '',
            openedStudentCount: 1,
            currendOpenedStudentIndex: -1
        }
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeRoleHandler = this.changeRoleHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.createOrUpdateUser = this.createOrUpdateUser.bind(this);
        this.changeOpenedStudentHandler = this.changeOpenedStudentHandler.bind(this);
        this.changeOpenedStudentCountHandler = this.changeOpenedStudentCountHandler.bind(this);
    }

    componentDidMount(){
        UserService.getRoles().then(res => {
            this.setState({rolesArray: res.data});
            this.setState({role: this.state.rolesArray[0].id});
        });
        StudentService.getStudents().then(res => {
            this.setState({studentList: res.data});
        });
        GroupService.getGroups().then(res => {
            this.setState({groups: res.data});
        });

        if(this.state.id != -1)
        {
            UserService.getUsernameById(this.state.id).then(res => {
            this.setState({username: res.data});
            })
            UserService.getRoleById(this.state.id).then(res => {
                this.setState({role: this.getRoleByName(res.data).id});
            })
        }
    }

    changePasswordHandler = e =>{
        this.setState({passoword: e.target.value});
    }

    changeUsernameHandler = e =>{
        this.setState({username: e.target.value});
    }

    changeRoleHandler = e =>{
        this.setState({role: e.target.value});
    }
    changeOpenedStudentHandler = e =>{
        if(this.state.openedStudentId.length == this.state.currendOpenedStudentIndex)
            this.state.openedStudentId[this.state.currendOpenedStudentIndex] = e.target.value;
        else 
            if(this.state.openedStudentId.length < this.state.currendOpenedStudentIndex)
                this.state.openedStudentId.push(e.target.value);
    }

    changeOpenedStudentCountHandler = e =>{
        this.setState({openedStudentCount: e.target.value});
    }

    cancel(){
        this.props.history.push('/students');
    }

    getRoleById(roleId){
        let findedRole = [];
        this.state.rolesArray.map(role => {
            if(role.id == roleId)
                findedRole = role;
        });
        return findedRole;
    }

    getRoleByName(roleName){
        let findedRole = [];
        this.state.rolesArray.map(role => {
            if(role.role == roleName)
                findedRole = role;
        });
        return findedRole;
    }

    createOrUpdateUser = e =>{
        e.preventDefault();
        let user = {username: this.state.username, password:  this.state.passoword, 
            role: this.state.role};
            console.log(user);
        if(this.state.username != '' || this.state.passowrd != ''){
            if(this.state.id == '-1'){
                UserService.createUser(user).then(res => {
                    window.location.assign('/');
                });
            }
            else {
                UserService.updateUser(this.state.username, user);
            }
        }
    }

    getGroupById(groupId){
        let findedGroup = '';
        this.state.groups.map(group => {
            if(group.id == groupId){
                findedGroup = group;
            }
        });
        return findedGroup;
    }

    showOpenedStudents(){
        let result = [];

        for(let i = 0; i < this.state.openedStudentCount; i++)
            result.push(<div className="form-group">
            <label>Привязанный студент</label>
            <select name="openedStudent" className="form-control" 
            onChange={(e) => {this.state.currendOpenedStudentIndex = i; this.changeOpenedStudentHandler(e);}}>
                <option value="-1"></option>
                {this.state.studentList.map((student) => 
                    <option key={student.id} value={student.id}>
                         {student.firstName + " " + student.lastName + " " + this.getGroupById(student.groupId).groupName}
                    </option>
                )}
            </select>
            <label></label>
        </div>);
        return result;
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Имя пользователя</label>
                                        <input placeholder="Имя пользователя" name="username" className="form-control"
                                        value={this.state.username} onChange={this.changeUsernameHandler}/>
                                        <label></label>
                                    </div>

                                    <div className="form-group">
                                        <label>Пароль</label>
                                        <input placeholder="Пароль" name="password" className="form-control"
                                        value={this.state.password} onChange={this.changePasswordHandler}/>
                                        <label></label>
                                    </div>


                                    <div className="form-group">
                                        <label>Роль</label>
                                        <select name="role" className="form-control" 
                                        onChange={this.changeRoleHandler}>
                                            {this.state.rolesArray.map((role) => 
                                                 <option key={role.id} value={role.id} selected={role.id==this.state.role?"selected":""}>{role.role}</option>
                                            )}
                                        </select>
                                        <label></label>
                                    </div>

                                    {this.getRoleById(this.state.role).role == "Guest"?
                                    <div>
                                    <div className="form-group">
                                        <label>Количество привязанных студентов</label>
                                        <input onChange={this.changeOpenedStudentCountHandler} value={this.state.openedStudentCount} name ="openStudentCount" className="form-control" type="number"></input>
                                    </div>
                                    {this.showOpenedStudents()}
                                    </div>
                                    :<></>}

                                    <button className="btn btn-success" onClick={this.createOrUpdateUser}>Сохранить</button>
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
export default CreateUserComponent;