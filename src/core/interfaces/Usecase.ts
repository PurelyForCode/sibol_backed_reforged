export interface Usecase<Cmd, Output> {
  execute(cmd: Cmd): Promise<Output>;
}
