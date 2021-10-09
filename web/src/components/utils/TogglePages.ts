import store from '@/store';

export function togglePages(pageArr, activeIndicator, currentStep) {  
          
    for (const inx in pageArr) {
        store.commit("Application/setPageActive", {
            currentStep: currentStep,
            currentPage: pageArr[inx],
            active: activeIndicator
        });
    } 
}