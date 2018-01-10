import * as classrouter from 'classrouter';
import * as IModel from 'core/model';
import * as ICommon from 'core/common';
import { findLockupUser, testPassword, doLogin } from 'core/service/user/login';
import { ILoginResult } from 'core/service/user/interface';

import { jsonBodyParser } from '../parser';
import * as errors from '../errors';







@classrouter.POST
@classrouter.PATH('/login')
@classrouter.before(jsonBodyParser)
export class Login implements classrouter.IRoute {

    @classrouter.ReqestParam()
    clientToken: () => Promise<IModel.IClient.IInstance>

    @classrouter.BodyParam()
    @classrouter.validator.IsNotEmpty()
    @classrouter.validator.IsString()
    useridentity: string


    @classrouter.BodyParam()
    @classrouter.validator.IsNotEmpty()
    @classrouter.validator.IsString()
    password: string





    async findUser() {
        let client = await this.clientToken();
        let UserModel = await IModel.IClient.userModelByApp(client);
        let user = await findLockupUser(UserModel, client.id || 0, this.useridentity);
        testPassword(user, this.password);
        return user
    }

    async action(req: any): Promise<ILoginResult> {

        let user = await this.findUser();

        return await doLogin(user);
    }
}