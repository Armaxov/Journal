import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import GroupService from '../services/GroupService';
import StudentService from '../services/StudentService';
import UserService from '../services/UserService';

class StudentListComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            students:[],
            groups:[],
            isHaveFullAccess: false,
            sortedName: '',
            sortedLastName:'',
            sortedStudents: []
        }
        this.addStudent= this.addStudent.bind(this);
        this.editStudent= this.editStudent.bind(this);
        this.createStudentLink = this.createStudentLink.bind(this);
        this.setSortedLastNameHandler = this.setSortedLastNameHandler.bind(this);
        this.setSortedNameHandler = this.setSortedNameHandler.bind(this);
    }

    componentDidMount(){
        StudentService.getStudents().then((res) => {
            this.setState({students: res.data});
            this.state.students.sort((a, b) => (a.firstName > b.firstName)? 1 : -1);
            this.setState({sortedStudents: this.state.students});
        });

        GroupService.getGroups().then(res => {
            this.setState({groups: res.data});
        });

        UserService.isHaveAdminAccess().then(res => {
            this.setState({isHaveFullAccess: res});
        });

        
    }


    addStudent(){
        this.props.history.push("/add-student/-1");
    }

    editStudent(id){
        if(this.state.isHaveFullAccess)
            this.props.history.push(`/add-student/${id}`);
    }

    getGroupNameById(id){
        let currentGroup = '';
        this.state.groups.forEach((group) => {
            if(group.id == id){
                currentGroup = group.groupName;
            }
        });
        return currentGroup;
    }

    createStudentLink(){
        if(this.state.isHaveFullAccess)
            return <div className="py-3"><button  onClick={this.addStudent}>Добавить обучающегося</button></div>;
    }

    sortListByOption = e =>{
        switch(e.target.value){
            case 'name':
                this.state.students.sort((a, b) => (a.firstName > b.firstName)? 1 : -1);
                this.setState({});
            break;
            case 'lastName':
                this.state.students.sort((a, b) => (a.lastName > b.lastName)? 1 : -1);
                this.setState({});
            break;
            case 'group':
                this.state.students.sort((a, b) => (a.groupId > b.groupId)? 1 : (a.groupId == b.groupId)? 0: -1);
                this.setState({});
            break;
        }
    }

    setSortedNameHandler(event){
        this.setState({sortedName: event.target.value});
    }

    setSortedLastNameHandler(event){
        this.setState({sortedLastName: event.target.value});
    }

    getSortedStudents(){
        let sortedStudents = [];
        this.state.students.map(student => {
            if(student.firstName.includes(this.state.sortedName) 
            && student.lastName.includes(this.state.sortedLastName)){
                sortedStudents.push(student);
            }
        });
        return sortedStudents;
    }

    render() {
        return (
            <div>
                <h4>Поиск и сортировка</h4>
                <div>
                    <input onChange={(e) => {this.setSortedNameHandler(e)}} value = {this.state.sortedName} placeholder="Имя"></input>
                    <input onChange={(e) => {this.setSortedLastNameHandler(e)}} className="m-2" value = {this.state.sortedLastName} placeholder="Фамилия"></input>
                    <select onChange={this.sortListByOption}>
                        <option value="name">по имени</option>
                        <option value="lastName">по фаимлии</option>
                        <option value="group">по группе</option>
                    </select>
                </div>

                <h2 className="text-center">Список обучающихся</h2>
                <div className="row">
                    
                    {this.createStudentLink()}
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <td>Имя</td>
                                <td>Фамилия</td>
                                <td>Группа</td>
                            </tr>
                        </thead>

                        <tbody>
                            {(this.state.sortedName.replace(' ', '').length == 0 && 
                            this.state.sortedLastName.replace(' ', '').length == 0)?
                                this.state.students.map(
                                    student =>
                                    <tr key = {student.id} style = {{cursor:"pointer"}} onClick={this.editStudent.bind(this, student.id)}>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{this.getGroupNameById(student.groupId)}</td>
                                    </tr>
                                ):
                                    this.getSortedStudents().map(
                                        student =>
                                            <tr key = {student.id} style = {{cursor:"pointer"}} onClick={this.editStudent.bind(this, student.id)}>
                                                <td>{student.firstName}</td>
                                                <td>{student.lastName}</td>
                                                <td>{this.getGroupNameById(student.groupId)}</td>
                                            </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default StudentListComponent;