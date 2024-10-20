import { act, renderHook } from '@testing-library/react';
import useTasks from './useTasks';
import taskService from '../services/tasksService';

jest.mock('../services/tasksService');

describe('useTasks tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should get tasks on mount', async () => {
    const mockTasks = [
      {
        id: 1,
        text: 'Write getTasks test',
        status: 'active',
      },
      {
        id: 2,
        text: 'and then write more tests',
        status: 'active',
      },
    ];
    (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.tasks;
    });

    expect(result.current.tasks).toEqual(mockTasks);
  });

  test('Should add new task', async () => {
    const newTask = {
      id: 3,
      text: 'New task',
      status: 'active',
    };
    (taskService.addTask as jest.Mock).mockResolvedValue(newTask);

    const { result } = renderHook(() => useTasks());

    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        reset: jest.fn(),
      },
    } as unknown as React.FormEvent<HTMLFormElement>;

    const originalFromEntries = Object.fromEntries;
    const mockFromEntries = jest.fn().mockReturnValue({
      text: 'New task',
    });
    Object.fromEntries = mockFromEntries;
    global.FormData = jest.fn().mockImplementation(() => ({
      entries: () => [['text', 'New task']],
    }));

    await act(async () => {
      result.current.taskSubmitHandler(mockEvent);
    });

    expect(taskService.addTask).toHaveBeenCalledWith({
      text: 'New task',
    });
    expect(result.current.tasks).toContainEqual(newTask);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.currentTarget.reset).toHaveBeenCalled();

    Object.fromEntries = originalFromEntries;
  });

  test('Should delete task', async () => {
    const initialTasks = [
      {
        id: 1,
        text: 'Task to delete',
        status: 'active',
      },
    ];
    (taskService.getTasks as jest.Mock).mockResolvedValue(initialTasks);
    (taskService.deleteTask as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      result.current.taskDeleteHandler(1);
    });

    expect(result.current.tasks).toEqual([]);
  });

  test('Should change task status', async () => {
    const initialTasks = [
      {
        id: 1,
        text: 'Task',
        status: 'active',
      },
    ];
    (taskService.getTasks as jest.Mock).mockResolvedValue(initialTasks);
    (taskService.editTask as jest.Mock).mockResolvedValue({
      id: 1,
      text: 'Taska',
      status: 'completed',
    });

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      result.current.taskStatusChangeHandler(1, {
        status: 'completed',
      });
    });

    expect(result.current.tasks[0].status).toBe('completed');
  });

  test('Should delete tasks with completed status', async () => {
    const initialTasks = [
      {
        id: 1,
        text: 'Active task',
        status: 'active',
      },
      {
        id: 2,
        text: 'Completed task',
        status: 'completed',
      },
    ];
    (taskService.getTasks as jest.Mock).mockResolvedValue(initialTasks);
    (taskService.deleteCompletedTasks as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      result.current.taskDeleteCompletedHandler();
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].status).toBe('active');
  });
});
