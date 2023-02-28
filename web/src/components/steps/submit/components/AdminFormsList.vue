<template>
    <div>

        <span class="text-primary" style="font-size:1.4rem;">Completed forms to include:</span> 

        <div class="h4" style="margin:2rem 0.1rem;">
            <ul class="mt-3" v-for="requiredDocument,index in requiredDocumentLists" :key="index" >
                <li class="mb-2">
                    {{requiredDocument.description}}
                </li>                        
            </ul>
        </div>
        <span class="text-primary" style="font-size:1.4rem;">
            Upload the documents below:
        </span>
        
    </div> 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { documentTypesJsonInfoType } from '@/types/Common';

@Component
export default class AdminFormsList extends Vue {    

    @Prop({required: true})
    requiredDocumentLists!: documentTypesJsonInfoType[];   
   
}
</script>