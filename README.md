# uploads-endpoint

example:

curl -X POST \
    -F "target=default" \
    -F "file=@/home/arif/Videos/test-1080p.mp4" \
    -H "Authorization: Bearer $SECRET" \
    https://video-upload.groverwebdesign.com/video/api/v1/upload/

{"success":true,"fileName":"1653586747182.mp4"}



Environmental Variable
----------------------
HOST: video-upload.example.com
PORT: "80"
ROOT_PATH: /video
NODE_ENV: production
UPLOAD_KEY: <secret>
ACCEPTED_FILE_TYPES: .mp4,.mov,.MP4,.MOV
CHOWN: "33"
AUTODELETE_TIMEOUT: "3600"
UPLOAD_DIRS: |
{"default": "/var/app/upload/"}