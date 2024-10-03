export interface ServerInfo {
    serverName: string;
    port: number;
    version: string;
}

export const serverInfo: Function = (): ServerInfo => {
    return {
        serverName: 'address-book-server',
        port: 3000,
        version: '0.0.0',
    };
};
