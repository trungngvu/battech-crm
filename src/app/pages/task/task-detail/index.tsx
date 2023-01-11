import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { EditIcon } from '@components/core/icons';
import { DATE_FORMAT } from '@configs';
import useI18n from '@hooks/use-i18n';
import {
  Button,
  Options,
  PopupDelete,
  ProjectManagerNav,
  ProjectManagerStatus,
  ProjectManagerTitle,
  Status,
  Table,
  TextLink,
  Time,
  WorkTracker,
} from '@src/app/components';
import Comment from '@src/app/components/comment';
import CommentInput from '@src/app/components/comment-input';
import ExecTime from '@src/app/components/execution-time';
import JobHistory, { PropTypes } from '@src/app/components/job-history';
import useModal from '@src/app/hooks/use-modal';
import { projectActions, useAppDispatch, useDeleteTaskByIdMutation, useGetTaskByIdQuery } from '@store';
import { COMMENT, LANGUAGES, PAGES, PROJECT_AND_TASK_STATUS } from '@types';

import { en, vi } from './i18n';

const jobHistoryData: PropTypes[] = [];

const commentData: COMMENT[] = [];

const { ALL } = PROJECT_AND_TASK_STATUS;

const TaskDetail = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [deleteTask, { isLoading }] = useDeleteTaskByIdMutation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const id = searchParams.get('id');

  const translate = useI18n({
    name: TaskDetail.name,
    data: [
      {
        key: LANGUAGES.EN,
        value: en,
      },
      {
        key: LANGUAGES.VI,
        value: vi,
      },
    ],
  });

  const { data } = useGetTaskByIdQuery(
    {
      projectId,
      id,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const childTasks = data?.children || [];
  const taskFollowers = data?.follower || [];

  const { open, close, Popup } = useModal();
  const columns = [
    { value: 'task_id', label: translate('TASK_ID') },
    { value: 'task_name', label: translate('TASK_NAME') },
    { value: 'start_date', label: translate('START_DATE') },
    { value: 'end_date', label: translate('END_DATE') },
    { value: 'performer', label: translate('PERFORMER') },
    { value: 'status', label: translate('STATUS') },
    { value: 'priority_level', label: translate('PRIORITY_LEVEL') },
  ];

  const handleCopyUrl = () => {
    copy(window.location.href);
    toast.success(translate('COPY_URL_TOASTIFY'), {
      autoClose: 4000,
      position: toast.POSITION.BOTTOM_RIGHT,

      pauseOnHover: false,
    });
  };
  const handleDeleteTask = async () => {
    await deleteTask({ id });
    close();
    navigate(`${PAGES.TASK_LIST}?projectId=${projectId}`);
    toast.success(translate('DELETE_TASK_TOASTIFY'), {
      autoClose: 4000,
      position: toast.POSITION.BOTTOM_RIGHT,

      pauseOnHover: false,
    });
  };

  useEffect(() => {
    dispatch(projectActions.setCurrentProject({ id: projectId }));
  }, [projectId]);

  const handleClickBack = () => {
    if (location.state?.from === PAGES.PROJECT_DETAIL) return navigate(`${PAGES.PROJECT_DETAIL}?id=${projectId}`);
    if (location.state?.from === PAGES.TASK_DETAIL)
      return navigate(`${PAGES.TASK_DETAIL}?id=${location.state?.parentId}&projectId=${projectId}`);
    return navigate(`${PAGES.TASK_LIST}?projectId=${projectId}`);
  };

  const handleEdit = () => navigate(`${PAGES.UPDATE_TASK}?projectId=${projectId}&id=${id}`);

  const optionNav = (
    <div className="flex items-center justify-center">
      {data?.endDate && (
        <span className="mr-5 text-sm">
          {translate('END_DATE')}: <Time>{data?.endDate || ''}</Time>
        </span>
      )}
      <ProjectManagerStatus status={data?.status || ALL} />
      <Button
        shape="round"
        iconOptions={{
          icon: EditIcon,
        }}
        className="mr-3.5"
        onClick={handleEdit}
      >
        {translate('EDIT')}
      </Button>
      <Options
        optionsPosition="left"
        items={[
          {
            label: translate('COPY_URL'),
            onClick: () => handleCopyUrl(),
            disabled: false,
          },
          {
            label: translate('DELETE_TASK'),
            onClick: () => open,
            className: 'text-red-500',
          },
        ]}
      />
    </div>
  );

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-58px)]">
      {data && (
        <>
          <div className="flex flex-col gap-3 p-4">
            <Popup>
              <PopupDelete
                isLoading={isLoading}
                onSubmit={handleDeleteTask}
                onCancel={close}
                header={translate('DELETE_TASK_CONFIRM')}
                content={translate('DELETE_TASK_CONFIRM_QUESTION')}
              />
            </Popup>

            <ProjectManagerNav
              className="mb-4"
              title={data?.name || ''}
              onClickReturn={handleClickBack}
              options={optionNav}
            />
            <ProjectManagerTitle
              data={{
                startDate: data?.startDate ? dayjs(data?.startDate).format(DATE_FORMAT) : '',
                startTime: data?.startDate ? dayjs(data?.startDate).format('hh:mm') : '',
                projectOwner: `${data?.author?.firstName || ''} ${data?.author?.lastName || ''}`,
                taskAssigner: `${data?.assignee?.firstName || ''} ${data?.assignee?.lastName || ''}`,
                projectInfo: data?.description || '',
                taskEstimate: `${data?.estimate?.value || ''} ${translate(`${data?.estimate?.unit || ''}`)}`,
                taskPriority: translate(data?.priority || ''),
              }}
            />
            {childTasks !== undefined && (
              <Table
                columns={columns}
                data={childTasks.map((item, index) => ({
                  id: `${item.id}`,
                  task_id: (
                    <TextLink
                      state={{ from: PAGES.TASK_DETAIL, parentId: `${id}` }}
                      to={`${PAGES.TASK_DETAIL}?id=${item.id}&projectId=${projectId}`}
                    >
                      {item?.id}
                    </TextLink>
                  ),
                  task_name: (
                    <TextLink
                      state={{ from: PAGES.TASK_DETAIL, parentId: `${id}` }}
                      to={`${PAGES.TASK_DETAIL}?id=${item.id}&projectId=${projectId}`}
                    >
                      {item?.name}
                    </TextLink>
                  ),
                  start_date: <Time className="flex items-center justify-center">{item.startDate}</Time>,
                  end_date: <Time className="flex items-center justify-center">{item.endDate}</Time>,
                  performer: `${data?.children[index]?.assignee?.firstName || ''} ${
                    data?.children[index]?.assignee?.lastName || ''
                  }`,
                  status: <Status value={item.status} />,
                  priority_level: <span>{translate(item.priority)}</span>,
                }))}
                headerOptions={{
                  title: `${translate('CHILD_TASKS_LIST')}`,
                  button: {
                    content: translate('ADD_CHILD_TASK'),
                    action: () => navigate(`${PAGES.ADD_TASK}?projectId=${projectId}&taskId=${id}`),
                  },
                }}
              />
            )}
            {taskFollowers.length > 0 && (
              <WorkTracker
                members={taskFollowers.map(member => {
                  return {
                    name: `${member.firstName || ''} ${member.lastName || ''}`,
                  };
                })}
                title={translate('WORK_TRACKER')}
              />
            )}

            <ExecTime />
            <JobHistory data={jobHistoryData} />
            <Comment data={commentData} />
          </div>

          <CommentInput />
        </>
      )}
    </div>
  );
};

export default TaskDetail;