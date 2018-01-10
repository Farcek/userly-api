import * as classrouter from 'classrouter';
import * as IModel from 'core/model';
import * as ICommon from 'core/common';

import { jsonBodyParser } from '../parser';


@classrouter.PUT
@classrouter.PATH('/')
@classrouter.before(jsonBodyParser)
export class Update implements classrouter.IRoute {




    @classrouter.ReqestParam()
    clientToken: () => Promise<IModel.IClient.IInstance>


    @classrouter.BodyParam()
    accessTable: IModel.IClient.IAccessTable


    async action() {

        let app = await this.clientToken();

        if (app && this.accessTable && typeof this.accessTable === 'object') {
            app.roles = JSON.stringify(this.accessTable);
            await app.save();
            return "ok";
        }

        throw "not found app";

    }
}