import { nameInfoType } from "@/types/Application/CommonInformation";
import Axios from "axios";
import Vue from "vue";

export const SessionManager = {
    logoutAndRedirect: async function(store) {
        store.commit("Application/init");
        window.location.replace(`${process.env.BASE_URL}api/v1/logout/`);
        Vue.$cookies.set("quickexit","1");  
    },
    logout: function(store) {
        store.commit("Application/init");
        window.location.replace(`${process.env.BASE_URL}api/v1/logout/`);
    },
    redirectIfQuickExitCookie: function() {
        if (Vue.$cookies.isKey("quickexit")) {
            Vue.$cookies.remove("quickexit");  
            history.pushState({page: "home"}, "", process.env.BASE_URL)
            window.location.href = "https://www.google.ca";
          }
    },
    getUserInfo: async function(store) {
        try {
            const response = await Axios.get('/user-info/');
            const userId = response.data.user_id;
            const loginUrl = response.data.login_uri;
            const userHasStatisticsAccess = response.data.stats? true : false;
            const userLocation = response.data.location;
            const efilingEnabled = response.data.efiling_enabled;
            const efilingStreams = response.data.efiling_streams? response.data.efiling_streams.split(","): [];
            if (userId) {
                const universalId = response.data.universal_id;
                if (!universalId) {
                    this.logout(store);
                }
                const userName = response.data.display_name || response.data.first_name + " " + response.data.last_name;
                let loggedInUserName = {} as nameInfoType;

                const firstname=response.data.first_name;
                const lastname=response.data.last_name;

                loggedInUserName.first = firstname;
                loggedInUserName.middle = '';
                loggedInUserName.last = lastname;

                if(!lastname)
                    loggedInUserName = extractName(firstname)
                else if(!firstname)
                    loggedInUserName = extractName(lastname)
                               
            
                store.commit("Application/setUserName", userName);
                store.commit("Application/setLoggedInUserName", loggedInUserName);
                store.commit("Common/setUserId", userId);
                store.commit("Common/setUserLocation",userLocation);
                store.commit("Common/setEfilingEnabled", efilingEnabled);
                store.commit("Common/setEfilingStreams", efilingStreams);
                store.commit("Common/setUserHasStatisticsAccess", userHasStatisticsAccess);                 
            }
            return { userId, loginUrl, userHasStatisticsAccess };
        }
        catch (error) {
            console.log(error);  
        }
    }
}


function extractName(name) {        
    name = name?.replace(/\s\s+/g, ' ');
    const names = name?.split(' ')
    if(!names || names.length==0 || !names[0]){
        return {first:'FirstName', middle:'', last:'LastName'}
    }
    if(names.length==1){
        return {first:'FirstName', middle:'', last:names[0]}
    }
    if(names.length==2){
        return {first:names[0], middle:'', last:names[1]}
    }
    if(names.length>2){
        const middle = names.slice(1,-1)
        return {first:names[0], middle:middle.join(' '), last:names[names.length-1]}
    }
}
