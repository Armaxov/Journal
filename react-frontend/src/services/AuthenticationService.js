import axios from 'axios';

const API_URL = 'http://localhost:8080/authenticate'

class AuthenticationService{

    login(username, password){
        return axios
      .post(API_URL, {
        username,
        password
      }).then(res => {
        localStorage.setItem("token", res.data.token);
        return res.data;
      }).catch(function(error){
            return error.response.status;
      });
    }

    checkToken(){
      return axios.get(API_URL, this.getConfig()).then(res => {
        return res.data;
      }).catch(function(error){
        if(error.response.status !== undefined)
          return error.response.status;
          else return error.response;
      });
    }

    getUsernameByToken(){
      return axios.post(API_URL + "/" + localStorage.getItem("token"));
    }

    getConfig(){
        if(localStorage.getItem("token") !== null)
        return {headers:{'Authorization': 'Bearer ' + localStorage.getItem("token")}};
    }

    logout(){
        localStorage.removeItem("token");
        console.log("111");
    }

    isUserLoggedIn(){
        let token = localStorage.getItem("token");
        if(token === null)
          return false;
        else 
          return true;
    }

}

export default new AuthenticationService();