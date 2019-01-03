const https = require('https');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const jsonServer = require('json-server');

const routesFilePath = path.join(__dirname, '/custom/routes.json');
let rewriter;
if (fs.existsSync(routesFilePath)) {
  const routes = fs.readFileSync(routesFilePath);
  rewriter = jsonServer.rewriter(JSON.parse(routes));
}

let db = JSON.parse(fs.readFileSync(path.join(__dirname, '/custom/db.json')));
const customDbPath = path.join(__dirname, '/custom/custom-db.json');

if (fs.existsSync(customDbPath)) {
  const customDb = JSON.parse(fs.readFileSync(customDbPath));
  _.mergeWith(db, customDb, (obj, src) => {
    if (_.isArray(obj)) {
      return obj.concat(src);
    }
  });
}

const router = jsonServer.router(db);
router.render = function (req, res) {
  if (req.url === '/last-availabilities-by-station' || req.url.includes('/stations?')) {
    res.jsonp({
      'hydra:member': res.locals.data,
      '@context': 'local_bicing_http_call',
      '@id': 'local_bicing_http_call_id',
      '@type': 'local_bicing_http_call_type',
    })
  } else {
    res.jsonp(res.locals.data)
  }
}


const app = jsonServer.create();

let middlewaresOptions = {};

if (fs.existsSync()) {
  middlewaresOptions.static = path.join(__dirname, './public')
}
const middlewares = jsonServer.defaults(middlewaresOptions);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

const customStaticsFilePath = path.join(__dirname, '/custom/statics.json');
if (fs.existsSync(customStaticsFilePath)) {
  const requests = JSON.parse(fs.readFileSync(customStaticsFilePath));
  requests.forEach((request) => {
    app[request.method](request.url, (req, res) => {
      res.header('Content-Type', request.file.content_type);
      let filePath = request.file.path;
      if (request.file.is_relative) {
        filePath = path.join(__dirname, filePath);

        res.send(fs.readFileSync(filePath));
      } else {
        https.get(filePath, response => {
          let body = '';
          response.on('data', (content) => {
            body += content;
          });

          response.on('end', () => {
            res.send(body);
          });
        });
      }
    });
  });
}

if (rewriter) {
  app.use(rewriter);
}
app.use(middlewares);
app.use(router);

const options = {
  key: fs.readFileSync(path.join(__dirname, 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'server-cert.pem'))
};

const server = https.createServer(options, app);

server.listen(8000, () => {
  console.log('STEFFFF Listening on port 8000');
});