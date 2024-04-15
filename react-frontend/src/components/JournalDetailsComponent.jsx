import React, { Component } from 'react';
import JournalService from '../services/JournalService';
import GroupService from '../services/GroupService';
import MarkService from '../services/MarkService';
import LessonService from '../services/LessonService';
import StudentService from '../services/StudentService';
import AuthenticationService from '../services/AuthenticationService';
import UserService from '../services/UserService';
import LessonLibraryService from '../services/LessonLibraryService';


class JournalDetailsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            journal:[],
            groups:[],
            marks:[],
            lessons:[],
            students:[],
            sortedStudents:[],
            sortedGroup: '',
            journalUserId: '',
            currentUserId: '',
            currentRole: '',
            currentUserOpenedStudents: [],
            openedStudentList: [],
            lessonLibraries: [],
            sortedLessonLibraryes: []
        }
        this.changeMarkHandler = this.changeMarkHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.addMarkHandler = this.addMarkHandler.bind(this);
        this.addLessonHandler = this.addLessonHandler.bind(this);
        this.deleteButtonHanlder = this.deleteButtonHanlder.bind(this);
        this.closeJournal = this.closeJournal.bind(this);
    }

    async componentDidMount(){
        GroupService.getGroups().then((res) => {
            this.setState({groups: res.data});
        });
        MarkService.getMarks().then((res) => {
            this.setState({marks: res.data});
        });
        LessonService.getLessons().then((res) => {
            this.setState({lessons: res.data});
        });
        StudentService.getStudents().then((res) => {
            this.setState({students: res.data});
        });
        let getJournalRequest = await JournalService.getJournalById(this.state.id);
        this.setState({journal: getJournalRequest.data, journalUserId: getJournalRequest.data.userId});
        LessonLibraryService.getLessonLibraryByUserId(this.state.journalUserId).then(res => {
            this.setState({lessonLibraries: res.data});
            this.state.lessonLibraries.map(lessonLibrary => {
                if(lessonLibrary.name == this.state.journal.lessonLibraryName)
                    this.state.sortedLessonLibraryes.push(lessonLibrary);
            });
        });

        if(AuthenticationService.isUserLoggedIn()){
            let username = '';
            let getUsernameByTokenRequest = await AuthenticationService.getUsernameByToken();
            username = getUsernameByTokenRequest.data;
            let userId = '';
            let getIdByUsernamerRequest = await UserService.getIdByUsername(username);
            userId = getIdByUsernamerRequest.data;
            this.setState({currentUserId: userId});
        }

        UserService.getCurrentUserRole().then(res => {
            this.setState({currentRole: res.data})
        });
    }

    isHaveFullAccess(userId){
        if(userId == '')
            return false;
                if(userId == this.state.journalUserId || this.state.currentRole == "Admin")
            return true;
        else 
            return false;
        
    }

    getLessonByJournal(){
        let result = [];
        this.state.lessons.map(lesson => {
            if(lesson.journalId == this.state.id){
                result.push(lesson);
            }
        });
        return result;
    }

    getMarkByJournal(markId, studentId){
        let result = [];
        this.state.marks.map(mark => {
            if(mark.journalId == markId && mark.studentId == studentId)
                result.push(mark);
        });
        return result;
    }

    getAllJournalMarks(){
        let result = [];
        this.state.marks.map(mark => {
            if(mark.journalId == this.id)
                result.push(mark);
        });
        return result;
    }

    getGroupById(journalId){
        let result = ''
        this.state.groups.map(group => {
            if(group.id == journalId)
                result = group;
        });
        this.state.sortedGroup = result;
        return result;
    }

    getStudentsNameByGroup(group){
        let result = [];
        this.state.students.map(student => {
            if(student.groupId == group.id)
                result.push(student);
        });
        this.state.sortedStudents = result;
        return result;
    }

    changeMarkHandler(event, mark){
        let newMark = event.target.value;
        if(this.isHaveFullAccess(this.state.currentUserId)){
            if(isNaN(newMark) == false || newMark == "н" || newMark == "нб"){
                mark.mark = newMark;
                if(isNaN(mark.mark) == false && mark.mark != ''){
                    if(mark.mark > 5)
                        mark.mark = 5;
                    if(mark.mark < 1)
                        mark.mark = 1;
                }
                MarkService.updateMark(mark, mark.id);
                this.setState({});
            }
        }
    }

    changeDescriptionHandler(event, lesson){
        if(this.isHaveFullAccess(this.state.currentUserId)){
            lesson.description = event.target.value;
            LessonService.updateLesson(lesson, lesson.id);
            this.setState({});
        }
    }

    addMarkHandler(student){
        if(this.isHaveFullAccess(this.state.currentUserId)){
            let mark = {studentId: student.id, lessonId: '', journalId: this.state.id, mark:''};
            MarkService.createMark(mark);
            this.setState({});
            document.location.reload();
        }
    }

    addLessonHandler(){
        if(this.isHaveFullAccess(this.state.currentUserId)){
            let lesson = {description: '', date: '', journalId: this.state.id};
            LessonService.createLesson(lesson).then(res => {
                this.state.sortedStudents.map(student => {
                    let mark = {studentId: student.id, lessonId: res.data.id, journalId: this.state.id, mark:''};
                    MarkService.createMark(mark);
                });
                this.setState({});
                document.location.reload();
            });
        }
    }

    deleteButtonHanlder(){
        if(this.isHaveFullAccess(this.state.currentUserId)){
            if(window.confirm("Вы действительно хотите удалить журнал?")){
                this.getAllJournalMarks().map(mark => {
                    MarkService.deleteMark(mark.id);
                });
                this.getLessonByJournal(this.state.id).map(lesson =>{
                    LessonService.deleteLesson(lesson.id);
                });
                JournalService.deleteJournal(this.state.id);
            }
            this.props.history.push("/journals");
            window.location.reload();
        }
    }

    showRedactButton(){
        if(AuthenticationService.isUserLoggedIn() && this.state.id != -1 && this.isHaveFullAccess(this.state.currentUserId)){
            return <button onClick={(e) => this.editJournal(this.state.id)}>Изменить данные журнала</button>
        }
    }

    showDeleteButton(){
        if(this.isHaveFullAccess(this.state.currentUserId))
            return <button className="btn btn-danger" onClick={this.deleteButtonHanlder}>Удалить журнал</button>
    }

    editJournal(id){
        this.props.history.push(`add-journal/${id}`);
    }

    closeJournal(){
        this.state.journal.isOpen = false;
        JournalService.updateJournal(this.state.journal, this.state.id).then(() => {
            window.location.reload();
        });
    }

    showCloseJournalButton(){
        if(AuthenticationService.isUserLoggedIn() && this.state.id != -1 && this.isHaveFullAccess(this.state.currentUserId)){
            return <div><button onClick={this.closeJournal}>Закрыть журнал</button></div>
        }
    }

    deleteLessonButtonHnadler(lessonId){
        LessonService.deleteLesson(lessonId);
    }

    getOpenedStudents(){
        let sortedStudents = [];

        this.state.students.map(student => {
            this.state.currentUserOpenedStudents.map(openedStudent => {
                if(openedStudent.userId == this.state.currentUserId)
                    if(openedStudent.studentId == student.id)
                        sortedStudents.push(student);
            });
        });
        return sortedStudents;
    }

    render() {
        return (
            <div className="overflow-scroll">
                <h2 className="text-center">Список оценок</h2>
                <div className="py-3">
                    {this.state.journal.isOpen?this.showRedactButton():<div></div>}
                    <div className="py-1"></div>
                    {this.state.journal.isOpen?this.showCloseJournalButton():<div></div>}
                    <div className="py-1"></div>
                    {this.state.journal.isOpen?this.showDeleteButton():<div></div>}
                    {this.state.journal.isOpen?<div></div>:<h4 className="text-center">Журнал закрыт</h4>}
                    
                </div>
                <div>
                    <table className="table table-striped table-bordered table-responsive" style={{height:450}}>
                        <tbody>
                        <tr>
                            <td></td>
                            <td>Предмет</td>
                            { this.getLessonByJournal().length > 0?
                                this.getLessonByJournal().map(lesson => 
                                    <td key={lesson.id}>
                                    <select style={{width:'150px', height:'50px'}}  key={lesson.id} onChange={(e) => {this.changeDescriptionHandler(e, lesson)}}>
                                        <option key={lesson.id} value={lesson.id}>{lesson.description}</option>
                                        {this.getLessonByJournal().map(les => 
                                            <option key={les.id} value={les.id}>{les.description}</option>
                                        )}
                                        {
                                            this.state.sortedLessonLibraryes.map(lessonLibrary => 
                                                <option key={lessonLibrary.id} 
                                                    value={lessonLibrary.description}>{lessonLibrary.description}</option>    
                                            )
                                        }
                                    </select>
                                    
                                    </td>
                            )
                            :<></>}
                            {this.isHaveFullAccess(this.state.currentUserId)?<td onClick={this.addLessonHandler}>Добавить предмет</td>:<td></td>}
                        </tr>
                        <tr>
                            <td width="5%">№</td>
                            <td width="25%">ФИО</td>
                        </tr>
                        {
                            this.state.currentRole != "Guest"?
                                this.getStudentsNameByGroup(this.getGroupById(this.state.journal.groupId)).map((student, index) => 
                                    <tr key={student.id}>
                                        <td>{index + 1}</td>
                                        <td>{student.firstName + " " + student.lastName}</td>
                                        {
                                            this.getMarkByJournal(this.state.id, student.id).map(mark => 
                                                <td key={mark.id}><input style={{width:'30px'}}  value={mark.mark} onChange={(e) => {this.changeMarkHandler(e, mark)}}></input></td>)
                                        }
                                    </tr>
                                )
                            : this.state.openedStudentList.map((student, index) => 
                                <tr key={student.id}>
                                        <td>{index + 1}</td>
                                        <td>{student.firstName + " " + student.lastName}</td>
                                        {
                                            this.getMarkByJournal(this.state.id, student.id).map(mark => 
                                                <td key={mark.id}><input value={mark.mark} onChange={(e) => {this.changeMarkHandler(e, mark)}}></input></td>)
                                        }
                                    </tr>
                            )
                        }
                            
                        <tr>
                            
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2 className="text-center">Локальный список предметов</h2>

                    <div>
                        <table className="table table-striped table-bordered table-responsive" style={{height:450}}>
                            <tbody>
                                <tr>
                                    <td>Предмет</td>
                                    <td>Действия</td>
                                </tr>
                                {
                                    this.getLessonByJournal().map(lesson => 
                                        <tr key={lesson.id}>
                                            <td><input value={lesson.description} onChange={(e) => {this.changeDescriptionHandler(e, lesson)}}></input></td>
                                            <td><button onClick={() => {this.deleteLessonButtonHnadler(lesson.id)}}>Удалить предмет</button></td>
                                        </tr>    
                                    )
                                }
                                <tr>
                                {this.isHaveFullAccess(this.state.currentUserId)?<td onClick={this.addLessonHandler}>Добавить предмет</td>:<td></td>}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default JournalDetailsComponent;