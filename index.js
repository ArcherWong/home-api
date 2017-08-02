const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const static = require('koa-static');
const multer = require('koa-multer');
const cors = require('kcors');

const app = new Koa();
const router = new Router({
  prefix: '/api'
});

const upload = multer({ dest: __dirname + '/public/upload' });

router.get('/', async ctx => {
  ctx.body = 'Hello World';
});

router.post('/upload', upload.any(), async ( ctx ) => {
  ctx.req.files.forEach(file => {
    let {originalname, path, mimetype} = file;
    fs.rename(path, `${__dirname}/public/upload/` + originalname);
  });
  ctx.body = 'upload success';
});

app.use(cors({origin: 'wangjiechang.me'}));
app.use(logger());
app.use(static(__dirname + '/public'));
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});

app.listen(3000);

console.log('listening on port 3000');