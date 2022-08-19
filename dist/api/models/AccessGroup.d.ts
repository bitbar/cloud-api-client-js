export declare enum AccessGroupScope {
    USER = "USER",
    ACCOUNT = "ACCOUNT",
    GLOBAL = "GLOBAL"
}
export declare type AccessGroup = {
    id: number;
    name: string;
    scope: AccessGroupScope;
    userEmail: string;
    userId: number;
};
export declare type AccessGroupData = Pick<AccessGroup, 'name' | 'scope' | 'userId'>;
export declare type AccessGroupsData = Omit<AccessGroupData, 'userId'>;
