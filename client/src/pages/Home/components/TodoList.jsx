import { useState } from "react";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { BsTrash } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { useDispatch } from "react-redux";

import { deleteTodo, updateTodo } from "../../../store/todo";

const TodoList = ({ filter }) => {
  const dispatch = useDispatch();

  const [idForLoader, setId] = useState(null);
  const [operator, setOperator] = useState(null);
  const todo = useSelector((state) => state.todo.todo);

  const filtered = filter === "Completed" ? true : false;
  const applyFilter = filter === "All" ? null : true;

  const deleteTodoFunc = (id) => {
    setOperator("delete");
    setId(id);
    const funcs = [() => setId(null), () => setOperator(null)];
    dispatch(deleteTodo({ _id: id }, funcs));
  };

  const completeTodoFunc = ({ _id, completed, todo }) => {
    setOperator("update");
    setId(_id);
    const funcs = [() => setId(null), () => setOperator(null)];
    dispatch(updateTodo({ _id, completed: !completed, todo }, funcs));
  };

  return (
    <div className="mt-8 flex flex-col gap-1">
      {todo.map(({ _id, todo, completed }) => {
        if (applyFilter && filtered !== completed) return null;
        return (
          <div
            key={_id}
            className="flex gap-1 rounded border-[1px] border-white/70 bg-white/10 text-white"
          >
            <div
              className={`grow break-all p-4 ${
                completed ? "line-through" : ""
              }`}
            >
              {todo}
            </div>
            <div className="flex">
              <div className="relative inset-0 flex w-10 cursor-pointer justify-center  bg-white/20  hover:bg-white/30">
                {operator === "delete" && idForLoader === _id ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    visible={true}
                    width={25}
                  />
                ) : (
                  <BsTrash
                    className="h-full w-full px-2 text-xl"
                    onClick={() => deleteTodoFunc(_id)}
                  />
                )}
              </div>
              <div className="relative inset-0 flex w-10 cursor-pointer justify-center  bg-white/20  hover:bg-white/30">
                {operator === "update" && idForLoader === _id ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    visible={true}
                    width={25}
                  />
                ) : (
                  <TiTick
                    className="h-full w-full px-1 text-2xl"
                    onClick={() => completeTodoFunc({ _id, completed, todo })}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
