<template>
    <div class="app-main" id="step-base">
        <b-container>
            <slot>
                <page-base></page-base>
            </slot>
        </b-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue } from "vue-property-decorator";
import PageBase from "./PageBase.vue";

@Component({
    components:{
        PageBase
    }
})

export default class StepBase extends Vue {
    
};
</script>