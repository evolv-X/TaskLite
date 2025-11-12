import styled from "@emotion/styled";
import type { Task } from "../entitites/task";
import { useState, useRef, useEffect } from "react";

const TaskItemWrapper = styled.li`
  display: grid;
  grid-template-columns: 1fr auto auto; /* title+⋯ | ✎ | ✖ */
  grid-template-rows: auto auto auto;
  align-items: center;
  gap: ${(p) => p.theme.spacing(0.5)} ${(p) => p.theme.spacing(1)};
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(1)};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.colors.surface};
  box-shadow: 0 1px 3px ${(p) => p.theme.colors.border};
  font-family: ${(p) => p.theme.font.family};
  position: relative;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(0.5)};
  grid-column: 1 / 2;
  grid-row: 1;
`;

const TaskTitle = styled.h3<{ compl: boolean }>`
  margin: 0;
  font-weight: ${(p) => p.theme.font.weight.bold};
  font-size: ${(p) => p.theme.font.size.md};
  color: ${(p) => (p.compl ? p.theme.colors.textMuted : p.theme.colors.text)};
  text-decoration: ${(p) => (p.compl ? "line-through" : "none")};
`;

const TaskDate = styled.p`
  grid-column: 1 / -1;
  grid-row: 3;
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.colors.textMuted};
  margin: 0;
`;

const TaskDescription = styled.p<{ visible: boolean }>`
  grid-column: 1 / -1;
  grid-row: 2;
  margin: 0;
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.colors.text};
  display: ${(p) => (p.visible ? "block" : "none")};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.colors.textMuted};
  font-size: ${(p) => p.theme.font.size.md};
  padding: ${(p) => p.theme.spacing(0.25)};
  border-radius: ${(p) => p.theme.radius.sm};
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: ${(p) => p.theme.colors.accent};
    background: ${(p) => p.theme.colors.background};
  }

  &:active {
    color: ${(p) => p.theme.colors.accentHover};
  }
`;

type TaskProp = {
  task: Task;
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
  onComplete: (task: Task) => void;
};

export function TaskItem(props: TaskProp) {
  const [showDesc, setShowDesc] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const handleToggleDesc = () => setShowDesc((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDesc(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = () => props.onEdit(props.task);
  const handleComplete = () => props.onComplete(props.task);

  return (
    <TaskItemWrapper ref={ref}>
      <TitleRow>
        <TaskTitle compl={props.task.complete} onClick={handleComplete}>{props.task.title}</TaskTitle>
        {props.task.description && (
          <IconButton onClick={handleToggleDesc}>⋯</IconButton>
        )}
      </TitleRow>

      <IconButton onClick={handleSave}>✎</IconButton>
      <IconButton onClick={() => props.onRemove(props.task.id)}>✖</IconButton>

      {props.task.description && (
        <TaskDescription visible={showDesc}>
          {props.task.description}
        </TaskDescription>
      )}

      <TaskDate>
        {(() => {
          const date = new Date(props.task.created);
          const d = date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          });
          const t = date.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${d}, ${t}`;
        })()}
      </TaskDate>
    </TaskItemWrapper>
  );
}
