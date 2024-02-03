import React, { useState, useReducer, useEffect } from "react";
import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const collegeNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const Input = ({values}) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [collegeNameState, dispatchCollegeName] = useReducer(
    collegeNameReducer,
    {
      value: "",
      isValid: null,
    }
  );

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(
        emailState.isValid && passwordState.isValid && collegeNameState.isValid
      );
      values(emailState.value, passwordState.value, collegeNameState.value, formIsValid)
      console.log(formIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [
    emailState.isValid,
    passwordState.isValid,
    collegeNameState.isValid,
    emailState.value,
    passwordState.value,
    collegeNameState.value,
    formIsValid,
  ]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
    console.log(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") && passwordState.isValid && collegeNameState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });
    console.log(event.target.value.trim().length);
    setFormIsValid(
      event.target.value.length > 6 && emailState.isValid && passwordState.isValid
    );
  };

  const collegeNameChangeHandler = (event) => {
    dispatchCollegeName({ type: "USER_INPUT", value: event.target.value });
    setFormIsValid(
      event.target.value.length > 0 && emailState.isValid && passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const validateCollegeNameHandler = () => {
    dispatchCollegeName({ type: "INPUT_BLUR" });
  };



  return (
    <>
      <div
        className={`${classes.control} ${
          emailState.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
      </div>
      <div
        className={`${classes.control} ${
          passwordState.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
      </div>
      <div
        className={`${classes.control} ${
          collegeNameState.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="collegeName">College Name</label>
        <input
          type="text"
          id="collegeName"
          value={collegeNameState.value}
          onChange={collegeNameChangeHandler}
          onBlur={validateCollegeNameHandler}
        />
      </div>
    </>
  );
};

export default Input;
