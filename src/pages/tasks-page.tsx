import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Input } from "../components/styleInput";
import { TasksList } from "../components/tasks-list";
import { newTask, type Task } from "../entitites/task";
import { taskSort } from "../utils/taskSort";
import { saveTasks, getTasks } from "../utils/ioTask";

import TaskModal from "../components/task-modal";
import ProgressBar from "../components/task-progress";
import { FButton } from "../components/filter-button";
import { StyledSelect } from "../components/sort-select";
import { TrimButton } from "../components/trim-button";

export function TasksPage() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Task[]>(() => getTasks());
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [query, setQuery] = useState("");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function handleAddTask() {
    try {
      const task = newTask(text);
      setTasks((prev) => taskSort([task, ...prev]));
      setText("");
    } catch (error) {
      console.error(error);
      alert("Некорректное название задачи");
    }
  }

  function handleEdit(taskTemp: Task) {
    console.log(taskTemp);

    let editTask = taskTemp;

    const updatedTasks = tasks.map((task) =>
      task.id === editTask.id ? editTask : task
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTask(null);
  }

  function handleComplete(taskTemp: Task) {
    taskTemp.complete = taskTemp.complete ? false : true;

    let editTask = taskTemp;

    const updatedTasks = tasks.map((task) =>
      task.id === editTask.id ? editTask : task
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  function handleRemove(tastId: string) {
    console.log(tastId);
    setTasks(tasks.filter((t) => t.id !== tastId));
  }

  function handleClose() {
    console.log("close");
    setEditingTask(null);
  }

  function trimCompletedTask() {
    setTasks(
      tasks.filter((t) => {
        if (t.complete === false) return t;
      })
    );
  }

  const handleSortChange = (order: "newest" | "oldest") => {
    setSortOrder(order);

    const sorted = [...tasks].sort((a, b) => {
      if (order === "newest") {
        return b.created.getTime() - a.created.getTime();
      } else {
        return a.created.getTime() - b.created.getTime();
      }
    });

    setTasks(sorted);
  };

  let total = tasks.length;
  let completed = tasks.filter((t) => t.complete).length;
  let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return t;
    if (filter === "active" && t.complete === false) return t;
    if (filter === "completed" && t.complete) return t;
  });

  const serchedTask =
    query.trim().toLowerCase() === ""
      ? filteredTasks
      : filteredTasks.filter((t) => {
          if (t.title.includes(query.trim().toLowerCase())) return t;
        });

  return (
    <div>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст"
      />
      <div>
        <FButton
          text="Все"
          active={"all"}
          filter={filter}
          onClick={() => setFilter("all")}
        />
        <FButton
          text="Активные"
          active={"active"}
          filter={filter}
          onClick={() => setFilter("active")}
        />
        <FButton
          text="Завершённые"
          active={"completed"}
          filter={filter}
          onClick={() => setFilter("completed")}
        />
        <StyledSelect
          value={sortOrder}
          onChange={(e) =>
            handleSortChange(e.target.value as "newest" | "oldest")
          }
          className="border rounded-xl p-2"
        >
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
        </StyledSelect>
      </div>
      <Button text="Добавить" onClick={handleAddTask} />

      <input
        value={query}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      />

      <ProgressBar percent={percent} />

      <TasksList
        tasks={serchedTask}
        onRemove={handleRemove}
        onEdit={(t) => setEditingTask(t)}
        onComplete={handleComplete}
      />

      <p>
        Всего: {total} | Активных: {total - completed} | Выполненных:{" "}
        {completed}
      </p>

      <TrimButton text="Отчистить выполненные" onClick={trimCompletedTask} />

      {editingTask && (
        <TaskModal
          task={editingTask}
          onSave={handleEdit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
