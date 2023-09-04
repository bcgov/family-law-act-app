<template>
    <div class="customtooltip glossary-link">
        <div style="display:inline" :id="title+index">
            {{title}}
            <!-- <b-badge
                
                class="custombadge">?
            </b-badge> -->
        </div>

        <b-tooltip :custom-class="size" :target="title+index" :placement="placement">
            <div style="text-align: justify;" v-html="description"/>
        </b-tooltip>
            
                              
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import * as showdown from "showdown";
    const glossaryJson = require('./glossary.json')
   

    @Component
    export default class Tooltip extends Vue {

        @Prop({required: true})
        title!: string;

        @Prop({required: true})
        index!: string;

        @Prop({required: false, default:'right'})
        placement!: string;

        @Prop({required: false, default:'sm'})
        size!: string;
        
        markdownConverter = new showdown.Converter({
            noHeaderId: true
        });

        description = ''

        mounted()
        {
            const content = glossaryJson[this.title.toLowerCase()]
            this.description = this.formatHtml(content)
        }

        public formatHtml(content) {
            if (content !== undefined) {
                content = this.markdownConverter.makeHtml(content);
                content = content.replace(/<a ([^>]+)/g, function (a) {
                return a + 'style="color:orange;" target="_blank"';
                });
            }
            return content;
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

    .tooltip.sm >>> .arrow{
        display: none;
    }

    .tooltip.sm >>>  .tooltip-inner{
        max-width: 200px !important;
        width: 200px !important;
        background: #365ebe;
    }
    
    .tooltip.md >>> .arrow{
        display: none;
    }

    .tooltip.md >>>  .tooltip-inner{
        max-width: 300px !important;
        width: 300px !important;
        background: #365ebe;
    }

    .tooltip.lg >>> .arrow{
        display: none;
    }    

    .tooltip.lg >>>  .tooltip-inner{
        max-width: 600px !important;
        width: 600px !important;
        background: #365ebe;
    }
    
    .tooltip.xl >>> .arrow{
        display: none;
    }

    .tooltip.xl >>>  .tooltip-inner{
        max-width: 900px !important;
        width: 900px !important;
        background: #365ebe;
    }

    .tooltip :deep(.tooltip-inner) {    
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