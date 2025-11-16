import { useEffect, useRef, useState } from "react";
import type { Task } from "../entitites/task";
import { isValidTaskTitle, normalizeTitle } from "../utils/validation";
import styled from "@emotion/styled";

type TaskModalProps = {
  task: Task;
  onSave: (task: Task) => void;
  onClose: () => void;
};

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;

  opacity: 1;
  transition: opacity 0.3s ease;
`;

export const CardWrapper = styled.div`
  background: rgb(250, 250, 250);
  padding: 24px;
  border-radius: 6px;
  width: 400px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  opacity: 1;
  transform: scale(1);
  transition: transform 0.3s, opacity 0.3s;
`;

const ModalButton = styled.button`
    padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(2)};
    border: none;
    border-radius: ${p => p.theme.radius.md};
    color: ${p => p.theme.colors.text};
    background: ${p => p.theme.colors.background};
    cursor: pointer;
    transition: background 0.2s ease;
    font-weight: ${p => p.theme.font.weight.medium};
`

const ModalButtonAccent = styled.button`
    padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(2)};
    border: none;
    border-radius: ${p => p.theme.radius.md};
    color: ${p => p.theme.colors.background};
    background: ${p => p.theme.colors.accent};
    cursor: pointer;
    transition: background 0.2s ease;
    font-weight: ${p => p.theme.font.weight.medium};
    &:hover{
        background: ${p => p.theme.colors.accentHover};
    }
`

export const WrapperEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export default function TaskModal(props: TaskModalProps) {
  const [title, setTitle] = useState(props.task.title);
  const [description, setDescription] = useState(props.task.description);
  const [deadline, setDeadline] = useState<string>(
    props.task.deadline ? props.task.deadline : ""
  );
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [props]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        props.onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [props]);

  return (
    <ModalOverlay>
      <CardWrapper ref={modalRef}>
        <h2>Редактирование задачи</h2>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <label>
          Дедлайн:
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>

        <WrapperEnd>
          <ModalButton onClick={() => props.onClose()}>Отмена</ModalButton>
          <ModalButtonAccent
            onClick={() => {
              if (isValidTaskTitle(title)) {
                let editTask = props.task;
                editTask.title = normalizeTitle(title);
                editTask.description = description;
                editTask.deadline = deadline;
                props.onSave(editTask);
              }
            }}
          >
            Сохранить
          </ModalButtonAccent>
        </WrapperEnd>
      </CardWrapper>
    </ModalOverlay>
  );
}
