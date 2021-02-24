import "./App.css";

import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import { render } from "react-dom";
import { Resizable } from "re-resizable";
const User = require("./component/user");

const style = {
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};
function App() {
  useEffect(() => {
    handleCount();
  }, []);
  const [state, setState] = useState({
    name: "",
    age: "",
    about: "",
    success: "",
    buttonText: "Add",
    buttonText1: "Update",
  });
  const { name, age, about, buttonText, buttonText1, count, addCount } = state;
  const [width, setWidth] = React.useState(500);
  const [height, setHeight] = React.useState(200);
  const widthL = 1000;

  const handelChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Add",
      buttonText1: "Update",
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Add/Update in" });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/event",
        {
          name,
          age,
          about,
        },
        {
          headers: {
            contentType: "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Add/Update",
        error: error.response.data.error,
      });
    }
  };

  const handelSubmitUpdate = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText1: "Update in" });

    try {
      const response = await axios.put(
        "http://localhost:8000/api/event",
        {
          name,
          age,
          about,
        },
        {
          headers: {
            contentType: "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText1: "Update",
        error: error.response.data.error,
      });
    }
  };

  const handleCount = async (e) => {
    try {
      const response = await axios.get("http://localhost:8000/api/event", {
        headers: {
          contentType: "application/json",
        },
      });
      setState({
        ...state,
        count: response.data.total,
        addCount: response.data.add,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container-2">
        <Resizable
          className="box-1"
          style={style}
          size={{ width, height }}
          onResizeStop={(e, direction, ref, d) => {
            setWidth(width + d.width);
            setHeight(height + d.height);
          }}
        >
          <form>
            <div className="form-group">
              <input
                value={name}
                onChange={handelChange("name")}
                type="string"
                className="form-control"
                required
                placeholder="Type your name"
              ></input>
            </div>
            <div className="form-group">
              <input
                value={age}
                onChange={handelChange("age")}
                type="number"
                className="form-control"
                required
                placeholder="Type your age"
              ></input>
            </div>
            <div className="form-group">
              <input
                value={about}
                onChange={handelChange("about")}
                type="string"
                className="form-control"
                required
                placeholder="Type your about"
              ></input>
            </div>

            <div className="form-group">
              <button
                onClick={handelSubmit}
                className="btn btn-outline-warning"
              >
                {buttonText}
              </button>
            </div>
            <div className="form-group">
              <button
                onClick={handelSubmitUpdate}
                className="btn btn-outline-warning"
              >
                {buttonText1}
              </button>
            </div>
          </form>
        </Resizable>
        <Resizable
          className="box-2"
          style={style}
          size={{ width, height }}
          onResizeStop={(e, direction, ref, d) => {
            setWidth(width + d.width);
            setHeight(height + d.height);
          }}
        >
          Total Updates = {count - addCount}
        </Resizable>
      </div>
      <div className="frame">
        <Resizable
          className="box-3"
          style={style}
          size={{ widthL, height }}
          onResizeStop={(e, direction, ref, d) => {
            setWidth(width + d.width);
            setHeight(height + d.height);
          }}
        >
          Total added = {addCount}
        </Resizable>
      </div>
    </div>
  );
}

export default App;
