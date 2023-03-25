<template>   
    <page-base v-if="dataReady" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        
        <h2 v-if="eFiling" class="mt-4">
            <span v-if="includesGuidedPathway()">Review and Submit</span>
            <span v-else>Submit</span>            
        </h2>
        <h2 v-else class="mt-4">
            Review and Print
        </h2>

        <div class="ml-0">
            You have indicated that you will file at the following court registry:
            <p class="h3 mt-2 ml-0 mb-1" style="display:block"> {{applicantLocation.name}} </p>                
        </div>

        <div v-if="includesGuidedPathway()" class="info-section mt-4 mb-5" style="background: #f6e4e6; border-color: #e6d0c9; color: #5a5555; border-radius:10px;">
            <div class="row justify-content-center text-warning">
                <p class="bg-primary py-0 px-2 mt-2 " style="border-radius: 10px; font-size: 20px;">SAFETY CHECK</p>
            </div>
            <div style="font-size: 18px;" class="mx-3 mb-1 pb-3">
                By clicking on the 'Review and Print' button next to the document, a PDF version of the application
                    will download or open. Depending on your browser settings, your PDF might save the form to your 
                    computer or it will open in a new tab or window. For more information about opening and saving 
                    PDF forms, click on <span @click="navigateToGuide" class="text-primary" ><span style='font-size:1.2rem;' class="fa fa-question-circle" /> 
                    Get help opening and saving PDF forms</span> below. If you are concerned about 
                    having a copy saved to your computer, may want to review and print from a safe computer, tablet 
                    or device, for example a computer, tablet or device of a trusted friend, at work, a library, 
                    school or an internet café.                    
            </div>
        </div>

        <b-card style="border-radius:10px;" bg-variant="white" class="mt-4 mb-3">            

            <h3 v-if="includesGuidedPathway()" class="mt-4">To prepare the application for filing:</h3>

            <b-card v-if="includesGuidedPathway()" 
                style="border:1px solid #ddebed; border-radius:10px;" 
                bg-variant="white" 
                class="mt-4 mb-2">

                <span 
                    class="text-primary mb-2" 
                    style="display:block; font-size:1.4rem;">
                    Review your forms(s):
                </span> 
                <span>
                    If you are filing an affidavit, you will need to be prepared to
                    <tooltip :index="0" title='swear or affirm'/> in your affidavit. 
                    If you are filing the affidavit electronically, you can 
                    <tooltip :index="1" title='swear or affirm'/> the information 
                    during your court appearance.
                </span>           
            
                <other-form-list :type="eFiling?'Submit':'Print'" :currentPage="currentPage"/>

                <div name="pdf-guide" class="my-4 text-primary" @click="showGetHelpForPDF = true" style="cursor: pointer;border-bottom:1px solid; width:20.25rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help opening and saving PDF forms 
                </div>

                <div>    
                    Note: If you need to edit any of your answers, go back to the "Review Your Answers" page, edit the answer and return to this page.
                </div>
            </b-card>            
            
            <b-card 
                v-if="requiredDocumentLists.length>0" 
                style="border:1px solid #ddebed; border-radius:10px;" 
                bg-variant="white" 
                class="mt-4 mb-2">

                <other-required-forms-list :requiredDocumentLists="requiredDocumentLists"/>
                
                <b-card id="drop-area" @click="uploadClicked">                    
                    <div style="padding:0; margin: 0 auto; width:33px;">
                        <label class="btn btn-default btnfile">
                            <span style="font-size:20px; transform:translate(0,-17px);" class="fa fa-plus"></span>                            
                        </label>
                    </div>
                    <input id="inputfile" type="file" multiple style="display: none;" accept="application/pdf,image/x-png,image/jpeg" @change="handleSelectedFile" onclick="this.value=null;">
                    <p class="text-center m-0 text-info">Drag and Drop the PDF documents or JPG/PNG images here,</p>
                    <p class="text-center m-0 text-info" > or click here to Browse for files</p>
                </b-card>

                <b-card border-variant="white" body-class="mb-0 pb-0">
                    <h4 style="height: 2px; padding:0; margin:0 0 1.5rem 0;">Uploaded Documents:</h4>
                    <hr class="bg-light" style="height: 2px; padding:0; margin:0;"/> 
                </b-card>

                <b-card border-variant="white" bg-variant="white" no-body v-if="!supportingDocuments.length">
                    <span class="text-muted ml-4 mb-5">No uploaded documents.</span>
                </b-card>
                <b-card v-else no-body border-variant="white" bg-variant="white" id="supportingdocs">
                    <b-table 
                        :items="supportingDocuments"
                        :fields="supportingDocumentFields"
                        class="mx-0"
                        borderless                        
                        striped
                        small 
                        fixed>

                        <template v-slot:table-colgroup>
                            <col style="width:20rem">
                            <col style="width:10rem">
                            <col style="width:5rem">
                            <col style="width:6rem">
                        </template>

                        <template v-slot:cell(edit)="row">
                            <b-button size="sm" v-b-tooltip.hover.noninteractive = "'delete file'" style="border:0px;" variant="transparent" @click="removeDocument(row.index)">
                                <b-icon-trash-fill font-scale="1.75" variant="danger"></b-icon-trash-fill>                    
                            </b-button>
                        </template>
                        <template v-slot:cell(fileName)="row">                  
                            <span>{{row.item.fileName}}</span>
                        </template>
                        <template v-slot:cell(fileType)="row">                  
                            <span>{{row.item.documentType}}</span>
                        </template>
                        
                        <template v-slot:cell(preview)="data">                            
                            <embed v-if="data.item.file.type=='application/pdf'" style="float:right" :src="data.item.image" width="100" height="120" type="application/pdf">
                            <div style="float:right; margin-right:1rem;" v-else>
                                <b-row>
                                    <b-img  :style="{transform:'rotate('+data.item.imageRotation+'deg)'}" :src="data.item.image" width="100" height="100"  />
                                </b-row>
                                <b-row>
                                    <b-button size="sm" v-b-tooltip.hover.noninteractive.bottom = "'rotate image'"  style="width:3rem;height:1.2rem;padding:0; margin-right:0.25rem;" variant="info" @click="data.item.imageRotation=(data.item.imageRotation+270)%360">                                        
                                        <span class="fa fa-undo"></span>
                                    </b-button>
                                    <b-button size="sm" v-b-tooltip.hover.noninteractive.bottom = "'rotate image'" style="width:3rem;height:1.2rem;padding:0;" variant="info" @click="data.item.imageRotation=(data.item.imageRotation+90)%360">
                                        <span class="fa fa-undo" style="transform:rotateY(180deg)"></span>
                                    </b-button>                                    
                                </b-row>
                            </div>
                        </template>
                    </b-table>
                </b-card>

            </b-card>            

            <b-card v-if="eFiling" style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">
                <span class="text-primary" style="font-size:1.4rem;">Filing with Court Services Online:</span>

                <div class="mt-3">
                    <div class="mb-3">
                        When you click Submit Documents, you will be taken to the Court Services Online 
                        e-filing hub. In the next few steps you will be able to do a final review of 
                        the documents you are submitting for filing and (if completed successfully) receive a 
                        <div style="display:inline;">
                            <b style="display:inline;" v-b-tooltip.hover class="text-primary" title="A number assigned by the system to track the documents you have submitted for filing."> 
                                Package Number.
                                <div style="display:inline; font-size:1.2rem;" class="fa fa-question-circle"></div>
                            </b>
                        </div>
                    </div>
                    <p>
                        Once your filings have been reviewed by the Court Registry, you will be provided a Court File Number via e-mail. 
                        This may take up to one week.
                    </p>
                    <p style="font-weight: bold;">You will need your Court File Number if you are filing any additional documentation.</p>
                </div>

                <div v-if="error" style="margin:1rem auto; display: block;">
                    <b-badge class="bg-danger" style="margin:1rem auto; display: block;">{{error}}</b-badge>
                </div>                

                <div style="width:19rem; margin: 0 auto;" v-b-tooltip.hover.v-danger  :title="submitEnable? '':'Please review your application before submission'">
                    <loading-spinner v-if="submissionInProgress" waitingText="Waiting for eFiling Hub ..."/> 
                    <b-button v-else
                        :disabled="!isSubmissionReady || !submitEnable"                   
                        v-on:click.prevent="onSubmit()"                        
                        variant="success">
                            <span class="fa fa-paper-plane btn-icon-left"/>
                            Proceed to Submit
                    </b-button>                    
                    
                </div>
            </b-card>

            <b-card 
                v-else-if="!eFiling && this.includesGuidedPathway()" 
                style="border:1px solid #ddebed;border-radius:10px;" 
                bg-variant="white" 
                class="mt-4 mb-2">

                <span class="text-primary" style="font-size:1.4rem;">Submit Documents:</span>
                <ul class="mt-3">                    
                    <li>Bring all copies to the court registry for filing  
                        <br/> 
                        <p class="h4 mt-3 ml-2 mb-1" style="display:block"> {{applicantLocation.name}} </p>
                        <p class="my-0 ml-2 " style="display:block"> {{applicantLocation.address}} </p>
                        <p class="my-0 ml-2" style="display:block"> {{applicantLocation.postalCode}} </p>                
                    </li>
                </ul>
            </b-card>

        </b-card> 

        <b-modal size="xl" v-model="showGetHelpForPDF" header-class="bg-primary text-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 mt-2 ml-4">Get Help Opening and Saving PDF forms</h1> 
            </template>
            <get-help-for-pdf :isForm="true"/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpForPDF=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="primary" class="closeButton" @click="showGetHelpForPDF=false">&times;</b-button>
            </template>
        </b-modal>

        <b-modal size="lg" v-model="showTypeOfDocuments" hide-header-close hide-header>
            <b-card style="border-radius:10px" class="bg-light">
                <h1 class="text-center bg-primary text-white" style="border-radius:10px; width:35rem; margin:0 auto; padding:1rem 0;">Specify the Type of Document(s)</h1>
                <div v-if="supportingFile" class="h3 my-4 text-center"><div class="mb-3"> File Name(s): </div> <span v-for="(file,inx) in supportingFile" :key="inx" style="display:block;" class="my-2  p-0 h3 text-success"> {{file["name"]}} </span> </div>
                <b-form-group style="width:30rem; margin: 2rem auto;"> 
                    <b-form-select
                        id="documentType"
                        v-model="fileType"
                        :state = "selectedDocumentTypeState?null:false">
                        <b-form-select-option v-for="docType in fileTypes" :value="docType.type" :key="docType.type">{{docType.description}}</b-form-select-option>  
                    </b-form-select>
                </b-form-group> 
            </b-card>
            <template v-slot:modal-footer>                
                <b-button style="margin-left: 0;margin-right:auto;" variant="primary" @click="showTypeOfDocuments=false">Cancel</b-button>
                <b-button style="margin-left: auto;margin-right:0;" variant="success" @click="addDocument()">Submit</b-button>
            </template>            
          
        </b-modal>

    </page-base>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { namespace } from "vuex-class";  


    import PageBase from "@/components/steps/PageBase.vue";   
    import OtherRequiredFormsList from "./components/OtherRequiredFormsList.vue";  
    import GetHelpForPdf from "./helpPages/GetHelpForPDF.vue";
    import Tooltip from "@/components/survey/Tooltip.vue";
    import OtherFormList from "./components/OtherFormList.vue";
 
    import "@/store/modules/application";
    const applicationState = namespace("Application");

    import "@/store/modules/common";
    const commonState = namespace("Common");

    import { documentTypesJsonInfoType, locationsInfoType } from '@/types/Common';
    import { stepInfoType } from "@/types/Application";
    import { FLA_Types } from '@/filters/applicationTypes';
    import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';

    @Component({
        components:{
            PageBase,
            OtherRequiredFormsList,
            GetHelpForPdf,
            Tooltip,
            OtherFormList
        }
    })    
    export default class OtherFile extends Vue {
        
        @Prop({required: true})
        step!: stepInfoType;

        @applicationState.State
        public id!: string;

        @applicationState.State
        public steps!: stepInfoType[];       

        @applicationState.State
        public currentStep!: number;

        @applicationState.State
        public stPgNo!: stepsAndPagesNumberInfoType; 

        @commonState.State
        public documentTypesJson!: documentTypesJsonInfoType[];

        @commonState.State
        public userLocation!: string;

        @commonState.State
        public locationsInfo!: locationsInfoType[];

        @applicationState.State
        public supportingDocuments!: any;      
        
        @applicationState.State
        public applicationLocation!: string;

        @applicationState.Action
        public UpdateSupportingDocuments!: (newSupportingDocuments) => void

        @applicationState.Action
        public UpdateGotoPrevStepPage!: () => void

        @applicationState.Action
        public UpdateGotoNextStepPage!: () => void

        @applicationState.Action
        public UpdatePageProgress!: (newPageProgress) => void        

        @applicationState.Action
        public UpdateCommonStepResults!: (newCommonStepResults) => void

        dataReady = false;
        error = "";

        showGetHelpForPDF = false;
        applicantLocation = {} as locationsInfoType; 
       
        submissionInProgress = false;
        
        supportingFile = null;
        selectedDocumentTypeState = true;
        selectedSupportingDocumentState = true;
        fileType = "";
        fileTypes: documentTypesJsonInfoType[] = [];
        requiredDocumentLists: documentTypesJsonInfoType[] = [];
        eFiling = false;       

        supportingDocumentFields = [
            { key: 'fileName', label: 'File Name',tdClass:'align-middle'},
            { key: 'fileType', label: 'File Type',tdClass:'align-middle'},
            { key: 'edit', thClass: 'd-none',tdClass:'align-middle'},
            { key: 'preview', thClass: 'd-none'}
        ];
             
        showTypeOfDocuments = false;
        submitEnable = true;
        currentPage=0;

        mounted(){

            this.dataReady = false;
            this.eFiling = false;            

            this.submitEnable =  true;
            const progress = 50;
            
            this.currentPage = Number(this.steps[this.currentStep].currentPage)
            this.UpdatePageProgress({ currentStep: this.currentStep, currentPage: this.currentPage, progress: progress });
            
            const otherFormFamilyTypes = ["AFF", "APS", "APSP", "CSV", "CONA", "COR", "CIFT", "EFSP", "FF", "FS", "GA", "NAC", "DIS", "NCD", "NDT", "PASE", "NPR", "NLC", "NLP", "NP", "NLCR", "NLPR", "ORD", "REF", "RQS", "RFS", "RPS", "TRIS", "SUM", "SCH", "SDH", "REQ", "RFT"];
            const otherForms = FLA_Types.filter(type => otherFormFamilyTypes.includes(type.familyType));
            this.fileTypes = [];             
            
            for (const otherForm of otherForms){
                if (this.documentTypesJson.filter(docType => docType.type == otherForm.pdfType).length>0){
                    this.fileTypes.push({description: otherForm.fullName, type: otherForm.pdfType})
                }
            }

            this.extractInfo();
            this.dataReady = true;

            Vue.nextTick().then(()=>{
                const dropArea = document.getElementById('drop-area');
                dropArea.addEventListener('drop', this.handleFileDrop, false);
                dropArea.addEventListener('dragenter', this.dragPreventDefaults, false);
                dropArea.addEventListener('dragleave', this.dragPreventDefaults, false);
                dropArea.addEventListener('dragover', this.dragPreventDefaults, false);             
            
            });
           
            // const dropArea = document.getElementById('drop-area');
            // dropArea.addEventListener('drop', this.handleFileDrop, false);
            // dropArea.addEventListener('dragenter', this.dragPreventDefaults, false);
            // dropArea.addEventListener('dragleave', this.dragPreventDefaults, false);
            // dropArea.addEventListener('dragover', this.dragPreventDefaults, false);              
            
        }

        public dragPreventDefaults (e) {
            e.preventDefault()
            e.stopPropagation()
        }

        public handleFileDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            const dt = e.dataTransfer
            const files = dt.files

            if (files && files[0]) 
            {
                this.supportingFile = files;                
                this.showTypeOfDocuments= true;
            }
        } 

        public uploadClicked(){
            const el = document.getElementById("inputfile");
            if(el) el.click();
        }

        public handleSelectedFile(event){

            event.preventDefault();
            event.stopPropagation();
            
            if (event.target.files && event.target.files[0]) 
            {
                this.supportingFile = event.target.files;
                
                this.showTypeOfDocuments= true;
            }
        }

        get isSubmissionReady(){ 
            
            if (this.requiredDocumentLists.length > 0){

                if (this.supportingDocuments.length == 0){
                    return false;
                } else {

                    const supportingDocumentTypes = this.supportingDocuments.map(doc => doc.documentType)

                    for (const doc of this.requiredDocumentLists){
                        
                        if (!supportingDocumentTypes.includes(doc.type)) return false;
                    }
                    return true;
                }

            } else {
                return true;
            }
            
        }
        
        public onPrev() {
            Vue.prototype.$UpdateGotoPrevStepPage()
        }

        public onNext() {
            Vue.prototype.$UpdateGotoNextStepPage()
        }        

        public onSubmit() {
            this.eFile();                       
        }

        public eFile() {
            //TODO: update the submittedPdfList to include the standalone forms
            const stepGETSTART = this.steps[this.stPgNo.GETSTART._StepNo].result;
            let submittedPdfList = [];

            if (stepGETSTART?.submittedPdfList){
                submittedPdfList = stepGETSTART.submittedPdfList;
            }      
            
            const supportingDocTypes = this.supportingDocuments.map(form => form.documentType)            

            this.UpdateCommonStepResults({data:{'submittedPdfList':Array.from(new Set(submittedPdfList.concat(supportingDocTypes)))}});
            Vue.nextTick().then(()=>{Vue.prototype.$saveChanges();});


            this.error = "";
            const bodyFormData = new FormData();
            const docType = []
            const lastFileTypes = this.supportingDocuments[this.supportingDocuments.length-1]?this.supportingDocuments[this.supportingDocuments.length-1].typeIndex:0
          
            let fileIndex = 0;
            for(const filetype of lastFileTypes){
            
                const tempSupportingDocs = this.supportingDocuments.filter(doc=>{return(doc.documentType==filetype)})
            
                if(tempSupportingDocs.length>0){
                    const filesIndices = [];
                    const filesRotation = [];
                    for(const supportingDoc of tempSupportingDocs){
                        bodyFormData.append('files',supportingDoc['file']);
                        filesIndices.push(fileIndex)
                        filesRotation.push(supportingDoc['imageRotation'])
                        fileIndex++;
                    }
                    docType.push({type: tempSupportingDocs[0]['documentType'], files: filesIndices, rotations:filesRotation})
                }
            }
            
            docType.push({type:"FPO"})
            
            const docTypeJson = JSON.stringify(docType);
            bodyFormData.append('documents', docTypeJson);    
            
            let url = "";
            if (this.includesGuidedPathway()){
                url = "/efiling/"+this.id+"/submit/";
            } else {
                url = "/efiling/"+this.id+"/submit/?standalone=true"; 
            }
            
            const header = {
                responseType: "json",
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json"                  
                }
            }
            
            this.submissionInProgress = true;

            // Vue.nextTick().then(()=>{

            setTimeout(()=>{
            
                this.$http.post(url, bodyFormData, header)
                .then(res => {

                    if(res?.data?.message=="success")
                    {
                        this.generateUrl(res.data.redirectUrl)                   
                    }
                }, err => {
                    this.error = err.response.data.message;
                    this.submissionInProgress = false;
                });         
            }, 50)  
        }
        
        public generateUrl(eFilingUrl) {            
            // redirect user to the generated url
            location.replace(eFilingUrl);        
        }      

        public removeDocument(index) {
            this.supportingDocuments.splice(index, 1);
        }
        
        public addDocument() {
            this.selectedSupportingDocumentState = this.supportingFile? true:false;
            this.selectedDocumentTypeState = this.fileType.length>0? true: false;

            if (this.supportingFile && this.fileType.length>0) {

                this.showTypeOfDocuments = false;

                const supportingdocuments = this.supportingDocuments 
                const typeIndex =  this.supportingDocuments[this.supportingDocuments.length-1]?this.supportingDocuments[this.supportingDocuments.length-1].typeIndex:[]
                if(!typeIndex.includes(this.fileType))
                    typeIndex.push(this.fileType)
                
                for(const supportingfile of this.supportingFile){
               
                    const newFile = {
                        "fileName": supportingfile.name,
                        "file": supportingfile,
                        "documentType": this.fileType,
                        "image": URL.createObjectURL(supportingfile),
                        "imageRotation": 0,
                        "typeIndex":typeIndex
                    }
                    supportingdocuments.push(newFile);
                }

                this.UpdateSupportingDocuments(supportingdocuments);
                this.supportingFile = null;
                this.fileType = "";
                Vue.nextTick(()=>{
                    const el = document.getElementById('drop-area');
                    if(el) el.scrollIntoView();
                })
            }
        }

        public extractInfo(){

            let location = this.applicationLocation
            if(!this.applicationLocation) location = this.userLocation;

            this.applicantLocation = this.locationsInfo.filter(loc => {if (loc.name == location) return true})[0]              
           
            const otherFormsStepResults = this.steps[this.stPgNo.OTHER._StepNo].result;  
            this.eFiling = otherFormsStepResults?.otherFormsSurvey?.data?.filingMethod == 'eFile'; 
            this.requiredDocumentLists = [];

            const includesOtherForms = this.steps[this.stPgNo.GETSTART._StepNo].result?.otherForms;
            const completeOtherFormsPageResults = this.steps[this.stPgNo.OTHER._StepNo].result?.completeOtherFormsSurvey?.data;
            const selectedFormInfoList = completeOtherFormsPageResults?.selectedFormInfoList?completeOtherFormsPageResults.selectedFormInfoList:[];

            if (includesOtherForms && selectedFormInfoList.length>0){

                for (const selectedForm of selectedFormInfoList){                
                    if (selectedForm.manualState){                       
                        const name = Vue.filter('getFullOrderName')(selectedForm.pathwayName, '');
                        const pdfType = Vue.filter('getPathwayPdfType')(selectedForm.pathwayName, '');
                        this.requiredDocumentLists.push({description: name, type: pdfType});                       
                    }            
                }
            }           

        }

        public includesGuidedPathway(){

            const completeOtherFormsPageResults = this.steps[this.stPgNo.OTHER._StepNo].result?.completeOtherFormsSurvey?.data;

            const selectedFormInfoList = completeOtherFormsPageResults?.selectedFormInfoList?completeOtherFormsPageResults.selectedFormInfoList:[];

            let includesGuided = false;
            for (const selectedForm of selectedFormInfoList){
                
                if (selectedForm.pathwayExists && selectedForm.pathwayState){
                    includesGuided = true;
                    break;
                }            
            }
            return includesGuided;
        }   

        public navigateToGuide(){
            Vue.filter('scrollToLocation')("pdf-guide");
        }         

    }
</script>

<style scoped> 

    .btnfile {
        margin:0 0 0.5rem 0;
        padding: 0;
        width: 25px;
        height: 25px;       
        border-radius: 17px; 
        background: rgb(4, 153, 49);
        font-size: 30px;
        color: white;
    }
    .btnfile:hover {
        background-color: #103c6b;
        color: white;
    }
    
    #drop-area {
        border: 2px dashed #ccc;
        border-radius: 20px;        
        margin: 10px 1.5rem;
        padding: 0;
    }
    #drop-area.highlight {
    border-color: purple;
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

</style>