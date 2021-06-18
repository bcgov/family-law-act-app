import sys
import json
file = 'schema-1.0.json'
with open(file) as f:
    data = json.loads(f.read())
    
with open(file, 'w') as f:
    json.dump(data, fp=f, sort_keys=True, indent=4)