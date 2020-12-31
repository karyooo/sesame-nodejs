import Axios, { AxiosInstance } from 'axios'

export class ApiClient {
  protected readonly ENDPOINT: string = 'https://api.candyhouse.co/public'
  protected axios: AxiosInstance

  public constructor(protected token: string) {
    this.axios = Axios.create({
      baseURL: this.ENDPOINT,
      headers: { 'Content-Type': 'application/json', Authorization: token },
    })
  }

  public async getSesameList(): Promise<SesameInfo[]> {
    return (await this.axios.get('/sesames')).data
  }

  /**
   * @param device_id
   */
  public async getSesameStatus(device_id: string): Promise<SesameStatus> {
    return (await this.axios.get(`/sesame/${device_id}`)).data
  }

  /**
   * @param device_id
   * @param command
   */
  public async controlSesame(
    device_id: string,
    command: Command
  ): Promise<SesameTask> {
    return (
      await this.axios.post(`/sesame/${device_id}`, {
        command,
      })
    ).data
  }

  /**
   * @param task_id
   */
  public async queryExecutionResult(
    task_id: string
  ): Promise<QueryExecutionResult> {
    return (await this.axios.get(`/action-result?task_id=${task_id}`)).data
  }
}

export interface SesameInfo {
  device_id: string
  serial: string
  nickname: string
}

export interface SesameStatus {
  locked: boolean
  battery: number
  responsive: boolean
}

export interface SesameTask {
  task_id: string
}

export interface QueryExecutionResult {
  status: string
  successful: boolean
  error: string
}

export type Command = 'lock' | 'unlock' | 'sync'
