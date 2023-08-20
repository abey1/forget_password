import React from "react";
import "./Forgetpassword.scss";
import loginImage from "../../assets/login_image.png";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { server_url } from "../../utilities/constants";
const Forgetpassword = () => {
  return (
    <div className="forgetpassword_page">
      <div className="forgetpassword_left_right">
        <div>
          <Formik
            initialValues={{ email: "", error: "" }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              values.error = "";
              try {
                const result = await fetch(
                  `${server_url}/user/forget-password`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: values.email }),
                  }
                );
                const json = await result.json();
                console.log(json);
                if (result.ok) {
                  values.email = "";
                  alert(
                    "A link to change your password has been sent to your email"
                  );
                } else {
                  values.error = json.error;
                }
              } catch (error) {}
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
                      onFocus={() => {
                        values.error = "";
                      }}
                      value={values.email}
                    />
                  </div>

                  <div className="forget_password_error">{values.error}</div>

                  <div className="send_btn_loader_holder">
                    {isSubmitting ? (
                      <div class="loader"></div>
                    ) : (
                      <button
                        className="send_link_btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        send
                      </button>
                    )}
                  </div>

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
