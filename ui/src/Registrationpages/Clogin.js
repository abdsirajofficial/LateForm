import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";
import validator from "validator";
import { ArrowRight, Envelope, Lock } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
function Clogin() {
  let [isprocess, setProcess] = useState(false);
  let [loader, setLoader] = useState(false);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("invalid email").required("email is required"),
      password: yup.string().required("password is required"),
    }),
    onSubmit: (data) => {
      setProcess(true);
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/login/organizerLogin", data)
        .then((res) => {
          window.localStorage.setItem("Oauth", res.data);
          axios
            .post(
              process.env.REACT_APP_BACKEND_URL +
                "/login/validatingOrganizerUser",
              data,
              { headers: { Oauth: window.localStorage.getItem("Oauth") } }
            )
            .then((res) => {
              toast.success(res.data);
              setTimeout(() => {
                navigate("/organizerLoginOtpVerification?email=" + data.email);
              }, 5000);
            })
            .catch((err) => {
              setProcess(false);
              toast.error(err.response.data);
            });
        })
        .catch((err) => {
          setProcess(false);
          toast.error(err.response.data);
        });
    },
  });
  //forgot password
  let forgotPassword = (event) => {
    event.preventDefault();
    let mail = window.prompt("type your email", "");
    if (!mail) {
      toast.warn("give your email to change your password");
    } else {
      if (validator.isEmail(mail)) {
        setLoader(true);
        axios
          .post(process.env.REACT_APP_BACKEND_URL + "/forgot/forgotPassword", {
            email: mail,
          })
          .then((res) => {
            localStorage.setItem("forgotAuth", res.data.token);
            toast.success(res.data.msg);
            setLoader(false);

            setTimeout(() => {
              navigate("/forgot/forgotPassword");
            }, 5000);
          })
          .catch((err) => {
            toast.error(err.response.data);
            setLoader(false);
          });
      } else {
        window.alert("give proper email");
      }
    }
  };

  return (

    <div className="  w-full flex flex-col justify-center items-center">
      <div className="">
        <div className="">

          {loader === false ? null : <div className="loader-line"></div>}

          <form className=" space-y-3 " onSubmit={formik.handleSubmit}>

              <div className="w-full">
                <label className=" flex items-center">
                  <Envelope className="me-1" />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email*"
                  className=" w-full lg:w-[400px] pl-2 h-14 bg-white rounded-[5px] border-2 "
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email ? (
                  <p className="text-danger">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="w-full">
                <label className=" flex items-center">
                  <Lock className="me-1" /> Password
                </label>
                <input
                  type="password"
                  placeholder="Password*"
                  className=" w-full lg:w-[400px] pl-2 h-14 bg-white rounded-[5px] border-2 "
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password ? (
                  <p className="text-danger">{formik.errors.password}</p>
                ) : null}
              </div>
              <div className=" flex justify-end">
                <a
                  className=""
                  href="/"
                  onClick={forgotPassword}
                >
                  forgot password?
                </a>
              </div>
            

            {isprocess ? (
              <button className="btn btn-dark btn-full" disabled>
                logging...{" "}
                <div class="spinner-border text-success" role="status">
                  {" "}
                  <span class="sr-only"></span>
                </div>
              </button>
            ) : (
              <button className=" w-full lg:w-[400px] h-14 flex justify-center items-center bg-[#3362FF] hover:bg-[#2b3b7b] rounded-md text-white">
                Organizer Login
                <ArrowRight className="ms-2" />
              </button>
            )}

          </form>

          <Link
            to="/organizerRegister"
            className="flex flex-col sm:flex-row justify-center items-center text-decoration-none mt-3 text-black"
          >
            Create a lateform hoster account <span className=" pl-2 text-blue-700 font-medium">Sign Up</span>
          </Link>
        </div>

      </div>
      <ToastContainer />
    </div>

  );
}
export default Clogin;
