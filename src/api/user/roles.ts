import * as classrouter from 'classrouter';
import * as IModel from 'core/model';
import * as ICommon from 'core/common';
import * as errors from '../errors';
import { jsonBodyParser } from '../parser';

@classrouter.GET
@classrouter.PATH('/:userid/roles')
export class LoadRoles implements classrouter.IRoute {

    @classrouter.ReqestParam()
    clientToken: () => Promise<IModel.IClient.IInstance>



    @classrouter.PathParam()
    userid: string

    async action(req: any) {
        let app = await this.clientToken();

        let UserModel = await IModel.IClient.userModelByApp(app);
        let user = await UserModel.findById(this.userid);

        if (user) {
            let roles = IModel.IUser.parseRoles(user);
            return roles;
        }
        throw new errors.Notfound("not found user ");
    }
}

@classrouter.PUT
@classrouter.PATH('/:userid/roles')
@classrouter.before(jsonBodyParser)
export class PutRoles implements classrouter.IRoute {

    @classrouter.ReqestParam()
    clientToken: () => Promise<IModel.IClient.IInstance>



    @classrouter.PathParam()
    userid: string


    @classrouter.BodyParam()
    roles: string[]

    async action(req: any) {
        let app = await this.clientToken();

        let UserModel = await IModel.IClient.userModelByApp(app);
        let user = await UserModel.findById(this.userid);

        if (user) {
            let roles = this.roles || [];
            if (Array.isArray(roles)) {
                user.roles = roles.join(';');
                user.save();
            }

            return "ok";
        }
        throw new errors.Notfound("not found user ");
    }
}