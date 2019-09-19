## Pusher Photo 'Booth' and Wall

Press any key in a browser with camera access and have it automatically appear on the photo wall after being processed by Cloudinary. 

## Requirements

1. A Pusher account
2. A Cloudinary account
3. Node.js installed


## Setup

1. `npm install`
2. Rename `variables.env.example` to `variables.env` and put in your credentials
3. `node server.js`
4. Open [localhost:5500/client/upload.html](http://localhost:5500/client/upload.html) to get the upload page and on the same computer open [localhost:5500/client](http://localhost:5500/client) to show the wall.