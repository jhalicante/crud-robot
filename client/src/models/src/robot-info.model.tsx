export class RobotInfoData {
  constructor(public robotInfo: RobotInfo, public collaboratorMembers: Array<RobotInfo>) {}
}

export class RobotInfo {
  constructor(
    public robotId: string,
    public fullName: string,
    public avatarURL: string,
    public position: string,
    public assignedProject: string,
    public dateCreated: string,
    public lastModifiedDate: string | null,
  ) {}
}
