import dva from 'dva';
import fetch from 'dva/fetch';

import './index.less';
import 'antd-mobile/dist/antd-mobile.less';

import loadModel from './models/load';
import routes from './routes';

const app = dva();

app.model(loadModel);

app.router(routes);

app.start('#root');
