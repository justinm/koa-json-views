import * as Koa from 'koa';
import * as jsonViews from 'json-views';

declare module 'koa' {

  interface Context {
    json: any[];
  }

}

interface IJsonViewMiddleware {
  (views: typeof jsonViews): Koa.Middleware;
}

declare const jsonViewMiddleware: IJsonViewMiddleware;

export = jsonViewMiddleware;
