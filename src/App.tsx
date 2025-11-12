// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import { Button } from "./Button";
// import { newTask, type Task } from "./entitites/task.js";
// import { taskSort } from "./utils/taskSort.js";
import { ThemeProvider } from "@emotion/react";
import { TasksPage } from "./pages/tasks-page.js";
import { theme } from "./styles/theme.js";
import { GlobalStyles } from "./styles/global.js";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <TasksPage />
    </ThemeProvider>
  )
}

// export function App() {
//   return (
//     <>
//         <TasksPage />
//     </>
//   )
// }



// function App() {
//   const [count, setCount] = useState(0);

//   const [value, setValue] = useState("");

//   const tasks: Task[] = [
//     newTask("выучить реакт"),
//     newTask("выучить ts"),
//     newTask("купить молока"),
//   ];

//   console.log(tasks);

//   console.log(taskSort(tasks));

  

//   const handleClick = () => {
//     if (value.trim() !== "") {
//       newTask(value);
//       setValue("");
//     }
//   };

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//         <Button text="В корзину" />
//         <Button text="Выбрать" />
//         <Button text="Заполнить анкету" />

//         <input
//           type="text"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           placeholder="Введите задачу"
//         />
//         <button onClick={handleClick}>Добавить</button>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

export default App;
