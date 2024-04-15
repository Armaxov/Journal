import React, { Component } from 'react';
import GroupService from '../services/GroupService';
import JournalService from '../services/JournalService';
import LessonService from '../services/LessonService';
import MarkService from '../services/MarkService';
import StudentService from '../services/StudentService';

class CreateStudentComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            groupId: '',
            groups: [],
            incorrectStudentFirstName: false,
            incorrectStudentLastName: false,
            incorrectData: false
        }


        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeGroupHandler = this.changeGroupHandler.bind(this);
        this.incorrectStudentFirstNameMessage = this.incorrectStudentFirstNameMessage.bind(this);
        this.incorrectStudentLastNameMessage = this.incorrectStudentLastNameMessage.bind(this);
        this.incorrectDataMessage = this.incorrectDataMessage.bind(this);
    }

    componentDidMount(){
        GroupService.getGroups().then(res => {
            this.setState({groups: res.data,
                groupId: res.data[0].id});
        });

        if(this.state.id == -1){
            return
        }
        else{
            StudentService.getStudentsById(this.state.id).then((res) => {
                let student = res.data;
                this.setState({
                    firstName: student.firstName,
                    lastName: student.lastName,
                    groupId: student.groupId
                });
            });

        }
        
    }

    saveOrUpdateStudent = e =>{
        e.preventDefault();
        if(this.state.firstName == '' || this.state.lastName == ''){
            this.setState({incorrectData: true});
            return;
        }
        let student = {
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            groupId: this.state.groupId}
        if(this.state.id == -1){
            StudentService.createStudent(student).then(res =>{
                this.createMarksForStudent(res.data).then(() => {
                    this.props.history.push("/students");
                });
            });
        }
        else{
            StudentService.updateStudent(student, this.state.id).then(res => {
                this.props.history.push("/students");
            });
        }
    }

    async createMarksForStudent(student){
        let journals = [];
        let group = [];
        let getJournalsRequest = await JournalService.getJournals();
        let getGroupByIdRequest = await GroupService.getGroupById(student.groupId);
        journals = getJournalsRequest.data;
        group = getGroupByIdRequest.data;

        let sortedJournals = [];
        journals.map(journal => {
            if(journal.groupId == group.id)
                sortedJournals.push(journal);
        });

        let lessons = [];
        let getLessonsRequest = await LessonService.getLessons();
        lessons = getLessonsRequest.data;
        lessons.map(lesson => {
            sortedJournals.map(journal =>{
                if(journal.id == lesson.journalId){
                    let mark = {studentId: student.id, lessonId: lesson.id, mark: "", journalId: journal.id}
                    MarkService.createMark(mark);
                }
            })
        })
    }

    changeFirstNameHandler = (event) =>{
        let firstName = event.target.value;
        this.setState({firstName: firstName});
        if(firstName.length == 0)
            this.setState({incorrectStudentFirstName: true});
        else
            this.setState({incorrectStudentFirstName: false});
    }

    changeLastNameHandler = (event) =>{
        let lastName = event.target.value;
        this.setState({lastName: lastName});
        if(lastName.length == 0)
            this.setState({incorrectStudentLastName: true});
        else
            this.setState({incorrectStudentLastName: false});
    }

    changeGroupHandler = (event) =>{
        let newId = this.getGroupIdByName(event.target.value);
        this.setState({groupId: newId});
    }

    getTitle(){
        if(this.state.id == -1){
            return <h3 className="text-center">Добавить нового обучающегося</h3>
        }
        else{
            return <h3 className="text-center">Обновить данные обучающегося</h3>
        } 
    }

    cancel(){
        this.props.history.push('/students');
    }

    getGroupIdByName(name){
        let currentGroup = '';
        this.state.groups.forEach((group) => {
            if(group.groupName == name){
                currentGroup = group.id;
            }
        });
        return currentGroup;
    }

    getGroupList(){
        let groups = [];
        this.state.groups.forEach((group) => {
            groups.push(<option key={group.id} value={group.groupName}>{group.groupName}</option>);
        });
        return groups;
    }

    deleteStudent(){
        let studentId = this.state.id;
        StudentService.deleteStudent(this.state.id);
        MarkService.getMarks().then(res => {
            res.data.map(mark => {
                if(mark.studentId == studentId){
                    MarkService.deleteMark(mark.id);
                }
            });
        });
        
    }

    getDeleteButton(){
        if(this.state.id != -1){
            return  <button style = {{marginLeft:"10px"}} onClick={() => {this.deleteStudent()}} className="btn btn-danger">Удалить</button>
        }
    }

    incorrectStudentFirstNameMessage(){
        if(this.state.incorrectStudentFirstName)
            return <div className="form-group"  style={{backgroundColor:"RGBA(250, 0, 0,.7)", borderRadius:6}}><label style={{marginLeft:12}}>Некорректное имя</label></div>
    }

    incorrectStudentLastNameMessage(){
        if(this.state.incorrectStudentLastName)
            return <div className="form-group"  style={{backgroundColor:"RGBA(250, 0, 0,.7)", borderRadius:6}}><label style={{marginLeft:12}}>Некорректная фамилия</label></div>
    }

    incorrectDataMessage(){
        if(this.state.incorrectData)
        return <div className="form-group"  style={{backgroundColor:"RGBA(250, 0, 0,.7)", borderRadius:6}}><label style={{marginLeft:12}}>Некорректная информация об обучающимся</label></div>
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form>
                                    {this.incorrectDataMessage()}
                                    <div className="form-group">
                                        <label>Имя</label>
                                        <input placeholder="Имя" name="firstName" className="form-control"
                                        value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        <label></label>
                                        {this.incorrectStudentFirstNameMessage()}
                                    </div>

                                    <div className="form-group">
                                        <label>Фамилия</label>
                                        <input placeholder="Фамилия" name="lastName" className="form-control"
                                        value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        <label></label>
                                        {this.incorrectStudentLastNameMessage()}
                                    </div>


                                    <div className="form-group">
                                        <label>Группа</label>
                                        <select name="group" className="form-control" onChange={this.changeGroupHandler}>
                                            {this.getGroupList()}
                                        </select>
                                        <label></label>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateStudent}>Сохранить</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Отмена</button>
                                    {this.getDeleteButton()}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateStudentComponent;