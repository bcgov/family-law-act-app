import Vue from 'vue'
import store from '@/store';
import moment from 'moment-timezone';

export default {
    install () {
        Vue.prototype.$UpdateGotoNextStepPage = UpdateGotoNextStepPage
        Vue.prototype.$UpdateGotoPrevStepPage = UpdateGotoPrevStepPage
        Vue.prototype.$saveChanges = saveChanges
    }
}

function UpdateGotoPrevStepPage(){
    saveChanges();
    store.dispatch("Application/UpdateGotoPrevStepPage");  
}

function UpdateGotoNextStepPage(){    
    saveChanges();
    store.dispatch("Application/UpdateGotoNextStepPage");    
}

function saveChanges(){
    const lastUpdated = moment().format();
    store.commit("Application/setLastUpdated", lastUpdated); 
    const application = store.state.Application;
    const applicationId = application.id;
    application.type = Vue.filter('translateTypes')(store.state.Application.types);
    
    const header = {
        responseType: "json",
        headers: {
            "Content-Type": "application/json",
        }
    }

    Vue.prototype.$http.put("/app/"+ applicationId + "/", application, header)
    .then(res => {
        //this.error = "";
    }, err => {
        console.error(err);
    });    
}