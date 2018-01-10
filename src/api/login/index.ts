import * as classrouter from 'classrouter';

import { Login } from './login';
import { LoginTokencode } from './login-tokencode';

@classrouter.PATH('/')
@classrouter.SubRouter(Login, LoginTokencode)
export class LoginIndex { }