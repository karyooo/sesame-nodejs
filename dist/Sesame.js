"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sesame = void 0;
const ApiClient_1 = require("./ApiClient");
/**
 * Sesame
 */
class Sesame {
    /**
     * @param token
     * @param device_id
     */
    constructor(token, device_id) {
        this.last_task_id = '';
        this.client = new ApiClient_1.ApiClient(token);
        this.device_id = device_id;
    }
    static async create(token, sesameInfo) {
        const client = new ApiClient_1.ApiClient(token);
        const sesameList = await client.getSesameList();
        const sesame = sesameList.find((sesame) => sesame.device_id === sesameInfo.device_id ||
            sesame.nickname === sesameInfo.nickname ||
            sesame.serial === sesameInfo.serial);
        if (sesame == null) {
            throw new Error('Sesame was not found.');
        }
        return new this(token, sesame.device_id);
    }
    async getDeviceInfo() {
        const sesameList = await this.client.getSesameList();
        return sesameList.find((sesame) => sesame.device_id === this.device_id);
    }
    async control(command) {
        const task = await this.client.controlSesame(this.device_id, command);
        this.last_task_id = task.task_id;
        return task;
    }
    async lock() {
        return await this.control('lock');
    }
    async unlock() {
        return await this.control('unlock');
    }
    async sync() {
        return await this.control('sync');
    }
    /**
     * @param task_id
     */
    async getControlResult(task_id) {
        if (task_id === null) {
            task_id = this.last_task_id;
        }
        return await this.client.queryExecutionResult(task_id);
    }
    getClient() {
        return this.client;
    }
}
exports.Sesame = Sesame;
//# sourceMappingURL=Sesame.js.map