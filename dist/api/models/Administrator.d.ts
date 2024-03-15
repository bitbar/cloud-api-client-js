import { User } from './User';
export declare type Administrator = Pick<User, 'createTime' | 'deleteTime' | 'email' | 'id' | 'status'> & {
    isAdmin: boolean;
    isAdminReadOnly: boolean;
    isUserAdmin: boolean;
};
