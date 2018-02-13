# Running with Docker Compose

The following instructions provide details on how to deploy the project using Docker Compose.  This method of deployment is intended for local development and demonstration purposes.  It is **NOT** intended to support production level deployments where security, availability, resilience, and data integrity are important.

All application services are exposed to the host so they may be easily accessed individually for development and testing purposes.

## Prerequisites

* Docker and Docker Compose
  * Install and configure Docker and Docker Compose on your system.  The recommended approach is to use either [Homebrew](https://brew.sh/) (MAC) or [Chocolatey](https://chocolatey.org/) (Windows) to install Docker (which includes Docker Compose).
* The S2I CLI
  * Download and install the S2I CLI tool; [source-to-image](https://github.com/openshift/source-to-image)
  * Make sure it is avaialble on your `PATH`.  The `manage.sh` will look for the `s2i` executable on your `PATH`.  If it is not found you will get a message asking you to download and set it on your `PATH`.
* If you are working on Windows, use Git Bash (or equivalent shell) to run the scripts.
* Fork and clone a local working copy of the project source code.

## Management Script

The `manage.sh` script wraps the Docker and S2I process in easy to use commands.

To get full usage information on the script run:
```
./manage.sh -h
```
  
## Building the Images

The first thing you'll need to do is build the Docker images.  Since this requires a combination of Docker and S2I builds the process has been scripted inside `manage.sh`.  _The `docker-compose.yml` file does not perform any of the builds._

To build the images run:
```
./manage.sh build
```

### Troubleshooting the Building

If you get errors during the build that references scripts such as the following, check the line endings of your local copy of the file.  Replace `CRLF` line endings with `LF` and rebuild the image.

The `.gitattributes` file for the project has been updated, but if your local copy predates the update, your files may still be affected.

```
/bin/sh: 1: /usr/libexec/s2i/assemble-runtime: not found
error: Execution of post execute step failed
Build failed
ERROR: An error occurred: non-zero (13) exit code from angular-builder
```

In this example search your working copy for all instances of `assemble-runtime`.

## Starting the Project

To start the project run:
```
./manage.sh start
```

This will start the project interactively; with all of the logs being written to the command line.

## Stopping the Project

To stop the project run:
```
./manage.sh stop
```

This will shutdown all of the containers in the project.

## Using the Application

* The main UI is exposed at; http://localhost:8080/
* The API is exposed at; http://localhost:8081/
* Schema-Spy is exposed at; http://localhost:8082/
* The database is exposed at; localhost:5432
