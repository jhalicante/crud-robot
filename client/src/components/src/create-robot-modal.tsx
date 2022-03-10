import { POST } from '../../services';
import { FieldArray, useFormik } from 'formik';
import { Field, Form, Formik, FormikProps } from 'formik';
import { APIResponse, RobotInfoData, RobotInfo } from '../../models';
interface IFormField {
  fullName: string;
}

const validate = (values: IFormField) => {
  const errors: IFormField = { fullName: '' };
  if (!values.fullName) {
    errors.fullName = 'Required';
  } else if (values.fullName.length > 15) {
    errors.fullName = 'Must be 15 characters or less';
  }

  if (!values.fullName) {
    errors.fullName = 'Required';
  } else if (values.fullName.length > 15) {
    errors.fullName = 'Must be 15 characters or less';
  }

  return errors;
};

export function CreateRobotModal(props: { toggleModal: () => void; loadData: () => void; robots: Array<RobotInfoData>; showModal: boolean }) {
  const createRobotInfoFormik = useFormik({
    initialValues: {
      fullName: '',
      position: 'Developer',
      assignedProject: 'NodeJS Project',
      collaboratorMembers: [],
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const onClickSubmit = (): void => {
    createRobotInfoFormik.submitForm();
    POST('/robot-info', createRobotInfoFormik.values).then((res: APIResponse) => {
      if (res.success) {
        props.loadData();
        props.toggleModal();
      } else {
        alert(res.message);
      }
    });
  };

  const onSelectCollaborator = (robotId: string): void => {
    const isAlreadyExist = createRobotInfoFormik.values.collaboratorMembers.find((_robotId: string) => _robotId === robotId);

    let collaboratorMembers = createRobotInfoFormik.values.collaboratorMembers as Array<string>;

    // If already exist then remove in the [collaboratorMembers]
    if (isAlreadyExist) {
      collaboratorMembers = collaboratorMembers.filter((_robotId: string) => _robotId !== robotId);
    }
    // If not exist then add in the [collaboratorMembers]
    else {
      collaboratorMembers.push(robotId);
    }
    createRobotInfoFormik.setFieldValue('collaboratorMembers', collaboratorMembers);
  };

  const isAssociated = (robotId: string): boolean => {
    const isExistInCollaboratorMember = createRobotInfoFormik.values.collaboratorMembers.find((_robotId: string) => _robotId === robotId);
    if (isExistInCollaboratorMember) {
      return true;
    }
    return false;
  };

  return (
    <>
      {props.showModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen antialiased transition-all">
          <div className="absolute top-0 w-full h-full bg-black bg-opacity-50"></div>
          <div className="relative z-10 flex flex-col w-11/12 max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-xl sm:w-5/6 lg:w-1/2">
            <div className="flex flex-row items-center justify-between px-6 py-3 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
              <p className="text-lg font-semibold text-gray-600">Create Robot Information</p>
              <button
                className="p-1 px-3 text-gray-600 rounded-full hover:text-red-500 hover:bg-red-100"
                onClick={() => {
                  props.toggleModal();
                }}
              >
                Close
              </button>
            </div>
            <form onSubmit={createRobotInfoFormik.handleSubmit}>
              <div className="flex flex-col px-6 py-5 space-y-4 overflow-auto bg-white max-h-[820px]">
                <div className="relative flex flex-col items-center py-4">
                  <img
                    src={
                      createRobotInfoFormik.values.fullName
                        ? `https://avatars.dicebear.com/api/bottts/${createRobotInfoFormik.values.fullName.toLowerCase()}.svg`
                        : 'https://avatars.dicebear.com/api/bottts/1.svg'
                    }
                    alt=""
                    className="p-2 border rounded-full shadow w-36 h-36 "
                  />
                </div>

                <div className="relative flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={createRobotInfoFormik.values.fullName}
                    onChange={createRobotInfoFormik.handleChange}
                    className="w-full p-2 font-medium text-gray-500 border-2 rounded outline-none bg-purple-white focus:border-gray-400"
                  />

                  {createRobotInfoFormik.errors.fullName && <p className="text-sm text-red-400">{createRobotInfoFormik.errors.fullName}</p>}
                </div>

                <div className="relative flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Position</label>
                  <select
                    name="position"
                    onChange={createRobotInfoFormik.handleChange}
                    value={createRobotInfoFormik.values.position}
                    className="w-full p-2 font-medium text-gray-500 border-2 rounded outline-none appearance-none bg-purple-white focus:border-gray-400"
                  >
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="QA Analyst">QA Analyst</option>
                    <option value="Business Analyst">Business Analyst</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                  </select>
                </div>

                <div className="relative flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Assign Project</label>
                  <select
                    name="assignedProject"
                    value={createRobotInfoFormik.values.assignedProject}
                    onChange={createRobotInfoFormik.handleChange}
                    className="w-full p-2 font-medium text-gray-500 border-2 rounded outline-none appearance-none bg-purple-white focus:border-gray-400"
                  >
                    <option value="PHP Project">PHP Project</option>
                    <option value="NodeJS Project">NodeJS Project</option>
                    <option value="HTML Project">HTML Project</option>
                    <option value="CSS Project">CSS Project</option>
                    <option value="Javascript Project">Javascript Project</option>
                  </select>
                </div>

                <div className="relative flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Collaborator/Project Team Member</label>
                  <p className="p-0 mb-4 text-xs text-cyan-500">Click to select a collaborator</p>
                  <div className="flex flex-wrap">
                    {props.robots.map((value: RobotInfoData, key) => {
                      return (
                        <>
                          <button
                            key={key}
                            className={`flex items-center justify-center px-1.5 py-1 m-1 font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-full cursor-pointer ${
                              isAssociated(value.robotInfo.robotId) ? 'border-blue-500 shadow-lg' : ''
                            }`}
                            onClick={() => {
                              onSelectCollaborator(value.robotInfo.robotId);
                            }}
                          >
                            <div slot="avatar">
                              <div className="relative flex items-center justify-center w-6 h-6 m-1 my-0 ml-0 mr-2 text-xs bg-orange-500 rounded-full">
                                <img className="rounded-full" alt="A" src={value.robotInfo.avatarURL} />
                              </div>
                            </div>
                            <div className="flex-initial max-w-full text-sm font-medium leading-none text-gray-500">{value.robotInfo.fullName}</div>
                          </button>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-end p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
                <button
                  className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-full hover:scale-110 hover:shadow-lg"
                  onClick={onClickSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateRobotModal;
