
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


export default App;
