import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import {
  createTask,
  editTask,
  handleModalOpen,
  selectSelectedTask,
} from "../taskSlice";
import styles from "./TaskForm.module.scss";
import { fetchTasks } from '../taskSlice';
import { AppDispatch } from '../../../app/store';

type Inputs = {
  taskTitle: string;
};

type PropTypes = {
  edit?: boolean;
};

const TaskForm: React.FC<PropTypes> = ({ edit }) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedTask = useSelector(selectSelectedTask);
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = async(data: Inputs) => {
    await createTask(data.taskTitle);
    reset();
    dispatch(fetchTasks());
  };
  const handleEdit = async (data: Inputs) => {
    const sendData = { ...selectedTask, title: data.taskTitle };
    await editTask(sendData);
    dispatch(handleModalOpen(false));
    dispatch(fetchTasks());
  };
  return (
    <div className={styles.root}>
      <form
        onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label={edit ? "Edit Task" : "New Task"}
          // フォームの中に値を入れておくかどうか
          defaultValue={edit ? selectedTask.title : ""}
          variant="outlined"
          {...register("taskTitle", { required: true })}
          className={styles.text_field}
        />
        {edit ? (
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
            <button
              type="button"
              onClick={() => dispatch(handleModalOpen(false))}
              className={styles.cancel_button}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default TaskForm;
