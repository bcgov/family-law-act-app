# Managing Family Protection Order Content

The Family Protection Order (FPO) application is technically a relatively simple application with a number of ways to easily update content - the information provided to end users as they use the application. The theory on which we are basing the architecture of the application is that we can enable Content creators (business folks) to evolve the Content (question, glossary, help text, etc.), independent of the technical team. This means that the major focus of development can be on the Content without the need for a lot of technical resources to support the project.  We think this model can be applied to a number of conceptually similar applications in the Justice space.

There are four parts of the app that have been separated out for Content Developers to manage:

* A clickable (with popup) glossary of terms to help the user
* The sidebar menus, and what sidebar menus appear where in the application
* The Pre-Qualification Survey - a set of questions and help text to determine if the users situation is suitable for this application.
* The Primary FPO Survey - a set of questions and help text to collect the necessary information 

This document details on how a Content Developer manages that content. The information is divided into two parts - the technical steps to access, update and test the changes to the content, and tips and tricks for editing the Surveys. The former is pretty straight-forward, the less is a bit more work. As such, most of the information here is about the use of the embedded survey editor for managing the two Surveys.

## Managing Glossary Content

<<To be added>>

## Managing Sidebars

### Creating the set of Sidebars

### Invoking the Sidebars from within the app content

## Managing Surveys

### Updating Surveys

#### Setup Editing Environment

* Create github account
* Fork the BC Gov's [Family-Protection-Order](https://github.com/bcgov/Family-Protection-Order) repository into your github account.
* Find the survey's
   * Within your github repo navigate to: fpo-web -> src -> assets

#### Updating the Survey

This summary is a high level view of making changes to a github file. If this is new to you, we recommend you find someone familiar with github to help you through the steps and to explain them to you. It's pretty easy once you get it, but a bit daunting if you have never before used github.

* In your repo, navigate to the latest version of the survey (see above) - survey-primary.json or survey-qualify.json
* Click the "Edit" icon - a pencil to go into the github text editor
* Highlight and copy (e.g. Ctrl-A, Ctrl-C, or right-click/Select All, right-click/Copy) the complete text of the survey into your system clipboard.

At this point your are ready to edit the survey in the embedded FPO survey editor (see the next section).  When you are finished making the changes you want and are ready to save, continue with the instructions below.  As per the instructions in the next section you will have copied into your system clipboard the survey JSON.

* Navigate back (if you necessary) to the github page of the survey file you are editing and click the "Edit" (pencil) icon for the file.
* Highlight the entire text of the survey (Ctrl-A) in the githib editor and paste (Ctrl-V) the revised text over top.
* Use the "Preview changes" tab to make sure that your changes have been applied.
* At the bottom of the file, add a comment about the changes you have made and click the "Commit" button.

At this point, the changes have been made to your local github repo. However, to get them to be deployed on Dev (and later, Test and Prod), you need to do a "Pull Request" to have those changes submitted into the BC Gov repo.

* Return to the top of the repo (click the "Code" tab) and then click the "New Pull Request" button
    * This creates a request to the maintainers of the BC Gov FPO repo to pull in your new version of the survey
* When your pull request is accepted, your updates to the survey will be deployed to the Dev Instance of the app, and you can test it.
* Once you are happy with your changes, the team managing the code can promote the changes to Test and ultimately to production.

#### Invoking the Survey Editor

The FPO application contains an embedded survey editor. The following are the steps to use it. We assume in the following that you have copied into your systems's clipboard the entire copy of the survey JSON you want to edit using the first few instruction steps of the previous section.

* Open your browser to an instance of the FPO, main page, add "survey-editor" to the URL and hit enter.
* The screen should open to "Home / Survey Editor" just below the application header.
* Click the "JSON Editor" tab at the top of the screen.
* Highlight the full text of the JSON text element (click in the editing section and click Ctrl-A)
* Paste (ctrl-v or right-click/Paste) the text in your clipboard - the text copied from your repo.
* Click "Survey Designer" and you should see an editable version of the survey.

At this point you can edit (in the Survey Designer tab) the Survey and test it (in the Test Survey) tab. Once you have made the changes you want and are ready to check them into github:

* Click the "JSON Editor" tab at the top of the screen.
* Highlight the full text of the JSON text element (click in the editing section and click Ctrl-A)
* Copy (ctrl-c or right-click/Copy) the text into your clipboard
* Go back to the steps in the previous section to save your changes in github and do a pull request into the BC Gov instance of the application.

### Guidance on Managing Survey Content

The embedded survey editor makes (relatively) easy to edit the Survey. The basics of the editor are pretty easy, but there are definitely some tricks and subtleties to learn in mastering the editor. The following is an attempt to capture some guidelines to aid in that effort.

#### Editing Basics

##### Adding Elements

##### Editing Primary Properties

##### Editing Secondary Properties

##### Referencing Values

#### Guidelines

##### Uniquely Define All Survey Elements (questions, panels, etc.)

When you add a survey element to a page, it is given a default name (e.g. "question38" or "panel50"). Never leave that as the element name - give all questions a unique, spaceless name - e.g. childName, isChildAdult. These names are essentially the data elements of the survey and we'll need to refer to them later - perhaps in the survey, but definitely in the extraction of the survey data into the PDF feeder.

Names should use camel case - first letter lower case, and the first letter of each word in the name Capitalized.

##### Referencing Survey Elements in later parts of the Survey

You can use the syntax `{elementName}` in the survey to reference the values of other elements in the survey. For example, `{childName}` inserted into a question title will expand to the value of the question `childName` in the survey. Fill in the "Title" field to control what is displayed to the user.

Those elements can also be used in the "isVisible" attribute of an element to control if an element is displayed in an instance of the survey or not. isVisible expressions can become quite complex (I believe you have full access to JavaScript expressions), and as we learn more, we'll add more guidance here.

##### Dealing with data multiples

The Survey Engine has several methods for handling situations where there is an unknown (dynamic) number of instances of data - e.g. for collecting information about each of an unknown number of children. In general - if there are multiple instances of something and the precise number of instances is not known, use the "dynamic" capabilities to collect the data. Dynamic data is definitely trickier, and should be avoided if possible, but if it is necessary, use it - even if technical support is needed.

As we learn more about the use of dynamic data, we'll add more to this section.

The Survey Engine support [MatrixDynamic](https://surveyjs.io/Examples/Library/?id=questiontype-matrixdynamic&platform=jQuery&theme=default)
 and 
[PanelDynamic](https://surveyjs.io/Examples/Library/?id=questiontype-paneldynamic&platform=jQuery&theme=default) functionality.