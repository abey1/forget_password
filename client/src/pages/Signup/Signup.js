import React from "react";
import "./Signup.scss";
import loginImage from "../../assets/login_image.png";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { server_url } from "../../utilities/constants";
import { useUserContext } from "../../contexts/UserContext";
import { SIGNUP } from "../../utilities/constants";

const Signup = () => {
  const { email, userDispatch } = useUserContext();
  return (
    <div className="signup_page">
      <div className="signup_left_right">
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              error: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                if (values.password !== values.confirmPassword) {
                  values.error = "Password doesn't match";
                } else {
                  values.error = "";
                  const response = await fetch(`${server_url}/user/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: values.email,
                      password: values.password,
                    }),
                  });
                  const json = await response.json();
                  if (json.error) {
                    values.error = json.error;
                  } else {
                    userDispatch({ type: SIGNUP, payload: json.email });
                    localStorage.setItem("token", json.token);
                  }
                }
              } catch (error) {
                console.log(error);
              }
              setSubmitting(false);
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
                <div className="signup_card">
                  <div className="signup_card_title">sign up</div>
                  <div className="signup_input_holder">
                    <div className="icon_holder">
                      <i class="fa-regular fa-envelope"></i>
                    </div>
                    <input
                      className="signup_input"
                      type="email"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => {
                        values.error = "";
                      }}
                      value={values.email}
                    />
                  </div>

                  {/* {errors.email && touched.email && errors.email} */}
                  <div className="signup_input_holder">
                    <div className="icon_holder">
                      <i class="fa-solid fa-lock"></i>
                    </div>
                    <input
                      className="signup_input"
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => {
                        values.error = "";
                      }}
                      value={values.password}
                    />
                  </div>
                  <div className="signup_input_holder">
                    <div className="icon_holder">
                      <i class="fa-solid fa-lock"></i>
                    </div>
                    <input
                      className="signup_input"
                      type="password"
                      name="confirmPassword"
                      placeholder="confirm password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => {
                        values.error = "";
                      }}
                      value={values.confirmPassword}
                    />
                  </div>
                  <div className="signup_error_holder">{values.error}</div>
                  <div className="signup_btn_loader_holder">
                    {isSubmitting ? (
                      <div class="loader"></div>
                    ) : (
                      <button
                        className="signup_btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        sign up
                      </button>
                    )}
                  </div>

                  <div className="signup_in_login_holder">
                    Already have an account?{" "}
                    <span className="signup_in_login">
                      <Link className="sign_in_link" to="/login">
                        sign in
                      </Link>
                    </span>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className="signup_left_right">
        <img src={loginImage} alt="login pic" />
      </div>
    </div>
  );
};

export default Signup;
