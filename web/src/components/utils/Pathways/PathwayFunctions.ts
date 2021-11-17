

import store from '@/store';
import Vue from 'vue';
import { pathwayCompletedInfoType } from "@/types/Application";

export function resetAllPathwaysCompeleted(){

    const pathwayCompleted: pathwayCompletedInfoType = store.state.Application.pathwayCompleted

    for(const key of Object.keys(pathwayCompleted))
        pathwayCompleted[key] = false;

    store.commit("Application/setPathwayCompletedFull",pathwayCompleted);
    Vue.nextTick(() => store.dispatch("Application/checkAllCompleted"));
}