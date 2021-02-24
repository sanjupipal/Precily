import { useState } from "react";
import axios from "axios";

const User = () => {
  const [state, setState] = useState({
    name: "",
    age: "",
    about: "",
    success: "",
    buttonText: "Add/Update",
  });
  const { name, age, about, buttonText } = state;
  const handelChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Add/Update",
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Add/Update in" });

    try {
      const response = await axios.post("api/event", {
        name,
        age,
        about,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Add/Update",
        error: error.response.data.error,
      });
    }
  };

  const loginForm = () => (
    <form onSubmit={handelSubmit}>
      <div className="form-group">
        <input
          value={name}
          onChange={handelChange("name")}
          //   type="string"
          className="form-control"
          required
          placeholder="Type your name"
        ></input>
      </div>
      <div className="form-group">
        <input
          value={age}
          onChange={handelChange("age")}
          //   type="number"
          className="form-control"
          required
          placeholder="Type your age"
        ></input>
      </div>
      <div className="form-group">
        <button className="btn btn-outline-warning">{buttonText}</button>
      </div>
    </form>
  );

  return (
    <div className="col-md-6 offset-md-3">
      <h1>User</h1>
      <br />
      {loginForm()}
    </div>
  );
};

export default User;
