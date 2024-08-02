<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size:13pt;"><b>Application for Order </b></div>
                <div style="font-size:13pt;"><b>Prohibiting the Relocation of a Child</b></div>
                <div style="font-size:10pt;"><b>FORM 16</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 80</div>
            </div>
            <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
            </div>
            <div style="width: 35%; float:right; font-size: 8pt;">
             <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Registry location: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Court file number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ existingFileNumber ? existingFileNumber : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                <div style="float: left; width: 50%; padding: 2px;"> Document number: <div style="font-size: 6pt; padding-left:16px;">For registry use only</div> </div>
                     <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;">{{ fmepNumber ? fmepNumber : '&nbsp;' }} </div>
                </div>
            </div>         
        </div> 
        
    <div style="display:flex; flex-direction:row gap:4px; font-size:9pt" >
        <div style="flex:1; float: left; margin-right: 10px;">
                <p>This Application for Order Prohibiting the Relocation of a Child sets out the details of an order 
                prohibiting the relocation of a child that a person is applying for under section 69 of the Family 
                Law Act. </p>
                <div style="border-style: dashed; border-color: black;float: left; padding:0.5rem; background: #909090; width:80%">
                <b>Please read before completing the form:</b>
                <ul>
                    <li>
                        This application is to be used only if a child’s guardian plans to relocate themselves, the child, or both, and there is a written agreement or order respecting parenting arrangements or contact with the child applies to the child [s. 65 Family Law Act].
                    </li>
                    <li>
                        If there is no written agreement or court order, you may apply for an order under s. 46 of the Family Law Act [changes to child’s residence if no agreement or order] using an Application About a Priority Parenting Matter Form 15 or Application About a Family Law Matter Form 3 to determine the parenting arrangements for the child including the location of the child’s residence.
                    </li>
                    <li>
                        For guidance filling in this form, please read the guidebook. The guide is available online at <a href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms">www.gov.bc.ca/court-forms</a> or from your local court registry.
                    </li>
                </ul>
                </div>
            </div>
            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:24px">
                <p>
                <b-icon-info-circle-fill />
                <br />
                    An application prohibiting the relocation of a child under s. 69 of the Family Law Act must be filed within 30 days after receiving written notice that the guardian plans to relocate the child [s. 68 Family Law Act]. 
                </p>
            </div>
        </div>
    </div>
        
    <!-- Part 1 -->
    
    <div style="display:flex; flex-direction:row gap:4px; font-size:9pt" >
        <div style="flex:1; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 1 | About the Parties</b>
            </div>

             <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; ">
                      <b>1. </b>My <b>full name</b> is:
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="376px"
                        beforetext="" hint="Full name of party" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.name | getFullName" />

                     <div style="padding-top:15px; padding-left:12px;"> 
                      <div style="display: inline-block; "> 
                        <b>My date of birth</b> is:
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="356px"
                        beforetext="" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.dob | beautify-date" />
                     </div>  
             </div>

            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem;">
                <div style="display: inline-block;">
                    <b>2. </b>The <b>other party’s full name is:</b>
                </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="290px"
                        beforetext="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="80px" :text="firstOtherParty.name | getFullName" /> 

                <div style="padding-top:10px; padding-left:12px;">
                    <div style="display: inline-block; ">
                    Their <b>date of birth:</b>(dd/mmm/yyyy) is:
                    </div>  
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="256px"
                        beforetext=""  :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="firstOtherParty.dob | beautify-date" />   
                    <div>
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;" :check="true?'yes':''"
                    />
                    <div style="margin-top: -18px;text-indent: 20px;">
                        There is an additional party.
                    </div>                      
                </div>
            <div>
                    
            </div>
                <div style="padding-top:5px">
                <div v-if="additionalOtherParties.length>0" style="font-size: 9pt;">

                <div v-for="(otherParty,inx) in additionalOtherParties" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                    <div style="display: inline-block;"> 
                        The<b> additional party’s</b> full name is:
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="270px"
                        beforetext="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="80px" :text="otherParty.name | getFullName" /> 
                    <div style="display: inline-block; padding-top:10px"> 
                        Their<b>  date of birth</b>(dd/mmm/yyyy) is: 
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="260px"
                        beforetext=""  :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="otherParty.dob | beautify-date" />  
                    </div>
                    </div>
                </div>
            </div> 

            </div>     
        </div>

        <div style="width: 20% ">
            <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:120px">
            <p>
            <b-icon-info-circle-fill />
            <br />
                The other party is any other parent or guardian of the child(ren).
            </p>
            </div>
        </div>

    </div>

    <!-- Part 2-->
     <div style="margin-top: 1rem;"></div>    
    <div style="display:flex; flex-direction:row gap:4px; font-size:9pt" >
        <div style="flex:1; float: left; margin-right: 10px;">
            <div style="margin-top: 0.3rem;"></div>
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 2 |Information about children</b>
            </div>

             <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block;">
                        <b>3.</b> This application is about the following child(ren) that I am a guardian of:
                    </div>
                              
                <b-table
                    :items="childrenInfo"
                    :fields="childrenFields"
                    class="mt-2"
                    small
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:head(dob)>
                            Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                        </template>
                </b-table> 
             </div>
              <div style="padding-left:12px">
                <b>4.</b> <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;" :check="true?'yes':''"
                    />
                    <div style="margin-top: -16px;text-indent: 28px;">
                        This <b>application is about enforcement under Rule 135</b>. I understand <b>I must give notice</b> of this application to each other party. <b>To give notice, they must be served</b> with the application and supporting documents <b>at least 7 days
                        before</b> the date of the court appearance <b>unless</b> the court allows the application 
                        to be made without notice or with less than 7 days’ notice.
                    </div>              
              </div>   
        </div>
        <div style="width: 20% ">
            <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:165px">
            <p>
            <b-icon-book />
            <br />
               For more information about best interests of the child, see the guidebook. 
            </p>
            </div>
        </div>
        
    </div>

  <!-- Part 3  -->
       <div style="margin-top: 1rem;"></div>    
    <div style="display:flex; flex-direction:row gap:4px; font-size:9pt" >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 0.3rem;"></div>
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 3 |Notice of the application</b>
            </div>
            <br>
            <div>
                <b>5.</b> <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;" :check="true?'yes':''"/>
                <div style="margin-top: -16px;text-indent: 28px;">
                    I understand <b>I must give notice</b> of this application to each other party, includingany other person who may be directly affected by the order. 
                </div>   
                <div>
                <b> To give notice, they must be served</b> with the application and supporting documents <b> at least 7 days before</b> the date of the court appearance <b> unless </b>the court allows the application to be made without notice or with less than 7 days’ notice
                </div>           
            </div> 
        </div>
        <div style="width: 20% ">
            <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:50px">
            <p>
            <b-icon-book />
            <br />
              For more information about serving court documents, see the guidebook. 
            </p>
            </div>
        </div>
          
    </div>

    <!-- Part 4 -->
    <div style="margin-top: 1rem;"></div>    
    <div style="display:flex; flex-direction:row gap:4px; font-size:9pt" >
        <div style="flex:1; float: left; margin-right: 10px;">
            <div style="margin-top: 0.3rem;"></div>
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 4 |About your court appearance</b>
            </div>
            <div style="text-indent:4px; margin:0 0 1rem 0; font-weight:normal; font-size:9pt;"><i>For registry or judicial case manager use only</i></div>
             <div style="border:1px solid; font-size: 9pt; padding:1rem;font-family:BCSans">
                <b>This application, which requires a court apprearance, will be heard by the court</b>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>on</b>" hint="date (mmm/dd/yyyy)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>at</b>" hint="time" text=""/>
                <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>

                <div style="margin:0.5rem 0 0 0.25rem;">
                    <underline-form style="text-indent:0px;display:inline-block;margin:0.5rem 0 0.5rem 0;" textwidth="10rem" beforetext="<b>You must attend the court appearance</b>" hint="(method of attendance)" text=""/>
                    <div style="text-indent:5px;display:inline;"><b>, unless otherwise allowed by the court.</b></div>
                    <check-box inline="inline" boxMargin="0" style="display:inline; font-weight:normal;" shift="10" :check="''" text="See attached for details"/>                        
                </div>
                <div style="margin:0.5rem 0 0 0.25rem;">
                  <div>
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                    />
                    <div style="margin-top: -18px;text-indent: 20px;">
                       In person at
                       <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="" hint="court location" text=""/>
                    </div> 
                  </div>
                </div>
                <div style="margin:0.5rem 0 0 0.25rem; display:flex; flex-direction:row; gap:10px">
                  <div style="width:20%">
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                    />
                    <div style="margin-top: -18px;text-indent: 20px;">
                      by another method of attendance, as specified
                    </div> 
                  </div>
                  <div style="flex:1; padding-top:8px">
                    <div style="border:1px solid; font-size: 9pt; padding:0.5rem;">
                        Do not attend the courthouse in person. The registry will send within 24 hours before the 
                        hearing date noted above the link to connect by MS Teams, including a dial-in conferencing 
                        number to be used by any party that is unable to use MS Teams or has problems with their 
                        video connection. If you have not provided your email address or telephone number to the 
                        registry on your Notice of Address Change (<a href="#">Form 46</a>), you must contact the registry to 
                        obtain the MS Teams conference information
                    </div>
                  </div>
                </div>
            </div>

            <div style="border-style: dashed; border-color: black; width: 80%;float: left; margin-top: 10px;width: 80%;padding:0.5rem; background: #d6d6d6; ">
             <b>NOTE TO THE OTHER PARTY:</b>
             <div style="margin:0.5rem; font-size:9pt;">
                <p>
                    <b> If you do not attend court</b> on the date and time scheduled for the court appearance, the court 
                    may make an order in your absence. 
                    You may also choose to <b> file a written response </b> in reply to the application in Form 19 Written 
                    Response to Application
                </p>
            </div>
            <div style="margin:0.2rem 0 0 1rem; font-size: 9pt;"> The court must be satisfied that:
                <ol class='resetcounteralpha'>
                    <li class='bracketalpha'>the proposed relocation is being made in good faith,</li>
                    <li class='bracketalpha'>the relocating guardian has proposed reasonable and workable arrangements to
                        preserve the relationship between the child and the child’s other guardians,
                        persons who are entitled to contact with the child, and other persons who have a
                        significant role in the child’s life, and</li>
                    <li class='bracketalpha'>the relocation is in the best interests of the child.</li>
                </ol>
            </div>
            </div>
        </div>

        <div style="width: 20% ">
            <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:50px">
            <p>
            <b-icon-info-circle-fill  />
            <br />
              The registry or judicial case manager will work with you to schedule a date for the court appearance and will fill in the actual date and method of attendance on the form. Be prepared to talk about your availability if there are options for dates. 
            </p>
            </div>
        </div>
    </div>    

   <!-- Part 5 -->

   <div style="margin-top: 1rem;"></div>  
    <div style="display:flex; flex-direction:row gap:4px; font-size:9pt" >
        <div style="flex:1; float: left; margin-right: 10px;">
                <div style="margin-top: 0.3rem;"></div>
                <div style="background: #626262; color: white; font-size: 13pt;">
                        <b>Part 5 |About the order</b>
                </div>
                <div>
                    <b style="padding-right:3px">6.</b>
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;" :check="true?'yes':''"/>
                    <div style="margin-top: -18px;text-indent: 30px;">
                    I am applying for an order to prohibit the relocation of a child or children.
                    </div> 
                </div> 
                <div style="padding-top:12px">
                    <b style="padding-right:3px">7.</b>
                    <check-box 
                        inline="inline" 
                        boxMargin="0"                 
                        style="display:inline; font-size: 9pt; text-indent: -16px; " 
                        :check="relocInfo.existingOrder?'yes':''" 
                        />
                        <div style="margin-top: -18px;text-indent: 30px;">
                            There is a written agreement or order respecting parenting arrangements referred to in section 65 of the Family Law Act made on
                            <underline-form 
                            style="text-indent:2px;display:inline" 
                            textwidth="8rem" 
                            beforetext="" 
                            hint="mmm/dd/yyyy" 
                            :italicHint="false" 
                            :text="relocInfo.existingOrderDate | beautify-date-blank"/>
                            that applies to the child(ren) that are the child(ren) that are the subject of this application (see attached copy of agreement or order).
                        </div>
                </div> 

                <div>
                <div class="print-block">            
                    <b>8.</b>
                    <div style="margin:0 0 0 0.5rem; display: inline; font-size: 9pt;"><i>Select only one of the options below and complete the required information</i></div>
                    <div style="margin:0.25rem 0 0 1.25rem;  font-size: 9pt;">
                        <check-box inline="inline" boxMargin="0" style="display:inline; font-size: 9pt; text-indent: -16px;" :check="relocInfo.receivedNotice?'yes':''"/>
                        <div style="margin-top: -18px;text-indent: 22px;">
                        Notice of relocation was given to me on
                        <underline-form  style="margin:0 0 0.5rem 0rem;text-indent:2px;display:inline-block" textwidth="8rem" beforetext="" aftertext="(see attached) copy" hint="mmm/dd/yyyy" :italicHint="false" :text="relocInfo.noticeDate | beautify-date-blank"/>
                        </div>
                    </div>
                    <div style="margin:0.25rem 0 0 1.25rem;  font-size: 9pt;">
                        <check-box inline="inline" boxMargin="0" style="display:inline; font-size: 9pt; text-indent: -16px;" :check="!relocInfo.receivedNotice?'yes':''" text="" />
                        <div style="margin-top: -18px;text-indent: 22px;">
                        <underline-form  style="margin-left:0rem; text-indent:0px; display:inline" textwidth="5.7rem" beforetext="I did not receive written notice of relocation but became aware of the planned relocation on" aftertext="." hint="mmm/dd/yyyy" :italicHint="false" :text="relocInfo.foundOutDate | beautify-date-blank"/>
                        </div>
                        <div style="margin:0.5rem 0 0 1rem;  font-size: 9pt;">                   
                            <underline-form  style="margin-left:0.35rem; display:inline" textwidth="6rem" beforetext="I understand the date of the relocation of the child(ren) to be" hint="Date(mmm/dd/yyyy)" :italicHint="false" :text="relocInfo.presumedRelocationDate | beautify-date-blank"/>
                            <underline-form  style="margin:0 0 0 0.35rem; text-indent:5px;display:inline" :textwidth="relocInfo.presumedLocation.length<22 ?'9rem':'22rem'" beforetext="to" aftertext="." hint="proposed location" :italicHint="false" :text="relocInfo.presumedLocation"/> 
                        </div>                    
                        <div style="text-indent:10px; margin:1rem 0 0 0.65rem; font-size: 9pt;"> 
                            I learned about the planned relocation:
                        </div>
                        <i style="text-indent:5px;margin:0.25rem 0 0 0.65rem; display: block; font-size: 9pt;">Briefly explain how you found out about the planned relocation if you did not receive written notice</i>
                        <div v-if="!relocInfo.receivedNotice && relocInfo.foundOutDescription" 
                            class="answerbox">{{relocInfo.foundOutDescription}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>       
                </div>       
            </div>                                    
        </div>

        <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:-30px">
                <p>
                <b-icon-info-circle-fill/>
                <br />
                You can make an application under s. 69 of the Family Law Act only if there is an existing written agreement or court order about parenting arrangements [s. 65 Family Law Act].
                </p>
                </div>

                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:20px">
                <p>
                <b-icon-paperclip/>
                <br />
                You must attach a copy of the agreement or order to this application for filing. 
                </p>
                </div>

                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:20px">
                <p>
                <b-icon-paperclip/>
                <br />
                ou must attach a copy of the notice of relocation, if applicable, to this application for filing. 
                </p>
                </div>
        </div>     
    </div>        

    <!-- Part 6 -->
    <div style="margin-top: 1rem;"></div>  
    <div style="display:flex; flex-direction:row gap:4px; font-size:9pt" >
        <div style="flex:1; float: left; margin-right: 10px;">
            <div style="margin-top: 0.3rem;"></div>
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 6 | Best interests of the child</b>
            </div>
            <div class="print-block">            
                <b style="padding-right:3px">9.</b>
                <div style="margin:0 0 0 0.4rem; display: inline; font-size: 9pt;">
                    I believe it is in the child(ren)’s best interests to prohibit the proposed relocation because:                 
                </div>
                <div v-if="relocInfo.childBestInterestReason" 
                    class="answerbox">{{relocInfo.childBestInterestReason}}</div>
                <div v-else style="margin-bottom:3rem;"></div>             
            </div>
        </div>
        <div style="width: 20% ">
            <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:50px">
            <p>
            <b-icon-info-circle-fill  />
            <br />
             To determine what is in the best interests of a child, all of the child’s needs and circumstances must be considered including the factors set out in s. 37 of the Family Law Act. The parties and the court must consider the best interests of a child when making a decision about contact with a child. For more information, see the guidebook. 
            </p>
            </div>
        </div>   
    </div>        

     <!-- Part 7 -->

    <div style="margin-top: 1rem;"></div>  
    <div style="display:flex; flex-direction:row gap:4px; font-size:9pt" >
        <div style="width:80%; float: left; margin-right: 10px;">
            <div style="margin-top: 0.3rem;"></div>
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 7 | Filling location</b>
            </div>
            
        <div class="print-block mt-0">            
                <b style="padding-right:3px">10.</b>
                <div style="display:inline; margin:0 0 0 0.25rem">I am filing this application <b>in the court registry:</b></div>
                <div style="margin-left:1rem;">
                    <i>Select only one of the options below</i>
                    <div style="padding-left:20px;">
                    <check-box  
                        style="text-indent:-16px"
                        :check="(filingLocationReason == 'It is the court location where my existing case with the same party/parties is filed')?'yes':''" 
                        text=""/>
                        <div style="margin-top: -18px;text-indent: 3px;">
                          Where my <b>existing case</b> with the same party/parties is located. I already havea court file number.
                        </div> 
                        
                    <check-box  
                       style="text-indent:-16px"
                        :check="(filingLocationReason == 'It is the court location closest to where the child lives, because my case involves a child-related issue')?'yes':''" />  
                        <div style="margin-top: -18px;text-indent: 3px;">
                          Closest to <b> where the child lives</b> most of the time, because my case involves a child-related issue
                        </div>         
                    <check-box  
                         style="text-indent:-16px"
                        :check="(filingLocationReason == 'The court made an order that allows me to')?'yes':''" />  
                         <div style="margin-top: -18px;text-indent: px;">
                         Permitted by <b>court order</b>
                        </div>  
                    </div>                      
                </div>  
            </div>
        </div>
    </div>   

      <!-- Part 8 -->
    <div style="margin-top: 1rem;"></div>  
    <div style="display:flex; flex-direction:row gap:4px; font-size:9pt" >
        <div style="flex:1; float: left; margin-right: 10px;">
            <div style="margin-top: 0.3rem;"></div>
                <div style="background: #626262; color: white; font-size: 13pt;">
                        <b>Part 8 | Address for service</b>
                </div>
                <b style="padding-right:3px">11.</b>
                <div style="margin:0 0 0 0.4rem; display: inline; font-size: 9pt;">
                    My address for service of court documents and contact information is:             
                </div>
                <div style="margin-left:2rem;">
                    <i>You must provide an address for service and contact number, but it does not have to be your own if you don’t want to</i>
                    <table class="compactfullsize" style="margin-top:0.5 !important; font-size: 9pt;">
                    
                        <tr style="border:1px solid #414142">          
                            <td colspan="3">Address: <div class="answer">{{yourInfo.address.street}} </div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td  >City: <div class="answer">{{yourInfo.address.city}}</div> </td>
                        <td style="padding-left:50px">Province: <div class="answer">{{yourInfo.address.state}}</div> </td>
                            <td>Postal Code: <div class="answer">{{yourInfo.address.postcode}}</div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td colspan="2">Email: <div class="answer">{{yourInfo.contact.email}}</div> </td>
                            <td>Telephone: <div class="answer">{{yourInfo.contact.phone}}</div> </td>
                        </tr>
                        <tr style="border:1px solid #414142" >
                            <td v-if="yourInfo.lawyer" colspan="3">Lawyer (if applicable): <div class="answer"> {{yourInfo.lawyerName | getFullName}}</div></td>
                            <td v-else  colspan="3">Lawyer (if applicable): </td>
                        </tr>
                    </table>
                </div>       
        </div>
        <div style="width: 20% ">
            <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:50px">
            <p>
            <b-icon-book />
            <br />
            For more information about how this information will be used and who will have access to it, see the guidebook. 
            </p>
            </div>
        </div>  
    </div> 
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import OrderedCheckBox from "@/components/utils/PopulateForms/components/OrderedCheckBox.vue";
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { relocationOfChildInformationDataInfoType, relocationOfChildOtherPartyDataInfoType } from '@/types/Application/RelocationOfChild/PDF';
import { relocChildrenInfoDataInfoType, relocQuestionnaireSurveyDataInfoType, relocChildBestInterestSurveyDataInfoType } from '@/types/Application/RelocationOfChild';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';


@Component({
    components:{
        UnderlineForm,
        CheckBox,
        OrderedCheckBox,
        
    }
})

export default class Form16Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;   

    otherPartyInfo: relocationOfChildOtherPartyDataInfoType[] = [];
    additionalOtherParties: relocationOfChildOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as relocationOfChildOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    relocInfo = {} as relocationOfChildInformationDataInfoType;

    existingFileNumber = '';
    filingLocationReason = '';
    childrenInfo = [{fullName:'', dob:'', currentSituation:'' }];  
    
    childrenFields=[
        {key:"fullName",               label:"Child's full name",                tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:18%;"},
        {key:"currentSituation",       label:"Child is currently living with",         tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:16%;"},
    ] 
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){
           
        this.otherPartyInfo = this.getOtherPartyInfo()        
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this.otherPartyInfo?.length > 1) {
            this.otherPartyInfo.splice(0,1)
            this.additionalOtherParties = this.otherPartyInfo;
        }

        if (this.result.relocChildrenInfoSurvey?.length > 0){          
            this.childrenInfo = this.getChildrenInfo();
        }
        
        this.yourInfo = this.getYourInfo();
        this.relocInfo = this.getRelocInfo();
        this.existingFileNumber = getLocationInfo(this.result.filingLocationSurvey);
        
        if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'y') {
            this.filingLocationReason = 'It is the court location where my existing case with the same party/parties is filed';
        } else if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'n' && this.result.filingLocationSurvey?.filingLocationReason){
            this.filingLocationReason = this.result.filingLocationSurvey.filingLocationReason;
        }
   } 
    
    public getChildrenInfo(){

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData: relocChildrenInfoDataInfoType[] = this.result.relocChildrenInfoSurvey;
       
        for (const child of childData){            
            childInfo = {} as childrenInfoSurveyInfoType;
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date')(child.dob);
            childInfo.currentSituation = child.currentLiving;           
            childrenInfo.push(childInfo)
        }        

        return childrenInfo;
    }

    public getYourInfo(){           

        if(this.result?.yourInformationSurvey){
            return getYourInformationResults(this.result?.yourInformationSurvey); 
        } 
        else
            return {} as yourInformationInfoDataInfoType
    }    

    public getOtherPartyInfo(){

        let OpInformation: relocationOfChildOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = []; 
           
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                const otherParty = {} as relocationOfChildOtherPartyDataInfoType;               

                if (party.knowDob == 'y' &&  party.dob)
                    otherParty.dob = party.dob

                if (party.name)
                    otherParty.name = party.name;
                
                if (party.address)
                    otherParty.address = party.address;
                
                if (party.contactInfo)
                    otherParty.contactInfo = party.contactInfo;
                
                if (party.lawyer)
                    otherParty.lawyer = party.lawyer
                                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }  
    
    public getRelocInfo(){

        const relocInformation = {} as relocationOfChildInformationDataInfoType;

        if (this.result.relocQuestionnaireSurvey) {

            const relocationQuestionnaireData: relocQuestionnaireSurveyDataInfoType = this.result.relocQuestionnaireSurvey;

            relocInformation.existingOrder = (relocationQuestionnaireData.ExistingParentingArrangements == 'y');
            relocInformation.existingOrderDate = (relocationQuestionnaireData.ExistingParentingArrangements == 'y' &&
                                                    relocationQuestionnaireData.orderDate)?relocationQuestionnaireData.orderDate:']';
            relocInformation.receivedNotice = (relocationQuestionnaireData.receiveNotice == 'y');
            relocInformation.noticeDate = (relocationQuestionnaireData.receiveNotice == 'y' &&
                                            relocationQuestionnaireData.noticeDate)?relocationQuestionnaireData.noticeDate:'';
            relocInformation.foundOutDate = (relocationQuestionnaireData.receiveNotice == 'n' &&
                                            relocationQuestionnaireData.foundOutDate)?relocationQuestionnaireData.foundOutDate:''; 
            relocInformation.foundOutDescription = (relocationQuestionnaireData.receiveNotice == 'n' &&
                                            relocationQuestionnaireData.foundOutAboutRelocationDescription)?relocationQuestionnaireData.foundOutAboutRelocationDescription:''; 
            relocInformation.impactOnChild = (relocationQuestionnaireData.impactOnChild == 'y');
            relocInformation.presumedRelocationDate = (relocationQuestionnaireData.receiveNotice == 'n' &&
                                            relocationQuestionnaireData.relocationDate)?relocationQuestionnaireData.relocationDate:''; 
            relocInformation.presumedLocation = (relocationQuestionnaireData.receiveNotice == 'n' &&
                                            relocationQuestionnaireData.childProposedLocation)?relocationQuestionnaireData.childProposedLocation:''; 
            
        }

        if (this.result.relocChildBestInterestInfoSurvey) {

            const relocChildBestInterest: relocChildBestInterestSurveyDataInfoType = this.result.relocChildBestInterestInfoSurvey;
            relocInformation.childBestInterestAcknowledgement = relocChildBestInterest.childBestInterestAcknowledgement.includes('I understand');
            relocInformation.childBestInterestReason = relocChildBestInterest.childBestInterestDescription;
        }

        return relocInformation;
    }
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">
    .container {
        display: inline;
        position: relative;
        padding: 0px;
        margin: 0px;
    
    
    
    }

    /* Create a custom checkbox */
    .container .checkmark {
        display: inline;
        position: absolute;
        border: 1px solid #000!important;
        padding: 1rem;
        top: 0;
        left: 0;
        height: 1em;
        width: 1em;
        background-color: #eee;
    }
</style>