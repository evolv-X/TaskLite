import styled from "@emotion/styled";
import type { Task } from "../entitites/task";
import { TaskItem } from "./task-item";

const TasksListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(1.5)};
  margin: 0;
  padding: 0;
  list-style: none;
`;

type TasksProps = {
  tasks: Task[];
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
  onComplete: (task: Task) => void;
};

export function TasksList(props: TasksProps) {
  const res = props.tasks.map((task) => (
    <TaskItem task={task} key={task.id} onRemove={props.onRemove} onEdit={props.onEdit} onComplete={props.onComplete}/>
  ));
  const list = res.length > 0 ? res : <li>Нет элементов</li>;
  return <TasksListWrapper>{list}</TasksListWrapper>;
}
