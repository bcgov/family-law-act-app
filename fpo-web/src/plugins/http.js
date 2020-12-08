import axios from "axios";
import Vue from 'vue'

const httpInstance = configureInstance();

function configureInstance(){
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

