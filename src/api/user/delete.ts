import * as classrouter from 'classrouter';
import * as IModel from 'core/model';
import * as ICommon from 'core/common';
import * as errors from '../errors';







@classrouter.DELETE
@classrouter.PATH('/:userid')
export class Delete implements classrouter.IRoute {

    @classrouter.ReqestParam()
    clientToken: () => Promise<IModel.IClient.IInstance>



    @classrouter.PathParam()
    userid: string

    async action(req: any) {
        let app = await this.clientToken();

        let UserModel = await IModel.IClient.userModelByApp(app);
        let user = await UserModel.findById(this.userid);

        if (user) {
            user.destroy();
            return 'OK';
        }
        throw new errors.Notfound("not found user ");
    }
}