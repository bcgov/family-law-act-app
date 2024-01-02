<template>
    <div>
        <div class="m-4 text-primary" @click="showAssistance= !showAssistance" style="border-bottom:1px solid; width:22rem;">
            <span style='font-size:1.2rem;' class="fa fa-question-circle" /> 
            What if the other party isn’t my spouse?
            <span v-if="showAssistance" class='ml-2 fa fa-chevron-up'/>
            <span v-if="!showAssistance" class='ml-2 fa fa-chevron-down'/>
        </div>
        <div  class="mx-4 mb-5" v-if="showAssistance">
            If you’re not a “spouse”, you may be able to resolve your dispute about a companion animal 
            by agreement or by going to the Civil Resolution Tribunal.
            <br><br>
            The Family Law Act can only be used to resolve disputes about property division in respect of 
            a companion animal if the parties were spouses.
            <br><br>
            You’re a “spouse” if: 
            <ul>
                <li>
                    you were legally married to your former partner, or 
                </li>
                <li>
                    you were unmarried but lived together in a marriage-like relationship for two 
                    or more years with your former partner.
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    

    @Component
    export default class OtherPartyNotSpouseFaqDropdown extends Vue {
        showAssistance = false;
    }
</script>

