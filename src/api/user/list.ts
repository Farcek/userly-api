import * as classrouter from 'classrouter';
import * as IModel from 'core/model';
import * as ICommon from 'core/common';
import { UserToken, ClientToken } from 'core/token';
import { jsonBodyParser } from '../parser';
import * as errors from '../errors';




interface Items {
    id: string
    name: string
    emailTxt: string
    phoneTxt: string
    confirmed: boolean
    create_at: string
    login_at: string
}
interface IResult {
    total: number
    items: Items[]
}



@classrouter.POST
@classrouter.PATH('/')
@classrouter.before(jsonBodyParser)
export class List implements classrouter.IRoute {

    @classrouter.ReqestParam()
    clientToken: () => Promise<IModel.IClient.IInstance>



    @classrouter.QueryParam()
    @classrouter.typecast.str2int()
    page: number = 1

    @classrouter.QueryParam()
    @classrouter.typecast.str2int()
    limit: number = 15


    @classrouter.QueryParam()
    orderfield: string

    @classrouter.QueryParam()
    orderflag: string

    @classrouter.QueryParam()
    filter: string


    async action(req: any): Promise<IResult> {
        let app = await this.clientToken();
        let UserModel = await IModel.IClient.userModelByApp(app);


        if (UserModel) {
            var where: any = {
                app: app.id
            };
            if (this.filter) {
                where.name = { $like: `%${this.filter}%` }
            }
            var order = this.orderflag && this.orderfield ? [[this.orderfield, this.orderflag]] : [['id', 'desc']];
            let items = await UserModel
                .findAll({
                    where, order,
                    limit: this.limit,
                    offset: (this.page - 1) * this.limit,
                })
                .map((it: IModel.IUser.IInstance) => {
                    let item: Items = {
                        id: it.id,
                        name: it.name,
                        emailTxt: it.email,
                        phoneTxt: it.phone,
                        create_at: '' + it.create_at,
                        login_at: '' + it.login_at,
                        confirmed: it.confirmed
                    };
                    return item;
                });
                
            let total = await UserModel.count({
                where
            });
            return {
                total,
                items
            };
        }

        throw "cannot load user model";
    }
}