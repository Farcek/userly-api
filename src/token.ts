import * as ICommon from 'core/common';
const jwt = require('jsonwebtoken');

export interface IClientToken {
    appid: number
}

export class ClientToken {

    static gen(appid: number, pass: string): string {

        return jwt.sign({ a: appid }, pass, {
            algorithm: 'RS256',
            jwtid: 'client',
            expiresIn: '1h'
        })
    }

    static parse(token: string): IClientToken | null {
        var decode = jwt.decode(token);
        if (decode && decode.a && decode.jti == 'client') {
            return { appid: decode.a };
        }
        return null;
    }

    static virify(token: string, pass: string) {
        var decode = jwt.verify(token, pass, { jwtid: 'client', algorithm: 'RS256' });

        if (decode && decode.a) {
            return { appid: decode.a };
        }
        return null;
    }
}

export interface IUserToken {
    appid: number
    userid: string
}
export class UserToken {

    static gen(appid: number, userid: string, pass: string): string {

        return jwt.sign({ a: appid, u: userid }, pass, {
            algorithm: 'RS256',
            jwtid: 'user',
            expiresIn: '1h'
        })
    }

    static parse(token: string): IUserToken | null {
        var decode = jwt.decode(token);
        if (decode && decode.a && decode.u && decode.jti == 'user') {
            return { appid: decode.a, userid: decode.u };
        }
        return null;
    }

    static virify(token: string, pass: string): IUserToken | null {
        var decode = jwt.verify(token, pass, { jwtid: 'user' });

        if (decode && decode.a && decode.u) {
            return { appid: decode.a, userid: decode.u };
        }
        return null;
    }
}