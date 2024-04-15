import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const LESSON_API_BASE_URL = "http://localhost:8080/api/lessons"


class LessonService{
    getLessons(){
        return axios.get(LESSON_API_BASE_URL, AuthenticationService.getConfig());
    }

    getLessonById(lessonId){
        return axios.get(LESSON_API_BASE_URL + "/" + lessonId, AuthenticationService.getConfig());
    }

    createLesson(lesson){
        return axios.post(LESSON_API_BASE_URL, lesson, AuthenticationService.getConfig());
    }

    updateLesson(lesson, lessonId){
        return axios.put(LESSON_API_BASE_URL + "/" + lessonId, lesson, AuthenticationService.getConfig());
    }

    deleteLesson(lessonId){
        return axios.delete(LESSON_API_BASE_URL + "/" + lessonId, AuthenticationService.getConfig());
    }
    
}

export default new LessonService();