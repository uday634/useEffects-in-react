import React, { useState, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const Login = (props) => {
  
  const [values, setValues] = useState({email:'',password:'',collegeName:'',formValid:false})
  const ctx = useContext(AuthContext);

  const inputValuesAndValid = (emailVal, passVal, collegeNameVal,formValid) =>{
    setValues({
     email: emailVal, 
     password: passVal,
     collegeName: collegeNameVal,
      formValid:formValid
    })
    console.log(values)
  }

  

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogIn(values.email, values.password, values.collegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input values={inputValuesAndValid}></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!values.formValid}>
            Login
          </Button>
        </div> 
      </form>
    </Card>
  );
};

export default Login;
