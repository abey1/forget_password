import React from "react";
import "./Forgetpassword.scss";
import loginImage from "../../assets/login_image.png";
import { Formik } from "formik";
import { Link } from "react-router-dom";
const Forgetpassword = () => {
  return (
    <div className="forgetpassword_page">
      <div className="forgetpassword_left_right">
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
                <div className="forgetpassword_card">
                  <div className="forgetpassword_card_pic"></div>
                  <div className="forget_your_password_title">
                    Forgot Your Password?
                  </div>
                  <div className="our_team_will_help_you">
                    Don’t worry our team will help you to Login again.
                  </div>
                  <div className="enter_your_email_title">
                    enter your email address
                  </div>
                  <div className="forgetpassword_input_holder">
                    <div className="icon_holder">
                      <i class="fa-regular fa-envelope"></i>
                    </div>
                    <input
                      className="forgetpassword_input"
                      type="email"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>

                  {errors.email && touched.email && errors.email}
                  <button
                    className="send_link_btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    send
                  </button>
                  <div className="signup_in_login_holder">
                    Already have an account?{" "}
                    <span className="signin_in_forgetpassword">
                      <Link className="signin_link" to="/login">
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
      <div className="forgetpassword_left_right">
        <img src={loginImage} alt="login pic" />
      </div>
    </div>
  );
};

export default Forgetpassword;
