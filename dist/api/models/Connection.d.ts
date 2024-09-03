export type Connection = {
    createTime: number;
    deviceSessionId: number;
    endTime: number;
    externalId: string;
    host: string;
    id: number;
    password: string;
    path: string;
    port: number;
    type: string;
    url: string;
    urlSchema: string;
};
export type ConnectionData = Pick<Connection, 'host' | 'port' | 'type' | 'password'>;
