#Installation
1- Node.js version via nvm on workspace upgraded to use Sharp without problems. Used last LTS version, for more info please visit: https://phoenixnap.com/kb/update-node-js-version
2- npm install // to install dependencies
3- npm run test // to run unit tests
4- npm run start // compile and run server

#API
GET: /api/images/{image_name}
@Params: width: number, height: number
->Returns full image if no dimensions specified
->Returns error if just one dimension is defined or file does not exist.
->Returns cached image if image exists and has been resized before
->Returns new resized image and stores it into filesystem.
