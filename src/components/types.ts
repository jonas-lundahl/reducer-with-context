export type Task = {
  id: number;
  text: string;
  done: boolean;
};

export type Action = AddAction | ChangedAction | DeletedAction;

type AddAction = {
  type: "added";
  id: Task["id"];
  text: Task["text"];
};

type ChangedAction = {
  type: "changed";
  task: Task;
};

type DeletedAction = {
  type: "deleted";
  id: Task["id"];
};
