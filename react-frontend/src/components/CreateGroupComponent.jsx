import React, { Component } from 'react';
import GroupService from '../services/GroupService';

class CreateGroupComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupId:this.props.match.params.id,
            groupName:'',
            year:'',
            incorrectGroupYear: false,
            incorrectGroupName: false,
            incorrectData: false
        }

        this.saveOrUpdateGroup = this.saveOrUpdateGroup.bind(this);
        this.changeGroupHandler = this.changeGroupHandler.bind(this);
        this.changeYearHandler = this.changeYearHandler.bind(this);
        this.incorrectGroupNameMessage = this.incorrectGroupNameMessage.bind(this);
        this.incorrectGroupYearMessage = this.incorrectGroupYearMessage.bind(this);
        this.incorrectDataMessage = this.incorrectDataMessage.bind(this);
    }

    componentDidMount(){
        let id = this.state.groupId;
        if(id == -1){
            return
        }
        else{
            GroupService.getGroupById(id).then((res) => {
                let group = res.data;
                this.setState({
                    groupName: group.groupName,
                    year: group.groupYear
                });
            });

        }
        
    }


    getTitle(){
        if(this.state.groupId == -1){
            return <h3 className="text-center">Добавить новую группу</h3>
        }
        else{
            return <h3 className="text-center">Изменить группу</h3>
        } 
    }

    changeGroupHandler = (event) =>{
        let groupName = event.target.value;
        this.setState({groupName: groupName});
        if(groupName.length == 0){
            this.setState({incorrectGroupName: true});
        }
        else{
            this.setState({incorrectGroupName: false});
        }
    }

    
    changeYearHandler = (event) =>{
        let groupYear = event.target.value;
        this.setState({year: groupYear});
        if(groupYear.length == 0 || isNaN(groupYear)){
            this.setState({incorrectGroupYear: true});
        }
        else{
            this.setState({incorrectGroupYear: false});
        }
    }

    cancel(){
        this.props.history.push('/groups');
    }

    saveOrUpdateGroup = e =>{
        e.preventDefault();
        if(this.state.groupName == '' || this.state.year == ''){
            this.setState({incorrectData: true});
            return;
        }
        let group = { 
            groupName: this.state.groupName,
            groupYear: this.state.year
        }
        if(this.state.groupId == -1){
            GroupService.createGroup(group).then(() =>{
                this.props.history.push("/groups");
            });
        }
        else{
            GroupService.updateGroup(group, this.state.groupId).then(() => {
                this.props.history.push("/groups");
            });
        }
    
    }


    deleteGroup(){
        this.props.history.push("/groups");
        GroupService.deleteGroup(this.state.groupId);
        window.location.reload();
    }

    getDeleteButton(){
        if(this.state.groupId != -1){
            return  <button style = {{marginLeft:"10px"}} onClick={() => {this.deleteGroup()}} className="btn btn-danger">Удалить</button>
        }
    }


    incorrectGroupYearMessage(){
        if(this.state.incorrectGroupYear)
            return <div className="form-group"  style={{backgroundColor:"RGBA(250, 0, 0,.7)", borderRadius:6}}><label style={{marginLeft:12}}>Некорректный год группы</label></div>
    }

    incorrectGroupNameMessage(){
        if(this.state.incorrectGroupName)
            return <div className="form-group"  style={{backgroundColor:"RGBA(250, 0, 0,.7)", borderRadius:6}}><label style={{marginLeft:12}}>Некорректное название группы</label></div>
    }

    incorrectDataMessage(){
        if(this.state.incorrectData)
        return <div className="form-group"  style={{backgroundColor:"RGBA(250, 0, 0,.7)", borderRadius:6}}><label style={{marginLeft:12}}>Некорректное название или год группы</label></div>
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
                                        <label>Группа</label>
                                        <input placeholder="Группа" name="group" className="form-control"
                                        value={this.state.groupName} onChange={this.changeGroupHandler}/>
                                        <label></label>
                                        {this.incorrectGroupNameMessage()}
                                    </div>

                                    <div className="form-group">
                                        <label>Год поступления</label>
                                        <input placeholder="" name="year" className="form-control"
                                        value={this.state.year} onChange={this.changeYearHandler}/>
                                        <label></label>
                                        {this.incorrectGroupYearMessage()}
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateGroup}>Сохранить</button>
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

export default CreateGroupComponent;