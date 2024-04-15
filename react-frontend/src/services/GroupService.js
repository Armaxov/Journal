import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const GROUP_API_BASE_URL = "http://localhost:8080/api/groups"


class GroupService{
    getGroups(){
        return axios.get(GROUP_API_BASE_URL, AuthenticationService.getConfig());
    }

    getGroupById(groupId){
        return axios.get(GROUP_API_BASE_URL + "/" + groupId, AuthenticationService.getConfig());
    }

    createGroup(group){
        return axios.post(GROUP_API_BASE_URL, group, AuthenticationService.getConfig());
    }

    updateGroup(group, groupId){
        return axios.put(GROUP_API_BASE_URL + "/" + groupId, group, AuthenticationService.getConfig());
    }

    deleteGroup(groupId){
        return axios.delete(GROUP_API_BASE_URL + "/" + groupId, AuthenticationService.getConfig());
    }
}

export default new GroupService();