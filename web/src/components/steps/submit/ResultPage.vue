<template>
    <div>
        <SuccessPage :packageInfo="packageInfo" v-if="result=='success'"/>
        <CancelPage v-if="result=='cancel'" />
        <UnsuccessPage :packageInfo="packageInfo" v-if="result=='error'" />
    </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import SuccessPage from "./ResultPages/SuccessPage.vue"
import CancelPage from "./ResultPages/CancelPage.vue"
import UnsuccessPage from "./ResultPages/UnsuccessPage.vue"

@Component({
    components:{        
        SuccessPage,
        CancelPage,
        UnsuccessPage
    }
})
export default class ResultPage extends Vue {

    result = ""
    packageInfo = {fileNumber: "", packageNumber:"", eFilingUrl:"", msg:""}
    
    mounted(){
        const result = this.$route.params.result;
        const applicationId = this.$route.params.id;

        this.result = "";
        this.packageInfo = {fileNumber: applicationId, packageNumber:"", eFilingUrl:"", msg:"Missing Parameters"}                
        
        if (result == "success"){

            this.result = "error"
            const packageRef = this.$route.query?.packageRef; 
            
            if(packageRef){
                const packageUrl = atob(String(packageRef));
                const urlParams = new URLSearchParams(packageUrl.split('?')[1]);
                const packageNumber = urlParams.get('packageNo')
                if(packageNumber){
                    this.packageInfo = {fileNumber: applicationId, packageNumber:packageNumber, eFilingUrl:packageUrl, msg:""}
                    this.result = result;
                }               
            }
        } 
        else if (result == "cancel") {
            this.result = result;
        } 
        else  {
            const packageMessage = this.$route.query?.message
            this.packageInfo.msg = packageMessage? String(packageMessage): "An error occured while submitting your application."
            this.result = "error";
        }
    }

}
</script>