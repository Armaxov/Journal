import React, { Component } from 'react';
import LessonLibraryService from '../services/LessonLibraryService';
import UserService from '../services/UserService';

class UsersListComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            usernames: []
        }
    }
    componentDidMount(){
        UserService.getUsernameList().then(res => {
            this.setState({usernames: res.data});
        });
        UserService.getRoles().then(res => {
            this.setState({roleList: res.data});
        });
    }

    deleteUser(event, username){
        event.preventDefault();
        UserService.getIdByUsername(username).then(res => {
                LessonLibraryService.getLessonLibraryByUserId(res.data).then(res2 => {
                    let lessonLibraries = res2.data;
                    lessonLibraries.map(lessonLibrary => {
                        LessonLibraryService.deleteLesson(lessonLibrary.id);
                    });
                    

                    UserService.removeUser(username).then(() => {
                        window.location.reload();
                    });
                });
                
                
        });
    }

    updateUser(event, username){
        event.preventDefault();
        UserService.getIdByUsername(username).then(res => {
            window.open("/add-user/" + res.data);
        })
    }


    render() {
        return (
            <div>
                <h2 className="text-center">Список пользователей</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <td>Имя</td>
                                <td>Действия</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.usernames.map(username =>
                                <tr key={username}>
                                    <td>{username}</td>
                                    <td><button onClick={(e) => this.deleteUser(e, username)}>Удалить</button></td>
                                    <td><button onClick={(e) => this.updateUser(e, username)}>Изменить</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UsersListComponent;