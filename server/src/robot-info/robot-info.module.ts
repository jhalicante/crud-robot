import { Module } from '@nestjs/common';
import { RobotInfoService } from './robot-info.service';
import { RobotInfoController } from './robot-info.controller';

@Module({
  controllers: [RobotInfoController],
  providers: [RobotInfoService],
})
export class RobotInfoModule {}
