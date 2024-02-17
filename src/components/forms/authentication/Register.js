import React from "react";

const Register = ({ onSubmit }) => {
  return (
    <>
      <div className="auth__form__title">Register</div>
      <div className="auth__form__subtitle">
        Enter your details to get started
      </div>
      <form onSubmit={onSubmit} className="auth__form__body">
        <div className="auth__form__group">
          <label>Full Name</label>
          <input type={"text"} className="auth__form__input" />
        </div>
        <div className="auth__form__group">
          <label>Email</label>
          <input type={"email"} className="auth__form__input" />
        </div>
        <div className="auth__form__group">
          <label>Password</label>
          <input type="password" className="auth__form__input" />
        </div>
        <div className="auth__form__button">
          <button type="submit">Get started</button>
        </div>
      </form>
    </>
  );
};

export default Register;
