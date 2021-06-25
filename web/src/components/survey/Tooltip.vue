<template>
    <div class="customtooltip">
        <div style="display:inline" :id="title+index">
            {{title}}
            <b-badge
                
                class="custombadge">?
            </b-badge>
        </div>

        <b-tooltip :target="title+index" :placement="placement">
            <div style="text-align: justify;" v-html="description"/>
        </b-tooltip>
            
                              
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    const glossaryJson = require('./glossary.json')
   

    @Component
    export default class Tooltip extends Vue {

        @Prop({required: true})
        title!: string;

        @Prop({required: true})
        index!: string;

        @Prop({required: false, default:'right'})
        placement!: string;

        description = ''

        mounted()
        {
            this.description = glossaryJson[this.title.toLowerCase()]
        }

   

    }
</script>

<style scoped >

    .customtooltip {        
        display:inline-block;
        color:blue;
        border-bottom: 1px dotted blue;
        margin: 0; 
        padding: 0;           
    }

    .custombadge{
        border-radius: 15px;
        background-color: blue;
        color: white;
        font-weight: bold;
        margin: 0;
        padding:0.1rem 0.3rem ;
    }

    .tooltip >>> .tooltip-inner {    
        max-width: 600px !important;
        width: 600px !important;
        color: #fff;
        text-align: justify;
        background: #365ebe;
        border-radius: 8px;
        font-size: 16px;
        padding: 1rem 1.25rem 0.25rem;
        /* font-style: normal; */
        /* font-family: BCSans, "Noto Sans", Verdana, Arial, sans serif; */

    } 

</style>