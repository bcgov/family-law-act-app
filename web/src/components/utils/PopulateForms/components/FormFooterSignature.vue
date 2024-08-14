<template>
    <!-- <Footer Signature> -->
    <!-- <SWEAR > -->        
        <div style="display: flex; font-size: 16px;">
            <!-- column 1 -->
            <div style="width: 55%; padding-right: 8px;">
                <div style="margin:1rem 0 0 0">
                    <p>Sworn or affirmed before me</p>
                    <grey-box-form marginTop="-22px" style="margin-top:0.2rem; text-indent:4px;display:inline;" textwidth="12rem" beforetext="at" hint="City" hintTextColor="hintTextColor" hintindent="80px" text="" aftertext=", British Columbia" />
                </div>
                <div style="margin:1rem 0 0 0">
                    <grey-box-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem" beforetext="on" hint="Date" hintTextColor="hintTextColor" hintindent="80px" text="" />
                </div>
    
                <div style="margin:2rem 0 0 0">
                    <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block;"></div>
                </div>
                <div>
                    <div style="width:100%; display:inline-block; font-size:9pt">
                        A Commissioner for taking Affidavits in British Columbia
                    </div>
                </div>
                <div style="margin:.5rem 0 0 0">
                    <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem" beforetext="" hint="print name or affix stamp of commissioner" text="" />
                </div>
            </div>
            <!-- column 2 -->
            <div style="width: 16px; height: 250px; border: 1px solid #313131; border-left: 0;"></div>
            <!-- column 3 -->
            <div style="width: 40%; display: flex; flex-direction: column; margin-top: 155px;">
                <div style="height:3rem; width:100%;border:1px solid #313132; display:inline-block; margin-left:2rem;">&nbsp;</div>
                <div style="width:100%; display:inline-block; font-size:9pt; margin-left: 2rem;">Signature</div>
            </div>
        </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import GreyBoxForm from './GreyBoxForm.vue';
import UnderlineForm from './UnderlineForm.vue';

@Component({
    components: {
        GreyBoxForm,
        UnderlineForm
    }
})
export default class FormFooterSignature extends Vue {

    hintFontSize = "8pt"
    hintTextColor = "#333"
    
}
</script>
<style>
    .table-borderless td.name {
        text-align: right;
    }
    .table-borderless td.value {
        border: 2px solid #fff;
        background-color: #d6d6d6 !important;
    }
</style>