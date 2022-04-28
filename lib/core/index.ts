import Koa from 'koa';
import path from 'path';
import { deepMerge } from './utils';
import { App } from './types';

type Params = {
    appPath: string;
}


export default async function Diudiu (params: Params) {
    const app: App = (new Koa()) as App;
    const { appPath } = params;
    app.appPath = appPath;

    const env = process.env.NODE_ENV;
    const extName = app.extName = env === 'development' ? '.ts' : '.js';
    const baseConfig = await import(path.join(appPath, `config/config.base${extName}`));
    const curConfig = await import(path.join(appPath, `config/config.${env}${extName}`));
    app.config = deepMerge(baseConfig.default(app), curConfig.default(app));
};