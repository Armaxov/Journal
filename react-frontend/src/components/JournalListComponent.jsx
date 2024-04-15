import React, { Component } from 'react';
import JournalService from '../services/JournalService';
import GroupService from '../services/GroupService';
import AuthenticationService from '../services/AuthenticationService';
import UserService from '../services/UserService';

class JournalListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            journals: [],
            groups: [],
            sortedJournals: [],
            userId: '',
            isHaveFullAccess: false,
            currentUserRole: '',
            mouthList: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        }

    }

    componentDidMount(){
        JournalService.getJournals().then((res) => {
            this.setState({journals: res.data});
        });

        GroupService.getGroups().then(res => {
            this.setState({groups: res.data});
        });

        if(AuthenticationService.isUserLoggedIn()){
            let username = '';
            let userId = '';
            let sortedJournals = [];
            AuthenticationService.getUsernameByToken().then(res => {
                username = res.data;
                UserService.getIdByUsername(username).then(res => {
                    userId = res.data;
                    this.setState({userId: userId});
                    this.state.journals.map(journal => {
                        if(journal.userId == userId)
                            sortedJournals.push(journal);
                    });
                    this.setState({sortedJournals: sortedJournals});
                });
            });
        }

        UserService.isHaveAdminAccess().then(res => {
            this.setState({isHaveFullAccess: res});

            UserService.getCurrentUserRole().then(res => {
            this.setState({currentUserRole: res.data})
            })
        });

        
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

    addJournal(){
        this.props.history.push("journals/add-journal/-1");
    }

    getJournalOfUserByGroup(group){
        let journals = []
        this.state.sortedJournals.map(journal => {
            if(journal.groupId == group.id && journal.userId == this.state.userId && journal.isOpen == true){
                journals.push(journal);
            }
        });
        return journals;
    }

    getJournalByGroup(group){
        let journals = []
        this.state.journals.map(journal => {
            if(journal.groupId == group.id && journal.isOpen == true){
                journals.push(journal);
            }
        });
        return journals;
    }

    getClosedJournalByGroup(group){
        let journals = []
        this.state.journals.map(journal => {
            if(journal.groupId == group.id && journal.isOpen == false){
                journals.push(journal);
            }
        });
        return journals;
    }

    showMyJournals(){
        if(AuthenticationService.isUserLoggedIn())
        return <div>
        {this.state.sortedJournals.length > 0?<h2 className="text-center">Мои журналы</h2>:<div></div>}
        {
                this.state.groups.map(group => 
            <div key = {group.id}>
                {this.getJournalOfUserByGroup(group).length > 0?<h3 className="text-center">{group.groupName}</h3>:<div></div>}
            
                {this.getJournalOfUserByGroup(group).length > 0?
                <div>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <td>Куратор</td>
                                    <td>Год</td>
                                    <td>Группа</td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                this.getJournalOfUserByGroup(group).map(journal =>
                                        <tr key = {journal.id} style = {{cursor:"pointer"}} onClick={ () => this.props.history.push(`/journals/${journal.id}`)}>
                                            <td>{journal.curatorName}</td>
                                            <td>{journal.year}</td>
                                            <td>{this.getGroupNameById(journal.groupId)}</td>
                                        </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                :<></>}
            </div>
            )}
            </div>;
    }


    showAllJournals(){
        return <div>
        <h2 className="text-center">Список журналов</h2>
        
        {
            this.state.groups.map(group => 
        <div key={group.id}>
            {this.getJournalByGroup(group).length > 0?<h3 className="text-center">{group.groupName}</h3>:<div></div>}
            {this.getJournalByGroup(group).length > 0?
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <td>Куратор</td>
                            <td>Год</td>
                            <td>Месяц</td>
                            <td>Группа</td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.getJournalByGroup(group).map(
                                journal =>
                                <tr key = {journal.id} style = {{cursor:"pointer"}} onClick={ () => this.props.history.push(`/journals/${journal.id}`)}>
                                    <td>{journal.curatorName}</td>
                                    <td>{journal.year}</td>
                                    <td>{this.state.mouthList[journal.mouth]}</td>
                                    <td>{this.getGroupNameById(journal.groupId)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>:<></>}

        </div>
        )}

        <h2 className="text-center">Закрытые журналы</h2>
        {
            this.state.groups.map(group => 
                <div key={group.id}>
                {this.getClosedJournalByGroup(group).length > 0?<h3 className="text-center">{group.groupName}</h3>:<div></div>}
                {this.getClosedJournalByGroup(group).length > 0?
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <td>Куратор</td>
                                <td>Год</td>
                                <td>Группа</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.getClosedJournalByGroup(group).map(
                                    journal =>
                                    <tr key = {journal.id} style = {{cursor:"pointer"}} onClick={ () => this.props.history.push(`/journals/${journal.id}`)}>
                                        <td>{journal.name}</td>
                                        <td>{journal.year}</td>
                                        <td>{this.getGroupNameById(journal.groupId)}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>:<div></div>}

        </div>
        )}




    </div>
    }

    render() {
        return (
            <div>
            {AuthenticationService.isUserLoggedIn()?<div className="py-3"><button onClick={(e) => this.addJournal()}>Создать журнал</button></div>:<div></div>}
                {this.showMyJournals()}
                {AuthenticationService.isUserLoggedIn() && this.state.currentUserRole == "Admin"?this.showAllJournals():<></>}
            </div>
        );
    }
}


export default JournalListComponent;