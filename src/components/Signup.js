import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const host = "http://localhost:5000";
  const [checkBox, setCheckBox] = useState(true);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let history = useHistory();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleCheckBox = () => {
    setCheckBox(!checkBox);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history.push("/");
    } else {
      credentials.password.length < 5
        ? alert("required atleast 5 character password")
        : alert("Invalid crendentials!");
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={credentials.nmae}
                              onChange={onChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="name">
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              value={credentials.email}
                              name="email"
                              onChange={onChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="email">
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={credentials.password}
                              onChange={onChange}
                              className="form-control"
                              minLength={5}
                              required
                            />
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="cpassword"
                              name="cpassword"
                              // onChange={onChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="cpassword">
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="check-box"
                            onChange={handleCheckBox}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="check-box"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            disabled={checkBox}
                            onClick={handleClick}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
