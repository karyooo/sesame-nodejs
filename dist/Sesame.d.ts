import { ApiClient, SesameTask, QueryExecutionResult, Command, SesameInfo } from './ApiClient';
/**
 * Sesame
 */
export declare class Sesame {
    protected client: ApiClient;
    protected device_id: string;
    protected last_task_id: string;
    static create(token: string, sesameInfo: Partial<SesameInfo>): Promise<Sesame>;
    /**
     * @param token
     * @param device_id
     */
    constructor(token: string, device_id: string);
    getDeviceInfo(): Promise<SesameInfo | undefined>;
    protected control(command: Command): Promise<SesameTask>;
    lock(): Promise<SesameTask>;
    unlock(): Promise<SesameTask>;
    sync(): Promise<SesameTask>;
    /**
     * @param task_id
     */
    getControlResult(task_id: string | null): Promise<QueryExecutionResult>;
    getClient(): ApiClient;
}
