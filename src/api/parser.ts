const bodyParser = require('body-parser')
import * as IModel from 'core/model';
import * as ICommon from 'core/common';
import { ClientToken, UserToken } from '../token';
import * as IErrors from './errors';


export function urlencodedBodyParser() {
    return bodyParser.urlencoded({ extended: false });
}

export function jsonBodyParser() {
    return bodyParser.json();
}


export async function clientTokenParser(clientToken: string) {
    let tokenObj = ClientToken.parse(clientToken);
    if (tokenObj) {
        let client = await IModel.IClient.Client.findById(tokenObj.appid);
        if (client) {
            tokenObj = ClientToken.virify(clientToken, client.tokenkey);
            if (tokenObj) {
                return client;
            }
            throw new IErrors.TokenError('can not virify client token')
        }
        throw new IErrors.TokenError('client not registered')
    }
    throw new IErrors.TokenError('not suported client token')
}

export async function userTokenParser(usertoken: string) {
    let tokenObj = UserToken.parse(usertoken);
    if (tokenObj) {
        let client = await IModel.IClient.Client.findById(tokenObj.appid);
        if (client) {
            tokenObj = UserToken.virify(usertoken, client.tokenkey);
            if (tokenObj) {
                var UserModel = await IModel.IClient.userModelByApp(client);

                if (UserModel) {
                    var user = await UserModel.findById(tokenObj.userid);
                    if (user) {
                        return user;
                    }
                    throw new IErrors.TokenError('not found user')
                }
                throw new IErrors.TokenError('not found usermodel')
            }
            throw new IErrors.TokenError('can not virify client token')
        }
        throw new IErrors.TokenError('client not registered')
    }
    throw new IErrors.TokenError('not suported client token')
}