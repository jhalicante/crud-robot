import { PartialType } from '@nestjs/mapped-types';
import { CreateRobotInfoDTO } from './create-robot-info.dto';

export class UpdateRobotInfoDto extends PartialType(CreateRobotInfoDTO) {}
