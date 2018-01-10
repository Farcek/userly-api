import * as classrouter from 'classrouter';
import * as IModel from 'core/model';
import * as ICommon from 'core/common';
import { ConsoleToken } from 'core/token';
import { jsonBodyParser } from '../parser';











@classrouter.GET
@classrouter.PATH('/')
export class Load implements classrouter.IRoute {




    @classrouter.ReqestParam()
    clientToken: () => Promise<IModel.IClient.IInstance>


    async action() {

        let app = await this.clientToken();

        let accessTable: IModel.IClient.IAccessTable = {};
        try {
            let roles: IModel.IClient.IAccessTable = JSON.parse(app.roles);
            if (roles && typeof roles === 'object') {
                accessTable = roles;
            }

        } catch (error) {

        }
        return {
            appid: app.id || 0,
            appname: app.name,
            accessTable
        }
    }
}