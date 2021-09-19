import store from '@/store';
import * as _ from 'underscore';

export function togglePages(pageArr, activeIndicator, currentStep) {  
          
    for (const inx in pageArr) {
        store.commit("Application/setPageActive", {
            currentStep: currentStep,
            currentPage: pageArr[inx],
            active: activeIndicator
        });
    } 
}