import React from "react";
import TaskItem from "../taskItem/TaskItem";
import styles from "./TaskList.module.scss";
import sampleData from "./sampleData.json";

const TaskList: React.FC = () => {
  return (
    <div className={styles.root}>
      {sampleData.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
