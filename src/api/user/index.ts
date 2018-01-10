import * as classrouter from 'classrouter';

import { List } from './list';
import { Delete } from './delete';
import { LoadRoles,PutRoles } from './roles';

@classrouter.PATH('/user')
@classrouter.SubRouter(List,Delete, LoadRoles, PutRoles)
export class UserIndex {
    
}