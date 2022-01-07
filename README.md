[![Lifecycle:Stable](https://img.shields.io/badge/Lifecycle-Stable-97ca00)](https://github.com/bcgov/family-law-act-app/)

# Family-Protection-Order
Family Law Act Form

## Structure

## Dev environment
Currently it needs npm 5.8, node 9.4, e2s installed. 
running on Docker is recommended

### Client Application (web)
An AngularJS client application which serves out the SurveyJS based questionnaire.

###	REST API (api)
A Django based REST API which provides the heavy lifting.  The API includes a Swagger interface containing API documentation and UI that allows you to interact with the various APIs manually.

### PDF Microservice (pdf)
An html to PDF microservice used to generate reports.

###	Database (db)
A PostgreSQL database for storage, complete with a SchemaSpy instance for documentation.

## Running on OpenShift
To deploy using a local instance of OpenShift, refer to [Running on OpenShift](./RunningOnOpenShift.md).  These instructions, apart from the steps that are specific to setting up your local environment, can be used to get the project deployed to a production OpenShift environment.

## Running on Docker
The project can also be run locally using Docker and Docker Compose.  Refer to [Running with Docker Compose](./docker/README.md) for instructions.

## Code of Conduct
Please refer to the [Code of Conduct](./CODE_OF_CONDUCT.md) 

## Contributing
For information on how to contribute, refer to [Contributing](CONTRIBUTING.md)

## License
Code released under the [Apache License, Version 2.0](./LICENSE).
