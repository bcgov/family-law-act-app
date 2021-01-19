from django.core.cache.backends import filebased


class SurveyCache:
    def __init__(self, cache_dir, timeout, max_entries, uid):
        self.instance = filebased.FileBasedCache(
	        cache_dir,
            {
                'TIMEOUT': timeout,
                'MAX_ENTRIES': max_entries,
            })
        self.user_id = uid

    def get(self, key):
        return self.instance.get(key)

    def set(self, key, value):
        if value is None:
            return self.instance.delete(key)
        return self.instance.set(key, value)

    def delete(self, key):
        return self.instance.delete(key)

    def get_survey(self, survey_name, key):
        ck = '{}-survey-{}-{}'.format(self.user_id, survey_name, key)
        return self.get(ck)

    def set_survey(self, survey_name, key, value):
        ck = '{}-survey-{}-{}'.format(self.user_id, survey_name, key)
        return self.set(ck, value)

    def get_most_recent(self, survey_name):
        ck = '{}-most-recent-{}'.format(self.user_id, survey_name)
        return self.get(ck)

    def set_most_recent(self, survey_name, key):
        ck = '{}-most-recent-{}'.format(self.user_id, survey_name)
        return self.set(ck, key)