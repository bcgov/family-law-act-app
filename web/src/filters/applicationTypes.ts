export const FLA_Types = [
    {pathway:"protectionOrder",                             pdfType:"AAP",  appType:"FPO",           familyType:"PO",    otherForms:false, fullName:"Protection Order"},
    {pathway:"protectionOrderneedPO",                       pdfType:"AAP",  appType:"New FPO",       familyType:"PO",    otherForms:false, fullName:"New Protection Order"},
    {pathway:"protectionOrderchangePO",                     pdfType:"AAP",  appType:"Change FPO",    familyType:"PO",    otherForms:false, fullName:"Change Protection Order"},
    {pathway:"protectionOrderterminatePO",                  pdfType:"AAP",  appType:"Terminate FPO", familyType:"PO",    otherForms:false, fullName:"Terminate Protection Order"},

    {pathway:"familyLawMatter",                             pdfType:"FLC",  appType:"FLC",           familyType:"FLM",   otherForms:false, fullName:"Family Law Matter"},
    {pathway:"familyLawMatterForm1",                        pdfType:"NTRF", appType:"NTRF",          familyType:"FLM",   otherForms:false, fullName:"Notice to Resolve a Family Law Matter"},

    {pathway:"caseMgmt",                                    pdfType:"ACMO", appType:"ACMO",          familyType:"CM",    otherForms:false, fullName:"Case Management"},
    {pathway:"caseMgmtForm11",                              pdfType:"ACMW", appType:"ACMW",          familyType:"CM",    otherForms:false, fullName:"Case Management Form11"},

    {pathway:"priorityParenting",                           pdfType:"AXP",  appType:"AXP",           familyType:"PPM",   otherForms:false, fullName:"Priority Parenting Matter"},

    {pathway:"childReloc",                                  pdfType:"APRC", appType:"APRC",          familyType:"RELOC", otherForms:false, fullName:"Relocation of a Child"},

    {pathway:"agreementEnfrc",                              pdfType:"AFET", appType:"AFET",          familyType:"ENFRC", otherForms:false, fullName:"Enforcement"},
    {pathway:"agreementEnfrc26",                            pdfType:"RFA",  appType:"RFA",           familyType:"ENFRC", otherForms:false, fullName:"File an Agreement"},
    {pathway:"agreementEnfrc27",                            pdfType:"RDET", appType:"RDET",          familyType:"ENFRC", otherForms:false, fullName:"File a Determination of Parenting Coordinator"},
    {pathway:"agreementEnfrc28",                            pdfType:"RORD", appType:"RORD",          familyType:"ENFRC", otherForms:false, fullName:"File an Order"},

    {pathway:"replyFlm",                                    pdfType:"RPL",  appType:"RFLM",          familyType:"RFLM",  otherForms:false, fullName:"Reply to Application About a Family Law Matter"},
    
    {pathway:"writtenResponse",                             pdfType:"WRA",   appType:"WRA",          familyType:"WR",    otherForms:false, fullName:"Written Response to Application"},    
    {pathway:"replyCaseMgmt",                               pdfType:"WRA",   appType:"RCM",          familyType:"WR",    otherForms:false, fullName:"Reply to Application for Case Management Order"},
    {pathway:"replyProtectionOrder",                        pdfType:"WRA",   appType:"RPO",          familyType:"WR",    otherForms:false, fullName:"Reply to Application About a Protection Order"},
    {pathway:"replyPriorityParenting",                      pdfType:"WRA",   appType:"RPP",          familyType:"WR",    otherForms:false, fullName:"Reply to Application About a Priority Parenting Matter"},
    {pathway:"replyChildReloc",                             pdfType:"WRA",   appType:"RCR",          familyType:"WR",    otherForms:false, fullName:"Reply to Application for Order Prohibiting the Relocation of a Child"},
    {pathway:"replyAgreementEnfrc",                         pdfType:"WRA",   appType:"RAE",          familyType:"WR",    otherForms:false, fullName:"Reply to Application About Enforcement"},
    {pathway:"replyFamilyMaintenanceEnfrc",                 pdfType:"WRA",   appType:"RFME",         familyType:"WR",    otherForms:false, fullName:"Reply to Application for Order Under the Family Maintenance Enforcement Act"},
    
    {pathway:"replyCounterApplication",                     pdfType:"RCA",   appType:"RCA",          familyType:"CA",    otherForms:false, fullName:"Reply to an Application About a Family Law Matter with Counter Application"},
    
    {pathway:"affidavit",                                   pdfType:"AFF",   appType:"AFF",          familyType:"AFF",    otherForms:true, fullName:"Affidavit – General"}, 
    {pathway:"affidavitPersonalService",                    pdfType:"APS",   appType:"APS",          familyType:"APS",    otherForms:true, fullName:"Affidavit of Personal service"},
    {pathway:"affidavitPersonalServicePO",                  pdfType:"APSP",  appType:"APSP",         familyType:"APSP",   otherForms:true, fullName:"Affidavit of Personal Service of Protection Order"},
        
    {pathway:"certificateOfService",                        pdfType:"CSV",   appType:"CSV",          familyType:"CSV",    otherForms:true, fullName:"Certificate of Service"},
    {pathway:"consentAdjournment",                          pdfType:"CONA",  appType:"CONA",         familyType:"CONA",   otherForms:true, fullName:"Consent adjournment"},    
    {pathway:"consentOrder",                                pdfType:"COR",   appType:"COR",          familyType:"COR",    otherForms:true, fullName:"Consent Order"},
    {pathway:"consentInformalTrial",                        pdfType:"CIFT",  appType:"CIFT",         familyType:"CIFT",   otherForms:true, fullName:"Consent to an Informal Trial (Kamloops only)"},
    {pathway:"electronicFilingStatement",                   pdfType:"EFSP",  appType:"EFSP",         familyType:"EFSP",   otherForms:true, fullName:"Electronic Filing Statement"},
    {pathway:"electronicFilingStatementAff",                pdfType:"EFSPAFF",  appType:"EFSPA",     familyType:"EFSP",   otherForms:true, fullName:"Electronic Filing Statement - Affidavit General"},
    {pathway:"electronicFilingStatementGa",                 pdfType:"EFSPGA",  appType:"EFSPG",      familyType:"EFSP",   otherForms:true, fullName:"Electronic Filing Statement - Guardianship Affidavit"},
    {pathway:"faxFilingCoverPage",                          pdfType:"FF",    appType:"FF",           familyType:"FF",     otherForms:true, fullName:"Fax Filing Cover Page"},
    
    {pathway:"financialStatement",                          pdfType:"FS",    appType:"FS",           familyType:"FS",     otherForms:true, fullName:"Financial Statement"},
    {pathway:"guardianshipAffidavit",                       pdfType:"GA",    appType:"GA",           familyType:"GA",     otherForms:true, fullName:"Guardianship Affidavit"},  
    {pathway:"noticeOfAddressChange",                       pdfType:"NCD",   appType:"NCD",          familyType:"NCD",    otherForms:true, fullName:"Notice of Address Change"},         
    {pathway:"noticeDiscontinuance",                        pdfType:"NDT",   appType:"NDT",          familyType:"NDT",    otherForms:true, fullName:"Notice of Discontinuance"},
    {pathway:"noticeExemptionParentingEducationProgram",    pdfType:"PASE",  appType:"PASE",         familyType:"PASE",   otherForms:true, fullName:"Notice of Exemption from Parenting Education Program"},
    {pathway:"noticeIntentionProceed",                      pdfType:"NPR",   appType:"NPR",          familyType:"NPR",    otherForms:true, fullName:"Notice of Intention to Proceed"},        
    {pathway:"noticeLawyerChild",                           pdfType:"NLC",   appType:"NLC",          familyType:"NLC",    otherForms:true, fullName:"Notice of Lawyer for Child"},
    {pathway:"noticeLawyerParty",                           pdfType:"NLP",   appType:"NLP",          familyType:"NLP",    otherForms:true, fullName:"Notice of Lawyer for Party"},    
    {pathway:"noticeParticipation",                         pdfType:"NP",    appType:"NP",           familyType:"NP",     otherForms:true, fullName:"Notice of Participation"},    
    {pathway:"noticeRemoveLawyerChild",                     pdfType:"NLCR",  appType:"NLCR",         familyType:"NLCR",   otherForms:true, fullName:"Notice of Removal of Lawyer for Child"},
    {pathway:"noticeRemoveLawyerParty",                     pdfType:"NLPR",  appType:"NLPR",         familyType:"NLPR",   otherForms:true, fullName:"Notice of Removal of Lawyer for Party"},
    {pathway:"order",                                       pdfType:"ORD",   appType:"ORD",          familyType:"ORD",    otherForms:true, fullName:"Order – General"},
    {pathway:"referralRequest",                             pdfType:"REF",   appType:"REF",          familyType:"REF",    otherForms:true, fullName:"Referral Request"},
    {pathway:"requestScheduling",                           pdfType:"RQS",   appType:"RQS",          familyType:"RQS",    otherForms:true, fullName:"Request for Scheduling"},    
    {pathway:"requestServiceDocuments",                     pdfType:"RFS",   appType:"RFS",          familyType:"RFS",    otherForms:true, fullName:"Request for Service of Documents"},
    {pathway:"requestServiceFPO",                           pdfType:"RPS",   appType:"RPS",          familyType:"RPS",    otherForms:true, fullName:"Request for Service of Family Protection Order"},
    {pathway:"trialReadinessStatement",                     pdfType:"TRIS",  appType:"TRIS",         familyType:"TRIS",   otherForms:true, fullName:"Trial Readiness Statement"},

    {pathway:"summons",                                     pdfType:"SUM",   appType:"SUM",          familyType:"SUM",    otherForms:true, fullName:"Summons – General"},
    {pathway:"summonsCommintal",                            pdfType:"SCH",   appType:"SCH",          familyType:"SCH",    otherForms:true, fullName:"Summons to a Committal Hearing"},
    {pathway:"summonsDefault",                              pdfType:"SDH",   appType:"SDH",          familyType:"SDH",    otherForms:true, fullName:"Summons to a Default Hearing"},
    {pathway:"requisition",                                 pdfType:"REQ",   appType:"REQ",          familyType:"REQ",    otherForms:true, fullName:"Requisition"},
    {pathway:"requestTeleconference",                       pdfType:"RFT",   appType:"RFT",          familyType:"RFT",    otherForms:true, fullName:"Request to be heard by teleconference or videoconference"}    
];