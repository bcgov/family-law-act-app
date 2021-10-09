<template>
    <div>
        <slot>Provide page content here</slot>
        <div v-if="!hideNavButtons" class="survey-nav">
            <div v-if="hasPrevStepPage()" class="survey-nav-left">
                <button v-on:click="onPrev()" class="btn btn-primary btn-lg">
                    <span class="fa fa-chevron-left btn-icon-left"></span> Previous
                </button>
            </div>
            <div v-if="hasNextStepPage()" class="survey-nav-right">
                <button v-on:click="onNext()" class="btn btn-primary btn-lg" v-bind:class="{disabled: isDisableNext()}" 
                    data-toggle="tooltip" data-placement="top" v-bind:title="disableNextText">
                    Next <span class="fa fa-chevron-right btn-icon-right"></span> 
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import {Component, Vue, Prop } from "vue-property-decorator"
import moment from 'moment-timezone';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component
export default class PageBase extends Vue {
       
    @Prop({required: false, default:false})
    hideNavButtons!: boolean;
    
    @Prop({required: false})
    disableNext!: boolean;

    @Prop({required: false})
    disableNextText!: string;

    

    
    
    error: ""
 
    public onPrev() {             
        if (this.$listeners && this.$listeners.onPrev) {
            this.$emit('onPrev');
        } else {
            Vue.prototype.$UpdateGotoPrevStepPage()
        }
        
    }

    public onNext() {
        if (!this.isDisableNext()) {           
            if (this.$listeners && this.$listeners.onNext) {  
                this.$emit('onNext');
            } else {
                Vue.prototype.$UpdateGotoNextStepPage()
            }
        }
        
    }

    public hasPrevStepPage() {
        return this.$store.getters["Application/getPrevStepPage"] != null;
    }

    public hasNextStepPage() {
        return this.$store.getters["Application/getNextStepPage"] != null;       
    }

    public isDisableNext() {
        return this.disableNext;
    }    
  
}
</script>

<style scoped lang="scss">
.btn {
  &.disabled {
    cursor: not-allowed;
  }
}
</style>