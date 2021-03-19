
def filter_logging_requests(record):
    message = record.getMessage()
    if message.find('GET /health/'):
        return False
    return True
