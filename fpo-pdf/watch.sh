inotifywait -r -m -e modify templates |
  while read path thing file; do
    name=`basename $file .html`
    if [[ "$name" =~ ^\. ]]
    then # No swap files
      continue
    fi
    curl -X POST --output $path/../$name.pdf \
      -H 'Accept: application/pdf' \
      -H 'Content-Type: text/html' \
      -d "@$path$file" \
      http://localhost:8083/pdf?filename=$name.pdf
  done
