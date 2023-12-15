<template>
    <div>
        <div class="m-4 text-primary" @click="showAssistance= !showAssistance" style="border-bottom:1px solid; width:52rem;">
            <span style='font-size:1.2rem;' class="fa fa-question-circle" /> 
            I want to share ownership and possession of our companion animal. How can we reach an agreement?
            <span v-if="showAssistance" class='ml-2 fa fa-chevron-up'/>
            <span v-if="!showAssistance" class='ml-2 fa fa-chevron-down'/>
        </div>
        <div class="mx-4 mb-5"  v-if="showAssistance">
            Section 92 of the 
            <a href='https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_01#section1' target='_blank'>Family Law Act</a> 
            provides that spouses may make agreements respecting the division of property, including agreements to: 
            <ul>
                <li>
                    jointly own a companion animal, 
                </li>
                <li>
                    share possession of a companion animal, or
                </li>
                <li>
                    give exclusive ownership or possession of a companion animal to one of the spouses.
                </li>
            </ul> 
            If you and your spouse want to try to reach an agreement about a companion animal, 
            including an agreement to share ownership or possession, you can find more information about 
            how to reach an agreement on the 
            <a href='https://www2.gov.bc.ca/gov/content?id=2E2E5D3F5CDB44618BE43EEDE79B6DBB' target='_Blank'>BC Government website</a>.
        </div>
        
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    
    @Component
    export default class PossessionCompanionFaqDropdown extends Vue {
        showAssistance = false;
    }
</script>

