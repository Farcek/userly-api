import * as classrouter from 'classrouter';
import * as IModel from 'core/model';
import * as ICommon from 'core/common';
import { findLoginUser, doLogin } from 'core/service/user/login';
import { parseVarify as uitokenVarify } from 'core/service/user/uitoken';
import { ILoginResult } from 'core/service/user/interface';

import { jsonBodyParser } from '../parser';
import * as errors from '../errors';

@classrouter.POST
@classrouter.PATH('/login-tokencode')
@classrouter.before(jsonBodyParser)
export class LoginTokencode implements classrouter.IRoute {

    @classrouter.ReqestParam()
    clientToken: () => Promise<IModel.IClient.IInstance>


    @classrouter.BodyParam()
    @classrouter.validator.IsNotEmpty()
    @classrouter.validator.IsString()
    tokencode: string


    async findUser() {
        let client = await this.clientToken();
        let loginR = uitokenVarify(this.tokencode, client.saltkey);
    }

    async action(req: any): Promise<ILoginResult> {
        try {
            let client = await this.clientToken();
            let loginR = uitokenVarify(this.tokencode, client.saltkey);
            return {
                confirmed: loginR.confirmed,
                name: loginR.name,
                roles: loginR.roles,
                userid: loginR.userid
            }
        } catch (error) {
            throw new errors.ValidationError(error.message || error);
        }

    }
}