import clsx from 'clsx';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import type { DeleteCompletedTasksHandlerType } from '../../types/TaskHandlerTypes';

type TasksStatusTabsProps = {
  activeTab: string;
  handleSetActiveTab: (tab: string) => void;
  activeTasksLength: number;
  taskDeleteCompletedHandler: DeleteCompletedTasksHandlerType;
};

export default function TasksStatusTabs({
  activeTab,
  handleSetActiveTab,
  activeTasksLength,
  taskDeleteCompletedHandler,
}: TasksStatusTabsProps) {
  const tabKeys = ['All', 'Active', 'Completed'];

  return (
    <div className="d-flex flex-column-reverse position-fixed bottom-0 start-0 end-0">
      <Tabs
        className="d-flex"
        defaultActiveKey={activeTab}
        id="justify-tab-example"
        justify
        onSelect={(tab) => handleSetActiveTab(tab as string)}
      >
        <Tab
          style={{
            cursor: 'initial',
            border: 'none',
          }}
          title={clsx(
            {
              'All tasks are done': activeTasksLength === 0,
            },
            {
              'One uncompleted task': activeTasksLength === 1,
            },
            {
              [`${activeTasksLength} uncompleted tasks`]: activeTasksLength > 1,
            },
          )}
        />
        {tabKeys.map((tab) => (
          <Tab key={tab} eventKey={tab} title={tab} />
        ))}
        <Tab
          title={
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                taskDeleteCompletedHandler();
              }}
            >
              Clear completed tasks
            </span>
          }
        />
      </Tabs>
    </div>
  );
}
