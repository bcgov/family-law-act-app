<template>
    <div>    
    
        <div class="m-3">

        <!-- family law matter understanding -->
            <div            
                v-if="allInfo || flmInfo || flmCaseMngmntInfo || flmPpmInfo || relocFlmInfo || flmEnfrcInfo || relocFlmPpmInfo || ppmFlmEnfrcInfo || relocFlmEnfrcInfo">
                
                <p>I understand the following people must be given notice of my application about a family law matter:</p>

                <ul>
                    <li>
                        all parents and current guardians of each child who is the subject of the family law matter
                    </li>
                    <li>
                        my spouse, if I am applying for spousal support
                    </li>
                    <li>
                        each other adult who the application about a family law matter is about                       
                    </li>                    
                </ul>

                <p>
                    To give notice, they must each be served with a copy of this document and any supporting documents.
                    <span v-if="!flmInfo && !flmCaseMngmntInfo">
                        They will have an opportunity to file a reply before a court appearance will be scheduled.
                    </span>
                </p>            
            </div>   

        <!-- priority parenting matter understanding -->
            <p v-if="flmPpmInfo ">
                I also understand all parents and guardians of the child(ren) must be given notice of my 
                application about a priority parenting matter.
            </p>
            <p v-else-if="allInfo || ppmInfo || ppmEnfrcInfo || relocFlmPpmInfo || ppmFlmEnfrcInfo|| relocPpmInfo || ppmRelocEnfrcInfo">                        
                <span v-if="allInfo || relocFlmPpmInfo || ppmFlmEnfrcInfo" >I also </span>
                <span v-else>I </span> 
                understand all parents and guardians of the child(ren) the application about a priority parenting matter is 
                about must be given notice of the application.
            </p>        
            
        <!-- relocation of a child understanding -->
            <p v-if="allInfo || relocFlmInfo || relocFlmPpmInfo || relocFlmEnfrcInfo || relocInfo || relocPpmInfo || relocEnfrcInfo || ppmRelocEnfrcInfo">                        
                <span v-if="relocFlmInfo || relocFlmEnfrcInfo || relocPpmInfo || ppmRelocEnfrcInfo">I also </span>
                <span v-else-if="relocFlmPpmInfo">And I </span>
                <span v-else>I </span>
                understand the relocating guardian(s) must be given notice of my application to prohibit the relocation of a child.
            </p>

        <!-- enforcement understanding -->
            <p v-if="allInfo || ppmEnfrcInfo || relocEnfrcInfo || enfrcInfo || flmEnfrcInfo || ppmFlmEnfrcInfo || relocFlmEnfrcInfo || ppmRelocEnfrcInfo">
                <span v-if="ppmEnfrcInfo || flmEnfrcInfo || relocEnfrcInfo">I also</span>
                <span v-else-if="enfrcInfo">I </span>
                <span v-else-if="allInfo || ppmFlmEnfrcInfo || relocFlmEnfrcInfo || ppmRelocEnfrcInfo">And I </span>
                    understand each other party must be given notice of my application about enforcement.
            </p>

        <!-- notice 7 days -->
            <p v-if="!flmInfo && !flmCaseMngmntInfo"> 
                To give notice, they must each be served with a copy of the application and any supporting documents 
                at least 7 days before the date set for the court appearance unless the court allows the application 
                to be made without notice or with less than 7 days’ notice.
            </p>
        <!-- general closing -->
            <p>They are the other party/parties I added in this case.</p>
        </div>
    </div>        
</template>           

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component
export default class OtherPartyPopup extends Vue {
    
    @applicationState.State
    public types!: string[]
    
    flmInfo = false;  
    ppmInfo = false;    
    relocInfo = false;
    enfrcInfo = false;

    flmCaseMngmntInfo = false;

    flmPpmInfo = false;    
    relocFlmInfo = false;
    flmEnfrcInfo = false; 

    ppmEnfrcInfo = false;
    relocPpmInfo = false;
    relocEnfrcInfo = false;

    relocFlmPpmInfo = false;
    ppmFlmEnfrcInfo = false;
    relocFlmEnfrcInfo = false;

    ppmRelocEnfrcInfo= false;
    
    allInfo = false;

    mounted(){
        this.needConfirmation()
    }

    public needConfirmation(){

        this.flmInfo = false;
        this.ppmInfo = false;
        this.relocInfo = false;
        this.enfrcInfo = false;        
        this.flmCaseMngmntInfo = false;
        this.flmPpmInfo = false;
        this.ppmEnfrcInfo = false;
        this.relocFlmInfo = false;
        this.flmEnfrcInfo = false;        
        this.relocPpmInfo = false;
        this.relocEnfrcInfo = false;
        this.relocFlmPpmInfo = false;
        this.ppmFlmEnfrcInfo = false;
        this.relocFlmEnfrcInfo = false;
        this.ppmRelocEnfrcInfo = false;
        this.allInfo = false;

        if (this.types.includes("Family Law Matter") || 
            this.types.includes("Priority Parenting Matter") || 
            this.types.includes("Relocation of a Child") || 
            this.types.includes("Enforcement")){
                
                // flm only
            if (this.types.includes("Family Law Matter") && 
                !this.types.includes("Relocation of a Child") && 
                !this.types.includes('Priority Parenting Matter') && 
                !this.types.includes('Enforcement') &&
                !this.types.includes('Case Management')){
                    this.flmInfo = true;

                // ppm only
            } else if (this.types.includes('Priority Parenting Matter') && 
                !this.types.includes("Family Law Matter") && 
                !this.types.includes("Relocation of a Child") &&
                !this.types.includes('Enforcement')) {                    
                    this.ppmInfo = true;

                // reloc only
            } else if(this.types.includes('Relocation of a Child') && 
                !this.types.includes("Family Law Matter") && 
                !this.types.includes("Priority Parenting Matter") &&
                !this.types.includes('Enforcement')){
                    this.relocInfo = true;

                // enforc only    
            } else if (this.types.includes('Enforcement') && 
                !this.types.includes("Family Law Matter") && 
                !this.types.includes("Priority Parenting Matter") &&
                !this.types.includes('Relocation of a Child')){
                    this.enfrcInfo = true;

                // flm and caseManagement only
            } else if (!this.types.includes('Enforcement') && 
                this.types.includes("Family Law Matter") && 
                !this.types.includes("Priority Parenting Matter") &&
                !this.types.includes('Relocation of a Child') &&
                this.types.includes('Case Management')){
                    this.flmCaseMngmntInfo = true;

                // flm and ppm only
            } else if (!this.types.includes('Enforcement') && 
                this.types.includes("Family Law Matter") && 
                this.types.includes("Priority Parenting Matter") &&
                !this.types.includes('Relocation of a Child') &&
                !this.types.includes('Case Management')){
                    this.flmPpmInfo = true;

                // flm and reloc only
            } else if (!this.types.includes('Enforcement') && 
                this.types.includes("Family Law Matter") && 
                !this.types.includes("Priority Parenting Matter") &&
                this.types.includes('Relocation of a Child') &&
                !this.types.includes('Case Management')){
                    this.relocFlmInfo = true;

                // flm and enfrc only
            } else if (this.types.includes('Enforcement') && 
                this.types.includes("Family Law Matter") && 
                !this.types.includes("Priority Parenting Matter") &&
                !this.types.includes('Relocation of a Child') &&
                !this.types.includes('Case Management')){
                    this.flmEnfrcInfo = true;
                    
                // ppm and reloc
            } else if (!this.types.includes("Family Law Matter") && 
                !this.types.includes('Enforcement') &&
                this.types.includes("Priority Parenting Matter") &&
                this.types.includes('Relocation of a Child')){
                    this.relocPpmInfo = true;

                // ppm and enfrc
            } else if (!this.types.includes("Family Law Matter") &&
                this.types.includes('Enforcement') &&
                this.types.includes("Priority Parenting Matter") &&
                !this.types.includes('Relocation of a Child')){
                    this.ppmEnfrcInfo = true;

                // reloc and enfrc
            } else if (!this.types.includes("Family Law Matter") &&
                this.types.includes('Enforcement') &&
                !this.types.includes("Priority Parenting Matter") &&
                this.types.includes('Relocation of a Child')){
                    this.relocEnfrcInfo = true;

                // reloc and flm and ppm
            } else if (this.types.includes("Family Law Matter") &&
                !this.types.includes('Enforcement') &&
                this.types.includes("Priority Parenting Matter") &&
                this.types.includes('Relocation of a Child')){
                    this.relocFlmPpmInfo = true;

                // enfrc and flm and ppm
            } else if (this.types.includes("Family Law Matter") &&
                this.types.includes('Enforcement') &&
                this.types.includes("Priority Parenting Matter") &&
                !this.types.includes('Relocation of a Child')){
                    this.ppmFlmEnfrcInfo = true;

                // enfrc and flm and reloc
            } else if (this.types.includes("Family Law Matter") &&
                this.types.includes('Enforcement') &&
                !this.types.includes("Priority Parenting Matter") &&
                this.types.includes('Relocation of a Child')){
                    this.relocFlmEnfrcInfo = true;                
                 // enfrc and flm and reloc
            } else if (!this.types.includes("Family Law Matter") &&
                this.types.includes('Enforcement') &&
                this.types.includes("Priority Parenting Matter") &&
                this.types.includes('Relocation of a Child')){
                    this.ppmRelocEnfrcInfo = true;
            }else{
                console.log('else')
                this.allInfo = true;
            }            
        }
    }

}
</script>
