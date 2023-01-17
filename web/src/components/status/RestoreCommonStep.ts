import store from '@/store/index'

export class RestoreCommonStep{

    public restore(currentApplication){

        if(currentApplication.steps[0].result?.requiredDocuments)
            store.dispatch('Application/UpdateRequiredDocuments',currentApplication.steps[0].result.requiredDocuments)
 
        if(currentApplication.steps[0].result?.supportingDocumentForm4)
            store.dispatch('Application/UpdateSupportingDocumentForm4',currentApplication.steps[0].result.supportingDocumentForm4)

        if(currentApplication.steps[0].result?.pathwayCompleted)
            store.dispatch('Application/UpdatePathwayCompletedFull',currentApplication.steps[0].result.pathwayCompleted)           

        if(currentApplication.steps[0].result?.rflmRequiredDocsRequests)
            store.dispatch('Application/UpdateRflmRequiredDocsRequests',currentApplication.steps[0].result.rflmRequiredDocsRequests)           


    }
}