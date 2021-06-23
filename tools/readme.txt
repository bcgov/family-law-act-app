To validate the JSON schema against data in the database:
1. npm install
2. Run generate_schema
3. Rename schema file to schema_(version).
4. cd /api/ -> Run python manage.py validatesteps '../tools/schema_(version).json' (with database environment variables set, much like migrations.)
5. Run generate_fake_data (optional)

Alternatively for local testing:
run local_migration_tester.py. 
It will generate fake data based on the old schema.
Execute a python migration function.
Validate the new data using the new schema.
