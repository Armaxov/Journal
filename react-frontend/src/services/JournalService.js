import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const JOURNAL_API_BASE_URL = "http://localhost:8080/api/journals"


class JournalService{
    getJournals(){
        return axios.get(JOURNAL_API_BASE_URL, AuthenticationService.getConfig());
    }

    getJournalById(journalId){
        return axios.get(JOURNAL_API_BASE_URL + "/" + journalId, AuthenticationService.getConfig());
    }

    createJournal(journal){
        return axios.post(JOURNAL_API_BASE_URL, journal, AuthenticationService.getConfig());
    }

    updateJournal(journal, journalId){
        return axios.put(JOURNAL_API_BASE_URL + "/" + journalId, journal, AuthenticationService.getConfig());
    }

    deleteJournal(journalId){
        return axios.delete(JOURNAL_API_BASE_URL + "/" + journalId, AuthenticationService.getConfig());
    }

}

export default new JournalService();