import React from 'react';
import { Form } from 'react-bootstrap';
import type { FormCheckProps } from 'react-bootstrap';

import type { TaskType } from '../../types/TaskTypes';
import type { TaskStatusChangeHandlerType } from '../../types/TaskHandlerTypes';

type TaskStatusCheckboxProps = {
  task: TaskType;
  taskStatusChangeHandler: TaskStatusChangeHandlerType;
};

export default function TaskStatusCheckbox({
  task,
  taskStatusChangeHandler,
}: TaskStatusCheckboxProps): React.JSX.Element {
  const type: FormCheckProps['type'] = 'checkbox';

  return (
    <Form>
      <div key={type}>
        <Form.Check type={type}>
          <Form.Check.Input
            checked={task.status === 'completed'}
            onChange={() =>
              taskStatusChangeHandler(task.id, {
                status: task.status === 'active' ? 'completed' : 'active',
              })
            }
            type={type}
            isValid
            style={{
              borderRadius: '50%',
              padding: '10px',
            }}
          />
        </Form.Check>
      </div>
    </Form>
  );
}
