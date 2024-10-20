import React from 'react';
import { Container } from 'react-bootstrap';
import AllTasksList from '../ui/AllTasksList';
import AddTaskForm from '../ui/AddTaskForm';
import useTasks from '../../hooks/useTasks';

export default function MainPage(): React.JSX.Element {
  const {
    tasks,
    taskSubmitHandler,
    taskDeleteHandler,
    taskStatusChangeHandler,
    taskDeleteCompletedHandler,
  } = useTasks();

  return (
    <Container>
      <AddTaskForm taskSubmitHandler={taskSubmitHandler} />
      <AllTasksList
        tasks={tasks}
        taskDeleteHandler={taskDeleteHandler}
        taskStatusChangeHandler={taskStatusChangeHandler}
        taskDeleteCompletedHandler={taskDeleteCompletedHandler}
      />
    </Container>
  );
}
