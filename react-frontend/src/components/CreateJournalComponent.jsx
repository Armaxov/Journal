import React, { Component } from 'react';
import GroupService from '../services/GroupService';
import JournalService from '../services/JournalService';
import LessonLibraryService from '../services/LessonLibraryService';
import UserService from '../services/UserService';

class CreateJournalComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            usersnames: [],
            groups: [],
            year: '',
            curatorName: '',
            mouth: '',
            groupId: '',
            isOpen: true,
            lessonLibraryName: '',
            currentUsername: '',
            currentUserId: '',
            incorrectYear: false,
            incorrectName: false,
            currentUserRole: '',
            lessonLibraryNameList: [],
            currentLessonLibraries: [],
            mouthList: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        }

        this.changeCuratorNameHandler = this.changeCuratorNameHandler.bind(this);
        this.changeYearHandler = this.changeYearHandler.bind(this);
        this.changeMouthHandler = this.changeMouthHandler.bind(this);
        this.changeCurrentUsernameHandler = this.changeCurrentUsernameHandler.bind(this);
        this.createJournal = this.createJournal.bind(this);
        this.changeCurrentGroupHandler = this.changeCurrentGroupHandler.bind(this);
        this.changeLessonLibraryNameHandler = this.changeLessonLibraryNameHandler.bind(this);

    }

    componentDidMount(){
        
        if(this.state.id != -1){
            JournalService.getJournalById(this.state.id).then(res => {
                this.setState({
                    curatorName: res.data.curatorName,
                    year: res.data.year,
                    mouth: res.data.mouth,
                    groupId: res.data.groupId,
                    currentUserId: res.data.userId,
                    isOpen: res.data.isOpen,
                    lessonLibraryName: res.data.lessonLibraryName
                });

                UserService.getUsernameById(this.state.currentUserId).then(res => {
                    this.setState({currentUsername: res.data});
                });

                LessonLibraryService.getLessonLibraryByUserId(this.state.currentUserId).then(res1 =>{
                    this.setState({currentLessonLibraries: res1.data});
                    this.setState({lessonLibraryNameList: LessonLibraryService.getLessonLibraryNameList(this.state.currentLessonLibraries)});
                });
            });
            
        }
        UserService.getUsernameList().then(res => {
            this.setState({usersnames: res.data})
        });
        GroupService.getGroups().then(res => {
            this.setState({groups: res.data});
        }).then( () =>{
            if(this.state.id == -1)
                this.setState({groupId: this.state.groups[0].id});
        });
        UserService.getCurrentUserRole().then(res => {
           this.setState({currentUserRole: res.data}); 
        });
        
    }

    getTitle(){
        if(this.state.id == -1){
            return <h3 className="text-center">Добавить новый журнал</h3>
        }
        else{
            return <h3 className="text-center">Обновить журнал</h3>
        } 
    }

    cancel(){
        this.props.history.push('/journals');
    }

    changeCuratorNameHandler = e =>{
        this.setState({curatorName: e.target.value});
    }

    changeMouthHandler = e =>{
        this.setState({mouth: e.target.value});
    }

    changeYearHandler = e =>{
        this.setState({year: e.target.value});
    }

    changeCurrentUsernameHandler = e => {
        this.setState({currentUsername: e.target.value});
    }

    changeCurrentGroupHandler = e => {
        let groupName = e.target.value;
        this.setState({groupName: groupName});
        this.state.groups.map(group => {
            if(group.groupName == groupName){
                this.setState({groupId: group.id});
            }
        });
        
    }

    createJournal = e => {
        e.preventDefault();
        if(this.state.groupId == '' && this.state.id == -1){
            this.setState({groupId: this.state.groups[0].id});
        }
        
        if(this.state.currentUsername == ''){
            this.setState({currentUsername: this.state.usersnames[0]});
        }

        if(this.state.name == ''){
            this.setState({incorrectName: true});
        }
        else{
            this.setState({incorrectName: false});
        }
        if(this.state.year == ''){
            this.setState({incorrectYear: true});
        }
        else{
            this.setState({incorrectYear: false});
        }
        
        let userId = '';
        UserService.getIdByUsername(this.state.currentUsername).then(res => {
            userId = res.data;
            let journal = {groupId: this.state.groupId, curatorName: this.state.curatorName, 
                year: this.state.year, userId: userId, mouth: this.state.mouth, isOpen: 1, lessonLibraryName: this.state.lessonLibraryName};
            if(this.state.id == -1)
                JournalService.createJournal(journal);
            else
                JournalService.updateJournal(journal, this.state.id);
            this.props.history.push("/journals");
            window.location.reload();
        });
    }

    showGroupSelect(){
        if(this.state.id == -1)
            return <div className="form-group">
            <label>Группа</label>
            <select name="group" className="form-control" onChange={this.changeCurrentGroupHandler}>
                {this.state.groups.map(group => 
                    <option key={group.id}>{group.groupName}</option>    
                )}
            </select>
            <label></label>
        </div>
    }

    changeLessonLibraryNameHandler = e =>{
        this.setState({lessonLibraryName: e.target.value});
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
                                    <div className="form-group">
                                        <label>Куратор</label>
                                        <input placeholder="Куратор" name="name" className="form-control"
                                        value={this.state.curatorName} onChange={this.changeCuratorNameHandler}/>
                                        <label></label>
                                    </div>

                                    <div className="form-group">
                                        <label>Год</label>
                                        <input placeholder="xxxx" name="year" className="form-control"
                                        value={this.state.year} onChange={this.changeYearHandler}/>
                                        <label></label>
                                    </div>
                                    <div>
                                        <label>Месяц</label>
                                        <select className="form-control" onChange={this.changeMouthHandler}>
                                            <option value={this.state.mouth}>{this.state.mouthList[this.state.mouth]}</option>
                                            {
                                                this.state.mouthList.map((_mouth, index) => 
                                                    <option key={index} value={index}>{_mouth}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Подключенный список тем</label>
                                        <select className="form-control" onChange={this.changeLessonLibraryNameHandler}>
                                            <option value={this.state.lessonLibraryName}>{this.state.lessonLibraryName}</option>
                                            {this.state.lessonLibraryNameList.map(name => 
                                                <option key={name} value={name}>{name}</option>    
                                            )}
                                            <option value="">Нет</option>
                                        </select>
                                        <label></label>
                                    </div>

                                    {this.showGroupSelect()}
                                    {this.state.currentUserRole == "Admin"?
                                    <div className="form-group">
                                        <label>Пользователь</label>
                                        <select name="user" className="form-control" onChange={this.changeCurrentUsernameHandler}>
                                            <option value={this.state.currentUsername}>{this.state.currentUsername}</option>
                                            {this.state.usersnames.map((username, index) => 
                                                <option key={index}>{username}</option>
                                            )}
                                        </select>
                                        <label></label>
                                    </div>
                                    :<></>}
                                    <button className="btn btn-success" onClick={this.createJournal}>Сохранить</button>
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

export default CreateJournalComponent;