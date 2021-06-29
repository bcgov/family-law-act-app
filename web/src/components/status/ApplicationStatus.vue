<template>
    <b-card id="status">
        <b-container class="container home-content">
            <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>
            <b-row>
                <b-col>
                    <h1>Previous Applications</h1>
                    <hr class="bg-light" style="height: 2px;"/>

                    <loading-spinner v-if="!dataLoaded" waitingText="Loading ..." /> 

                    <b-card no-body border-variant="white" bg-variant="white" v-if="!previousApplications.length">
                            <span class="text-muted ml-4 mb-5">No previous applications.</span>
                    </b-card>

                    <b-card v-else no-body border-variant="light" bg-variant="white">
                        <b-table  :items="previousApplications"
                            :fields="previousApplicationFields"
                            class="mx-4"
                            sort-by="lastUpdated"
                            :sort-desc="true"
                            borderless
                            sort-icon-left
                            striped
                            small 
                            responsive="sm"
                            >
                            <template v-slot:cell(edit)="row">
                                <b-button v-if="row.item.lastFiled == 0" size="sm" variant="transparent" class="my-0 py-0"
                                    @click="removeApplication(row.item, row.index)"
                                    v-b-tooltip.hover.noninteractive
                                    title="Remove Application">
                                    <b-icon-trash-fill font-scale="1.25" variant="danger"></b-icon-trash-fill>                    
                                </b-button>

                                <b-button v-if="row.item.lastFiled == 0" size="sm" variant="transparent" class="my-0 py-0"
                                    @click="resumeApplication(row.item.id)"
                                    v-b-tooltip.hover.noninteractive
                                    title="Resume Application">
                                    <b-icon-pencil-square font-scale="1.25" variant="primary"></b-icon-pencil-square>                    
                                </b-button>

                                <b-button v-if="row.item.lastFiled != 0" size="sm" variant="transparent" class="my-0 py-0"
                                    @click="viewApplicationPdf(row.item.id, row.item.listOfPdfs)"
                                    v-b-tooltip.hover.noninteractive
                                    title="View the Submitted Application">
                                    <span style="font-size:18px; padding:0; transform:translate(3px,1px);" class="far fa-file-pdf btn-icon-left text-primary"/>                    
                                </b-button>

                                <b-button v-if="row.item.lastFiled != 0" size="sm" variant="transparent" class="my-0 py-0"
                                    @click="navigateToEFilingHub(row.item.last_efiling_submission)"
                                    v-b-tooltip.hover.noninteractive
                                    title="Navigate To Submitted Application">
                                    <span class="fa fa-paper-plane btn-icon-left text-info"/>                    
                                </b-button>
                            </template>
                            <template v-slot:cell(app_type)="row">                  
                                <span :class="row.item.lastFiled?'text-success':''">{{row.item.app_type}}</span>
                            </template>
                            <template v-slot:cell(lastUpdated)="row">                  
                                <span>{{ row.item.lastUpdatedDate | beautify-date-weekday}}</span>
                            </template>
                            <template v-slot:cell(lastFiled)="row">                  
                                <b-badge variant="success" >{{ row.item.lastFiledDate | beautify-date-weekday}}</b-badge>
                            </template>
                        </b-table>
                    </b-card>

                    <b-card border-variant="white">                        
                        <b-row>
                            <b-col cols="5">
                                <b-button 
                                    variant="success" 
                                    class="btn-lg register-button" 
                                    @click="beginApplication()"
                                >Begin NEW Application</b-button>
                            </b-col>
                        </b-row>
                    </b-card>

                    <b-card border-variant="white">                        
                        <b-row>
                            <b-col cols="5">                   
                                <a class="terms" @click="openTerms()">
                                    <u>Terms and Conditions</u>
                                </a>
                            </b-col>
                        </b-row>
                    </b-card>
                 
                </b-col>
            </b-row>
        </b-container>

        <b-modal v-model="confirmDelete" id="bv-modal-confirm-delete" header-class="bg-warning text-light">
            <b-row v-if="deleteError" id="DeleteError" class="h4 mx-2">
                <b-badge class="mx-1 mt-2"
                    style="width: 20rem;"
                    v-b-tooltip.hover
                    :title="deleteErrorMsgDesc"
                    variant="danger"> {{deleteErrorMsg}}
                    <b-icon class="ml-3"
                        icon = x-square-fill
                        @click="deleteError = false"/>
                </b-badge>                    
            </b-row>            
            <template v-slot:modal-title>
                <h2 class="mb-0 text-light">Confirm Delete Application</h2>                                  
            </template>
            <h4 >Are you sure you want to delete your <b>"{{applicationToDelete.app_type}}"</b> application?</h4>            
            <template v-slot:modal-footer>
                <b-button variant="danger" @click="confirmRemoveApplication()">Confirm</b-button>
                <b-button variant="primary" @click="$bvModal.hide('bv-modal-confirm-delete')">Cancel</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-warning" class="text-light closeButton" @click="$bvModal.hide('bv-modal-confirm-delete')"
                >&times;</b-button>
            </template>
        </b-modal>


        <b-modal v-model="showSelectFileForPrint" id="bv-modal-select-pdf" header-class="bg-info">                        
            <template v-slot:modal-title>
                <h2 class="mb-0 text-primary">Click on File to Download</h2>                                  
            </template>
            <b-row v-for="(pdf,inx) in printingListOfPdfs" :key="inx"> 
                <b-button size="sm" variant="light" class="py-2 my-2 mx-auto px-5" style="width:20rem;"
                    @click="downloadApplicationPdf(printingApplicationId, pdf)"
                    >                    
                    <span style="font-size:18px; padding:0; transform:translate(3px,1px);" class="far fa-file-pdf btn-icon-left text-primary"/>                    
                    {{extractTypes([pdf])[0]}}
                </b-button>
            </b-row>
            
            
            <template v-slot:modal-footer>                
                <b-button variant="primary" @click="$bvModal.hide('bv-modal-select-pdf')">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-warning" class="text-light closeButton" @click="$bvModal.hide('bv-modal-select-pdf')"
                >&times;</b-button>
            </template>
        </b-modal> 

        <b-modal size="xl" v-model="showDisclaimer" header-class="bg-white" no-close-on-backdrop hide-header-close>
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">Disclaimer</h1> 
            </template>
            <h3>Warranty Disclaimer </h3>
            <p>This information is provided as a public service by the Government of British Columbia, Box 9411, Victoria, British Columbia, Canada V8W 9V1. </p>
            <p>This website and all of the information it contains are provided "as is" without warranty of any kind, whether express or implied. All implied warranties, including, without limitation, implied warranties of merchantability, fitness for a particular purpose, and non-infringement, are hereby expressly disclaimed. Links and references to any other websites are provided for information only and listing shall not be taken as endorsement of any kind. The Government of British Columbia is not responsible for the content or reliability of the linked websites and does not endorse the content, products, services or views expressed within them. </p>
            <h3>Limitation of Liabilities </h3>
            <p> Under no circumstances will the Government of British Columbia be liable to any person or business entity for any direct, indirect, special, incidental, consequential, or other damages based on any use of this website or any other website to which this site is linked, including, without limitation, any lost profits, business interruption, or loss of programs or information, even if the Government of British Columbia has been specifically advised of the possibility of such damages.</p>
            <template v-slot:modal-footer>
                <b-button variant="primary" style="font-size:22px;font-weight:bold;" size="lg" @click="showDisclaimer=false">Accept</b-button>
            </template>
        </b-modal>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";  
import * as surveyEnv from "@/components/survey/survey-glossary.ts";

import store from "@/store";

import moment from 'moment-timezone';
import {applicationInfoType} from "@/types/Application"

import { namespace } from "vuex-class";   
import "@/store/modules/common";
const commonState = namespace("Common");
import "@/store/modules/application";
import { documentTypesJsonInfoType, applicationJsonInfoType } from '@/types/Common';
const applicationState = namespace("Application");

import {restoreCommonStep} from './restoreCommonStep'
import {migrateStore} from './migrateStore'


@Component
export default class ApplicationStatus extends Vue {

    @commonState.Action
    public UpdateDocumentTypesJson!: (newDocumentTypesJson: documentTypesJsonInfoType[]) => void

    @commonState.Action
    public UpdateLocationsInfo!: (newLocationsInfo) => void

    @applicationState.Action
    public checkAllCompleted! :() => void

    dataLoaded = false;
    showDisclaimer = false;

    previousApplications = []
    previousApplicationFields = [
        { key: 'app_type', label: 'Application Type', sortable:true, tdClass: 'border-top'},
        { key: 'lastUpdated', label: 'Last Updated', sortable:true, tdClass: 'border-top'},
        { key: 'lastFiled', label: 'Filed Date', sortable:true, tdClass: 'border-top'},
        { key: 'packageNum', label: 'CSO Package#', sortable:false, tdClass: 'border-top'},
        { key: 'edit', thClass: 'd-none', sortable:false, tdClass: 'border-top'}
    ]
    confirmDelete = false;
    currentApplication = {} as applicationInfoType;
    applicationToDelete = {} as applicationJsonInfoType
    indexToDelete = -1 
    applicationId = ''
    error = ''
    deleteErrorMsg = ''
    deleteErrorMsgDesc = ''
    deleteError = false  

    
    //___________________________
    //___________________________
    //___________________________NEW VERSION goes here _________________
    CURRENT_VERSION: string = "1.2";
    //__________________________
    //___________________________
    //___________________________

    mounted() { 
        this.showDisclaimer = false;       
        this.loadDocumentTypes();
        this.extractFilingLocations();
        this.loadApplications();
    }

    public openTerms() {
        this.$router.push({name: "terms"})
    }

    public loadApplications () {
    //TODO: when extending to use throughout the province, the timezone should be changed accordingly
    //TODO: read in the data required to navigate to the eFilingHub package page
        this.$http.get('/app-list/')
        .then((response) => {
            
            for (const appJson of response.data) {                
                const app = {lastUpdated:0, lastUpdatedDate:'', id:0, app_type:'', lastFiled:0, lastFiledDate:'', packageNum:'', listOfPdfs:[], last_efiling_submission:{package_number:'',package_url:''}} as applicationJsonInfoType;
                app.lastUpdated = appJson.last_updated?moment(appJson.last_updated).tz("America/Vancouver").diff('2000-01-01','minutes'):0;
                app.lastUpdatedDate = appJson.last_updated?moment(appJson.last_updated).tz("America/Vancouver").format():'';                
                app.lastFiled = appJson.last_filed?moment(appJson.last_filed).tz("America/Vancouver").diff('2000-01-01','minutes'):0;
                app.lastFiledDate = appJson.last_filed?moment(appJson.last_filed).tz("America/Vancouver").format():'';                
                app.id = appJson.id;
                app.listOfPdfs = appJson.prepared_pdfs?appJson.prepared_pdfs.map(pdf=>pdf.pdf_type) :[]
                app.app_type = this.extractTypes(appJson.app_type.split(',')).toString();
                if(appJson.last_efiling_submission){
                    app.last_efiling_submission = {package_number:appJson.last_efiling_submission.package_number,package_url:appJson.last_efiling_submission.package_url}
                    if(appJson.last_efiling_submission.package_number) app.packageNum=appJson.last_efiling_submission.package_number;
                }
                this.previousApplications.push(app);
            }
            if (this.previousApplications.length == 0){
                this.showDisclaimer = true;
            } else {
                this.showDisclaimer = false;
            }
            this.dataLoaded = true;       
        },(err) => {
            this.dataLoaded = true;
            this.error = err;        
        });
    }

    public beginApplication() {   

        this.$store.dispatch("Application/UpdateInit", this.CURRENT_VERSION);
        const userId = store.state.Common.userId;
        store.commit("Application/setUserId", userId);

        const lastUpdated = moment().format();
        this.$store.commit("Application/setLastUpdated", lastUpdated);

        const userType = store.state.Application.userType;      
        store.commit("Application/setUserType", userType);

        const application = store.state.Application;
        application.type = store.state.Application.types.toString();

        const url = "/app/";
        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }

        this.$http.post(url, application,header)
        .then(res => {
            this.applicationId = res.data.app_id;  
            store.commit("Application/setApplicationId", this.applicationId);
            this.error = "";
  
            this.$router.push({name: "flapp-surveys" }) 
        }, err => {
            console.error(err);
            this.error = err;
        });
    }

    public navigateToEFilingHub(packageInfo) {
        location.replace(packageInfo.package_url)
    }

    public resumeApplication(applicationId) {      
    
        this.$http.get('/app/'+ applicationId + '/')
        .then((response) => {

            const applicationData = response.data   
            const applicationType = (applicationData.type?.length>0)?this.extractTypes(applicationData.type.split(',')):[];          
            
            const storeMigrationFn = new migrateStore()           
            this.currentApplication = storeMigrationFn.migrate(applicationData, applicationType, this.CURRENT_VERSION)

            const comStepFn = new restoreCommonStep()
            comStepFn.restore(this.currentApplication)
           
            this.checkAllCompleted();
           
            this.$router.push({name: "flapp-surveys" }) 

        }, err => {
            this.error = err;        
        });
    }   

    public extractTypes(applicationTypes: string[]) {

        let types = [];

        for (const applicationType of applicationTypes){
            if (applicationType.includes("FPO")){
                types.push(applicationType.replace("FPO", "Protection Order"));            
            }
            if (applicationType.includes(Vue.filter('getPathwayPdfType')("familyLawMatter"))){
                types.push("Family Law Matter");
            }
            if (applicationType.includes(Vue.filter('getPathwayPdfType')("caseMgmt"))){
                types.push("Case Management");
            }
            if (applicationType.includes(Vue.filter('getPathwayPdfType')("priorityParenting"))){
                types.push("Priority Parenting Matter");
            }
            if (applicationType.includes(Vue.filter('getPathwayPdfType')("childReloc"))){
                types.push("Relocation of a Child");
            }
            if (applicationType.includes(Vue.filter('getPathwayPdfType')("agreementEnfrc"))){
                types.push("Enforcement of Agreements and Court Orders");
            }

            if (applicationType.includes(Vue.filter('getPathwayPdfType')("protectionOrder"))){
                types.push("Protection Order");     
            }
        }
        return types;
    }

    public removeApplication(application, index) {
        this.deleteErrorMsg = '';
        this.deleteErrorMsgDesc = '';
        this.deleteError = false;
        this.applicationToDelete = application;
        this.indexToDelete = index;
        this.confirmDelete=true;         
    }    

    public confirmRemoveApplication() {
        this.$http.delete('/app/'+ this.applicationToDelete['id'] + '/')
        .then((response) => {
            var indexToDelete = this.previousApplications.findIndex((app) =>{if(app.id == this.applicationToDelete['id'])return true});
            if(indexToDelete>=0)this.previousApplications.splice(indexToDelete, 1);  
            
        },err => {
            const errMsg = err.response.data.error;
            this.deleteErrorMsg = errMsg.slice(0,60) + (errMsg.length>60?' ...':'');
            this.deleteErrorMsgDesc = errMsg;
            this.deleteError = true;            
        });
        this.confirmDelete=false;  
    }

    printingApplicationId = 0;
    printingListOfPdfs: string[] = [];
    showSelectFileForPrint =  false;
    public viewApplicationPdf(applicationId, listOfPdfs) {
        this.printingApplicationId = applicationId;
        this.printingListOfPdfs = listOfPdfs;
        this.showSelectFileForPrint =  true;
    }

    public downloadApplicationPdf(applicationId, pdf_type){
        
        const url = '/survey-print/'+applicationId+'/?pdf_type='+pdf_type
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }  
        this.$http.get(url, options)
        .then(res => {
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = pdf_type+".pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);  
            this.error = "";          
        },err => {
            console.error(err);
        });
    }

    public loadDocumentTypes() {
        this.$http.get('/efiling/document-types/')
        .then((response) => { 
            if(response.data && response.data.length>0){                
                this.UpdateDocumentTypesJson(response.data);
            }
        },(err) => {            
            console.log(err)
        });
    }

    public extractFilingLocations() {
        this.$http.get('/efiling/locations/')
        .then((response) => {
            const locationsInfo = response.data 
            const locationNames = Object.keys(response.data);
            const locations = []
            for (const location of locationNames){
                const locationInfo = locationsInfo[location];              
                
                const address = (locationInfo.address_1?(locationInfo.address_1):'')  + 
                                (locationInfo.address_2?(', ' + locationInfo.address_2):'') + 
                                (locationInfo.address_3?(', ' + locationInfo.address_3):'') +
                                (((locationInfo.address_1 && locationInfo.address_1.trim()) || (locationInfo.address_2 && locationInfo.address_2.trim()) || (locationInfo.address_3 && locationInfo.address_3.trim()))?', ':'') +                               
                                (locationInfo.city?(locationInfo.city):'') +
                                (locationInfo.province?(', ' + locationInfo.province):'');
                const postalCode = (locationInfo.postal?(locationInfo.postal):'');
               
                const email = (locationInfo.email?(locationInfo.email):'');
                const filingLocation = (locationInfo.in_person_filing_location_code?(locationInfo.in_person_filing_location_code):'');
                locations.push({id: locationInfo.location_code, name: location, address: address, postalCode: postalCode, email:email, filingLocation: filingLocation});
            }

            this.UpdateLocationsInfo(locations); 
        
        },(err) => console.log(err));
        
    }

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }
};
</script>

<style scoped lang="scss">
@import "src/styles/common";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
.home-content {
    padding-bottom: 20px;
    padding-top: 2rem;
    max-width: 950px;
    color: black;
}

.register-button {
    color: $gov-white !important;
    border: 2px solid rgba($gov-mid-blue, 0.3);
    margin-top: 2.5rem;
    width: 100%;
    &:active {
        border: 2px solid rgba($gov-white, 0.8);
    }
}

.terms{
    color: $gov-mid-blue;
}

button{
    border:0px;
}

</style>
