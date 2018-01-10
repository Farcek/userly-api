import * as classrouter from 'classrouter';
import { parse as bearerParse } from 'core/common/bearer';

import * as parser from './parser';


import { RegisterIndex } from './register/index';
import { LoginIndex } from './login/index';
// import { ProfileIndex } from './profile/index';
import { UserIndex } from './user/index';
import { AclRolesIndex } from './acl-roles/index';


@classrouter.PATH('/api')
@classrouter.SubRouter(LoginIndex, RegisterIndex,  UserIndex, AclRolesIndex)
export class Api {

    @classrouter.HeaderParam('Authorization')
    private authorization: string


    @classrouter.Middleware()
    clientToken() {
        
        return async () => {
            var token = bearerParse(this.authorization);
            
            if (token) {
                return await parser.clientTokenParser(token);
            } 
            throw "bearertoken format error";
        }; 
    }

    @classrouter.Middleware()
    userToken() {
        return async () => { 
            var token = bearerParse(this.authorization);
            if (token) {
                let user = await parser.userTokenParser(token);
                if (user) {
                    return user
                }
            }
            throw "cannot parse client token";
        };
    }
}