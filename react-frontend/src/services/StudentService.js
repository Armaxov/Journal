import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const STUDENT_API_BASE_URL = "http://localhost:8080/api/students"


class StudentService{
    getStudents(){
        return axios.get(STUDENT_API_BASE_URL, AuthenticationService.getConfig());
    }

    getStudentsById(studentId){
        return axios.get(STUDENT_API_BASE_URL + "/" + studentId, AuthenticationService.getConfig());
    }

    createStudent(student){
        return axios.post(STUDENT_API_BASE_URL, student, AuthenticationService.getConfig());
    }

    updateStudent(student, studentId){
        return axios.put(STUDENT_API_BASE_URL + "/" + studentId, student, AuthenticationService.getConfig());
    }

    deleteStudent(studentId){
        return axios.delete(STUDENT_API_BASE_URL + "/" + studentId, AuthenticationService.getConfig());
    }

    getStudentsByGroupId(GroupId){
        return axios.get(STUDENT_API_BASE_URL + "/group/" + GroupId, AuthenticationService.getConfig());
    }

}

export default new StudentService();