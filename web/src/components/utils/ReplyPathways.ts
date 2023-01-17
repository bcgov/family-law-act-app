
export function getWrittenResponseApplications(types) { 
    
    const applicationList = [];
          
    if(types?.length){
            
        if (types.includes("Reply to Application for Case Management Order")){
            applicationList.push('a case management order')
        } 
        if (types.includes("Reply to Application for Order Under the Family Maintenance Enforcement Act")){
            applicationList.push('an order under the Family Maintenance Enforcement Act')
        } 
        if (types.includes("Reply to Application About Enforcement")){
            applicationList.push('enforcement')
        } 
        if (types.includes("Reply to Application for Order Prohibiting the Relocation of a Child")){
            applicationList.push('prohibiting relocation of a child')
        } 
        if (types.includes("Reply to Application About a Priority Parenting Matter")){
            applicationList.push('a priority parenting matter')
        } 
        if (types.includes("Reply to Application About a Protection Order")){
            applicationList.push('a protection order')
        }          

    }
    
    return applicationList;
}

