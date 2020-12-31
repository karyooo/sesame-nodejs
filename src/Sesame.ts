import {
  ApiClient,
  SesameTask,
  QueryExecutionResult,
  Command,
  SesameInfo,
} from './ApiClient'

/**
 * Sesame
 */
export class Sesame {
  protected client: ApiClient
  protected device_id: string
  protected last_task_id: string = ''

  public static async create(
    token: string,
    sesameInfo: Partial<SesameInfo>
  ): Promise<Sesame> {
    const client = new ApiClient(token)
    const sesameList = await client.getSesameList()
    const sesame = sesameList.find(
      (sesame) =>
        sesame.device_id === sesameInfo.device_id ||
        sesame.nickname === sesameInfo.nickname ||
        sesame.serial === sesameInfo.serial
    )
    if (sesame == null) {
      throw new Error('Sesame was not found.')
    }

    return new this(token, sesame.device_id)
  }

  /**
   * @param token
   * @param device_id
   */
  public constructor(token: string, device_id: string) {
    this.client = new ApiClient(token)
    this.device_id = device_id
  }

  public async getDeviceInfo(): Promise<SesameInfo | undefined> {
    const sesameList = await this.client.getSesameList()
    return sesameList.find((sesame) => sesame.device_id === this.device_id)
  }

  protected async control(command: Command): Promise<SesameTask> {
    const task = await this.client.controlSesame(this.device_id, command)
    this.last_task_id = task.task_id
    return task
  }

  public async lock(): Promise<SesameTask> {
    return await this.control('lock')
  }

  public async unlock(): Promise<SesameTask> {
    return await this.control('unlock')
  }

  public async sync(): Promise<SesameTask> {
    return await this.control('sync')
  }

  /**
   * @param task_id
   */
  public async getControlResult(
    task_id: string | null
  ): Promise<QueryExecutionResult> {
    if (task_id === null) {
      task_id = this.last_task_id
    }

    return await this.client.queryExecutionResult(task_id)
  }

  public getClient(): ApiClient {
    return this.client
  }
}
