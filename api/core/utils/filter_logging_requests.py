
def filter_logging_requests(record):
    message = record.getMessage()
    if message.find('GET /health/') >= 0:
        return False
    return True
