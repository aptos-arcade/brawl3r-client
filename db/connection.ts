import {Pool} from "pg";

import {AuthTypes, Connector, IpAddressTypes} from "@google-cloud/cloud-sql-connector";

export const getConnection = async (): Promise<[Pool, Connector]> => {
    const connector = new Connector();
    const clientOpts = await connector.getOptions({
        instanceConnectionName: process.env.DB_INSTANCE_CONNECTION_NAME as string,
        ipType: IpAddressTypes.PUBLIC,
        authType: AuthTypes.PASSWORD
    });
    return [
        new Pool({
            ...clientOpts,
            user: process.env.DB_USER as string,
            password: process.env.DB_PASSWORD as string,
            database: process.env.DB_DATABASE as string,
            max: 5
        }),
        connector
    ]
}

export const closeConnection = async (pool: Pool, connector: Connector) => {
    await pool.end();
    connector.close();
}