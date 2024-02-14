import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { Action, Task } from "./types";

const TasksContext = createContext<Task[] | null>(null);

const TasksDispatchContext = createContext<Dispatch<Action> | null>(null);

export const TasksProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error(
      "Illegal use of useTasks: must be used within a TasksContext",
    );
  }
  return ctx;
}

export function useTasksDispatch() {
  const ctx = useContext(TasksDispatchContext);
  if (!ctx) {
    throw new Error(
      "Illegal use of useTasksDispatch: must be used within a TasksDispatchContext",
    );
  }
  return ctx;
}

function tasksReducer(tasks: Task[], action: Action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

const initialTasks: Task[] = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];
