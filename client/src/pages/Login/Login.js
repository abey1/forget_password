import React from "react";
import "./Login.scss";
import loginImage from "../../assets/login_image.png";
import { Formik } from "formik";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login_page">
      <div className="login_left_right">
        <div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="login_card">
                  <div className="login_card_title">sign in</div>
                  <div className="login_input_holder">
                    <div className="icon_holder">
                      <i class="fa-regular fa-envelope"></i>
                    </div>
                    <input
                      className="login_input"
                      type="email"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                  <div className="login_error">
                    {errors.email && touched.email && errors.email}
                  </div>

                  <div className="login_input_holder">
                    <div className="icon_holder">
                      <i class="fa-solid fa-lock"></i>
                    </div>
                    <input
                      className="login_input"
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>
                  <div className="forget_password_holder">
                    <Link className="forgetpassword_link" to="/forgetpassword">
                      forgot password?
                    </Link>
                  </div>
                  {errors.password && touched.password && errors.password}
                  <button
                    className="signin_btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    sign in
                  </button>
                  <div className="signup_in_login_holder">
                    Don't have an account?{" "}
                    <span className="signup_in_login">
                      <Link className="sign_up_link" to="/signup">
                        sign up
                      </Link>
                    </span>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className="login_left_right">
        <img src={loginImage} alt="login pic" />
      </div>
    </div>
  );
};

export default Login;
