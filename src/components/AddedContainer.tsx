import TodoItem from '../features/todo/TodoItem';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

const AddedContainer = () => {
  const { addedTodos } = useSelector((state: RootState) => state.todo);
  return (
    <div className='bg-grey1 border-[3px] border-solid border-black rounded-[20px] flex flex-col justify-start items-center h-[503px] w-[calc((1410px-100px)/3)] m-0 px-[10px] py-[10px] overflow-hidden box-border shadow-custom1'>
      <div className='w-full h-fit underline text-[1.5rem] flex flex-row items-center justify-center font-bold'>
        Added
      </div>
      <div className='w-full h-fit flex flex-col items-center justify-start overflow-y-scroll'>
        {addedTodos.map((task) => {
          return <TodoItem key={task.id} {...task} />;
        })}
      </div>
    </div>
  );
};

export default AddedContainer;
