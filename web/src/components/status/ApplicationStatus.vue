<template>
    <b-card no-body border-variant="white" bg-variant="white" :style="{minHeight:getHeight}" id="status">
        <b-card no-body class="home-content border-white p-0">
            <!-- <div class="alert alert-danger mt-4" v-if="error">{{error}}</div> -->
            
            <div class="pt-5" name="info-content-header">
                <h1>Previous Activity</h1>
                <b-card no-body border-variant="white" bg-variant="white">
                    <p class=" ml-0 mb-1">
                        To resume a previous session, click the Resume button next to the activity. 
                        To start a new session, click the Begin New Session button at the bottom 
                        of the page.
                    </p>
                </b-card>

                <div class="mb-4 border border-gray border-right-0 border-left-0 border-bottom-0">
                </div>
            </div>
            
            <loading-spinner v-if="!dataLoaded" waitingText="Loading ..." />
            
            <div :style="{height:getTableHeight}" v-if="dataLoaded"> 

                <b-card no-body border-variant="white" bg-variant="white" v-if="!previousApplications.length">
                        <span class="text-muted ml-4 mb-5">No previous activity.</span>
                </b-card>

                <b-card :key="tableUpdated" :style="{height:getTableHeight}" v-else no-body border-variant="white" bg-variant="white" >
                    <b-table
                        :items="previousApplications"
                        :fields="previousApplicationFields"
                        class="mx-4"
                        style="overflow-y: auto;"
                        sort-by="lastUpdated"
                        :sort-desc="true"
                        borderless
                        sort-icon-left
                        striped
                        small  
                        head-variant="dark"                       
                        responsive="sm"
                        sticky-header="600px"
                        >
                        <template v-slot:cell(edit)="row">
                            <b-button v-if="row.item.lastFiled == 0" size="sm" variant="transparent" class="my-0 py-0"
                                @click="removeApplication(row.item, row.index)"
                                v-b-tooltip.hover.noninteractive.left.v-danger
                                title="Delete Application">
                                <b-icon-trash-fill font-scale="1.25" variant="danger"></b-icon-trash-fill>                    
                            </b-button>

                            <b-button v-if="row.item.lastFiled == 0" size="sm" variant="transparent" class="my-0 py-0"
                                @click="resumeApplication(row.item.id)"
                                v-b-tooltip.hover.bottom.noninteractive
                                title="Resume Application">
                                <b-icon-pencil-square font-scale="1.25" variant="primary"></b-icon-pencil-square>                    
                            </b-button>

                            <div v-if="row.item.lastFiled != 0">

                                <b-button size="sm" variant="transparent" class="my-0 py-0 px-1"
                                    @click="displayRejectionInfo(row.item.id)"
                                    v-b-tooltip.hover.noninteractive.left.v-danger
                                    title="Action Required">
                                    <span class="fa fa-exclamation-triangle text-danger"/>                    
                                </b-button>

                                <b-button size="sm" variant="transparent" class="my-0 py-0"
                                    @click="navigateToEFilingHub(row.item.last_efiling_submission)"
                                    v-b-tooltip.hover.noninteractive.left.v-info
                                    title="Navigate To Submitted Application">
                                    <span class="fa fa-paper-plane btn-icon-left text-info"/>                    
                                </b-button>  

                                <b-button size="sm" variant="transparent" class="my-0 py-0"
                                    @click="viewInstructions(row.item.id, row.item.app_type)"
                                    v-b-tooltip.hover.noninteractive.bottom
                                    title="View Instructions">
                                    <span style="font-size:18px; padding:0; transform:translate(3px,1px);" class="fas fa-tasks btn-icon-left text-dark"/>                    
                                </b-button>                              

                                <b-button v-if="row.item.listOfPdfs.length>0" size="sm" variant="transparent" class="my-0 py-0"
                                    @click="viewApplicationPdf(row.item.id, row.item.listOfPdfs)"
                                    v-b-tooltip.hover.noninteractive.left.v-success
                                    title="View/Download the Submitted Application">
                                    <span style="font-size:18px; padding:0; transform:translate(3px,1px);" class="far fa-file-pdf btn-icon-left text-primary"/>                    
                                </b-button>

                            </div>
                            
                        </template>
                        <template v-slot:cell(app_type)="row">                  
                            <ul style="list-style-type: '-  '; padding-inline-start: 20px; margin:0" :class="row.item.lastFiled?'text-success':''">
                                <li  v-for="(appType,inx) in row.item.app_type" :key="inx">{{appType}}</li>
                            </ul>
                            <span style="padding-inline-start: 7px; margin:0" v-if="row.item.app_type.length==0"><span class="mr-1" >-</span> New Application</span>
                        </template>
                        <template v-slot:cell(lastUpdated)="row">                  
                            <span>{{ row.item.lastUpdatedDate | beautify-date-weekday}}</span>
                        </template>
                        <template v-slot:cell(lastFiled)="row">                  
                            <b-badge variant="success" >{{ row.item.lastFiledDate | beautify-date-weekday}}</b-badge>
                        </template>
                        <template v-slot:cell(status)="row">                  
                            <b-badge v-if="row.item.status == 'completed'" variant="success" >Completed</b-badge>
                            <b-badge v-if="row.item.status == 'rejected'" variant="danger" >Action Required</b-badge>
                            <b-badge v-if="row.item.status == 'submitted'" variant="primary" >Submitted</b-badge>
                        </template>
                    </b-table>
                </b-card>
            </div>                 
              
        </b-card>

        <b-card name="button-menu" class="button-content" border-variant="white" bg-variant="white">         
            <b-row style="margin-left: 7rem;">The Process Map provides a general overview of the process through Provincial Court.</b-row>               
            <b-row class="mt-2 ml-5">                
                <b-col cols="5">
                    <b-button 
                        style="float:left;"
                        class="ml-5 mb-1 bg-success"
                        size="md" 
                        variant="success" 
                        @click="showJourneyMap = true;">
                        View/Print Process Map
                        <b-icon-printer-fill scale="1" variant="white"/>
                    </b-button>
                </b-col>
                <b-col class="m-0 p-0" cols="4">
                    <b-button 
                        variant="success" 
                        size="md"
                        class="new-session-button" 
                        @click="beginApplication()"
                    >Begin NEW Session</b-button>
                </b-col>
                <b-col class="m-0 p-0" cols="3">                   
                    <div class="my-2 ml-5">
                        <a class="terms" @click="openTerms()">
                            <u style="cursor:pointer" >Terms and Conditions</u>
                        </a>
                    </div>
                </b-col>
            </b-row>           
        </b-card>

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
                <h2 class="mb-0 mt-2 ml-4">Confirm Delete Application</h2>                                  
            </template>
            <h4 >Are you sure you want to delete your <b class="text-primary" v-for="app,inx in applicationToDelete.app_type" :key="inx">"{{app}}"<b v-if="(inx+1)<applicationToDelete.app_type.length">, </b> </b> application?</h4>            
            <template v-slot:modal-footer>
                <b-button variant="danger" @click="confirmRemoveApplication()">Confirm</b-button>
                <b-button variant="primary" @click="$bvModal.hide('bv-modal-confirm-delete')">Cancel</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="warning" class="closeButton" @click="$bvModal.hide('bv-modal-confirm-delete')"
                >&times;</b-button>
            </template>
        </b-modal>

        <b-modal v-model="showSelectFileForPrint" id="bv-modal-select-pdf" header-class="bg-info text-primary">                        
            <template v-slot:modal-title>
                <h2 class="mb-0 mt-2 ml-4">Click on File to Download</h2>                                  
            </template>
            <b-row v-for="(pdf,inx) in printingListOfPdfs" :key="inx"> 
                <b-button size="sm" variant="light" class="py-2 my-2 mx-auto px-5" style="width:20rem;"
                    @click="downloadApplicationPdf(printingApplicationId, pdf)"
                    >                    
                    <span style="font-size:18px; padding:0; transform:translate(3px,1px);" class="far fa-file-pdf btn-icon-left text-primary"/>
                    {{pdf | pdfTypeToFullName}}
                </b-button>
            </b-row>
            
            
            <template v-slot:modal-footer>                
                <b-button variant="primary" @click="$bvModal.hide('bv-modal-select-pdf')">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="info" class="closeButton" @click="$bvModal.hide('bv-modal-select-pdf')"
                >&times;</b-button>
            </template>
        </b-modal>

        <b-modal size="xl" v-model="showInstructions" id="bv-modal-show-instructions" header-class="bg-info text-primary">                        
            <template v-slot:modal-title>
                <h2 class="mb-0 mt-2 ml-4">Instructions</h2>                                  
            </template>

            <b-card v-if='!includesOtherForms(instructionsApplicationId)' no-body border-variant="white" class="m-3">
                <instructions :applicationId='instructionsApplicationId' ></instructions>                
            </b-card>
            <b-card v-else no-body border-variant="white" class="m-3">
                <instructions-other-forms :applicationId='instructionsApplicationId' />
            </b-card>
            
            <template v-slot:modal-footer>                
                <b-button variant="primary" @click="$bvModal.hide('bv-modal-show-instructions')">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="info" class="closeButton" @click="$bvModal.hide('bv-modal-show-instructions')"
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

        <b-modal size="xl" v-model="showJourneyMap" id="bv-modal-show-journey" header-class="bg-info text-primary">                        
            <template v-slot:modal-title>
                <h2 class="mb-0 mt-2 ml-4">Process Map</h2>                                  
            </template>

            <b-card border-variant="white" class="my-3 mx-5">
                <div class="mb-3" style="width:10rem; display: block; margin-left: auto; margin-right: auto;">
                    <b-button 
                        variant="success" 
                        @click='printJourneyMap()'
                        >Save/Print
                        <b-icon-printer-fill scale="1" variant="white"/>
                    </b-button>
                </div>
                <img style="display: block; margin-left: auto; margin-right: auto;" src="../../assets/journey-map.png" />
            </b-card>
            
            <template v-slot:modal-footer> 
                <b-button variant="primary" @click="$bvModal.hide('bv-modal-show-journey')">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="info" class="closeButton" @click="$bvModal.hide('bv-modal-show-journey')"
                >&times;</b-button>
            </template>
        </b-modal> 

        <b-modal size="xl" v-model="showActionRequired" id="bv-modal-show-action" header-class="bg-danger text-white">                        
            <template v-slot:modal-title>
                <h2 class="mb-0 mt-2 ml-4">Action Required</h2>                                  
            </template>

            <b-card no-body border-variant="white" class="m-3">
                <rejected-package-instructions :applicationId='rejectedApplicationId' ></rejected-package-instructions>                
            </b-card>           
            
            <template v-slot:modal-footer>                
                <b-button variant="primary" @click="$bvModal.hide('bv-modal-show-action')">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="info" class="closeButton" @click="$bvModal.hide('bv-modal-show-action')"
                >&times;</b-button>
            </template>
        </b-modal>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";  
import * as surveyEnv from "@/components/survey/survey-glossary";

import store from "@/store";

import moment from 'moment-timezone';
import {applicationInfoType} from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/common";
const commonState = namespace("Common");
import "@/store/modules/application";
import { documentTypesJsonInfoType, applicationJsonInfoType } from '@/types/Common';
const applicationState = namespace("Application");
import {GetFilingLocations} from './GetFilingLocations'
import {RestoreCommonStep} from './RestoreCommonStep'
import {MigrateStore} from './MigrateStore'
import Instructions from './Instructions.vue';
import InstructionsOtherForms from './InstructionsOtherForms.vue'
import RejectedPackageInstructions from './unsuccessfulSubmissions/RejectedPackageInstructions.vue';


@Component({
    components: {Instructions, InstructionsOtherForms, RejectedPackageInstructions}
})
export default class ApplicationStatus extends Vue {

    @commonState.Action
    public UpdateDocumentTypesJson!: (newDocumentTypesJson: documentTypesJsonInfoType[]) => void

    @commonState.Action
    public UpdateLocationsInfo!: (newLocationsInfo) => void

    @applicationState.Action
    public checkAllCompleted!: () => void

    dataLoaded = false;
    showDisclaimer = false;

    windowHeight = 0;
    footerHeight = 0;
    headerHeight = 0;
    buttonMenuHeight = 0;
    infoContentHeaderHeight = 0;
    tableUpdated = 0;

    previousApplications = []
    previousApplicationFields = [
        { key: 'app_type',    label: 'Activity Type',           sortable:true,  tdClass: 'border-top', thStyle:'width:47%;'},
        { key: 'lastUpdated', label: 'Last Updated',            sortable:true,  tdClass: 'border-top'},
        { key: 'lastFiled',   label: 'Submitted/Filed Date',    sortable:true,  tdClass: 'border-top'},
        { key: 'status',      label: 'Status',                  sortable:true,  tdClass: 'border-top'},
        { key: 'packageNum',  label: 'CSO Package#',            sortable:false, tdClass: 'border-top'},
        { key: 'edit',        label: '',                        sortable:false, tdClass: 'border-top'}
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
    
    printingApplicationId = 0;
    printingListOfPdfs: string[] = [];
    showSelectFileForPrint =  false;

    instructionsApplicationId = 0;
    rejectedApplicationId = 0;
    applicationTypes: string[] = [];
    showInstructions = false;
    showJourneyMap = false;
    showActionRequired = false;

    mounted() { 
        this.showDisclaimer = false;
        window.addEventListener('resize', this.getWindowHeight);               
        this.loadDocumentTypes();
        this.extractFilingLocations();
        this.loadApplications();
        this.getWindowHeight();

    }

    public getWindowHeight() {
        this.windowHeight = document.documentElement.clientHeight;
        this.footerHeight = (document.getElementsByName("navigation-footer")[0] as HTMLElement)?.clientHeight;
        this.headerHeight = (document.getElementsByName("navigation-topbar")[0] as HTMLElement)?.clientHeight;
        this.buttonMenuHeight = (document.getElementsByName("button-menu")[0] as HTMLElement)?.clientHeight;
        this.infoContentHeaderHeight = (document.getElementsByName("info-content-header")[0] as HTMLElement)?.clientHeight;

    }

    get getHeight() {        
        return this.windowHeight-this.footerHeight-this.headerHeight-1 + 'px'
    }

    get getTableHeight() {        
        return this.windowHeight-this.footerHeight-this.headerHeight-this.buttonMenuHeight-this.infoContentHeaderHeight-10 + 'px'
    }

    public openTerms() {
        this.$router.push({name: "terms"})
    }

    public loadApplications () {
    //TODO: when extending to use throughout the province, the timezone should be changed accordingly
    
        this.$http.get('/app-list/')
        .then((response) => {
            
            for (const appJson of response.data) {                
                const app = {lastUpdated:0, lastUpdatedDate:'', id:0, app_type:[], app_type_code:[], lastFiled:0, lastFiledDate:'', packageNum:'', listOfPdfs:[], last_efiling_submission:{package_number:'',package_url:''}} as applicationJsonInfoType;
                app.lastUpdated = appJson.last_updated?moment(appJson.last_updated).tz("America/Vancouver").diff('2000-01-01','minutes'):0;
                app.lastUpdatedDate = appJson.last_updated?moment(appJson.last_updated).tz("America/Vancouver").format():'';                
                app.lastFiled = appJson.last_filed?moment(appJson.last_filed).tz("America/Vancouver").diff('2000-01-01','minutes'):0;
                app.lastFiledDate = appJson.last_filed?moment(appJson.last_filed).tz("America/Vancouver").format():'';                
                app.id = appJson.id;
                app.listOfPdfs = appJson.prepared_pdfs?appJson.prepared_pdfs.map(pdf=>pdf.pdf_type) :[]
                app.app_type = this.extractTypes(appJson.app_type.split(','));
                app.app_type_code = appJson.app_type.split(',');
                if(appJson.last_efiling_submission){
                    app.last_efiling_submission = {package_number:appJson.last_efiling_submission.package_number,package_url:appJson.last_efiling_submission.package_url}
                    if(appJson.last_efiling_submission.package_number) app.packageNum=appJson.last_efiling_submission.package_number;
                }
                this.previousApplications.push(app);
            }
            if (this.previousApplications.length == 0){
                this.$store.commit("Application/setUserType", 'new');
                this.showDisclaimer = true;
            } else {
                this.$store.commit("Application/setUserType", 'returning');
                this.showDisclaimer = false;
            }
            this.dataLoaded = true;       
        },(err) => {
            this.dataLoaded = true;
            this.error = err;        
        });
    }

    public beginApplication() {   

        this.$store.dispatch("Application/UpdateInit", Vue.filter('get-current-version')());
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
            
            const storeMigrationFn = new MigrateStore()           
            this.currentApplication = storeMigrationFn.migrate(applicationData, applicationType, Vue.filter('get-current-version')())

            const comStepFn = new RestoreCommonStep()
            comStepFn.restore(this.currentApplication)
           
            this.checkAllCompleted();
           
            this.$router.push({name: "flapp-surveys" }) 

        }, err => {
            this.error = err;        
        });
    }   

    public extractTypes(applicationTypes: string[]) {
        return Vue.filter('typesToFullnames')(applicationTypes)
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
            const indexToDelete = this.previousApplications.findIndex((app) =>{if(app.id == this.applicationToDelete['id'])return true});
            if(indexToDelete>=0){
                this.previousApplications.splice(indexToDelete, 1);  
                this.tableUpdated++;
            }
            
        },err => {
            const errMsg = err.response.data.error;
            this.deleteErrorMsg = errMsg.slice(0,60) + (errMsg.length>60?' ...':'');
            this.deleteErrorMsgDesc = errMsg;
            this.deleteError = true;            
        });
        this.confirmDelete=false;  
    }
    
    public viewApplicationPdf(applicationId, listOfPdfs) {
        this.printingApplicationId = applicationId;
        
        let submittedPdfList = []
        this.$http.get('/app/'+ applicationId + '/')
        .then((response) => {

            const applicationData = response.data;  
            const appSteps = applicationData?.steps.filter(step => step.name == 'GETSTART');
            if(appSteps.length == 1){ 
                const stepGETSTART = appSteps[0].result;

                if (stepGETSTART?.submittedPdfList){
                    submittedPdfList = stepGETSTART.submittedPdfList;
                } 
            }
            
            this.printingListOfPdfs = this.getListOfPdfs(listOfPdfs,submittedPdfList);
            this.showSelectFileForPrint =  true;

        }, err => { 
            this.printingListOfPdfs = this.getListOfPdfs(listOfPdfs,submittedPdfList);           
            this.showSelectFileForPrint =  true;        
        });
    }

    public getListOfPdfs(listOfPdfs, submittedPdfList){

        return listOfPdfs.filter(pdfname => {
            return (
                (pdfname != "TEMP") && 
                (submittedPdfList.includes(pdfname) ||
                 submittedPdfList.length == 0
                )
            )
        });
    }

    public viewInstructions(applicationId, applicationType) {
        this.instructionsApplicationId = applicationId;
        this.applicationTypes = applicationType;
        this.showInstructions =  true;
    }

    public displayRejectionInfo(applicationId) {

        this.rejectedApplicationId = applicationId;
        this.showActionRequired = true;


    }

    public printJourneyMap() {
        
        const pdf_name='process-map'
        const url = '/print-fillable-pdf?name='+pdf_name
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
            link.download = pdf_name+".pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);     
            this.showJourneyMap =  false;        

        },err => {
            console.error(err);
        });
        
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

    public includesOtherForms(applicationId){
        const application = this.previousApplications.filter(app => app.id==applicationId)
        // console.log(applicationId)
        // console.log(application)
        if(application[0]){
            const app_type_code = application[0].app_type_code
            console.log(app_type_code)
            const app_types = Vue.filter('getOtherFormsType')()
            // console.log(app_types) 
            for(const app_type of app_type_code){
                if(!app_types.includes(app_type)) return false
            }
            return true
        }
        return false
    }

    public extractFilingLocations() {
        GetFilingLocations();       
    }

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }
}
</script>

<style scoped lang="scss">

    @import "src/styles/common";
    @import "~@fortawesome/fontawesome-free/css/all.min.css";
    .home-content {
        padding-bottom: 20px;
        padding-top: 0rem;
        width: 80%;
        color: black;
        margin: 0 auto;
    }

    .button-content {
        width: 90%;
        color: black;
        margin: 0 auto;
    }

    .new-session-button {
        float: right;
        color: $gov-white !important;
        border: 2px solid rgba($gov-mid-blue, 0.3);   
        &:active {
            border: 2px solid rgba($gov-white, 0.8);
        }
    }

    .terms{
        color: $gov-mid-blue;
        margin-top: auto 0;
    }

    .closeButton {
        background-color: transparent !important;
        color: white;
        border: white;
        font-weight: 700;
        font-size: 2rem;
        padding-top: 0;
        margin-top: 0;
    }

    button{
        border:0px;
    }

</style>
