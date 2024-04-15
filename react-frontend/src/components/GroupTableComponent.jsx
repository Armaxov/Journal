import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StudentService from '../services/StudentService';
import MarkService from '../services/MarkService';

class GroupTableComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state ={
            journal: props.journal,
            students: [],
            marks: []
        }
    }

    componentDidMount() {
        StudentService.getStudentsByGroupId(this.state.journal.groupId).then(res => {
            this.setState({students: res.data});
        });
        MarkService.getMarksByJournalId(this.state.journal.id).then(res => {
            this.setState({marks: res.data});
        });

    }

    getMarksSum(){
        let sum = 0;
        this.state.marks.map(mark => {
            sum += +mark.mark;
        })
        return sum;
    }

    getAverageValue(){
        let AV = this.getMarksSum() / this.state.marks.length;
        return AV;
    }

    getMarksByStudent(studentId){
        let sortedMarks = [];
        this.state.marks.map(mark => {
            if(mark.studentId == studentId)
                sortedMarks.push(mark);
        });
        return sortedMarks;
    }

    //count * 100 / progressCount;
    //progressive - успевающие, superProgressive - 4 и 5
    calculateProgressGeneral(){
        let totalProgres = 0;
        let progressiveMarkSum = 0;
        this.state.students.map(student => {
            let localSum = 1;
            this.getMarksByStudent(student.id).map(mark => {
                if(mark.mark <= 2){localSum = 0;}
            });
            progressiveMarkSum += localSum;
        });
        totalProgres = progressiveMarkSum * 100 /  this.state.students.length;
        return totalProgres;
    }

    calculateSuperProgressGeneral(){
        let superTotalProgres = 0;
        let superProgressiveMarkSum = 0;
        this.state.students.map(student => {
            let localSuperSum = 1;
            this.getMarksByStudent(student.id).map(mark => {
                if(mark.mark <= 3){localSuperSum = 0;}
            });
            superProgressiveMarkSum += localSuperSum;
        });
        superTotalProgres = superProgressiveMarkSum * 100 /  this.state.students.length;
        return superTotalProgres;
    }

    render() {
        return (
            <tr>
                <td>{this.state.journal.curatorName}</td>
                <td>{this.state.journal.groupId}</td>
                <td>{this.state.journal.mouth}</td>
                <td>{this.calculateProgressGeneral()}</td>
                <td>{this.calculateSuperProgressGeneral()}</td>
                <td>{this.getAverageValue()}</td>
            </tr>
        );
    }
}

export default GroupTableComponent;