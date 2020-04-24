import { RootState } from "@/models/storeState";
import { application } from "@/store/modules/application/application";
import Vue from "vue";
import Vuex, { Store, StoreOptions } from "vuex";

class GlobalStore extends Store<RootState> {
  private static instance: Store<RootState>;

  private constructor() {
    Vue.use(Vuex);

    const storeOptions: StoreOptions<RootState> = {
      state: {
        version: "1.0.0", // a simple property
      },
      modules: {
        application,
      },
    };

    super(storeOptions);
  }

  static getInstance(): GlobalStore {
    if (!GlobalStore.instance) {
      GlobalStore.instance = new GlobalStore();
    }

    return GlobalStore.instance;
  }
}

export default GlobalStore;
