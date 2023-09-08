import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../components/FormikInput";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };

  //   useEffect(() => {
  //     const accessToken = localStorage.access_token;
  //     if (accessToken) {
  //       navigate("/home");
  //       return;
  //     }
  //   }, []);

  const isResponseSuccessful = (response) => {
    return response.status >= 200 && response.status < 300;
  };

  const validationSchema = Joi.object({
    username: Joi.string().max(20).required().label("Username"),
    password: Joi.string().min(1).max(50).required().label("Password"),
  });

  function validate(values) {
    const { error } = validationSchema.validate(values, { abortEarly: false });
    if (!error) return {};

    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return errors;
  }

  async function handleLogin(values, { setSubmitting }) {
    setSubmitting(true);

    const body = {
      email: values.username,
      password: values.password,
    };
    try {
      setLoading(true);
      const response = await login(body);
      setLoading(false);

      isResponseSuccessful(response)
        ? navigate("/home")
        : window.alert("Invalid credentials");
    } catch (err) {
      setLoading(false);
      window.alert("Invalid credentials");
      console.log("ERROR:-> ", err);
    }

    setSubmitting(false);
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleLogin}
            validate={validate}
          >
            {({ errors, touched }) => (
              <Form className="w-52 md:w-72">
                <FormikInput
                  name="username"
                  type="text"
                  placeholder="Username"
                  error={errors.username}
                  touched={touched.username}
                />
                <FormikInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  error={errors.password}
                  touched={touched.password}
                />

                <div className="flex items-center justify-start space-x-4 self-start">
                  <input
                    id="togglePassword"
                    type="checkbox"
                    value={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="togglePassword">Show Password</label>
                </div>

                <button
                  type="submit"
                  className="my-2 w-full rounded-md bg-indigo-custom px-4 py-2 text-white hover:bg-indigo-500 hover:shadow-md"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default Login;
