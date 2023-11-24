import "../App.css";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import reg from "../image/LoginPageImage1.svg";
import reg2 from "../image/rArrow.svg";
import reg3 from "../image/tIcon.svg";
import recIcon from "../image/recEmailIcon.svg";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function Guestregister() {
  let [submit, setSubmit] = useState(false);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      recoveryEmail: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email()
        .required("email is required")
        .strict(true)
        .trim("no space is allowed"),
      password: yup
        .string()
        .required("this field is required")
        .min(8, "password should be more than 8 letters")
        .max(15, "password should be less than 15 letters ")
        .strict(true)
        .trim("no space is required"),
      fullName: yup
        .string()
        .required("this field is required")
        .min(3, "length of the name should be more than 3 letters")
        .max(30, "length of the name should by less than 30 letters"),
      aboutInterest: yup.string().required("you should mention your interest"),
      recoveryEmail: yup
        .string()
        .email()
        .notOneOf(
          [yup.ref("email"), null],
          "recovery email should be differ from email"
        )
        .required("recovery email should be required"),
    }),
    onSubmit: (data) => {
      setSubmit(true);
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + "/register/attendeeRegister",
          data
        )
        .then((res) => {
          toast.success(res.data);
          setstateValue(3)
          // navigate("/");
        })
        .catch((err) => {
          setSubmit(false);
          toast.error(err.response.data);
        });
    },
  });

  const [stateValue, setstateValue] = useState(0);

  const handleNextBtn = () => {
    if (
      formik.values.fullName === "" &&
      formik.values.email === "" &&
      formik.values.password === ""
    ) {
      toast.error("All fields are required");
      console.log(formik.values);
    } else {
      setstateValue(1);
      console.log(formik.values);
    }
  };

  const handleArrowBtn = () => {
    if (formik.values.recoveryEmail === "") {
      toast.error("Recovery email is required");
      console.log(formik.values);
    } else {
      setstateValue(2);
      console.log(formik.values);
    }
  };

  return (
    <div className="w-full h-screen sm:p-10">
      <div className=" w-full h-full flex bg-white lg:rounded-br-[30px] ">
        <div className=" w-fit h-full hidden lg:block">
          <div class="text-green-400 text-[26px] pl-16 font-semibold font-['Montserrat']">
            Lateform.
          </div>
          <img src={reg} className=" w-full h-full object-cover" />
        </div>

        {stateValue === 0 && (
          <div
            className="overflow-auto grow flex flex-col  justify-center items-center  md:px-10 "
          >
            <div className=" flex flex-col justify-center items-center space-y-5">
              <h1 className="text-center text-green-400 md:text-2xl xl:text-3xl font-semibold font-['Montserrat']">
                Welcome to LateForm.
              </h1>
              <div className="w-[142px] h-[5px] relative">
                <div class="w-[30px] h-[5px] left-0 top-0 absolute bg-green-400 rounded-[5px]"></div>
                <div class="w-[30px] h-[5px] left-[40px] top-0 absolute bg-slate-300 rounded-[5px]"></div>
                <div class="w-[30px] h-[5px] left-[76px] top-0 absolute bg-slate-300 rounded-[5px]"></div>
                <div class="w-[30px] h-[5px] left-[112px] top-0 absolute bg-slate-300 rounded-[5px]"></div>
              </div>
            </div>

            <div className="  w-fit xl:w-[400px]  h-fit  py-4 px-8 mt-3 bg-slte-500 rounded-lg shadow">
              <div className="flex flex-col space-y-8 justify-center items-center ">
                <div className="text-center text-black text-[18px] font-normal font-['Montserrat'] ">
                  Fill the details to Sign Up for attendee!
                </div>

                <div className=" w-full ">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full  pl-2 h-12 bg-white rounded-[5px] border-2 "
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.fullName ? (
                    <p className="text-danger">{formik.errors.fullName}</p>
                  ) : null}
                </div>

                <div className=" w-full ">
                  <input
                    type="email"
                    placeholder="Email*"
                    className=" w-full  pl-2 h-12 bg-white rounded-[5px] border-2 "
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? (
                    <p className="text-danger">{formik.errors.email}</p>
                  ) : null}
                </div>

                <div className=" w-full ">
                  <input
                    type="password"
                    placeholder="Password*"
                    className=" w-full  pl-2 h-12 bg-white rounded-[5px] border-2 "
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password ? (
                    <p className="text-danger">{formik.errors.password}</p>
                  ) : null}
                </div>
                
                {submit === false ? (
                  <button className=" w-full  rounded-[5px] p-2 bg-green-400 hover:bg-green-500 text-white" onClick={handleNextBtn}>
                    Next
                  </button>
                ) : (
                  <button className=" w-full  rounded-[5px] p-2 bg-green-400 hover:bg-green-500 text-white">
                    loading...
                  </button>
                )}

                <Link
                  to="/organizerLogin"
                  className="text-stone-500 text-[16px] font-medium font-['Montserrat'] "
                >
                  Already have an account?
                  <span className="text-green-400 text-[16px] font-medium font-['Montserrat'] ">
                    Log In
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {stateValue === 1 && (
          <div
            className="overflow-auto grow flex flex-col  justify-center items-center  md:px-10 "
          >
            <div className=" flex flex-col justify-center items-center space-y-5">
              <h1 className="text-center text-green-400 text-3xl font-semibold font-['Montserrat']">
                Welcome to LateForm.
              </h1>
              <div className="w-[142px] h-[5px] relative">
                <div className="w-[30px] h-[5px] left-0 top-0 absolute bg-lime-700 rounded-[5px]"></div>
                <div className="w-[30px] h-[5px] left-[40px] top-0 absolute bg-green-400 rounded-[5px]"></div>
                <div className="w-[30px] h-[5px] left-[76px] top-0 absolute bg-slate-300 rounded-[5px]"></div>
                <div className="w-[30px] h-[5px] left-[112px] top-0 absolute bg-slate-300 rounded-[5px]"></div>
              </div>
              <div className="text-center text-black text-[18px] font-normal font-['Montserrat'] ">
                Let us get to know you better!
              </div>
            </div>

            <div className="  w-fit xl:w-[400px]  h-fit  py-4 px-8 mt-3 bg-slte-500 rounded-lg shadow">
              <div class="w-[42px] h-[41px] mb-4 relative">
                <div class="w-[42px] h-[41px] left-0 top-0 absolute bg-stone-100 rounded-md shadow-md"></div>
                <div class="w-8 h-[30px] left-[5px] top-[6px] absolute">
                  <img src={recIcon} alt="no img" />
                </div>
              </div>
              <div className="text-black text-base font-medium font-['Montserrat'] mb-4">
                Set your recovery number.
              </div>
              <div className="flex flex-col space-y-8 justify-center items-center ">
                <div className=" w-full lg:w-fit ">
                  <input
                    type="email"
                    placeholder="recovery email"
                    className=" w-full xl:w-[300px] pl-2 h-12 bg-white rounded-[5px] border-2 "
                    name="recoveryEmail"
                    value={formik.values.recoveryEmail}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.recoveryEmail ? (
                    <p className="text-danger">{formik.errors.recoveryEmail}</p>
                  ) : null}
                </div>
                <button className="w-9 h-[35px] relative animate-pulse cursor-pointer" onClick={handleArrowBtn} >
                  <div className="w-9 h-[35px] left-0 top-0 absolute bg-stone-100 rounded-full"></div>
                  <div className="w-[30px] h-[30px] left-[5px] top-[3px] absolute">
                    <img src={reg2} alt="no img" />
                  </div>
                </button>
                <Link
                  to="/organizerLogin"
                  className="text-stone-500 text-[16px] font-medium font-['Montserrat'] "
                >
                  Already have an account?
                  <span className="text-green-400 text-[16px] font-medium font-['Montserrat'] ">
                    Log In
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {stateValue === 2 && (
          <form
            className="overflow-auto grow flex flex-col  justify-center items-center  md:px-10 "
            onSubmit={formik.handleSubmit}
          >
            <div className=" flex flex-col justify-center items-center space-y-5">
              <h1 className="text-center text-green-400 text-3xl font-semibold font-['Montserrat']">
                Welcome to LateForm.
              </h1>
              <div className="w-[142px] h-[5px] relative">
                <div className="w-[30px] h-[5px] left-0 top-0 absolute bg-lime-700 rounded-[5px]"></div>
                <div className="w-[30px] h-[5px] left-[40px] top-0 absolute bg-lime-700 rounded-[5px]"></div>
                <div className="w-[30px] h-[5px] left-[76px] top-0 absolute bg-green-400 rounded-[5px]"></div>
                <div className="w-[30px] h-[5px] left-[112px] top-0 absolute bg-slate-300 rounded-[5px]"></div>
              </div>
              <div className="text-center text-black text-[18px] font-normal font-['Montserrat'] ">
                Let us get to know you better!
              </div>
            </div>

            <div className="  w-fit xl:w-[400px]  h-fit  py-4 px-8 mt-3 bg-slte-500 rounded-lg shadow">
              <div className="flex flex-col space-y-8 justify-center items-center ">
                <div className=" w-full lg:w-fit">
                  <label className="flex items-center text-[#434343]">
                    What interests you more?
                  </label>
                  <input
                    type="text"
                    placeholder="I am interested in ..."
                    className=" w-full xl:w-[300px] pl-2 h-12 bg-white rounded-[5px] border-2 "
                    name="aboutInterest"
                    value={formik.values.aboutInterest}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.aboutInterest ? (
                    <p className="text-danger">{formik.errors.aboutInterest}</p>
                  ) : null}
                </div>

                {submit === false ? (
                  <button className=" w-fit lg:w-[300px] rounded-[5px] p-2 bg-green-400 hover:bg-green-500 text-white">
                    Submit
                  </button>
                ) : (
                  <button className=" w-fit lg:w-[300px] rounded-[5px] p-2 bg-green-400 hover:bg-green-500 text-white">
                    loading...
                  </button>
                )}
              </div>
            </div>
          </form>
        )}

        {stateValue === 3 && (
          <div
            className=" w-fit h-full overflow-auto grow flex flex-col  justify-center items-center "
          >
            <div className=" flex flex-col justify-center items-center space-y-5 mb-4">
              <h1 className="text-center text-green-400 text-3xl font-semibold font-['Montserrat']">
                Welcome to LateForm.
              </h1>
              <div class="w-[142px] h-[5px] relative">
                <div class="w-[30px] h-[5px] left-0 top-0 absolute bg-lime-700 rounded-[5px]"></div>
                <div class="w-[30px] h-[5px] left-[40px] top-0 absolute bg-lime-700 rounded-[5px]"></div>
                <div class="w-[30px] h-[5px] left-[76px] top-0 absolute bg-lime-700 rounded-[5px]"></div>
                <div class="w-[30px] h-[5px] left-[112px] top-0 absolute bg-green-400 rounded-[5px]"></div>
              </div>
            </div>

            <div className="  w-fit xl:w-[400px]  h-fit  py-4 px-8 mt-3 bg-slte-500 rounded-lg shadow">
              <div className="space-y-4">
                <div class="w-[42px] h-[41px] relative">
                  <div class="w-[42px] h-[41px] left-0 top-0 absolute bg-zinc-100 rounded-md shadow-md"></div>
                  <div class="w-6 h-6 left-[9px] top-[9px] absolute">
                    <img src={reg3} alt="no img" />
                  </div>
                </div>

                <div className="text-green-400 text-[28px] font-bold font-['Calibri'] tracking-wider">
                  All done!
                </div>
                <div className="text-zinc-500 text-base font-normal font-['Arial']">
                  Your account has been created. Would you like to login?
                </div>

                <button className=" w-full rounded-[5px] p-2 bg-green-400 hover:bg-green-600" onClick={()=> navigate("/")}>
                  <span className="text-base font-bold font-['Montserrat'] leading-7 text-white ">
                    Login
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
export default Guestregister;
