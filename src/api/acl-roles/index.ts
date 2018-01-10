import * as classrouter from 'classrouter';

import { Load } from './load';
import { Update } from './update';

@classrouter.PATH('/acl-roles')
@classrouter.SubRouter(Load, Update)
export class AclRolesIndex { }