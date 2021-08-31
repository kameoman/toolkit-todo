import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase/app";
import { RootState, AppThunk } from "../../app/store";
import { useSelector } from "react-redux";
import { db } from "../../firebase";

interface TaskState {
  // タスクの数量を管理する
  idCount: number;
  // storeに保存するタスクの一覧
  tasks: { id: string; title: string; completed: boolean }[];
  // taskのtitleを編集する際にどのtaskが選択されているかを知るため
  selectedTask: { id: string; title: string; completed: boolean };
  // モーダルの入力で開くか閉じるかを判定する
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [],
  selectedTask: { id: "", title: "", completed: false },
  isModalOpen: false,
};
// タスクの全件取得
export const fetchTasks = createAsyncThunk("task/getAllTasks", async () => {
  const res = await db.collection("tasks").orderBy("dateTime", "desc").get();

  const allTasks = res.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    completed: doc.data().completed,
  }));

  const taskNumber = allTasks.length;
  const passData = { allTasks, taskNumber };
  return passData;
});

// タスクの新規作成
export const createTask = async (title: string): Promise<void> => {
  try {
    // 現在時刻の取得
    const dateTime = firebase.firestore.Timestamp.fromDate(new Date());
    // firestoreタスクコレクションに追加（データ追加）
    await db
      .collection("tasks")
      .add({ title: title, completed: false, dateTime: dateTime });
  } catch (err) {
    console.log("Error writing document: ", err);
  }
};

// タスクの編集
export const editTask = async (submitData: {
  id: string;
  title: string;
  completed: boolean;
}): Promise<void> => {
  const { id, title, completed } = submitData;
  const dateTime = firebase.firestore.Timestamp.fromDate(new Date());
  try {
    await db
      .collection("tasks")
      .doc(id)
      // 同じ内容がある場合にはmerge合体させる
      .set({ title, completed, dateTime }, { merge: true });
  } catch (err) {
    console.log("Error updating document:", err);
  }
};
export const taskSlice = createSlice({
  name: "task",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // どのtaskを選択しているかを管理
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    // modalの開くか閉じるかのフラグ管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    // taskの削除
    deleteTask: (state, action) => {
      // state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.allTasks;
      state.idCount = action.payload.taskNumber;
    });
  },
});

export const { deleteTask, selectTask, handleModalOpen } = taskSlice.actions;

export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;
export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;
export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;
