from django import template
register = template.Library()

@register.simple_tag
def get_contact_info(data):
    if data['Lawyer'] == 'y':
        info = {'lawyername':data['LawyerName'], 'address': data['LawyerAddress'] ,'contact': data['LawyerContact']}
    else:
        info = {'lawyername':{'first': '','middle': '', 'last': ''}, 'address': data['ApplicantAddress'] ,'contact': data['ApplicantContact']}
    return info