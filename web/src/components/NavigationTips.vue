<template>
    <b-card no-body bg-variant="white">                           
                           
        <b-table-simple responsive borderless>
            
            <b-tbody>

                <b-tr >
                    <b-th colspan="6">
                        <img src="../assets/quick-exit.png" alt="" class="center"/>
                    </b-th>
                    <b-td class="text-left">
                        Found in the top right corner of each page. If you click on the Quick Exit button, 
                        the online forms service will close and take you to a Google search page. 
                        All your work will be automatically saved.                            
                    </b-td>                        
                </b-tr>
                

                <b-tr>
                    <b-th colspan="6">
                        <img src="../assets/profile-dropdown.png" alt="" class="center" />
                    </b-th>
                    <b-td class="text-left">
                        Visit your profile along the top banner of each page to logout of the service 
                        or to view previous applications.                            
                    </b-td>                        
                </b-tr>

                <b-tr>
                    <b-th colspan="6">
                        <img src="../assets/tooltip.png" alt="" class="center" />
                    </b-th>
                    <b-td class="text-left">
                        If you hover over terms that are in a different font colour, you’ll be able to 
                        see a definition or explanation of the term.                           
                    </b-td>                        
                </b-tr>

                <b-tr>
                    <b-th colspan="6">
                        <img src="../assets/faq.png" alt="" class="center" />
                    </b-th>
                    <b-td class="text-left">
                        Click on an interactive question to see the answer. Click again and the 
                        answer will be hidden.                          
                    </b-td>                        
                </b-tr>

                <b-tr>
                    <b-th colspan="6">
                        <img src="../assets/previous-next.png" alt="" class="center" />
                    </b-th>
                    <b-td class="text-left">
                        Use the previous and next buttons at the bottom of each screen to 
                        navigate through the pages. Clicking the next button will save your answers.                          
                    </b-td>                        
                </b-tr>

                <b-tr>
                    <b-th colspan="6">
                        <img src="../assets/navigation-bar.png" alt="" class="center" />
                    </b-th>
                    <b-td class="text-left">
                        The Application Steps along the left side will show the steps that need 
                        to be completed. It will show each step you have completed with a checkmark, 
                        steps that are in progress, and those that remain. This feature shows you 
                        where you are at and how much further you have until your form is complete. 
                        The steps may change as you answer different questions. You can click on a 
                        previous step to review earlier questions and answers or to make any changes.                          
                    </b-td>                        
                </b-tr>

                <b-row class="mt-5 ml-5 h4" style="font-weight: 700;">
                    On the Previous Activity screen:
                </b-row>

                <b-tr>
                    <b-th colspan="6">
                        <img src="../assets/efiling-hub-navigation.png" alt="" class="center" />
                    </b-th>
                    <b-td class="text-left">
                        Use the arrow link to navigate to your submitted documents.                          
                    </b-td>                        
                </b-tr>

                <b-tr>
                    <b-th colspan="6">
                        <img src="../assets/post-filing-instructions.png" alt="" class="center" />
                    </b-th>
                    <b-td class="text-left">
                        Provides instructions for next steps.                          
                    </b-td>                        
                </b-tr>

                <b-tr>
                    <b-th colspan="6">
                        <img src="../assets/resume-app.png" alt="" class="center" />
                    </b-th>
                    <b-td class="text-left">
                        The edit icon allows you to edit or continue completing a document.                          
                    </b-td>                        
                </b-tr>

                <b-tr>
                    <b-th colspan="6">
                        <img src="../assets/delete-app.png" alt="" class="center" />
                    </b-th>
                    <b-td class="text-left">
                        Used to delete a document.                          
                    </b-td>                        
                </b-tr>

                <b-tr>
                    <b-th colspan="6">
                        <img src="../assets/filed-documents.png" alt="" class="center" />
                    </b-th>
                    <b-td class="text-left">
                        View/download your submitted or filed document.                          
                    </b-td>                        
                </b-tr>

                <b-tr>
                    <b-th colspan="6">
                        <img src="../assets/action-required.png" alt="" class="center mt-n2" />
                    </b-th>
                    <b-td class="text-left">
                        Means action is required.  Clicking the icon will provide an 
                        explanation of the issue and what options you have available 
                        to correct the document.                          
                    </b-td>                        
                </b-tr>

            </b-tbody>
            
        </b-table-simple>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Vue } from 'vue-property-decorator';  

@Component
export default class NavigationTips extends Vue {
    
}
</script>

<style scoped>   
    .card {
        border: white;
    }
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
   
</style>
