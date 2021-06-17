const jsf = require('json-schema-faker');

const fs = require('fs');

let rawdata = fs.readFileSync('schema.json');
let schema = JSON.parse(rawdata);

jsf.option('alwaysFakeOptionals', true);

jsf.resolve(schema).then(sample => {
  try {
  const data = fs.writeFileSync(`fake_data${Date.now()}.json`, JSON.stringify(sample))
} catch (err) {
  console.error(err)
}
});