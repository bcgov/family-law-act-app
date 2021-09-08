import Axios, { AxiosInstance } from "axios";
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
            var response = await Axios.get('/user-info/');
            const userId = response.data.user_id;
            const loginUrl = response.data.login_uri;
            const userLocation = response.data.location;
            const efilingEnabled = response.data.efiling_enabled;
            if (userId) {
                const universalId = response.data.universal_id;
                if (!universalId) {
                    this.logout(store);
                }
                const userName = response.data.display_name || response.data.first_name + " " + response.data.last_name;
                store.commit("Application/setUserName", userName);
                store.commit("Common/setUserId", userId);
                store.commit("Common/setUserLocation",userLocation);
                store.commit("Common/setEfilingEnabled", efilingEnabled);               
            }
            return { userId, loginUrl };
        }
        catch (error) {
            console.log(error);  
        }
    }
}
