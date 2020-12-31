import { AxiosInstance } from 'axios';
export declare class ApiClient {
    protected token: string;
    protected readonly ENDPOINT: string;
    protected axios: AxiosInstance;
    constructor(token: string);
    getSesameList(): Promise<SesameInfo[]>;
    /**
     * @param device_id
     */
    getSesameStatus(device_id: string): Promise<SesameStatus>;
    /**
     * @param device_id
     * @param command
     */
    controlSesame(device_id: string, command: Command): Promise<SesameTask>;
    /**
     * @param task_id
     */
    queryExecutionResult(task_id: string): Promise<QueryExecutionResult>;
}
export interface SesameInfo {
    device_id: string;
    serial: string;
    nickname: string;
}
export interface SesameStatus {
    locked: boolean;
    battery: number;
    responsive: boolean;
}
export interface SesameTask {
    task_id: string;
}
export interface QueryExecutionResult {
    status: string;
    successful: boolean;
    error: string;
}
export declare type Command = 'lock' | 'unlock' | 'sync';
