import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const MARK_API_BASE_URL = "http://localhost:8080/api/marks"


class MarkService{
    getMarks(){
        return axios.get(MARK_API_BASE_URL, AuthenticationService.getConfig());
    }

    getMarkById(markId){
        return axios.get(MARK_API_BASE_URL + "/" + markId, AuthenticationService.getConfig());
    }

    getMarksByJournalId(journalId){
        return axios.get(MARK_API_BASE_URL + "/journal/" + journalId, AuthenticationService.getConfig());
    }

    createMark(mark){
        return axios.post(MARK_API_BASE_URL, mark, AuthenticationService.getConfig());
    }

    updateMark(mark, markId){
        return axios.put(MARK_API_BASE_URL + "/" + markId, mark, AuthenticationService.getConfig());
    }

    deleteMark(markId){
        console.log("deleted");
        return axios.delete(MARK_API_BASE_URL + "/" + markId, AuthenticationService.getConfig());
    }
    
}

export default new MarkService();