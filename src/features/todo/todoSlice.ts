import { createSlice } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  description: string;
  leftChevron: boolean;
  rightChevron: boolean;
  category: string;
  strikethrough: boolean;
  showToggle: boolean;
  toggleValue: number;
  sliderColour: string;
}

interface TodoSliceState {
  addedTodos: Todo[];
  inProgressTodos: Todo[];
  doneTodos: Todo[];
  sortTodos: boolean;
  todoId: number;
  sliderColour: string;
}

const initialState: TodoSliceState = {
  addedTodos: JSON.parse(sessionStorage.getItem('added-todos')!) || [],
  inProgressTodos:
    JSON.parse(sessionStorage.getItem('inprogress-todos')!) || [],
  doneTodos: JSON.parse(sessionStorage.getItem('done-todos')!) || [],
  sortTodos: JSON.parse(sessionStorage.getItem('sort-todos')!) || false,
  todoId: JSON.parse(sessionStorage.getItem('id')!) || 1,
  sliderColour:
    JSON.parse(sessionStorage.getItem('slider-colour')!) ||
    'w-[70px] h-[10px] cursor-pointer appearance-none rounded-full bg-red1 hover:opacity-90 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[25px] [&::-webkit-slider-thumb]:w-[25px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red1',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    chevronLeftClick: (state, { payload }) => {
      const { id, category } = payload;
      switch (category) {
        case 'in-progress':
          const inProgressTodo = state.inProgressTodos.filter(
            (task) => task.id === id
          );
          state.inProgressTodos = state.inProgressTodos.filter(
            (task) => task.id !== id
          );
          inProgressTodo[0].category = 'added';
          inProgressTodo[0].leftChevron = false;
          inProgressTodo[0].rightChevron = true;
          inProgressTodo[0].showToggle = false;
          inProgressTodo[0].toggleValue = 0;
          inProgressTodo[0].sliderColour =
            'w-[70px] h-[10px] cursor-pointer appearance-none rounded-full bg-red1 hover:opacity-90 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[25px] [&::-webkit-slider-thumb]:w-[25px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red1';
          state.addedTodos = [...state.addedTodos, inProgressTodo[0]];
          break;
        case 'done':
          const doneTodo = state.doneTodos.filter((task) => task.id === id);
          state.doneTodos = state.doneTodos.filter((task) => task.id !== id);
          doneTodo[0].category = 'in-progress';
          doneTodo[0].leftChevron = true;
          doneTodo[0].rightChevron = false;
          doneTodo[0].strikethrough = false;
          doneTodo[0].showToggle = true;
          state.inProgressTodos = [...state.inProgressTodos, doneTodo[0]];
          break;
      }
    },
    chevronRightClick: (state, { payload }) => {
      const { id, category } = payload;
      switch (category) {
        case 'added':
          const addedTodo = state.addedTodos.filter((task) => task.id === id);
          state.addedTodos = state.addedTodos.filter((task) => task.id !== id);
          addedTodo[0].category = 'in-progress';
          addedTodo[0].leftChevron = true;
          addedTodo[0].rightChevron = false;
          addedTodo[0].showToggle = true;
          state.inProgressTodos = [...state.inProgressTodos, addedTodo[0]];
          break;
      }
    },
    sliderValue: (state, { payload }) => {
      const { e } = payload;
      switch (e) {
        case '0':
          state.sliderColour =
            'w-[70px] h-[10px] cursor-pointer appearance-none rounded-full bg-red1 hover:opacity-90 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[25px] [&::-webkit-slider-thumb]:w-[25px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red1';
          break;
        case '25':
          state.sliderColour =
            'w-[70px] h-[10px] cursor-pointer appearance-none rounded-full bg-orange-400 hover:opacity-90 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[25px] [&::-webkit-slider-thumb]:w-[25px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-400';
          break;
        case '50':
          state.sliderColour =
            'w-[70px] h-[10px] cursor-pointer appearance-none rounded-full bg-orange-500 hover:opacity-90 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[25px] [&::-webkit-slider-thumb]:w-[25px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500';
          break;
        case '75':
          state.sliderColour =
            'w-[70px] h-[10px] cursor-pointer appearance-none rounded-full bg-green-500 hover:opacity-90 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[25px] [&::-webkit-slider-thumb]:w-[25px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500';
          break;
        case '100':
          state.sliderColour =
            'w-[70px] h-[10px] cursor-pointer appearance-none rounded-full bg-green-700 hover:opacity-90 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[25px] [&::-webkit-slider-thumb]:w-[25px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-700';
          break;
      }
    },
    sortTodoItems: (state) => {
      state.inProgressTodos = state.inProgressTodos.sort((a, b) => {
        return b.toggleValue - a.toggleValue;
      });
      const inProgressTodo = state.inProgressTodos.filter((task) => {
        return task.toggleValue !== 100;
      });
      state.inProgressTodos.map((task) => {
        task.toggleValue === 100 &&
          (state.doneTodos = [
            ...state.doneTodos,
            {
              ...task,
              category: 'done',
              rightChevron: false,
              strikethrough: true,
              showToggle: false,
              toggleValue: 0,
              sliderColour:
                'w-[70px] h-[10px] cursor-pointer appearance-none rounded-full bg-red1 hover:opacity-90 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[25px] [&::-webkit-slider-thumb]:w-[25px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red1',
            },
          ]);
      });
      state.inProgressTodos = inProgressTodo;
      state.sortTodos = false;
    },
    modifySlider: (state, { payload }) => {
      const { id, category, e } = payload;
      switch (category) {
        case 'in-progress':
          const inProgressTodo = state.inProgressTodos.map((task) => {
            if (task.id === id) {
              return {
                ...task,
                toggleValue: Number(e),
                sliderColour: state.sliderColour,
              };
            } else {
              return task;
            }
          });
          state.inProgressTodos = inProgressTodo;
          state.sortTodos = true;
          break;
      }
    },
    deleteTodo: (state, { payload }) => {
      const { id, category } = payload;
      switch (category) {
        case 'added':
          state.addedTodos = state.addedTodos.filter((item) => item.id !== id);
          break;
        case 'in-progress':
          state.inProgressTodos = state.inProgressTodos.filter(
            (item) => item.id !== id
          );
          break;
        case 'done':
          state.doneTodos = state.doneTodos.filter((item) => item.id !== id);
          break;
      }
    },
    verifyTodoText: (state, { payload }) => {
      const { e } = payload;
      const inputText = e;
      const textSplit = e.split(' ');
      const result = textSplit.every((word: string) => {
        if (word.length > 0 && word.length <= 10) {
          return true;
        } else if (word === '') return false;
      });
      result && (state.todoId = state.todoId + 1);
      result &&
        (state.addedTodos = [
          ...state.addedTodos,
          {
            id: state.todoId,
            description: inputText,
            leftChevron: false,
            rightChevron: true,
            category: 'added',
            strikethrough: false,
            showToggle: false,
            toggleValue: 0,
            sliderColour:
              'w-[70px] h-[10px] cursor-pointer appearance-none rounded-full bg-red1 hover:opacity-90 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[25px] [&::-webkit-slider-thumb]:w-[25px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red1',
          },
        ]);
    },
  },
});

export const {
  chevronLeftClick,
  chevronRightClick,
  sliderValue,
  sortTodoItems,
  modifySlider,
  deleteTodo,
  verifyTodoText,
} = todoSlice.actions;

export default todoSlice.reducer;
