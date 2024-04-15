import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const API_URL = "http://localhost:8080/api/users";

class UserService{
    
    getUsernameList(){
        return axios.get(API_URL + "/usernames", AuthenticationService.getConfig());
    }

    getIdByUsername(username){
        return axios.get(API_URL + "/usernames/" + username, AuthenticationService.getConfig());
    }

    getUsernameById(id){
        return axios.get(API_URL + "/" + id, AuthenticationService.getConfig());
    }

    createUser(user){
        return axios.post(API_URL, user, AuthenticationService.getConfig());
    }

    updateUser(username, newUser){
        return axios.put(API_URL + "/usernames/" + username, newUser, AuthenticationService.getConfig());
    }

    removeUser(username){
        return axios.delete(API_URL + "/usernames/" + username, AuthenticationService.getConfig());
    }

    getRoles(){
        return axios.get(API_URL + "/roles", AuthenticationService.getConfig());
    }

    getOpenedStudent(userId){
        return axios.get(API_URL + "/openedStudent/" + userId, AuthenticationService.getConfig());
    }

    getRoleById(userId){
        return axios.get(API_URL + "/roles/" + userId, AuthenticationService.getConfig());
    }

    async getCurrentUserRole(){
        let username = '';
        let getUsername = await AuthenticationService.getUsernameByToken();
        username = getUsername.data;
        let getId = await this.getIdByUsername(username);
        return axios.get(API_URL + "/roles/" + getId.data, AuthenticationService.getConfig());
    }

    async isHaveAdminAccess(){
        if(AuthenticationService.isUserLoggedIn()){
            let currentUserRole = '';
            currentUserRole = (await this.getCurrentUserRole()).data;
            if(currentUserRole == "Admin")
                return true;
            else 
                return false;
        }
        else 
            return false;
    }
}

export default new UserService();