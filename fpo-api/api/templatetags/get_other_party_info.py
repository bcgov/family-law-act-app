from django import template
import array
register = template.Library()

@register.simple_tag
def get_other_party_info(selectedPOOrder, protectionWhom, otherParty):
    
    info = [] 
    if 'orderType' in selectedPOOrder:
        if selectedPOOrder['orderType'] == 'needPO' :
            dob = 'unknown'
            name = ''
            address = ''
            contactInfo = ''

            if 'RespondentDOBExact' in protectionWhom:
                if protectionWhom['RespondentDOBExact'] == 'y':
                    if 'RespondentDOB' in protectionWhom:
                        dob = protectionWhom['RespondentDOB']
            
            if 'RespondentName' in protectionWhom:
                name = protectionWhom['RespondentName']
            
            if 'RespondentAddress' in protectionWhom:
                address = protectionWhom['RespondentAddress']
            
            if 'RespondentContact' in protectionWhom:
                contactInfo = protectionWhom['RespondentContact']
                
            info = [{'name':name, 'DOB': dob , 'address': address ,'contact': contactInfo}]
        
        elif selectedPOOrder['orderType'] == 'changePO' or selectedPOOrder['orderType'] == 'terminatePO' :    
            for party in otherParty:
                dob = 'unknown'
                name = ''
                address = ''
                contactInfo = ''

                if 'knowDob' in party:
                    if party['knowDob'] == 'y':
                        if 'dob' in party:
                            dob = party['dob']

                if 'name' in party:
                    name = party['name']
                
                if 'address' in party:
                    address = party['address']
                
                if 'contactInfo' in party:
                    contactInfo = party['contactInfo']
                
                info.append({'name':name, 'DOB': dob , 'address': address ,'contact': contactInfo})
    
        else:
            info = [{'name':{'first': '','middle': '', 'last': ''}, 'address': '' ,'contact': ''}]

    return info