import * as classrouter from 'classrouter';

import * as IModel from 'core/model';
import * as ICommon from 'core/common';
import { UserToken, ClientToken } from 'core/token';
import { userRegister } from 'core/service/user/register';


import { jsonBodyParser } from '../parser';
import * as errors from '../errors';



@classrouter.POST
@classrouter.PATH('/')
@classrouter.before(jsonBodyParser)
export class Register implements classrouter.IRoute {

    @classrouter.ReqestParam()
    clientToken: () => Promise<IModel.IClient.IInstance>

    @classrouter.BodyParam()
    @classrouter.validator.IsAlphanumeric()
    @classrouter.validator.IsString()
    name: string


    @classrouter.BodyParam()
    @classrouter.validator.IsNotEmpty()
    @classrouter.validator.IsString()
    useridentity: string


    @classrouter.BodyParam()
    @classrouter.validator.IsNotEmpty()
    @classrouter.validator.IsString()
    password: string



    async action(req: any) {

        let client = await this.clientToken();
        if (client) {
            let UserModel = await IModel.IClient.userModelByApp(client);
            if (UserModel) {
                return userRegister(UserModel, client.id || 0, {
                    name: this.name,
                    useridentity: this.useridentity,
                    password: this.password
                })
            }
        }
        throw "can not create UserModel";
    }
}