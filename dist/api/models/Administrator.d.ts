import { User } from './User';
export type Administrator = Pick<User, 'createTime' | 'deleteTime' | 'email' | 'id' | 'status'> & {
    isAdmin: boolean;
    isAdminReadOnly: boolean;
    isSuperAdmin: boolean;
    isUserAdmin: boolean;
};
