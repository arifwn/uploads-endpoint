# uploads-endpoint

example:

curl -X POST \
    -F "target=default" \
    -F "file=@/home/arif/Videos/test-1080p.mp4" \
    -H "Authorization: Bearer $SECRET" \
    https://video-upload.groverwebdesign.com/video/api/v1/upload/

{"success":true,"fileName":"1653586747182.mp4"}