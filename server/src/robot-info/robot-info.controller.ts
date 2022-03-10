import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RobotInfoService } from './robot-info.service';
import { CreateRobotInfoDTO } from './dto/create-robot-info.dto';
import { UpdateRobotInfoDto } from './dto/update-robot-info.dto';
import { IResponseHandlerParams } from 'src/data';

@ApiTags('Robot Information')
@Controller('robot-info')
export class RobotInfoController {
  constructor(private readonly robotInfoService: RobotInfoService) {}

  @Post()
  @ApiOperation({ summary: 'Create new robot information' })
  public async create(@Body() body: CreateRobotInfoDTO): Promise<IResponseHandlerParams> {
    return this.robotInfoService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all the created robot information' })
  public async findAll(): Promise<IResponseHandlerParams> {
    return this.robotInfoService.findAll();
  }

  @Get(':robotId')
  @ApiOperation({ summary: 'Fetch created robot by Id' })
  public async findOne(@Param('robotId') robotId: string): Promise<IResponseHandlerParams> {
    return this.robotInfoService.findById(robotId);
  }

  @Patch(':robotId')
  @ApiOperation({ summary: 'Update the created robot information' })
  public async update(@Param('robotId') robotId: string, @Body() updateRobotInfoDto: UpdateRobotInfoDto): Promise<IResponseHandlerParams> {
    return this.robotInfoService.update(robotId, updateRobotInfoDto);
  }

  @Delete(':robotId')
  @ApiOperation({ summary: 'Delete created robot by Id' })
  public async remove(@Param('robotId') robotId: string): Promise<IResponseHandlerParams> {
    return this.robotInfoService.delete(robotId);
  }
}
