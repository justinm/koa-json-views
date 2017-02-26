"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const jsonViews = require("json-views");
const supertest = require("supertest");
const jsonViewsMiddleware = require("../index");
require('./test_view');
require('should');
describe('json-views-middleware', () => {
    let payload = {
        test: true,
        hidden: true
    };
    let app;
    let server;
    let request;
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            app = new Koa();
            server = app.listen();
            request = supertest.agent(server);
        });
    });
    afterEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                server.close((err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
    });
    it('should append a proxy method on express.Response', (done) => {
        app.use(jsonViewsMiddleware(jsonViews));
        app.use(function (ctx) {
            return __awaiter(this, void 0, void 0, function* () {
                ctx.json = ['test', payload];
            });
        });
        request.get('/').expect(200, (err, res) => {
            if (err) {
                return done(err);
            }
            res.body.should.have.property('test').and.should.not.have.property('hidden');
            done(null);
        });
    });
});
