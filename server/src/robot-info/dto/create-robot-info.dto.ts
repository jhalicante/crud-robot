import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRobotInfoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Full name cannot be empty' })
  readonly fullName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Position cannot be empty' })
  readonly position: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Assigned project cannot be empty' })
  readonly assignedProject: string;

  @ApiProperty()
  @IsOptional()
  readonly collaboratorMembers: Array<string>;
}
