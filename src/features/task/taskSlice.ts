import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { useSelector } from "react-redux";

interface TaskState {
  // タスクの数量を管理する
  idCount: number;
  // storeに保存するタスクの一覧
  tasks: { id: number; title: string; completed: boolean }[];
  // taskのtitleを編集する際にどのtaskが選択されているかを知るため
  selectedTask: { id: number; title: string; completed: boolean };
  // モーダルの入力で開くか閉じるかを判定する
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 1, title: "Task A", completed: false }],
  selectedTask: { id: 0, title: "", completed: false },
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // taskの作成
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    // taskの編集
    editTask: (state, action) => {
      // state.taskから指定したtaskを抜き出して編集
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        // 抜き出してきたタイトルを書き換える
        task.title = action.payload.title;
      }
    },
    // どのtaskを選択しているかを管理
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    // modalの開くか閉じるかのフラグ管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { createTask, editTask, selectTask, handleModalOpen } =
  taskSlice.actions;

export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;
export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;
export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;
