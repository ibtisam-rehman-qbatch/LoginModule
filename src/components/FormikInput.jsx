import { ErrorMessage, Field } from "formik";
import React from "react";

import PropTypes from "prop-types";

function FormikInput({ name, type, placeholder, error, touched }) {
  return (
    <>
      <div className={`${error && touched ? "animate-pulse" : ""} mb-2`}>
        <Field
          name={name}
          placeholder={placeholder}
          type={type}
          className={`${
            error && touched ? "border-2 border-red-500" : ""
          } mb-2 w-full rounded-md bg-gray-300 p-2 placeholder:text-gray-700 dark:text-black`}
          autoComplete="off"
        />
        <ErrorMessage
          name={name}
          component="div"
          className="min-h-[2.5rem] text-sm text-red-500"
        />
      </div>
    </>
  );
}

FormikInput.propTypes = {
  userId: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
};

export default FormikInput;
