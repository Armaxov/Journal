import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import GroupService from '../services/GroupService';
import UserService from '../services/UserService';

class GroupListComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            groups:[],
            isHaveFullAccess: false
        }
        this.addGroup= this.addGroup.bind(this);
        this.editGroup= this.editGroup.bind(this);
    }


    componentDidMount(){
        GroupService.getGroups().then(res => {
            this.setState({groups: res.data});
        });

        UserService.isHaveAdminAccess().then(res => {
            this.setState({isHaveFullAccess: res});
        })
    }


    addGroup(){
        this.props.history.push("/add-group/-1");
    }

    editGroup(id){
        if(this.state.isHaveFullAccess)
            this.props.history.push(`/add-group/${id}`);
    }


    createGroupLink(){
        if(this.state.isHaveFullAccess)
            return <div className="py-3"><button  onClick={this.addGroup}>Добавить группу</button></div>;
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Список групп</h2>
                <div className="row">
                    {this.createGroupLink()}
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <td>Группа</td>
                                <td>Год поступления</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.groups.map(
                                    group =>
                                    <tr key = {group.id} style = {{cursor:"pointer"}} onClick={this.editGroup.bind(this, group.id)}>
                                        <td>{group.groupName}</td>
                                        <td>{group.groupYear}</td>
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

export default GroupListComponent;