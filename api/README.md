# Family Protection Order API

## Overview

The API provides an interface into the database for Family Protection Order.

## Development

The API is developed in Django/Python, using a Visual Studio 2017 project.

Updated using Vim. The following auto command is helpful for auto deploying to the container:
```ed
:autocmd BufWritePost * execute '!/usr/bin/docker cp <afile> fpo_fpo-api_1:/opt/app-root/src/fpo_api/'
```

For working on the templates run this
```ed
:autocmd BufWritePost * execute '!/usr/bin/docker cp <afile> fpo_fpo-api_1:/opt/app-root/src/templates/'
```

The default web server is _gunicorn_. It operates with multiple workers and is not configured to refresh on file changes. To run a separate server that can refresh properly do the following
```bash
docker ps # List containers and find the name for the API instance
docker exec -it fpo_fpo-api_1 /bin/bash
python3 manage.py runserver 0.0.0.0:8000
```

Make sure the port is open within the _docker-compose.yml_ file.


## Development Deployment Environment

To deploy Family Protection Order on an instance of OpenShift, see [the instructions](../RunningLocal.md) in the file RunningLocal.md.

- [Schema Spy](http://schema-spy-09e0c5.pathfinder.gov.bc.ca/)
- [Open API (Swagger) API Explorer](http://django-09e0c5.pathfinder.gov.bc.ca/api/v1/)

## Database Migrations

Migrations are triggered automatically when the Django/Python container is deployed.  The process it triggered by wrapper code injected as part of the s2i-python-container build; https://github.com/sclorg/s2i-python-container/blob/master/3.6/s2i/bin/run

## ToDo:
- The auto-generated views are constructed using generics and a number of mixins.
  - Determine if there is a better way to do this.  Since it's not as clean as something constructed from ModelSerializer or HyperlinkedModelSerializer.


## Testing
```bash
curl -X POST \
  -d '@/path/to/data.json' \
  "http://localhost:8000/form?name=family-law-matter-claim"

curl -X POST --output output.pdf\
  -H 'Accept: application/pdf' \
  -H 'Content-Type: application/json' \
  -d '@path/to/data.json' \
  "http://localhost:8000/form?name=family-law-matter-claim"
```
