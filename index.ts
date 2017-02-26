/// <reference path="./index.d.ts" />
import * as jsonViews from 'json-views';
import * as Koa from 'koa';

function middleware(views: typeof jsonViews): Koa.Middleware {
  return async function(ctx: Koa.Context, next: () => Promise<any>) {
    await next();

    if (ctx.json) {
      let [descriptorName, data] = ctx.json;

      ctx.body = views.view(descriptorName, data);
    }
  };
}

export = middleware;
