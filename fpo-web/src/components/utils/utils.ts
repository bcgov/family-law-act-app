import { AxiosInstance, AxiosStatic } from "axios";

export const SessionManager = {
    logoutAndRedirect: async function(store, http: AxiosInstance) {
        store.dispatch("application/init");
        await http.post("/logout/");
        window.location.replace("https://www.google.ca");
    },
    logout: function(store) {
        store.dispatch("application/init");
        window.location.replace(`${process.env.BASE_URL}logout/`);
    }
}
