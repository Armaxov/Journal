import React, { Component } from 'react'
import GroupService from '../services/GroupService'
import JournalService from '../services/JournalService';
import StudentService from '../services/StudentService';
import MarkService from '../services/MarkService';
import GroupTableComponent from './GroupTableComponent';

export default class StatisticComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            journals: [],
            stats: []
        }

    }

    componentDidMount(){
        GroupService.getGroups().then(res => {
            this.setState({groups: res.data});
        })
        JournalService.getJournals().then(res => {
            this.setState({journals: res.data});
        })
    }

    render() {
        return (
        <div>
            <table border="1" style={{marginTop:'3%'}}>
                <thead>
                    <tr>
                        <td>Куратор</td>
                        <td>Группа</td>
                        <td>Месяц</td>
                        <td>Общая успеваемость</td>
                        <td>Качественная успеваемость</td>
                        <td>Средний балл</td>
                        <td>Посещаемость</td>
                        <td>Количество долгов</td>
                    </tr>
                </thead>
                    <tbody>
                        {this.state.journals.map(journal => 
                            <GroupTableComponent journal={journal}></GroupTableComponent>
                        )}
                    </tbody>
            </table>
        </div>
        )
    }
}
