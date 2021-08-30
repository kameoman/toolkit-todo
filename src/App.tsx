import React from "react";
import Header from "./components/header/Header";
import TaskForm from "./features/task/taskForm/TaskForm";
import TaskList from "./features/task/taskList/TaskList";
import styles from "./App.module.scss";

import { auth } from "./firebase";

const App: React.FC = () => {
  console.log(auth);
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header />
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
