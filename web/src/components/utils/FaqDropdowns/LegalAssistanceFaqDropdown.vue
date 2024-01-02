<template>
    <div>
        <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
            <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
            <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
            <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
        </div>
        <legal-assistance-faq v-if="showLegalAssistance"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import LegalAssistanceFaq from "@/components/utils/LegalAssistanceFaq.vue";

    @Component({
        components:{       
            LegalAssistanceFaq
        }
    })
    export default class LegalAssistanceFaqDropdown extends Vue {
        showLegalAssistance = false;
    }
</script>

