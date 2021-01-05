from django import template
register = template.Library()

@register.simple_tag
def get_contact_info(data):

    if 'Lawyer' in data and data['Lawyer'] == 'y':
        lawyerName=''
        lawyerAddress=''
        lawyerContact=''

        if 'LawyerName' in data:
            lawyerName = data['LawyerName']
        
        if 'LawyerAddress' in data:
            lawyerAddress = data['LawyerAddress']

        if 'LawyerContact' in data:
            lawyerContact = data['LawyerContact']

        info = {'lawyername':lawyerName, 'address': lawyerAddress ,'contact': lawyerContact}
        
    else:
        address=''
        contact=''
        
        if 'ApplicantAddress' in data:
            address = data['ApplicantAddress']

        if 'ApplicantContact' in data:
            contact = data['ApplicantContact']

        info = {'lawyername':{'first': '','middle': '', 'last': ''}, 'address': address ,'contact': contact}

    return info