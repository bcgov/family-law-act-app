import axios from "axios";
import { AxiosError } from 'axios'
import Vue from 'vue'
import createAuthRefreshInterceptor, {AxiosAuthRefreshOptions} from 'axios-auth-refresh';

const options: AxiosAuthRefreshOptions = {
    statusCodes: [ 401, 403]
}


const refreshAuthLogic = failedRequest => axios.get('/user-info/').then(response => {
        
    location.replace(response.data.login_uri);
    return Promise.resolve();
  
}).catch((error: AxiosError) => {
    console.error(error);
});




const httpInstance = configureInstance();

function configureInstance(){
    createAuthRefreshInterceptor(axios, refreshAuthLogic, options);
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.baseURL = `${process.env.BASE_URL}api/v1`;
    return axios
}

export default {
    install () {
        Vue.prototype.$http = httpInstance
    }
};

