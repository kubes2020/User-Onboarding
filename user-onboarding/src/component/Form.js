import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Form() {
  //state for users
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  //state for error messages
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  //state for post request
  const [post, setPost] = useState([]);

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
    const prepareUserData = {
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    };
    //send these destructured props to get validated
    validateChange(name, value);
    //update userData with 'prepareUserData' regardless if it passes validation
    // setUserData({ ...userData, [name]: value });
    setUserData(prepareUserData);
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
    password: yup
      .string()
      .min(5, "must be at least 5 characters")
      .required("yo, pw is required"),
  });

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", userData)
      .then((res) => {
        setPost(res.data);
        console.log("success!", post);
        // reset form
        setUserData({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  console.log("success!", post);
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
      <label htmlFor="password">
        password
        <input
          type="password"
          name="password"
          id="password"
          value={userData.password}
          onChange={onChange}
        ></input>
      </label>
      <button disabled={buttonDisabled}>Submit</button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
  );
}
