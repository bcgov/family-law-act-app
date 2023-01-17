import json

from django.conf import settings
from datetime import datetime
from datetime import timedelta
from datetime import timezone


#__Models__
from api.models.user import User
from api.models.application import Application
from api.models.prepared_pdf import PreparedPdf
from api.models.efiling_submission import EFilingSubmission
#__________




def statistics_info(start_date, end_date, tz):
    # print("___________")
    # print("___START___")
    # print("___________")
    
    start = datetime.fromisoformat(start_date)
    start_date = datetime(start.year, start.month, start.day, 0,0,0,0,timezone(timedelta(hours=tz/60)))
    
    end = datetime.fromisoformat(end_date)
    end_date = datetime(end.year, end.month, end.day, 23,59,0,0,timezone(timedelta(hours=tz/60)))

    applications_with_date = Application.objects.filter(
        last_updated__gte=start_date,
        last_updated__lte=end_date
    )

    report = {"start_date":start_date, "end_date":end_date}
    report["users_registration_info"] = get_users_info(start_date, end_date)
    
    report["users_with_application"] = users(applications_with_date)

    report["prepared_pdfs"] = num_of_prepared_pdfs(start_date, end_date)
    report["efiling_submissions"] = num_of_efiling_submissions(start_date, end_date)

    # report["steps"] = steps(applications_with_date)

    report["application_details"] = application_details(applications_with_date)

    return report

# TEST PURPOSE ONLY
# def steps(applications):    
#     stat=list()
#     for app in applications.filter():
#         steps_dec = settings.ENCRYPTOR.decrypt(app.key_id, app.steps)
#         steps = json.loads(steps_dec)
#         stat.append(steps)
#     return stat

def application_details(applications):    
    stat={
        "PO":{"total":0, "started":0, "draft":0, "completed":0},
        "RFLM":{"total":0, "started":0, "draft":0, "completed":0},
        "WR":{"total":0, "started":0, "draft":0, "completed":0},
        "CA":{"total":0, "started":0, "draft":0, "completed":0},
        "FLM":{"total":0, "started":0, "draft":0, "completed":0},
        "CM":{"total":0, "started":0, "draft":0, "completed":0},
        "PPM":{"total":0, "started":0, "draft":0, "completed":0},
        "RELOC":{"total":0, "started":0, "draft":0, "completed":0},
        "ENFRC":{"total":0, "started":0, "draft":0, "completed":0}
    }
    for app in applications:
        steps_dec = settings.ENCRYPTOR.decrypt(app.key_id, app.steps)
        steps = json.loads(steps_dec)
        get_started=steps[0]

        pdf={
            "PO":["AAP"],
            "RFLM":["RPL"],
            "WR":["WRA"],
            "CA":["RCA"],
            "FLM":["FLC","NTRF"],
            "CM":["ACMO","ACMW"],
            "PPM":["AXP"],
            "RELOC":["APRC"],
            "ENFRC":["AFET","RFA","RDET","RORD"]
        }
        
        for step in steps:
            name = step["name"]
            if(step["active"] and name not in ["GETSTART","COMMON","CONNECT","SUBMIT"]):

                #TOTAL
                stat[name]["total"]=stat[name]["total"]+1

                if "result" not in step:
                    stat[name]["started"]=stat[name]["started"]+1
                elif (
                    "submittedPdfList" in get_started["result"] and 
                    any(x in pdf[name] for x in get_started["result"]["submittedPdfList"])
                ):
                    stat[name]["completed"]=stat[name]["completed"]+1
                else:
                    stat[name]["draft"]=stat[name]["draft"]+1

    return stat



def num_of_prepared_pdfs(start_date, end_date):
    pdf_data = PreparedPdf.objects.filter(
        created_date__gte=start_date,
        created_date__lte=end_date).values('pdf_type')            
    return pdf_data


def num_of_efiling_submissions(start_date, end_date):
    efilings_data = EFilingSubmission.objects.filter(
        created_date__gte=start_date,
        created_date__lte=end_date)
    return {
        "try_to_efile": efilings_data.count(),
        "finalized_efile": efilings_data.exclude(package_number=None).count(),
        "total_applications": efilings_data.values_list('application_id',flat=True).distinct().count()
    }


def users(model_with_date):
    model_data = model_with_date.values_list('user_id',flat=True).distinct()
    return model_data.count()   


def get_users_info(start_date, end_date):
    users_info = {}
    model_data = User.objects.filter()

    users_info["total"] = model_data.count()
    users_info["active_in_period"] = model_data.filter(
            last_login__gte=start_date,
            last_login__lte=end_date            
        ).count()
    users_info["joined_in_period"] = model_data.filter(
            date_joined__gte=start_date,
            date_joined__lte=end_date            
        ).count()

    return users_info