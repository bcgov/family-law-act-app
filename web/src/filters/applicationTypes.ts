export const FLA_Types = [
    {pathway:"protectionOrder",             pdfType:"AAP",  appType:"FPO",           familyType:"PO",    fullName:"Protection Order"},
    {pathway:"protectionOrderneedPO",       pdfType:"AAP",  appType:"New FPO",       familyType:"PO",    fullName:"New Protection Order"},
    {pathway:"protectionOrderchangePO",     pdfType:"AAP",  appType:"Change FPO",    familyType:"PO",    fullName:"Change Protection Order"},
    {pathway:"protectionOrderterminatePO",  pdfType:"AAP",  appType:"Terminate FPO", familyType:"PO",    fullName:"Terminate Protection Order"},

    {pathway:"familyLawMatter",             pdfType:"FLC",  appType:"FLC",           familyType:"FLM",   fullName:"Family Law Matter"},
    {pathway:"familyLawMatterForm1",        pdfType:"NTRF", appType:"NTRF",          familyType:"FLM",   fullName:"Notice to Resolve a Family Law Matter"},

    {pathway:"caseMgmt",                    pdfType:"ACMO", appType:"ACMO",          familyType:"CM",    fullName:"Case Management"},
    {pathway:"caseMgmtForm11",              pdfType:"ACMW", appType:"ACMW",          familyType:"CM",    fullName:"Case Management Form11"},

    {pathway:"priorityParenting",           pdfType:"AXP",  appType:"AXP",           familyType:"PPM",   fullName:"Priority Parenting Matter"},

    {pathway:"childReloc",                  pdfType:"APRC", appType:"APRC",          familyType:"RELOC", fullName:"Relocation of a Child"},

    {pathway:"agreementEnfrc",              pdfType:"AFET", appType:"AFET",          familyType:"ENFRC", fullName:"Enforcement"},
    {pathway:"agreementEnfrc26",            pdfType:"RFA",  appType:"RFA",           familyType:"ENFRC", fullName:"File an Agreement"},
    {pathway:"agreementEnfrc27",            pdfType:"RDET", appType:"RDET",          familyType:"ENFRC", fullName:"File a Determination of Parenting Coordinator"},
    {pathway:"agreementEnfrc28",            pdfType:"RORD", appType:"RORD",          familyType:"ENFRC", fullName:"File an Order"},
];

	// if (name == 'protectionOrder')        	return "AAP";
	// if (name == 'familyLawMatterForm1') 	    return "NTRF";
	// if (name == 'familyLawMatter')   		return "FLC";
	// if (name == 'caseMgmt')          		return "ACMO";
	// if (name == 'caseMgmtForm11')          	return "ACMW";
	// if (name == 'priorityParenting') 		return "AXP";
	// if (name == 'childReloc')        		return "APRC";
	// if (name == 'agreementEnfrc')    		return "AFET";
	// if (name == 'agreementEnfrc26')    		return "RFA";
	// if (name == 'agreementEnfrc27')    		return "RDET";
	// if (name == 'agreementEnfrc28')    		return "RORD";



	//      if (orderName == "protectionOrder" && specific == '') return "Protection Order";
	// else if (orderName == "protectionOrder" && specific == 'needPO') return "New Protection Order";
	// else if (orderName == "protectionOrder" && specific == 'changePO') return "Change Protection Order";
	// else if (orderName == "protectionOrder" && specific == 'terminatePO') return "Terminate Protection Order";
	// else if (orderName == "familyLawMatter") return "Family Law Matter";
	// else if (orderName == "caseMgmt") return "Case Management";
	// else if (orderName == "priorityParenting") return "Priority Parenting Matter";
	// else if (orderName == "childReloc") return "Relocation of a Child";
	// else if (orderName == "agreementEnfrc") return "Enforcement";
	// else if (orderName == "agreementEnfrc26") return "File an Agreement";	
	// else if (orderName == "agreementEnfrc27") return "File a Determination of Parenting Coordinator";
	// else if (orderName == "agreementEnfrc28") return "File an Order";
	// else return "";


    // if (applicationType.includes("Protection Order")){
    // 	types.push(applicationType.replace("Protection Order", "FPO"));
    // }
    // if (applicationType.includes("Family Law Matter")){
    // 	types.push("FLC");
    // }
    // if (applicationType.includes("Case Management")){
    // 	types.push("ACMO");
    // }
    // if (applicationType.includes("Priority Parenting Matter")){
    // 	types.push("AXP");
    // }
    // if (applicationType.includes("Relocation of a Child")){
    // 	types.push("APRC");
    // }
    // if (applicationType.includes("Enforcement")){
    // 	types.push("AFET");
    // }


    // if (applicationType.includes("FPO")){
    // 	types.push(applicationType.replace("FPO", "Protection Order"));            
    // }
    // if (applicationType.includes(Vue.filter('getPathwayPdfType')("familyLawMatter"))){
    // 	types.push("Family Law Matter");
    // }
    // if (applicationType.includes(Vue.filter('getPathwayPdfType')("familyLawMatterForm1"))){
    // 	types.push("Notice to Resolve a Family Law Matter");
    // }
    // if (applicationType.includes(Vue.filter('getPathwayPdfType')("caseMgmt"))){
    // 	types.push("Case Management");
    // }
    // if (applicationType.includes(Vue.filter('getPathwayPdfType')("priorityParenting"))){
    // 	types.push("Priority Parenting Matter");
    // }
    // if (applicationType.includes(Vue.filter('getPathwayPdfType')("childReloc"))){
    // 	types.push("Relocation of a Child");
    // }
    // if (applicationType.includes(Vue.filter('getPathwayPdfType')("agreementEnfrc"))){
    // 	types.push("Enforcement");
    // }

    // if (applicationType.includes(Vue.filter('getPathwayPdfType')("protectionOrder"))){
    // 	types.push("Protection Order");     
    // }