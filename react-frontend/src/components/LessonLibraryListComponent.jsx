import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import LessonLibraryService from '../services/LessonLibraryService';
import UserService from '../services/UserService';

class LessonLibraryListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            lessonLibraries: [],
            currentLessonName: ''
        }
        this.changeLessonNameHandler = this.changeLessonNameHandler.bind(this);
        this.addLessonLibraryHandler = this.addLessonLibraryHandler.bind(this);
    }

    componentDidMount(){
        AuthenticationService.getUsernameByToken().then(res => {
            UserService.getIdByUsername(res.data).then(res1 => {
                this.setState({userId: res1.data});
                
                this.updateLessonLibraries();
            });
        });
    }

    updateLessonLibraries(){
        LessonLibraryService.getLessonLibraryByUserId(this.state.userId).then(res2 => {
            this.setState({lessonLibraries: res2.data});
        });
    }

    addLessonLibraryHandler(){
        if(this.state.currentLessonName != ''){
            let lessonDescription = {name: this.state.currentLessonName, 
                description: '', userId: this.state.userId}
            LessonLibraryService.saveLessonLibrary(lessonDescription).then(() => {
                this.updateLessonLibraries();
            });
        }
    }

    changeLessonNameHandler = e =>{
        this.setState({currentLessonName: e.target.value});
    }

    sortLessonLibraries(){
        let sortedLessonLibraries = [];

        this.state.lessonLibraries.map(lessonLibrary => {
            if(lessonLibrary.name == this.state.currentLessonName)
                sortedLessonLibraries.push(lessonLibrary);
        });
        return sortedLessonLibraries;
    }

    getLessonLibraryNameList(){
        let names = [];
        if(this.state.lessonLibraries[0] != null)
            names.push(this.state.lessonLibraries[0].name);
        this.state.lessonLibraries.map(lessonLibrary => {
            names.map(name => {
                if(lessonLibrary.name.includes(name) == false)
                    names.push(lessonLibrary.name);
            });
        });
        return names;
    }

    changeDescriptionHandler(e, lessonLibrary){
        lessonLibrary.description = e.target.value;
        LessonLibraryService.updateLessonLibrary(lessonLibrary.id, lessonLibrary);
        this.setState({});
    }

    changeNameHandler(e, lessonLibrary){
        lessonLibrary.name = e.target.value;
        LessonLibraryService.updateLessonLibrary(lessonLibrary.id, lessonLibrary);
        this.setState({});
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Список тем</h2>

                <h4>Найти или ввести/создать</h4>
                <label>Предмет</label>
                <select className="form-control" onChange={this.changeLessonNameHandler}>
                    <option></option>
                    {this.getLessonLibraryNameList().map(name => 
                        <option key={name}>{name}</option>
                    )}
                </select>
                <label></label>
                <label>Предмет</label>
                <input placeholder="Предмет" className="form-control" onChange={this.changeLessonNameHandler} value={this.state.currentLessonName}></input>
                <label></label>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <td>Предмет</td>
                                <td>Описание</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.sortLessonLibraries().map(lessonLibrary => 
                                    <tr key={lessonLibrary.id}>
                                        <td>
                                            <select onChange={(e) => this.changeNameHandler(e, lessonLibrary)}>
                                                <option value={lessonLibrary.name}>{lessonLibrary.name}</option>
                                                {this.getLessonLibraryNameList().map(nameFromList => 
                                                    !nameFromList.includes(lessonLibrary.name)?<option key={nameFromList}>{nameFromList}</option>:''
                                                )}
                                            </select>
                                        </td>
                                        <td><input onChange={(e) => this.changeDescriptionHandler(e, lessonLibrary)} value={lessonLibrary.description}></input></td>
                                    </tr>
                                )
                            }
                            <tr>
                                <td onClick={this.addLessonLibraryHandler}>Добавить тему</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default LessonLibraryListComponent;