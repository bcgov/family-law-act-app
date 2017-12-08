# Family Protection Order DB

## Overview

Family Protection Order DB is used to store the core Organizational data for searching (notably names, locations/addresses and claims held) and the claims themselves.

## Development

The DB component is an instance of Postgres. The schema and data loading is all handled by Family Protection Order API, and the Postgres image being used is an unchanged Red Hat image. As such, there is no build or database initialization associated with the DB - just the Deployment.

## Development

To deploy Family Protection Order on an instance of OpenShift, see [the instructions](../RunningLocal.md) in the file RunningLocal.md.