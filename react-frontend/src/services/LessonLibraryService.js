import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const API_URL = "http://localhost:8080/api/lessonLibraries";

class LessonLibraryService{

    getLessonLibraries(){
        return axios.get(API_URL, AuthenticationService.getConfig());
    }

    getLessonLibraryById(id){
        return axios.get(API_URL + "/" + id, AuthenticationService.getConfig());
    }

    getLessonLibraryByUserId(userId){
        return axios.get(API_URL + "/byUser/" + userId, AuthenticationService.getConfig());
    }

    saveLessonLibrary(LessonLibrary){
        return axios.post(API_URL, LessonLibrary, AuthenticationService.getConfig());
    }

    updateLessonLibrary(lessonLibraryId, newLessonLibrary){
        return axios.put(API_URL + "/" + lessonLibraryId, newLessonLibrary, AuthenticationService.getConfig());
    }

    deleteLesson(id){
        return axios.delete(API_URL + "/" + id, AuthenticationService.getConfig());
    }

    getLessonLibraryNameList(lessonLibraries){
        let names = [];
        if(lessonLibraries[0] != null)
            names.push(lessonLibraries[0].name);
        lessonLibraries.map(lessonLibrary => {
            names.map(name => {
                if(lessonLibrary.name.includes(name) == false)
                    names.push(lessonLibrary.name);
            });
        });
        return names;
    }
}

export default new LessonLibraryService();