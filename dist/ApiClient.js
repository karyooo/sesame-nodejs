"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
class ApiClient {
    constructor(token) {
        this.token = token;
        this.ENDPOINT = 'https://api.candyhouse.co/public';
        this.axios = axios_1.default.create({
            baseURL: this.ENDPOINT,
            headers: { 'Content-Type': 'application/json', Authorization: token },
        });
    }
    async getSesameList() {
        return (await this.axios.get('/sesames')).data;
    }
    /**
     * @param device_id
     */
    async getSesameStatus(device_id) {
        return (await this.axios.get(`/sesame/${device_id}`)).data;
    }
    /**
     * @param device_id
     * @param command
     */
    async controlSesame(device_id, command) {
        return (await this.axios.post(`/sesame/${device_id}`, {
            command,
        })).data;
    }
    /**
     * @param task_id
     */
    async queryExecutionResult(task_id) {
        return (await this.axios.get(`/action-result?task_id=${task_id}`)).data;
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=ApiClient.js.map