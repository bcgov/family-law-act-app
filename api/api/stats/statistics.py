import json
import logging

from django.conf import settings
from datetime import datetime
from datetime import timedelta
from datetime import timezone
from django.utils import timezone as django_timezone

#__Models__
from api.models.user import User
from api.models.application import Application
from api.models.prepared_pdf import PreparedPdf
from api.models.efiling_submission import EFilingSubmission
#__________
LOGGER = logging.getLogger(__name__)



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

    report["logged_in_users"] = get_logged_in_users()

    report["prepared_pdfs"] = num_of_prepared_pdfs(start_date, end_date)
    report["efiling_submissions"] = num_of_efiling_submissions(start_date, end_date)

    # report["steps"] = steps(applications_with_date)

    report["application_details"] = application_details(applications_with_date)

    return report

#___TEST PURPOSE ONLY________________
# def steps(applications):
#     stat=list()
#     for app in applications.filter():
#         steps_dec = settings.ENCRYPTOR.decrypt(app.key_id, app.steps)
#         steps = json.loads(steps_dec)
#         stat.append(steps)
#     return stat
#_____________________________________

def application_details(applications):
    stat={
        "PO":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "RFLM":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "WR":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "CA":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "FLM":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "CM":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "PPM":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "RELOC":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "ENFRC":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "OTHER":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "NCD":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "NDT":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "NPR":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "RQS":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "TRIS":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "NLC":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "NLCR":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "AFF":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "NLP":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "NLPR":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0},
        "EFSP":{"total":0, "started":0, "draft":0, "completed":0, "efiled":0}
    }
    stat_keys = list(stat.keys())

    for app in applications:
        steps_dec = settings.ENCRYPTOR.decrypt(app.key_id, app.steps)
        steps = json.loads(steps_dec)
        get_started=steps[0]
        efiled = app.last_filed

        pdf={
            "PO":["AAP"],
            "RFLM":["RPL"],
            "WR":["WRA"],
            "CA":["RCA"],
            "FLM":["FLC","NTRF"],
            "CM":["ACMO","ACMW"],
            "PPM":["AXP"],
            "RELOC":["APRC"],
            "ENFRC":["AFET","RFA","RDET","RORD"],
            "OTHER":[],
            "NCD":["NCD"],
            "NDT":["NDT"],
            "NPR":["NPR"],
            "RQS":["RQS"],
            "TRIS":["TRIS"],
            "NLC":["NLC"],
            "NLCR":["NLCR"],
            "AFF":["AFF"],
            "NLP":["NLP"],
            "NLPR":["NLPR"],
            "EFSP":["EFSP"]
        }

        for step in steps:
            if "name" in step and step["name"] in stat_keys :
                name = step["name"]
                if(step["active"] and name not in ["GETSTART","COMMON","CONNECT","SUBMIT"]):

                    # OTHER
                    other_form = False
                    if ( (name == 'OTHER') and ("result" in step) and ("completeOtherFormsSurvey" in step["result"]) ):
                        try:
                            forms = step["result"]["completeOtherFormsSurvey"]["data"]["selectedFormInfoList"]
                            for form in forms:
                                if bool(form["manualState"]):
                                    other_form = True
                                    break
                        except Exception as err:
                            LOGGER.debug(err)

                    if (name == 'OTHER' and not other_form):
                        continue


                    #TOTAL
                    stat[name]["total"]=stat[name]["total"]+1

                    if isinstance(efiled, datetime):
                        stat[name]["efiled"]=stat[name]["efiled"]+1
                    else:
                        if "result" not in step:
                            stat[name]["started"]=stat[name]["started"]+1
                        elif (
                            "submittedPdfList" in get_started["result"] and
                            any(x in pdf[name] for x in get_started["result"]["submittedPdfList"])
                        ):
                            stat[name]["completed"]=stat[name]["completed"]+1
                        elif (name == 'OTHER' and other_form
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


def get_logged_in_users():
    users_info = list()

    max_login_date =  django_timezone.now()+ django_timezone.timedelta(hours=-8)
    print(max_login_date)

    recent_hours =  django_timezone.now()+ django_timezone.timedelta(hours=-1)
    print(recent_hours)

    users = User.objects.filter(
            last_login__gte=max_login_date
        ).all()

    for user in users:
        usr = list()

        app = Application.objects.filter(
            user_id=user.id,
            last_updated__gte=recent_hours
        )

        usr = app.values_list('app_type', flat=True)

        users_info.append(usr)
    return users_info
