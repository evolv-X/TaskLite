import { useEffect, useRef, useState } from "react";
import type { Task } from "../entitites/task";
import { isValidTaskTitle, normalizeTitle } from "../utils/validation";

type TaskModalProps = {
  task: Task;
  onSave: (task: Task) => void;
  onClose: () => void;
};

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
    <div ref={modalRef}>
      <div>
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
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <div>
          <button onClick={() => props.onClose()}>Отмена</button>
          <button
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
          </button>
        </div>
      </div>
    </div>
  );
}
