import { AxiosInstance } from "axios";
import Vue from "vue";

export const SessionManager = {
    logoutAndRedirect: async function(store, http: AxiosInstance) {
        store.dispatch("application/init");
        window.location.replace(`${process.env.BASE_URL}api/v1/logout/`);
        Vue.$cookies.set("quickexit","1");  
    },
    logout: function(store) {
        store.dispatch("application/init");
        window.location.replace(`${process.env.BASE_URL}api/v1/logout/`);
    },
    redirectIfQuickExitCookie: function() {
        if (Vue.$cookies.isKey("quickexit")) {
            Vue.$cookies.remove("quickexit");  
            window.location.href = "https://www.google.ca";
          }
    }
}
