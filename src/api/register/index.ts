import * as classrouter from 'classrouter';

import {Register} from './register';

@classrouter.PATH('/register')
@classrouter.SubRouter(Register)
export class RegisterIndex{}