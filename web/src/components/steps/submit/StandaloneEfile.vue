<template>   
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        
        <h2 class="mt-4">Submit</h2>
        <b-card style="border-radius:10px;" bg-variant="white" class="mt-4 mb-3">            

            <b-card style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <admin-forms-list :requiredDocumentLists="requiredDocumentLists" title="Upload Documents:" />
                
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

            <b-card style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">
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

        </b-card> 

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
    import AdminFormsList from "./components/AdminFormsList.vue";  
 
    import "@/store/modules/application";
    const applicationState = namespace("Application");

    import "@/store/modules/common";
    const commonState = namespace("Common");

    import { documentTypesJsonInfoType } from '@/types/Common';
    import { stepInfoType } from "@/types/Application";
    import { FLA_Types } from '@/filters/applicationTypes';
    import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';

    @Component({
        components:{
            PageBase,
            AdminFormsList
        }
    })    
    export default class StandaloneEfile extends Vue {
        
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

        @applicationState.State
        public supportingDocuments!: any;        

        @applicationState.Action
        public UpdateSupportingDocuments!: (newSupportingDocuments) => void

        @applicationState.Action
        public UpdateGotoPrevStepPage!: () => void

        @applicationState.Action
        public UpdateGotoNextStepPage!: () => void

        @applicationState.Action
        public UpdatePageProgress!: (newPageProgress) => void        

        error = "";
       
        submissionInProgress = false;
        
        supportingFile = null;
        selectedDocumentTypeState = true;
        selectedSupportingDocumentState = true;
        fileType = "";
        fileTypes: documentTypesJsonInfoType[] = [];
        requiredDocumentLists: documentTypesJsonInfoType[] = [];

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

            this.submitEnable =  true;
            const progress = 50;
            
            this.currentPage = Number(this.steps[this.currentStep].currentPage)
            this.UpdatePageProgress({ currentStep: this.currentStep, currentPage: this.currentPage, progress: progress });


            const adminForms = FLA_Types.filter(type => type.familyType == "ADMIN");
            this.fileTypes = [];            
            
            for (const adminForm of adminForms){
                if (this.documentTypesJson.filter(docType => docType.type == adminForm.pdfType).length>0){
                    this.fileTypes.push({description: adminForm.fullName, type: adminForm.pdfType})
                }
            }

            this.getRequiredDocuments();
           
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

            if (this.supportingDocuments.length == 0){
                return false;
            } else {

                const supportingDocumentTypes = this.supportingDocuments.map(doc => doc.documentType)

                for (const doc of this.requiredDocumentLists){
                    
                    if (!supportingDocumentTypes.includes(doc.type)) return false;
                }
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
            
            // docType.push({type:"FPO"})
            
            const docTypeJson = JSON.stringify(docType);
            bodyFormData.append('documents', docTypeJson);          

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

                if(res?.data?.message=="success")
                {
                    this.generateUrl(res.data.redirectUrl)                   
                }
            }, err => {
                this.error = err.response.data.message;
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

        public getRequiredDocuments(){

            this.requiredDocumentLists = [];

            const includesAdminForms = this.steps[this.stPgNo.GETSTART._StepNo].result?.administrativeForms;
            const selectedForms = this.steps[this.stPgNo.ADMIN._StepNo].result?.adminFormsSurvey?.data?this.steps[this.stPgNo.ADMIN._StepNo].result.adminFormsSurvey.data:[];

            const requiredDocuments = (includesAdminForms && selectedForms.length > 0)?selectedForms:[];
                        
            for(const requiredDoc of requiredDocuments){

                const name = Vue.filter('getFullOrderName')(requiredDoc, '');
                const pdfType = Vue.filter('getPathwayPdfType')(requiredDoc, '');
                this.requiredDocumentLists.push({description: name, type: pdfType});
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