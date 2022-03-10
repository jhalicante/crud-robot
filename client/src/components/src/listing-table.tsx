import { useState, useEffect } from 'react';

import { APIResponse, RobotInfoData } from '../../models';
import { DELETE, GET } from '../../services';

import { CreateRobotModal } from './create-robot-modal';
import UpdateRobotModal from './update-robot-modal';

export const ListingTable = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRobotId, setSelectedRobotId] = useState('');
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const toggleCreateModal = (): void => {
    setShowCreateModal(!showCreateModal);
  };

  const toggleViewModal = (): void => {
    setShowViewModal(!showViewModal);
  };

  const loadData = (): void => {
    GET('/robot-info').then((res: APIResponse) => {
      if (res.success) {
        setRobots(res.data);
      } else {
        setRobots([]);
      }
    });
  };

  const onDelete = (robotId: string): void => {
    DELETE(`/robot-info/${robotId}`).then((res: APIResponse) => {
      if (res.success) {
        loadData();
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="py-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-base font-bold leading-normal text-gray-800 focus:outline-none sm:text-lg md:text-xl lg:text-2xl">Robots CRUD</p>
              <p className="w-3/4 text-sm text-gray-500">
                A crud application build in <b>NestJS</b>, <b>Typescript</b>, <b>REST API</b>, <b>TypeORM</b>, <b>MySQL</b> and{' '}
                <b>Swagger API Document</b> for the backend. For frontend it was build in <b>React JS</b>,<b>Typescript(TSX)</b>, and
                <b>TailwindCSS</b> for the Design
              </p>
            </div>
            <button
              className="inline-flex items-start justify-start px-6 py-3 mx-4 mt-4 bg-blue-500 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 sm:mt-0 hover:bg-blue-600 hover:scale-110 hover:outline-none whitespace-nowrap"
              onClick={() => {
                toggleCreateModal();
              }}
            >
              <p className="text-sm font-medium leading-none text-white">Add New Robot</p>
            </button>
          </div>
        </div>
        <div className="w-full py-4 mt-2 overflow-x-auto">
          <table className="w-full rounded">
            <thead className="text-xs font-thin leading-6 text-gray-500 uppercase border border-b-2 border-gray-200 bg-gray-50 ">
              <tr className="text-sm leading-normal text-gray-500 uppercase border ">
                <th className="px-3 py-1 text-left">Full Name</th>
                <th className="px-3 py-1 text-left">Project</th>
                <th className="px-3 py-1 text-center">Collaborator</th>
                <th className="px-3 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {robots.map((robot: RobotInfoData, key) => {
                return (
                  <>
                    <tr className="border border-gray-100 rounded focus:outline-none" key={key.toString()}>
                      <td className="p-3 text-left">
                        <div className="flex items-center">
                          <div className="mr-3">
                            <img className="w-8 h-8 rounded-full" src={robot.robotInfo.avatarURL} alt="" />
                          </div>
                          <span className="text-gray-600">{robot.robotInfo.fullName}</span>
                        </div>
                      </td>

                      <td className="p-3 text-left">
                        <span className="font-medium text-gray-600">{robot.robotInfo.assignedProject}</span>
                      </td>

                      <td className="p-3 text-left ">
                        <div className="flex items-center justify-center">
                          {robot.collaboratorMembers.map((member, key) => {
                            return (
                              <>
                                <img
                                  className={`w-8 h-8 transform bg-white border-2 border-gray-200 rounded-full hover:scale-125 hover:shadow ${
                                    key > 0 ? '-m-1' : ''
                                  }`}
                                  src={member.avatarURL}
                                  alt=""
                                />
                              </>
                            );
                          })}
                          {/* <img
                            className="w-8 h-8 transform border border-gray-200 rounded-full hover:scale-125"
                            src="https://randomuser.me/api/portraits/men/1.jpg"
                            alt=""
                          />
                          <img
                            className="w-8 h-8 -m-1 transform border border-gray-200 rounded-full hover:scale-125"
                            src="https://randomuser.me/api/portraits/women/2.jpg"
                            alt=""
                          />
                          <img
                            className="w-8 h-8 -m-1 transform border border-gray-200 rounded-full hover:scale-125"
                            src="https://randomuser.me/api/portraits/men/3.jpg"
                            alt=""
                          /> */}
                        </div>
                      </td>

                      <td className="p-3 text-center">
                        <div className="flex justify-center item-center">
                          <button
                            className="px-2 py-1 mr-2 text-sm text-white transform bg-blue-500 rounded-lg hover:scale-110"
                            onClick={() => {
                              setSelectedRobotId(robot.robotInfo.robotId);
                              toggleViewModal();
                            }}
                          >
                            View
                          </button>
                          <button
                            className="px-2 py-1 mr-2 text-sm text-white transform bg-red-500 rounded-lg hover:scale-110"
                            onClick={() => {
                              onDelete(robot.robotInfo.robotId);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <CreateRobotModal
          robots={robots}
          showModal={showCreateModal}
          toggleModal={() => toggleCreateModal()}
          loadData={() => loadData()}
        ></CreateRobotModal>
      )}

      {showViewModal && (
        <UpdateRobotModal
          robots={robots}
          robotId={selectedRobotId}
          showModal={showViewModal}
          toggleModal={() => toggleViewModal()}
          loadData={() => loadData()}
        ></UpdateRobotModal>
      )}
    </>
  );
};

export default ListingTable;
