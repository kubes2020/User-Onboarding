import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Form() {
  //state for users
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  //state for error messages
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  //state for toggle submit button
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // toggles submit button when userData is valid
  useEffect(() => {
    formSchema.isValid(userData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [userData]);

  const onChange = (e) => {
    e.persist();
    //destructure the event objects
    const { name, value, checked, type } = e.target;
    //prepare userData to be validate based on 'value' or 'checked' etc
    // const prepareUserData = {
    //   ...userData,
    //   [name]: type === "checkbox" ? checked : value,
    // };
    //send these destructured props to get validated
    validateChange(name, value);
    //update userData with 'prepareUserData' regardless if it passes validation
    setUserData({ ...userData, [name]: value });
  };

  const validateChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] });
      });
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("your name is required"),
    email: yup
      .string()
      .email("must be valid email")
      .required("your email is required"),
  });

  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submit}>
      <label htmlFor="name">
        Name:
        <input
          type="text"
          name="name"
          id="name"
          value={userData.name}
          onChange={onChange}
        ></input>
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          value={userData.email}
          onChange={onChange}
        ></input>
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <button disabled={buttonDisabled}>Submit</button>
    </form>
  );
}
