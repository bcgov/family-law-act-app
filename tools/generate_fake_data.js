const jsf = require('json-schema-faker');

const fs = require('fs');

const version = process.argv[2];
if (!version) {
	version = "1.0";
}

const fileName = `schema_${version}.json`;
console.log(`Generating by using ${fileName}`);
let rawdata = fs.readFileSync(fileName);
let schema = JSON.parse(rawdata);

jsf.option({fixedProbabilities: true, alwaysFakeOptionals: true, refDepthMin: 50, refDepthMax: 50});

jsf.resolve(schema).then(sample => {
  try {
	  console.log(`Generated fake data from schema: ${fileName}`);
  const data = fs.writeFileSync(`fake_data.json`, JSON.stringify(sample, null, 4))
} catch (err) {
  console.error(err)
}
});