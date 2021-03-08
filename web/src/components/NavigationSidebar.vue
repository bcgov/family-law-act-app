<template>
    <!-- https://www.w3schools.com/howto/howto_css_sidebar_responsive.asp -->
    <div class="sidebar-left" id="sidebar-left" style="user-select: none;">
        <div class="sidebar-container" id="sidebar" :key="updateSidebar">
            <div class="sidebar-title">
                <h3>Application Steps</h3>
            </div>
            <a
                class="step"
                v-for="(step, stepIndex) in getNavigation()"
                v-show="step.active"
                v-bind:key="stepIndex"
                v-bind:id="getStepId(stepIndex)"
                v-bind:index="stepIndex"
                v-bind:class="{current: isCurrentStep(stepIndex)}"
                v-on:click="onSelectStep($event)"
            >
                <div v-if="isPrintStep(step)" class="step separate"></div>
                <div class="step-header">
                    <div class="header-icon">
                        <i v-bind:class="['fa', step.icon]"></i>
                    </div>
                    <div class="header-text">
                        <div class="text-step">
                            STEP {{ getStepDisplayNumber(stepIndex) }}
                            <i v-show="false" class="fa fa-check" />
                        </div>
                        <div class="text-title">{{ step.label }}</div>
                    </div>
                </div>
                <div
                    class="step-pages"
                    v-bind:id="getStepGroupId(stepIndex)"
                    v-bind:index="stepIndex"
                    v-bind:style="isCurrentStep(stepIndex)? 'display: block;': 'display: none;'"
                >
                    <ul>
                        <li
                            tabindex="1"
                            v-for="(page, pageIndex) in step.pages"
                            v-bind:key="pageIndex"
                            v-bind:id="getStepPageId(stepIndex, pageIndex)"
                            v-bind:index="pageIndex"
                            v-bind:class="{current: pageIndex == step.currentPage}"
                            v-show="page.active"
                            v-on:click="onSelectPage($event)"
                        >
                            <b-icon-check-circle-fill style="float:left; width:1.2rem;" v-if="getPageProgress(stepIndex, pageIndex)==100" class="mt-1 mr-2" variant="success" />
                            <b-icon-circle style="float:left; width:1.2rem;" v-else-if="getPageProgress(stepIndex, pageIndex)==0" class="mt-1 mr-2" variant="dark" />
                            <b-icon-circle-half style="float:left; width:1.2rem;" v-else class="mt-1 mr-2" variant="danger" />
                            <div class="step-pages">{{ page.label }}</div>
                            
                        </li>
                    </ul>
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import moment from 'moment-timezone';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component
export default class NavigationSidebar extends Vue {
    
    @applicationState.State
    public currentStep!: Number;

    error = "";
    updateSidebar = 0;

    // @Watch('currentStep')
    // pageIndexChange(newVal) 
    // {
    //     console.log('step changed in sidebar')
    //     console.log(newVal);  
    //     this.updateSidebar++;      
    // }

    public  onSelectStep(event) {
        // const currIndex = this.$store.state.Application.currentStep;
        // const curr = document.getElementById(this.getStepId(currIndex));
        // const currChildGroup = document.getElementById(this.getStepGroupId(currIndex));
        const next = event.currentTarget;
        const nextIndex = parseInt(next.getAttribute("index"));
        // const nextChildGroup = document.getElementById(this.getStepGroupId(nextIndex));

        // if(!this.isStepTouched(nextIndex)) return

        // if (curr == next) {
        //     // same choice.
        //     next.classList.add("current");
        //     nextChildGroup.style.display = "block";
        // } else {
        //     next.classList.add("current");
        //     nextChildGroup.style.display = "block";

        //     curr.classList.remove("current");
        //     currChildGroup.style.display = "none";
        // }
        
        this.$store.commit("Application/setCurrentStep", nextIndex);
        // const currPageIndex = this.getNavigation()[nextIndex].currentPage;
        // const currPage = document.getElementById(this.getStepPageId(nextIndex, currPageIndex));
        // //console.log("now step")
        // currPage.className="current";
        Vue.nextTick().then(()=>{this.saveChanges();});
    }


    //TODO: This is where the step is selected
    public onSelectPage(event) {
        const currStepIndex = this.$store.state.Application.currentStep;
        //const currPageIndex = this.getNavigation()[currStepIndex].currentPage;
        //const currPage = document.getElementById(this.getStepPageId(currStepIndex, currPageIndex));
        const nextPage = event.currentTarget;
        const nextPageIndex = parseInt(nextPage.getAttribute("index"));

        if(this.$store.state.Application.steps[currStepIndex].pages[nextPageIndex].progress == 0) return


        // if (currPage == nextPage) {
        //     // same choice; do nothing
        // } else {
        //     Vue.nextTick().then(()=>{
        //         //console.log("now page")
        //         nextPage.classList.add("current");

        //         if (currPage !== null) {
        //         currPage.classList.remove("current");
        //         }
        //     })
        // }

        this.$store.commit("Application/setCurrentStepPage", {currentStep: currStepIndex, currentPage: nextPageIndex });
        Vue.nextTick().then(()=>{this.saveChanges();});
    }

    public getNavigation() {
        const steps = this.$store.state.Application.steps;
        return steps;
    }

    public getStepDisplayNumber(stepIndex) {
        const steps = this.getNavigation();
        let stepDisplayNumber = stepIndex + 1;  // convert 0-based index number to 1-based display number

        for (let i = stepIndex - 1; i >= 0; i--) {
            if (!steps[i].active) {
            // adjust display number
            stepDisplayNumber--;
            }
        }

        return stepDisplayNumber;
    }

    public isCurrentStep(stepIndex) {
        return this.$store.state.Application.currentStep == stepIndex;
    }

    public isAllCompleted() {
        return this.$store.state.Application.allCompleted;
    }

    public getStepId(stepIndex) {
        return "step-" + stepIndex;
    }

    public getStepGroupId(stepIndex) {
        return this.getStepId(stepIndex) + "-group";
    }

    public getStepPageId(stepIndex, pageIndex) {
        return this.getStepId(stepIndex) + "-page-" + pageIndex;
    }

    public isPrintStep(step) {
        return step.type=='print';
    }

    public saveChanges() {
        const lastUpdated = moment().format();
        this.$store.commit("Application/setLastUpdated", lastUpdated);
        const application = this.$store.state.Application;      
        const applicationId = application.id;      
        
        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        } 

        this.$http.put("/app/"+ applicationId + "/", application, header)
        .then(res => {
            //console.log(res.data); 
            this.error = "";
        }, err => {
            console.error(err);
            this.error = err;
        });        
    }
    
    public isStepTouched(nextStepIndex){
        const selectedStep = this.$store.state.Application.steps[nextStepIndex];
        for(const page of selectedStep.pages){
            //console.log(page.progress)
            if(page.progress > 0) return true;
        }
        return false
    }

    public getPageProgress(stepIndex, pageIndex){
        return this.$store.state.Application.steps[stepIndex].pages[pageIndex].progress
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common";

/* Active/current link */
.sidebar a.active {
    background-color: #fcba19;
    color: white;
}

/* The side navigation menu */
.sidebar {
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: #f1f1f1;
    position: fixed;
    height: 100%;
    overflow: auto;
}

/* Sidebar links */
.sidebar a {
    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
}
/* Links on mouse-over */
.sidebar a:hover:not(.active) {
    background-color: #555;
    color: white;
}

/* Page content. The value of the margin-left property should match the value of the sidebar's width property */
div.content {
    margin-left: 200px;
    padding: 1px 16px;
}

/* On screens that are less than 700px wide, make the sidebar into a topbar */
@media screen and (max-width: 700px) {
    .sidebar {
        width: 100%;
        height: auto;
        position: relative;
    }
    .sidebar a {
        float: left;
    }
    div.content {
        margin-left: 0;
    }
}

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
@media screen and (max-width: 400px) {
    .sidebar a {
        text-align: center;
        float: none;
    }
}

/*
 * ported from sidebar.component.scss
 */

// outer sidebar
.sidebar-container {
    background: #eee;
    border-right: 2px solid #ddd;
    bottom: 0;
    display: block;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0;
    position: absolute;
    top: 0;
    width: $sidebar-width-md;
    height: 100%;
}

// sidebar title
.sidebar-title {
    padding: 1rem 2rem 1.5rem;
    h3 {
        margin: 0;
    }
}

// Sidebar Nav

$link-active-color: #349;
$link-current-color: $gov-white;
$link-hover-color: #57d;
$link-disabled-color: #777;
$step-header-current-color: #fcba19;
$step-header-hover-color: #efefef;

.step-header {
    flex-flow: row nowrap;
    background: #eee;
    display: flex;
    list-style-type: none;
    margin: 0;
    width: 100%;
    padding: 1em 1em;
    .header-icon {
        border-color: $text-color;
        color: $text-color;
        font-weight: bold;
        position: relative;
        top: 0.15em;
        border: 2px solid $text-color;
        border-radius: 50%;
        font-size: 20px;
        flex: none;
        height: 38px;
        line-height: 34px;
        width: 38px;
        text-align: center;
        transition: border-color color 0.1s linear;
        font-variant-numeric: tabular-nums;

        i.fa {
            line-height: 23px;
            padding-left: 2px;
        }
    }
    .header-text {
        display: flex;
        flex-flow: column nowrap;
        padding: 0.2em;
        .text-step {
            font-weight: bold;
        }
    }
}

.step-pages {
    margin: 0;
    width: 100%;
    ul {
        list-style-type: none;
        padding: 0;
        border-left: solid $gov-gold;
        margin-left: 2em;
        margin-top: 1em;
        margin-right: 2em;
        li {
            margin-top: 1em;
            margin-left: .1em;

            &.current {
                color: $gov-gold;
                outline: none;
            }
            &:active {
                outline: none;
            }
        }
    }
}

.step {
    cursor: pointer;
    display: block;
    list-style-type: none;
    margin: 0;
    max-width: 100%;
    padding: 0;
    &.disabled {
        cursor: not-allowed;
        .step-header {
        .header-icon,
        .header-text {
            border-color: $link-disabled-color;
            color: $link-disabled-color;
        }
        }
    }
    &.current {
        .step-header {
        background: $gov-gold;
        display: flex;
        list-style-type: none;
        margin: 0;
        width: 100%;
        padding: 1em 1em;
        .header-icon {
            border-color: $gov-white;
            color: $gov-white;
        }
        .header-text {
            color: $gov-white;
            display: flex;
            flex-flow: column nowrap;
            color: $link-current-color;
        }
        }
    }
    &.separate {
        margin-top: 2em;
        margin-right: 3em;
        &::before {
        display: block;
        content: " ";
        margin: 0 1.5em;
        position: relative;
        top: -0.75em;
        height: 1px;
        background: #25b;
        width: 100%;
        }
    }
}
</style>
