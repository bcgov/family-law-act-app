<template>
    <b-card bg-variant="light" v-if="!inline">
        <b-overlay :show= "true"> 
            <b-card  style="min-height: 100px;"/>                   
            <template v-slot:overlay>               
                <div> 
                    <spinner/> 
                    <p id="loading-label">Waiting for eFiling Hub ...</p>
                </div>                
            </template> 
        </b-overlay> 
    </b-card>
    <!-- the card seems to create a white background effect, thus why we have inline -->
    <div v-else>
        <spinner/> 
        <p id="loading-label">Waiting for eFiling Hub ...</p>
    </div>  
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import Spinner from "./Spinner.vue";
@Component({
        components: {           
            Spinner
        }        
    })    
    export default class LoadingSpinner extends Vue {
        @Prop({ required: false })
        inline!: boolean;
    }
</script>

<style scoped>   
    .card {
        border: white;
    }
</style>
