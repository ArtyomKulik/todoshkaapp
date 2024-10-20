import React from 'react';
import { clsx } from 'clsx';
import { Button, Card, ListGroup } from 'react-bootstrap';
import TaskStatusCheckbox from './TaskStatusCheckbox';
import type { TaskType } from '../../types/TaskTypes';
import type {
  TaskDeleteHandlerType,
  TaskStatusChangeHandlerType,
} from '../../types/TaskHandlerTypes';

type TaskCardProps = {
  task: TaskType;
  taskDeleteHandler: TaskDeleteHandlerType;
  taskStatusChangeHandler: TaskStatusChangeHandlerType;
};

export default function TaskCard({
  task,
  taskDeleteHandler,
  taskStatusChangeHandler,
}: TaskCardProps): React.JSX.Element {
  return (
    <ListGroup.Item className="p-0">
      <Card>
        <Card.Body className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center flex-grow-1 me-3">
            <TaskStatusCheckbox
              task={task}
              taskStatusChangeHandler={taskStatusChangeHandler}
            />
            <Card.Text
              className={clsx('text-truncate', 'ms-3', {
                'text-decoration-line-through': task.status === 'completed',
              })}
            >
              {task.text}
            </Card.Text>
          </div>
          <Button
            variant="outline-danger"
            className="p-2"
            onClick={() => taskDeleteHandler(task.id)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  );
}
