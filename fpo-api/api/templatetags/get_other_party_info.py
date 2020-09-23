from django import template
import array
register = template.Library()

@register.simple_tag
def get_other_party_info(selectedPOOrder, protectionWhom, otherParty):
    
    info = [] 

    if selectedPOOrder['orderType'] == 'needPO' :
        dob = 'unknown'
        address = ''
        contactInfo = ''
        if protectionWhom['RespondentDOBExact'] == 'y':
            dob = protectionWhom['RespondentDOB']
        if hasattr(protectionWhom, 'RespondentAddress'):
            address = protectionWhom['RespondentAddress']
        if hasattr(protectionWhom,'RespondentContact'):
            contactInfo = protectionWhom['RespondentContact']
            
        info = [{'name':protectionWhom['RespondentName'], 'DOB': dob , 'address': address ,'contact': contactInfo}]
    
    elif selectedPOOrder['orderType'] == 'changePO' or selectedPOOrder['orderType'] == 'terminatePO' :    
        for party in otherParty:
            dob = 'unknown'
            if party['knowDob'] == 'y':
                dob = party['dob']
            info.append({'name':party['name'], 'DOB': dob , 'address': party['address'] ,'contact': party['contactInfo']})
   
    else:
        info = [{'name':{'first': '','middle': '', 'last': ''}, 'address': '' ,'contact': ''}]

    return info