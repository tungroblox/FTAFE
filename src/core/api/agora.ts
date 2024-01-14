import axios from 'axios';
import _get from 'lodash.get';

import { constant } from '../constant';
import { store } from '../store';
import { apiActions } from '../store/api';

const agoraHttp = axios.create({
    baseURL: '',
    withCredentials: true,
});

const customerKey = 'b74a949f97f84da6938df4349929809e';
// Customer secret
const customerSecret = '71b7425dee984a43b8d6001a9f4fb676';

const plainCredential = customerKey + ':' + customerSecret;

const encodedCredential = Buffer.from(plainCredential).toString('base64');
const authorizationField = 'Basic ' + encodedCredential;

agoraHttp.interceptors.request.use(function (req) {
    if (req.headers) req.headers[constant.TOKEN_HEADER_KEY] = authorizationField;
    // if (token && req.headers) req.headers[constant.TOKEN_HEADER_KEY] = `${token}`;

    return req;
});

export { agoraHttp };
