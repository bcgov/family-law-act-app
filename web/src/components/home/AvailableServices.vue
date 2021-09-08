<template>
 
    <b-card class="border-white ml-5 mt-5" >
        <h1 class="text-primary">Family Law Act Protection Orders</h1>
        <b-card class="border-white" style="font-size: 20px;">
            <b-row class="mb-3">This service is currently available for Surrey Provincial Court and Victoria Law Courts.</b-row>
            <b-row class="mb-3">If you need a Protection Order in another location, please review the following links:</b-row>
            
            <ul>
                <li class="mb-3"><a href='https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/keeping-your-family-safe' target="_blank">
                    Keeping your family Safe
                    </a>
                </li>
                <li class="mb-3"><a 
                    href='https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms/prov-family-forms?keyword=provincial&keyword=family&keyword=court&keyword=forms' 
                    target="_blank">
                    Provincial Court Forms
                    </a>
                </li>
                <li><a 
                    href='https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms/sup-family-forms?keyword=Supreme&keyword=Court&keyword=Family&keyword=Forms' 
                    target="_blank">
                    Supreme Court Forms
                    </a>
                </li>
            </ul>
           
        </b-card>
      
    </b-card>

</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
@Component
export default class AvailableServices extends Vue {
  
};
</script>

<style scoped lang="scss">
</style>