import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import ErrorMessage from "../../../components/ErrorMessage";
import Input from "../../../components/FormInput";
import IconButton from "../../../components/IconButton";
import TickIcon from "../../../components/TickIcon";
import { addTodo } from "../../../store/todo";

const validationSchema = Yup.object().shape({
  todo: Yup.string().min(5, "Explain Your Todo").required("Todo is Required"),
});

const initialValues = { todo: "" };

const TodoForm = () => {
  const dispatch = useDispatch();
  const addLoading = useSelector((state) => state.todo.addLoading);

  const handleSubmit = (values, { resetForm }) => {
    if (!addLoading) {
      const funcs = [resetForm];
      dispatch(addTodo(values, funcs));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      enableReinitialize
    >
      {({ errors }) => (
        <Form className="">
          <div className="flex gap-0 rounded-md border-[1px] border-white/50 bg-white/10 p-2 text-white backdrop-blur-xl focus-within:bg-white/20 hover:bg-white/20">
            <Input className={"grow px-2"} name="todo" />
            <IconButton loading={addLoading} Icon={TickIcon} />
          </div>
          <ErrorMessage err={errors.todo} className="mt-3" />
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
