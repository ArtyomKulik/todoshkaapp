import React, { useCallback, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import TaskCard from './TaskCard';
import type { TaskType } from '../../types/TaskTypes';
import type {
  DeleteCompletedTasksHandlerType,
  TaskDeleteHandlerType,
  TaskStatusChangeHandlerType,
} from '../../types/TaskHandlerTypes';
import TasksStatusTabs from './TasksStatusTabs';

type AllTasksListProps = {
  tasks: TaskType[];
  taskDeleteHandler: TaskDeleteHandlerType;
  taskStatusChangeHandler: TaskStatusChangeHandlerType;
  taskDeleteCompletedHandler: DeleteCompletedTasksHandlerType;
};

export default function AllTasksList({
  tasks,
  taskDeleteHandler,
  taskStatusChangeHandler,
  taskDeleteCompletedHandler,
}: AllTasksListProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('All');

  const handleSetActiveTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const activeTasksLength = tasks.filter((task) => task.status === 'active').length;

  const filteredTasks = (() => {
    switch (activeTab) {
      case 'Active':
        return tasks.filter((task) => task.status === 'active');
      case 'Completed':
        return tasks.filter((task) => task.status === 'completed');
      default:
        return tasks;
    }
  })();

  return (
    <>
      <ListGroup className="gap-2" variant="flush">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            taskDeleteHandler={taskDeleteHandler}
            taskStatusChangeHandler={taskStatusChangeHandler}
          />
        ))}
      </ListGroup>
      <TasksStatusTabs
        activeTasksLength={activeTasksLength}
        activeTab={activeTab}
        handleSetActiveTab={handleSetActiveTab}
        taskDeleteCompletedHandler={taskDeleteCompletedHandler}
      />
    </>
  );
}
