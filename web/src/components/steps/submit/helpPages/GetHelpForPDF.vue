<template>
    <div style="height:30rem; overflow: auto ">
        <h2 class="mb-2">
            Your application
        </h2>
        <p>
            You can review, print, or save your application by clicking on the “Review and Print” button next to the document. This will open or download a PDF version of the application.
        </p>
        <p>
            “PDF” stand for Portable Document Format, which is a file format created by Adobe and is a standard format for printed documents. A PDF retains the design and layout of the document so it appears the same wherever it is viewed or printed.
        </p>

        <h2 class="mb-2">
            Open the form in your browser
        </h2>
        <p>
            Your browser (e.g. Internet Explorer, Edge, Google Chrome, Firefox, or Safari) may have a built-in PDF viewer. If so, you can open the forms directly on the web.
        </p>
        <ol>
            <li>Click on the “Review and Print” button to open the PDF form in your browser window.</li>
            <li>Depending on your browser settings, your PDF might save the form to your computer (see below) or it will open in a new tab or window.</li>
            <li>To print, click on the printer icon at the top of the document (it might be on the left or the right side).</li>
            <li>To save the file to your computer, click on the save icon (disk) or download icon (downward arrow) at the top of the document.</li>
        </ol>
        <p>
            If you are having trouble viewing PDFs, you may need to adjust your browser settings. See <a href="https://helpx.adobe.com/acrobat/using/display-pdf-in-browser.html" target='_blank'> Adobe’s instructions for displaying PDFs </a> in various browsers for detailed instructions.
        </p>

        <h2 class="mb-2">
            Save the forms to your computer
        </h2>
        <p>
            It's a great idea to save the PDF’s of your forms to your computer so you have a backup, and can print it later. You must have Adobe Reader installed (or Preview on Mac), otherwise, you can <a href="https://get.adobe.com/reader/" target='_blank' >download it here</a>.
        </p>
        <ol>
            <li>Right-click on the “Review and Print” button next to the name of the document.</li>
            <li>Select “Save Target As” or “Save Link As”.</li>
            <li>Choose a folder to keep your forms in (for example “Documents”). You may want to make a note of where you saved it.</li>
            <li>Open Adobe Reader: When Adobe Reader is open, go to File, then to Open, then to where you saved the document. Double-click on the document to open it.
                <br/>OR<br/>
                Find the file: On your computer, find where you saved the document and double-click it.</li>
            <li>View and/or print your form.</li>
        </ol>

        <h2 class="mb-2">
            Download the form through your browser
        </h2>
        <p>
            Depending on your browser settings, your PDF forms may download automatically.
        </p>
        <ol>
            <li>If asked, choose a folder to keep your forms in (for example “Documents”). You may want to make a note of where you saved it.</li>
            <li>Open Adobe Reader (or Preview on Mac). If you need to, you can <a href="https://get.adobe.com/reader/" target='_blank' >download it here</a>.</li>
            <li>When Adobe Reader is open, go to File, then to Open, then go to your “Downloads” folder (or to where you saved the document).</li>
            <li>View and/or print your form.</li>
        </ol>

        <h2 class="mb-2">
            Remove Downloaded Documents from your computer
        </h2>
        
        <ol>
            <li>Navigate to the search bar next to the Windows Start Menu.</li>
            <li>Enter "File Explorer" and select File Explorer.</li>
            <li>Select the <b>Downloads</b> folder on the left side of the window.</li>
            <li>Select the document <b>in the Downloads</b> folder.</li>
            <li>Right-click the selected file and select <b>Delete</b>.</li>
            <li><b>Navigate to your Recycle Bin</b> and empty the recycle bin.</li>
        </ol>

        <h2 class="mb-2">
            Delete saved pdf document from your computer            
        </h2>
        
        <ol>
            <li>Navigate to the <b>file</b> you want to <b>delete</b> from the computer.</li>
            <li>Right-click on the <b>file</b> to bring up the contextual menu and select <b>“Delete”</b>.</li>
            <li>Go to the desktop and double-click on the Recycle Bin to open it.</li>
            <li>Click on the <b>file</b>, press <b>“Delete”</b> and click “Yes” to permanently <b>delete</b> that one <b>file</b>.</li>           
        </ol>

        <h2 class="mb-2">
            Clear Browser History from your computer
        </h2>
        <p>
            All web browsers remember a list of the web pages you’ve visited. You can delete this list at any time, 
            clearing your browsing history and erasing the tracks stored on your computer, smartphone, or tablet. 
            Each browser has its own separate history, so you’ll need to clear the history in multiple places if 
            you’ve used more than one browser.            
        </p>

    </div>    
</template>

<script lang="ts">
    import {Component,Vue} from 'vue-property-decorator';

    @Component
    export default class GetHelpForPdf extends Vue {     
        
    }
</script>