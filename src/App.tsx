import { useEffect } from 'react';
import AddedContainer from './components/AddedContainer';
import InProgressContainer from './components/InProgressContainer';
import DoneContainer from './components/DoneContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { verifyTodoText, sortTodoItems } from './features/todo/todoSlice';

const App = () => {
  const {
    addedTodos,
    inProgressTodos,
    doneTodos,
    sortTodos,
    todoId,
    sliderColour,
  } = useSelector((state: RootState) => state.todo);

  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.setItem('added-todos', JSON.stringify(addedTodos));
  }, [addedTodos]);

  useEffect(() => {
    sessionStorage.setItem('inprogress-todos', JSON.stringify(inProgressTodos));
  }, [inProgressTodos]);

  useEffect(() => {
    sessionStorage.setItem('done-todos', JSON.stringify(doneTodos));
  }, [doneTodos]);

  useEffect(() => {
    let timer;
    clearTimeout(timer);
    sessionStorage.setItem('sort-todos', JSON.stringify(sortTodos));
    sortTodos && (timer = setTimeout(() => dispatch(sortTodoItems()), 800));
  }, [sortTodos]);

  useEffect(() => {
    sessionStorage.setItem('id', JSON.stringify(todoId));
  }, [todoId]);

  useEffect(() => {
    sessionStorage.setItem('slider-colour', JSON.stringify(sliderColour));
  }, [sliderColour]);

  return (
    <div className='m-0 p-0 w-full h-full bg-blue1 flex flex-col justify-center items-center'>
      <div className='w-full min-h-[20%] flex flex-col justify-center items-center border-b-[5px] border-black border-solid bg-grey1'>
        <h1 className='w-fit h-fit font-bold text-black text-2xl xxs:text-3xl xs:text-4xl md:text-5xl leading-tight text-center'>
          Task Management Tool
        </h1>
      </div>
      <div className='px-[15px] w-full min-h-[15%] flex justify-center items-center'>
        <input
          className='w-[450px] min-h-[60%] rounded-[40px] border-[3px] border-black border-solid m-0 px-[15px] text-[1.2rem] leading-none outline-none font-[Montserrat] shadow-custom1 placeholder-black'
          placeholder='Add todo here'
          maxLength={25}
          spellCheck='false'
          type='text'
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              dispatch(
                verifyTodoText({ e: (event.target as HTMLInputElement).value })
              );
              (event.target as HTMLInputElement).value = '';
            }
          }}
        />
      </div>
      <div
        className='m-0 px-[15px] py-[15px] w-full min-h-[65%] flex flex-row
      flex-wrap justify-center items-center gap-[50px] overflow-y-auto'
      >
        <AddedContainer />
        <InProgressContainer />
        <DoneContainer />
      </div>
    </div>
  );
};

export default App;
