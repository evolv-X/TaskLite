import type { Task } from "../entitites/task";

export function saveTasks(tasks: Task[]): void {
  console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getTasks(): Task[] {
  const res = JSON.parse(localStorage.getItem("tasks") || "[]");
  return res.map((task: any) => ({
    ...task,
    created: new Date(task.created),
  }));
}

export function getTaskById(tasks: Task[], id: string): Task {
  const task = tasks.find(task => task.id === id);
  if (!task) {
    throw new Error(`Task with id "${id}" not found`);
  }
  return task;
}