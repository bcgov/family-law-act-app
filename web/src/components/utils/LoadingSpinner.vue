<template>
    <b-card bg-variant="light" v-if="!inline">
        <b-overlay :show= "true"> 
            <b-card  style="min-height: 100px;"/>                   
            <template v-slot:overlay>               
                <div> 
                    <spinner style="width:5rem; margin:0 auto;"/> 
                    <p class="text-center" id="loading-label">{{waitingText}}</p>
                </div>                
            </template> 
        </b-overlay> 
    </b-card>
    <!-- the card seems to create a white background effect, thus why we have inline -->
    <div v-else>
        <spinner/> 
        <p id="loading-label">{{waitingText}}</p>
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
    @Prop({ required: true })
    waitingText!: string;

    @Prop({ required: false })
    inline!: boolean;
}
</script>

<style scoped>   
    .card {
        border: white;
    }
</style>
