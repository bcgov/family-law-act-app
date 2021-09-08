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
    disableNextText!: String;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void
    
    error: ""
 
    public onPrev() {
        Vue.nextTick().then(()=>{this.saveChanges();});      
        if (this.$listeners && this.$listeners.onPrev) {
            this.$emit('onPrev');
        } else {
            this.UpdateGotoPrevStepPage()
        }
        //window.scrollTo(0, 0);
    }

    public onNext() {
        if (!this.isDisableNext()) {
            Vue.nextTick().then(()=>{this.saveChanges();});
            if (this.$listeners && this.$listeners.onNext) {  
                this.$emit('onNext');
            } else {
                this.UpdateGotoNextStepPage()
            }
        }
        //window.scrollTo(0, 0);
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

    public saveChanges() {
        const lastUpdated = moment().format();
        this.$store.commit("Application/setLastUpdated", lastUpdated); 
        const application = this.$store.state.Application;
        const applicationId = application.id;
        application.type = Vue.filter('translateTypes')(this.$store.state.Application.types);
        
        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }

        this.$http.put("/app/"+ applicationId + "/", application, header)
        .then(res => {
            this.error = "";
        }, err => {
            console.error(err);
            this.error = err;
        });    
    }

    
  
};
</script>

<style scoped lang="scss">
.btn {
  &.disabled {
    cursor: not-allowed;
  }
}
</style>