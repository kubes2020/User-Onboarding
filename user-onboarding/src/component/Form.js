import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Form() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <form>
      <label htmlFor="name">
        Name:
        <input
          type="text"
          name="name"
          id="name"
          value={userData.name}
          onChange={onChange}
        ></input>
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
      </label>
    </form>
  );
}
