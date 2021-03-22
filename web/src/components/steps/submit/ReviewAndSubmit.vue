<template>   
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        
        <h2 class="mt-4">Review and Submit</h2>
        <b-card style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-3">
            
            <div class="ml-0">
                You have indicated that you will file at the following court registry:
                <p class="h3 mt-2 ml-0 mb-1" style="display:block"> {{applicantLocation.name}} </p>                
            </div>
            
            <h3 class="mt-4">To prepare the application for filing:</h3>

            <b-card style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary mb-2" style="display:block; font-size:1.4rem;">Review your application:</span> 
                <span>If you are filing your application by electronically and you are asking for a protection order in your application, you will need to be prepared to 
                    <tooltip :index="0" title='swear or affirm'/> the information in your application during your court appearance. 
                </span>           
            
                <b-card style="margin:2rem 0;border-radius:10px; border:2px solid #AAAAFF;">
                    <div style="float:left; margin: 0.5rem 1rem;color:#3434eb; font-size:20px; font-weight:bold;" > Application About a Protection Order (FORM K)</div>
                    <b-button 
                        style="float:right; margin: 0.25rem 1rem;"                  
                        v-on:click.prevent="onDownload()"
                        variant="success">
                            <span class="fa fa-print btn-icon-left"/>
                            Review and Print
                    </b-button>
                </b-card>

                <div class="my-4 text-primary" @click="showGetHelpForPDF = true" style="cursor: pointer;border-bottom:1px solid; width:20.25rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help opening and saving PDF forms 
                </div>

                <div>    
                    Note: If you need to edit any of your answers, go back to the "Review Your Answers" page, edit the answer and return to this page.
                </div>
            </b-card>

            <b-card v-if="requiredDocuments.length > 0" style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Additional Documents to Include:</span> 

                <div>The following additional documents are required as part of your filing:</div>
                <ul class="mt-3">
                    <li class="mb-2" v-for="requiredDocument in requiredDocuments" :key="requiredDocument">{{requiredDocument}}</li>
                </ul>

            </b-card>

            <b-card style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Upload Documents:</span>

                <div class="ml-2">                     
                    <ul class="mt-3">
                        <li class="mb-2">Collect any existing orders or agreements, existing protection orders and any exhibits referenced in your application </li>
                        <li>Scan and save an electronic copy of any existing orders or agreements, existing protection orders and any exhibits referenced in your application to your computer</li>
                        <div class="my-3 text-primary" @click="showGetHelpScanning = true" style="cursor: pointer;border-bottom:1px solid; width:15.7rem;">
                            <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help scanning documents 
                        </div>
                        <li>Upload the documents bellow:</li>
                    </ul>
                </div>
                
                <!-- <b-img v-for="(supportingDocument,index) in supportingDocuments" :key="index" :src="supportingDocument.image" width="100" height="100"  /> -->
                
                <b-card id="drop-area" @click="uploadClicked">                    
                    <div style="padding:0; margin: 0 auto; width:33px;">
                        <label class="btn btn-default btnfile">
                            <span style="font-size:20px; transform:translate(0,-17px);" class="fa fa-plus"></span>                            
                        </label>
                    </div>
                    <input id="inputfile" type="file" multiple style="display: none;" accept="application/pdf,image/x-png,image/jpeg" @change="handleSelectedFile" onclick="this.value=null;">
                    <p class="text-center m-0 text-info">Drag and Drop the PDF documents or JPG/PNG images here,</p>
                    <p class="text-center m-0 text-info" style=""> or click here to Browse for files</p>
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

            <b-card style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">
                <span class="text-primary" style='font-size:1.4rem;'>Filing with Court Services Online:</span>

                <div class="mt-3">
                    <p>When you click Submit Documents, you will be taken to the Court Services Online e-filing hub. In the next few steps you will be able to do
                        a final review of the documents you are submitting for filing and (if completed successfully) receive a Package Number.
                    </p>
                    <p>Once your filings have been reviewed by the Court Registry, you will be provided a Court File Number via e-mail. 
                        This may take up to one week.
                    </p>
                    <p style="font-weight: bold;">You will need your Court File Number if you are filing any additional documentation.</p>
                </div>

                <div style="width:19rem; margin: 0 auto;" v-b-tooltip.hover.v-danger  :title="submitEnable? '':'Please review your application before submission'">
                    <loading-spinner v-if="submissionInProgress" /> 
                    <b-button v-else
                        :disabled="!submitEnable"                   
                        v-on:click.prevent="onSubmit()"                        
                        variant="success">
                            <span class="fa fa-paper-plane btn-icon-left"/>
                            Proceed to Submit
                    </b-button>
                    
                </div>
            </b-card>

        </b-card>        

        <b-modal size="xl" v-model="showGetHelpForPDF" header-class="bg-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">Get Help Opening and Saving PDF forms</h1> 
            </template>
            <get-help-for-pdf/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpForPDF=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-dark" class="closeButton" @click="showGetHelpForPDF=false">&times;</b-button>
            </template>
        </b-modal>

        <b-modal size="xl" v-model="showGetHelpScanning" header-class="bg-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">Get Help Scanning Documents</h1> 
            </template>
            <get-help-scanning/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpScanning=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-dark" class="closeButton" @click="showGetHelpScanning=false">&times;</b-button>
            </template>
        </b-modal>

        <b-modal size="lg" v-model="showTypeOfDocuments" hide-header-close hide-header>
            <b-card style="border-radius:10px" class="bg-light">
                <h1 class="text-center bg-primary text-white" style="border-radius:10px; width:35rem; margin:0 auto; padding:1rem 0;">Specify the Type of Document(s)</h1>
                <div v-if="supportingFile" class="h3 my-4 text-center"><div class="mb-3"> File Name(s): </div> <span v-for="(file,inx) in supportingFile" :key="inx" style="display:block;" class="my-2  p-0 h3 text-danger"> {{file.name}} </span> </div>
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
            <!-- <template v-slot:modal-header-close>                 
                <b-button variant="outline-dark" class="closeButton" @click="showTypeOfDocuments=false">&times;</b-button>
            </template> -->
        </b-modal>

    </page-base>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import moment from 'moment-timezone';
    import Tooltip from "@/components/survey/Tooltip.vue"
    
    import { stepInfoType } from "@/types/Application";
    import PageBase from "../PageBase.vue";    
    import GetHelpForPdf from "./helpPages/GetHelpForPDF.vue"
    import GetHelpScanning from "./helpPages/GetHelpScanning.vue"    

    import { namespace } from "vuex-class";   
    import "@/store/modules/application";
    const applicationState = namespace("Application");

    import "@/store/modules/common";
    const commonState = namespace("Common");


    @Component({
        components:{
            PageBase,
            GetHelpForPdf,
            GetHelpScanning,
            Tooltip
        }
    })
    
    export default class ReviewAndSubmit extends Vue {
        
        @Prop({required: true})
        step!: stepInfoType;

        @commonState.State
        public userLocation!: string;

        @applicationState.State
        public id!: string;

        @applicationState.State
        public steps!: stepInfoType[];

        @applicationState.State
        public applicationLocation!: string;

        @applicationState.State
        public protectedPartyName!: string;

        @applicationState.State
        public currentStep!: number;

        @applicationState.State
        public documentTypesJson!: any;

        // @applicationState.State
        // public requiredDocuments!: string[];

        @applicationState.State
        public supportingDocuments!: any;
        @applicationState.Action
        public UpdateSupportingDocuments!: (newSupportingDocuments) => void


        @applicationState.Action
        public UpdateGotoPrevStepPage!: () => void

        @applicationState.Action
        public UpdateGotoNextStepPage!: () => void

        @applicationState.Action
        public UpdateCurrentStep!: (newCurrentStep) => void

        @applicationState.Action
        public UpdateCurrentStepPage!: (newCurrentStepPage) => void

        @applicationState.Action
        public UpdatePageProgress!: (newPageProgress) => void        

        @applicationState.Action
        public UpdateLastPrinted!: (newLastPrinted) => void

        @applicationState.Action
        public UpdateLastFiled!: (newLastFiled) => void


        error = "";
        showGetHelpForPDF = false;
        showGetHelpScanning = false;
        applicantLocation = {name:'', address:'', cityStatePostcode:'', email:''}        
        submissionInProgress = false;
        
        supportingFile = null;
        selectedDocumentTypeState = true;
        selectedSupportingDocumentState = true;
        fileType = "";
        fileTypes = [];
        requiredDocuments: string[] = [];
        supportingDocumentFields = [
            { key: 'fileName', label: 'File Name',tdClass:'align-middle'},
            { key: 'fileType', label: 'File Type',tdClass:'align-middle'},
            { key: 'edit', thClass: 'd-none',tdClass:'align-middle'},
            { key: 'preview', thClass: 'd-none'}
        ];
       
        showTypeOfDocuments = false;

        submitEnable = true;

        mounted(){

            this.submitEnable =  true;
            const progress = 50;

            //console.log(this.currentStep)
            //console.log(this.steps[this.currentStep])
            this.UpdatePageProgress({ currentStep: this.currentStep, currentPage:this.steps[this.currentStep].currentPage, progress:progress });
       
            let location = this.applicationLocation
            if(!this.applicationLocation) location = this.userLocation;
       

            if(location == 'Victoria'){
                this.applicantLocation = {name:'Victoria Law Courts', address:'850 Burdett Avenue', cityStatePostcode:'Victoria, B.C.  V8W 9J2', email:'Victoria.CourtScheduling@gov.bc.ca'}
            } else if(location == 'Surrey'){
                this.applicantLocation = {name:'Surrey Provincial Court', address:'14340 - 57 Avenue', cityStatePostcode:'Surrey, B.C.  V3X 1B2', email:'CSBSurreyProvincialCourt.FamilyRegistry@gov.bc.ca'}
            }
            //TODO: use get api for document-types
           
            this.fileTypes = this.documentTypesJson;
            this.requiredDocuments = Vue.filter('extractRequiredDocuments')(this.getFPOResultData())

            const dropArea = document.getElementById('drop-area');
            dropArea.addEventListener('drop', this.handleFileDrop, false);
            dropArea.addEventListener('dragenter', this.dragPreventDefaults, false);
            dropArea.addEventListener('dragleave', this.dragPreventDefaults, false);
            dropArea.addEventListener('dragover', this.dragPreventDefaults, false);            
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
            console.log(files)
            if (files && files[0]) 
            {
                this.supportingFile = files;
                this.showTypeOfDocuments= true;
            }
        } 

        public uploadClicked(){
            console.log('click')
            const el = document.getElementById("inputfile");
            if(el) el.click();
        }

        public handleSelectedFile(event){
            console.log(event)
            event.preventDefault();
            event.stopPropagation();
            console.log(event.target.files[0])
            
            if (event.target.files && event.target.files[0]) 
            {
                this.supportingFile = event.target.files;
                this.showTypeOfDocuments= true;
            }
        }
        
        public onPrev() {
            this.UpdateGotoPrevStepPage()
        }

        public onNext() {
            this.UpdateGotoNextStepPage()
        }

        public onDownload() {
            console.log('downloading')
            if(this.checkErrorOnPages()){
                const currentDate = moment().format();
                this.UpdateLastPrinted(currentDate);
                this.loadPdf(false);
            }
        }

        public checkErrorOnPages(){
            
            const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit"]

            for(const step of this.steps){
                if(step.active){
                    for(const page of step.pages){
                        if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                            this.UpdateCurrentStep(step.id);
                            this.UpdateCurrentStepPage({currentStep: step.id, currentPage: page.key });
                            // const nextChildGroup = document.getElementById(this.getStepGroupId(step.id));
                           
                            // if(nextChildGroup){
                            //     if(Number(step.id)==8){
                            //         nextChildGroup.style.display = "none";
                            //         Vue.nextTick(()=>nextChildGroup.style.display = "block")
                            //     }else{
                            //         nextChildGroup.style.display = "block";
                            //     }
                            // }
                        
                            return false;
                        }
                    }
                }
                
            }
            return true;
        }

        public getStepId(stepIndex) {
            return "step-" + stepIndex;
        }

        public getStepGroupId(stepIndex) {
            return this.getStepId(stepIndex) + "-group";
        }

        public getStepPageId(stepIndex, pageIndex) {
            return this.getStepId(stepIndex) + "-page-" + pageIndex;
        }

        public loadPdf(noDownload) {
            
            const url = '/survey-print/'+this.id+'/?name=application-about-a-protection-order'+(noDownload?'&noDownload=true':'');
            const body = this.getFPOResultData()
            const options = {
                responseType: "blob",
                headers: {
                "Content-Type": "application/json",
                }
            }
            //console.log(body)
            this.$http.post(url,body, options)
            .then(res => {
                console.log('done')
                if(noDownload)
                    this.eFile();
                else
                {
                    const blob = res.data;
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    document.body.appendChild(link);
                    link.download = "fpo.pdf";
                    link.click();
                    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
                    this.error = "";                    
                }
                //this.submitEnable =  true;
            },err => {
                console.error(err);
                this.error = "Print failed, please try again.";                
            });

        }

        public getFPOResultData() {      
            var result = this.steps[0].result; 
            for(var i=1;i<9; i++){
                const stepResults = this.steps[i].result
                for(const stepResult in stepResults){                    
                    result[stepResult]=stepResults[stepResult].data;  
                }
            } 
            
            var protectedPartyName = {protectedPartyName: this.protectedPartyName}
            Object.assign(result, result, protectedPartyName);           
           
            if(this.applicationLocation)
                Object.assign(result, result,{applicationLocation: this.applicationLocation}); 
            else
                Object.assign(result, result,{applicationLocation: this.userLocation});
            return result;
        }

        public onSubmit() {
            if(this.checkErrorOnPages()){
                this.loadPdf(true);
            }            
        }

        public eFile() {
            
            const bodyFormData = new FormData();
            const docType = []

            console.log(this.supportingDocuments[this.supportingDocuments.length-1])
            const lastTypeIndex = this.supportingDocuments[this.supportingDocuments.length-1]?this.supportingDocuments[this.supportingDocuments.length-1].typeIndex:0
            
            //console.log(lastTypeIndex)
            let fileIndex = 0;
            for(let typeIndex=1; typeIndex<=lastTypeIndex; typeIndex++){
                console.log(typeIndex)
                const tempSupportingDocs = this.supportingDocuments.filter(doc=>{return(doc.typeIndex==typeIndex)})
                console.log(tempSupportingDocs)
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

            // for(const index in this.supportingDocuments){
            //     const supportingDoc = this.supportingDocuments[index]
            //     bodyFormData.append('files',supportingDoc['file']); 
                          
            //     docType.push({type: supportingDoc['documentType'], files: [Number(index)], rotations:[supportingDoc['imageRotation']]})
            //    // bodyFormData.append('documents', );
            //    // console.log(supportingDoc['imageRotation'])
            // }
            console.log(docType);
            const docTypeJson = JSON.stringify(docType);
            //const docTypeBlob = new Blob([docTypeJson], {type: 'application/json'});
            bodyFormData.append('documents', docTypeJson);
            

            console.log(bodyFormData.get('documents'))

            const url = "/efiling/"+this.id+"/submit/" 
            const header = {
                responseType: "json",
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json"                  
                }
            }
            
            this.submissionInProgress = true;
            
            this.$http.post(url, bodyFormData, header)
            .then(res => {
                console.log(res)
                if(res.data.message=="success")
                {
                    this.generateUrl(res.data.redirectUrl)                   
                }
            }, err => {
                console.error(err);
                this.error = err;
                this.submissionInProgress = false;
            });           
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
                let typeIndex =  this.supportingDocuments[this.supportingDocuments.length-1]?this.supportingDocuments[this.supportingDocuments.length-1].typeIndex:0
                typeIndex++
                console.log(typeIndex)
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
                
                const el = document.getElementById('drop-area');
                console.log(el)
                if(el) el.scrollIntoView();
            }
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
   


</style>