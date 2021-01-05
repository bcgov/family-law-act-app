# PDF Microservice

This project uses a [Weasyprint](http://weasyprint.org/) microservice to generate PDF documents.

The PDF Microservice is currently using the [bcgovimages/weasyprint](https://hub.docker.com/r/bcgovimages/weasyprint/) image.  This is a simple microservice that works in an OpenShift environment.

The microservice is exposed internally to the project on http://weasyprint:5001 or at http://localhost:8083 if you are using the docker-compose development environment.

The following endpoints are available:

```
POST to /pdf?filename=myfile.pdf. The body should contain html

POST to /multiple?filename=myfile.pdf. The body should contain a JSON list of html strings. They will each be rendered and combined into a single pdf
```

By default the deployment configuration does not configure a route to the microservice; therefore it is only accessible internally to the project.  If you need an external route for conveyance you can add one manually, but this should only ever be done for a DEV environment.  

## Testing

Use Postman or some other tool to post the following html to the deployed pdf microservice.  In Postman use `Send and Download` to save the resulting pdf to disk.

Headers to set:
```
Accept: application/pdf
```

Sample html:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Test File</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

I found it straight forward to use [curl](https://curl.haxx.se/).
```bash
curl -X POST --output simple.pdf \
  -H 'Accept: application/pdf' \
  -H 'Content-Type: text/html' \
  -d '@templates/simple.html' \
  http://localhost:8083/pdf?filename=simple.pdf
```

You can add this to the [inotify-tools](https://github.com/inotify-tools/inotify-tools/wiki) application for refreshing.
```bash
inotifywait -r -m -e modify templates |
  while read path _ file; do
    name=`basename $file .html`
    if [[ "$name" =~ ^\. ]]; then # No swap files
      continue
    fi
    curl -X POST --output $path/../$name.pdf \
      -H 'Accept: application/pdf' \
      -H 'Content-Type: text/html' \
      -d "@$path$file" \
      http://localhost:8083/pdf?filename=$name.pdf
  done
```
This has been placed in the `watch.sh` file.

## References

* Project: [Weasyprint](http://weasyprint.org/)
* Image: [bcgovimages/weasyprint](https://hub.docker.com/r/bcgovimages/weasyprint/)
* Source: [BCDevOps/docker-weasyprint](https://github.com/BCDevOps/docker-weasyprint)
