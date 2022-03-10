import { HttpStatus, Injectable } from '@nestjs/common';
import { CollaboratorMemberEntity, IResponseHandlerParams, ResponseHandlerService, RobotInfoEntity } from 'src/data';
import { getRepository } from 'typeorm';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { CreateRobotInfoDTO } from './dto/create-robot-info.dto';
import { UpdateRobotInfoDto } from './dto/update-robot-info.dto';

@Injectable()
export class RobotInfoService {
  public async create(body: CreateRobotInfoDTO): Promise<IResponseHandlerParams> {
    try {
      await getRepository(RobotInfoEntity)
        .createQueryBuilder('robot_info')
        .insert()
        .into(RobotInfoEntity)
        .values({
          fullName: body.fullName,
          avatarURL: `https://avatars.dicebear.com/api/bottts/${body.fullName.toLocaleLowerCase()}.svg`,
          position: body.position,
          assignedProject: body.assignedProject,
          collaboratorMembers: JSON.stringify(body.collaboratorMembers),
        })
        .execute();

      return ResponseHandlerService({
        success: true,
        httpCode: HttpStatus.CREATED,
        message: 'Successfully created',
      });
    } catch (error) {
      return ResponseHandlerService({
        success: false,
        httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unable to process your data. Please check',
        errorDetails: error,
      });
    }
  }

  public async findAll(): Promise<IResponseHandlerParams> {
    try {
      const robotInfoList: Array<RobotInfoEntity> = await getRepository(RobotInfoEntity)
        .createQueryBuilder('robot_info')
        .select()
        .orderBy('robot_info.createdAt', 'DESC')
        .getMany();

      const withCollaboratorMembers = [];

      for await (const robot of robotInfoList) {
        const collaboratorMembers = [];
        if (robot.collaboratorMembers) {
          for await (const collaboratorId of JSON.parse(robot.collaboratorMembers)) {
            const robotInfo: RobotInfoEntity = await getRepository(RobotInfoEntity)
              .createQueryBuilder('robot_info')
              .select()
              .where('robot_info.robotId = :robotId', {
                robotId: collaboratorId,
              })
              .getOne();
            if (robotInfo) {
              collaboratorMembers.push(robotInfo);
            }
          }
        }
        delete robot.collaboratorMembers;
        withCollaboratorMembers.push({
          robotInfo: robot,
          collaboratorMembers: collaboratorMembers,
        });
      }

      if (withCollaboratorMembers.length === 0) {
        return ResponseHandlerService({
          success: false,
          httpCode: HttpStatus.NOT_FOUND,
          message: 'No result found',
        });
      }

      return ResponseHandlerService({
        success: true,
        httpCode: HttpStatus.OK,
        data: withCollaboratorMembers,
      });
    } catch (error) {
      console.log(error);
      return ResponseHandlerService({
        success: false,
        httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unable to process your data. Please check',
        errorDetails: error,
      });
    }
  }

  public async findById(robotId: string): Promise<IResponseHandlerParams> {
    try {
      const robotInfo: RobotInfoEntity = await getRepository(RobotInfoEntity)
        .createQueryBuilder('robot_info')
        // .leftJoin('robot_info.collaboratorMember', 'collaborator_member')
        // .leftJoinAndSelect('collaborator_member.robotInfo', 'as')
        .select()
        .where('robot_info.robotId = :robotId ', {
          robotId,
        })
        .getOne();

      if (isEmpty(robotInfo)) {
        return ResponseHandlerService({
          success: false,
          httpCode: HttpStatus.NOT_FOUND,
          message: 'No result found',
        });
      }

      return ResponseHandlerService({
        success: true,
        httpCode: HttpStatus.OK,
        data: robotInfo,
      });
    } catch (error) {
      return ResponseHandlerService({
        success: false,
        httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unable to process your data. Please check',
        errorDetails: error,
      });
    }
  }

  public async update(robotId: string, body: UpdateRobotInfoDto): Promise<IResponseHandlerParams> {
    try {
      await getRepository(RobotInfoEntity)
        .createQueryBuilder('robot_info')
        .update()
        .set({
          fullName: body.fullName,
          avatarURL: `https://avatars.dicebear.com/api/bottts/${body.fullName.toLocaleLowerCase()}.svg`,
          position: body.position,
          assignedProject: body.assignedProject,
          collaboratorMembers: JSON.stringify(body.collaboratorMembers),
        })
        .where('robot_info.robotId = :robotId ', {
          robotId,
        })
        .execute();

      return ResponseHandlerService({
        success: true,
        httpCode: HttpStatus.OK,
        message: 'Successfully updated',
      });
    } catch (error) {
      return ResponseHandlerService({
        success: false,
        httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unable to process your data. Please check',
        errorDetails: error,
      });
    }
  }

  public async delete(robotId: string): Promise<IResponseHandlerParams> {
    try {
      await getRepository(RobotInfoEntity)
        .createQueryBuilder('robot_info')
        .delete()
        .where('robot_info.robotId = :robotId ', {
          robotId,
        })
        .execute();

      return ResponseHandlerService({
        success: true,
        httpCode: HttpStatus.OK,
        message: 'Successfully deleted',
      });
    } catch (error) {
      return ResponseHandlerService({
        success: false,
        httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unable to process your data. Please check',
        errorDetails: error,
      });
    }
  }
}
