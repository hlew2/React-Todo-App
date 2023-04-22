import {
  chevronLeftClick,
  chevronRightClick,
  modifySlider,
  sliderValue,
  deleteTodo,
} from './todoSlice';
import { Todo } from './todoSlice';
import { useDispatch } from 'react-redux';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const TodoItem = ({
  description,
  id,
  leftChevron,
  rightChevron,
  category,
  strikethrough,
  showToggle,
  toggleValue,
  sliderColour,
}: Todo) => {
  const dispatch = useDispatch();
  return (
    <div className='bg-white rounded-[40px] border-[3px] border-black border-solid w-full h-fit mb-[10px] mt-[10px] px-[20px] flex flex-row justify-between items-center'>
      <div className='m-0 p-0 flex flex-row justify-center items-center h-fit w-fit cursor-pointer'>
        {leftChevron && (
          <ChevronLeftIcon
            className='h-4 w-4'
            onClick={() => dispatch(chevronLeftClick({ id, category }))}
          />
        )}
        {rightChevron && (
          <ChevronRightIcon
            className='h-4 w-4'
            onClick={() => dispatch(chevronRightClick({ id, category }))}
          />
        )}
      </div>
      {strikethrough ? (
        <p className='text-[1rem] text-center h-fit m-[15px] line-through'>
          {description}
        </p>
      ) : (
        <p className='text-[1rem] text-center h-fit m-[15px]'>{description}</p>
      )}
      <div className='m-0 p-0 flex flex-row justify-center items-center h-full w-fit gap-[10px]'>
        {showToggle && (
          <div className='m-0 p-0 flex flex-col justify-center items-center h-full w-fit gap-[5px]'>
            <div className='m-0 p-0 flex flex-row justify-center items-center h-[25px] w-full'>
              <input
                className={sliderColour}
                type='range'
                min={0}
                max={100}
                step={25}
                value={toggleValue}
                onChange={(event) => {
                  dispatch(
                    sliderValue({ e: (event.target as HTMLInputElement).value })
                  );
                  dispatch(
                    modifySlider({
                      id,
                      category,
                      e: (event.target as HTMLInputElement).value,
                    })
                  );
                }}
              />
            </div>
            <div className='m-0 p-0 flex flex-row justify-center items-center h-fit w-full'>
              <label className='h-fit w-fit text-center leading-none text-[1rem]'>
                {toggleValue}
                {'%'}
              </label>
            </div>
          </div>
        )}

        <button
          className='flex flex-col items-center justify-center h-[30px] w-[30px] m-0 p-0 border-[2px] border-solid border-black rounded-[15px] bg-red1 hover:opacity-90'
          onClick={() => dispatch(deleteTodo({ id, category }))}
        >
          <XMarkIcon className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
