import { useState } from "react";
import { InfoCircle } from "react-bootstrap-icons";
// import Speaker from '../image/home.webp'
import img1 from "../image/LoginPageImage1.svg";
import logo from "../image/Logo.svg";
import Clogin from "./Clogin";
import Glogin from "./Glogin";

function Home() {
  let [isHoster, setHoster] = useState(false);

  return (
    // <div className="container-fluid">
    //   <div className="row">
    //     {/* img */}
    //     <div className="col-lg-4 d-none d-lg-block">
    //       <div className="home-div">
    //         <img src={img1} className="home-img" />
    //       </div>
    //     </div>
    //     {/* form */}
    //     <div className="col-lg-8 col-12 p-5">
    //       <div className="mt-5">
    //         <p className="fs-4 text-secondary text-wrap">
    //           {/* <b className="text-primary fs-2">Lateform.</b>- Connecting you to
    //           unforgettable experiences. */}
    //         </p>
    //         <div>
    //           <ul className="nav nav-tabs">
    //             <li className="nav-item">
    //               <span
    //                 className={
    //                   isHoster === false ? "nav-link active" : "nav-link"
    //                 }
    //                 type="button"
    //                 onClick={() => {
    //                   setHoster(false);
    //                 }}
    //               >
    //                 Attendee
    //               </span>
    //             </li>
    //             <li className="nav-item">
    //               <span
    //                 className={
    //                   isHoster === false ? "nav-link" : "nav-link active"
    //                 }
    //                 type="button"
    //                 onClick={() => {
    //                   setHoster(true);
    //                 }}
    //               >
    //                 Hoster
    //               </span>
    //             </li>
    //           </ul>
    //           {/* tab form */}
    //           <div>{isHoster === false ? <Glogin /> : <Clogin />}</div>
    //         </div>
    //       </div>
    //     </div>

    //   </div>
    // </div>

    <div>
      <div class="text-green-400 text-[26px] pl-16 pt-8 font-semibold font-['Montserrat'] leading-[46.80px]">
        Lateform.
      </div>
      <div className=" flex">

        <div className=" w-full hidden lg:block">
          <img src={img1} className=" w-2/3 h-full " />
        </div>

        <div className=" bg-white w-full flex flex-col justify-center items-center lg:rounded-br-[30px] rounded-lg lg:rounded-none">
          <div className=" flex flex-col justify-center items-center space-y-3">
            <div className="text-center">
              <span className="text-green-400 text-[40px] font-normal font-['Montserrat']">
                Hi
              </span>
              <span className="text-green-400 text-[40px] font-semibold font-['Montserrat']">
                , Welcome back!
              </span>
            </div>
            <div class="w-[504px] h-[58px] text-black text-base font-normal font-['Montserrat'] leading-7">
              Log in to embark on your learning journey and join a vibrant
              community of curious minds!
            </div>
          </div>

          <div className=" mt-4">
            <ul className=" flex space-x-2">
              <li className="">
                <span
                  className={
                    isHoster === false
                      ? "px-2 pt-2 text-green-400 font-bold border-b-4 border-green-400 rounded"
                      : "p-2 text-slate-300 text-base font-semibold font-['Montserrat'] tracking-wide "
                  }
                  type="button"
                  onClick={() => {
                    setHoster(false);
                  }}
                >
                  Attendee
                </span>
              </li>
              <li className="">
                <span
                  className={
                    isHoster === false
                      ? "p-2 text-slate-300 text-base font-semibold font-['Montserrat'] tracking-wide"
                      : "px-2 pt-2 text-green-400 font-bold border-b-4 border-green-400 rounded"
                  }
                  type="button"
                  onClick={() => {
                    setHoster(true);
                  }}
                >
                  Hoster
                </span>
              </li>
            </ul>
            {/* tab form */}

            <div>{isHoster === false ? <Glogin /> : <Clogin />}</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
