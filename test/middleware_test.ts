import * as Koa from 'koa';
import * as jsonViews from 'json-views';
import * as http from 'http';
import * as supertest from 'supertest';
import jsonViewsMiddleware = require('../index');
require('./test_view');
require('should');

describe('json-views-middleware', () => {

  let payload = {
    test: true,
    hidden: true
  };

  let app: Koa;
  let server: http.Server;
  let request: supertest.SuperTest<supertest.Test>;

  beforeEach(async function() {
    app = new Koa();
    server = app.listen();
    request = supertest.agent(server);
  });

  afterEach(async function() {
    return new Promise((resolve, reject) => {
      server.close((err: Error) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  });

  it('should append a proxy method on express.Response', (done: (err: any) => void) => {
    app.use(jsonViewsMiddleware(jsonViews));

    app.use(async function(ctx: Koa.Context) {
      ctx.json = ['test', payload];
    });

    request.get('/').expect(200, (err: Error, res: any) => {
      if (err) {
        return done(err);
      }

      res.body.should.have.property('test').and.should.not.have.property('hidden');

      done(null);
    });

  });

});