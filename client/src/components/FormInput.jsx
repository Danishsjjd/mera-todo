import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";

const FormInput = ({ type, name, className, showError }) => {
  const { errors, values, setFieldValue } = useFormikContext();
  return (
    <>
      <input
        type={type}
        className={`${className} bg-transparent focus:outline-none`}
        name={name}
        onChange={(e) => setFieldValue(name, e.target.value)}
        value={values[name]}
      />
      {showError && <ErrorMessage err={errors[name]} />}
    </>
  );
};

export default FormInput;
