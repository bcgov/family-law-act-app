from django import template
import array
register = template.Library()

@register.simple_tag
def get_other_party_info(selectedPOOrder, protectionWhom, otherParty):
    
    info = [] 

    if selectedPOOrder['orderType'] == 'needPO' :
        dob = 'unknown'
        if protectionWhom['RespondentDOBExact'] == 'y':
            dob = protectionWhom['RespondentDOB']
        info = [{'name':protectionWhom['RespondentName'], 'DOB': dob , 'address': protectionWhom['RespondentAddress'] ,'contact': protectionWhom['RespondentContact']}]
    
    elif selectedPOOrder['orderType'] == 'changePO' or selectedPOOrder['orderType'] == 'terminatePO' :    
        for party in otherParty:
            dob = 'unknown'
            if party['knowDob'] == 'y':
                dob = party['dob']
            info.append({'name':party['name'], 'DOB': dob , 'address': party['address'] ,'contact': party['contactInfo']})
   
    else:
        info = [{'name':{'first': '','middle': '', 'last': ''}, 'address': '' ,'contact': ''}]

    return info