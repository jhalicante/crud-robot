import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotInfoModule } from './robot-info/robot-info.module';

@Module({
  imports: [TypeOrmModule.forRoot(), RobotInfoModule],
  controllers: [],
})
export class AppModule {}
