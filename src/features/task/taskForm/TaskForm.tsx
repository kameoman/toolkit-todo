import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import styles from "./TaskForm.module.scss";
import { register } from '../../../serviceWorker';

type Inputs = {
  taskTitle: string;
};

const TaskForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = (data: Inputs) => {
    console.log(data);
    reset();
  };
  return (
    <div className={styles.root}>
      <form
        onSubmit={handleSubmit(handleCreate)}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        
        <TextField
          id="outlined-basic"
          label="New Task"
          variant="outlined"
          {...register("taskTitle", { required: true })}
          className={styles.text_field}
        />
      </form>
    </div>
  );
};

export default TaskForm;
