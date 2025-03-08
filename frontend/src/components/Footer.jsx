import React from "react";
import bidsvg from "../assets/svg/bid.svg";
// import profilesvg from "../assets/svg/profile.svg";
import homesvg from "../assets/svg/home.svg";
import searchsvg from "../assets/svg/search.svg";
import { Link, NavLink } from "react-router";
export default function Footer() {
  return (
    <footer className="w-screen h-[50px] fixed bottom-0 py-2  shadow-[0_0_10px_rgba(0,0,0,0.5)] bg-white ">
      <ul className="w-full flex flex-row justify-evenly">
        <li className=" flex flex-col justify-center items-center ">
          <NavLink
            to="/"
            className=" flex flex-col justify-center items-center text-sm font-extralight "
          >
            {({ isActive, isPending, isTransitioning }) => (
              <>
                <Homeicon isactive={isActive} />
                <p className={isActive?"text-black font-normal ":"text-[#9CA3AF]"} >Home</p>{" "}
              </>
            )}
          </NavLink>
        </li>
        <li className=" flex flex-col justify-center items-center ">
          <NavLink
            to="/marketspace/listings"
            className=" flex flex-col justify-center items-center text-sm font-extralight "
          >
            {({ isActive, isPending, isTransitioning }) => (
              <>
                <Listingicon isactive={isActive} />
                <p className={isActive?"text-black font-normal ":"text-[#9CA3AF]"} >Listings</p>
              </>
            )}
          </NavLink>
        </li>
        <li className=" flex flex-col justify-center items-center ">
          <NavLink
            to="/dashboard/bids"
            className=" flex flex-col justify-center items-center text-sm font-extralight "
          >
            {({ isActive, isPending, isTransitioning }) => (
              <>
                <Bidicon isactive={isActive} />
                <p className={isActive?"text-black font-normal ":"text-[#9CA3AF]"} >Bids</p>{" "}
              </>
            )}
          </NavLink>
        </li>
        <li className=" flex flex-col justify-center items-center ">
          <NavLink
            className=" flex flex-col justify-center items-center text-sm font-extralight"
            to={"/profile"}
          >
            {({ isActive, isPending, isTransitioning }) => (
              <>
                <Profileicon isactive={isActive} />
                <p className={isActive?"text-black font-normal ":"text-[#9CA3AF]"} >Profile</p>{" "}
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </footer>
  );
}

export function Profileicon({ isactive = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="12.25"
      height="14"
      viewBox="0 0 12.25 14"
    >
      <defs>
        <clipPath id="master_svg0_34_5388">
          <rect x="0" y="0" width="12.25" height="14" rx="0" />
        </clipPath>
      </defs>
      <g clipPath="url(#master_svg0_34_5388)">
        <g transform="matrix(1,0,0,-1,0,28.6015625)">
          <g>
            <path
              d="M6.125,21.30078125Q7.08203,21.30078125,7.875,21.76562125Q8.66797,22.23047125,9.16016,23.05078125Q9.625,23.87109125,9.625,24.80078125Q9.625,25.73048125,9.16016,26.55078125Q8.66797,27.37108125,7.875,27.83598125Q7.08203,28.30078125,6.125,28.30078125Q5.16797,28.30078125,4.375,27.83598125Q3.58203,27.37108125,3.08984,26.55078125Q2.625,25.73048125,2.625,24.80078125Q2.625,23.87109125,3.08984,23.05078125Q3.58203,22.23047125,4.375,21.76562125Q5.16797,21.30078125,6.125,21.30078125ZM4.86719,19.98828125Q2.81641,19.93359125,1.42188,18.56640125Q0.0546875,17.17187125,0,15.12109325Q0,14.76562525,0.246094,14.54687525Q0.464844,14.30078125,0.820312,14.30078125L11.4297,14.30078125Q11.7852,14.30078125,12.0039,14.54687525Q12.25,14.76562525,12.25,15.12109325Q12.1953,17.17187125,10.8281,18.56640125Q9.43359,19.93359125,7.38281,19.98828125L4.86719,19.98828125Z"
              fill={isactive ? "#000" : "#9CA3AF"}
              fillOpacity="1"
              // style={"mix-blend-mode:passthrough"}
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
export function Listingicon({ isactive = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="14"
      height="14"
      viewBox="0 0 14 14"
    >
      <defs>
        <clipPath id="master_svg0_34_5379">
          <rect x="0" y="0" width="14" height="14" rx="0" />
        </clipPath>
      </defs>
      <g clip-path="url(#master_svg0_34_5379)">
        <g transform="matrix(1,0,0,-1,0,28.6015625)">
          <g>
            <path
              d="M11.375,22.61328125Q11.3477,20.69922125,10.2812,19.25000125L13.7539,15.80469125Q14,15.53125125,14,15.17578125Q14,14.82031225,13.7539,14.54687525Q13.4805,14.30078125,13.125,14.30078125Q12.7695,14.30078125,12.4961,14.54687525L9.05078,18.01953125Q7.60156,16.95312125,5.6875,16.92578125Q3.28125,16.98047125,1.66797,18.59375125Q0.0546875,20.20703125,0,22.61328125Q0.0546875,25.01958125,1.66797,26.63278125Q3.28125,28.24608125,5.6875,28.30078125Q8.09375,28.24608125,9.70703,26.63278125Q11.3203,25.01958125,11.375,22.61328125ZM5.6875,18.67578125Q6.75391,18.67578125,7.65625,19.19531125Q8.55859,19.71484125,9.10547,20.64453125Q9.625,21.57422125,9.625,22.61328125Q9.625,23.65234125,9.10547,24.58198125Q8.55859,25.511681250000002,7.65625,26.03128125Q6.75391,26.55078125,5.6875,26.55078125Q4.62109,26.55078125,3.71875,26.03128125Q2.81641,25.511681250000002,2.26953,24.58198125Q1.75,23.65234125,1.75,22.61328125Q1.75,21.57422125,2.26953,20.64453125Q2.81641,19.71484125,3.71875,19.19531125Q4.62109,18.67578125,5.6875,18.67578125Z"
              fill={isactive ? "#000" : "#9CA3AF"}
              fillOpacity="1"
              // style="mix-blend-mode:passthrough"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
export function Bidicon({ isactive = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="14"
      height="14"
      viewBox="0 0 14 14"
    >
      <g transform="matrix(1,0,0,-1,0,28)">
        <path
          d="M8.72266,27.7539Q8.44922,28,8.09375,28Q7.73828,28,7.46484,27.7539L4.18359,24.4727Q3.9375,24.199199999999998,3.9375,23.84375Q3.9375,23.48828,4.18359,23.214840000000002L4.62109,22.777340000000002Q4.89453,22.53125,5.25,22.53125Q5.60547,22.53125,5.87891,22.777340000000002L5.98828,22.88672L8.88672,19.98828L8.77734,19.87891Q8.53125,19.60547,8.53125,19.25Q8.53125,18.89453,8.77734,18.62109L9.21484,18.18359Q9.48828,17.9375,9.84375,17.9375Q10.1992,17.9375,10.4727,18.18359L13.7539,21.46484Q14,21.73828,14,22.09375Q14,22.44922,13.7539,22.722659999999998L13.3164,23.160159999999998Q13.043,23.40625,12.6875,23.40625Q12.332,23.40625,12.0586,23.160159999999998L11.9492,23.05078L9.05078,25.949199999999998L9.16016,26.0586Q9.40625,26.332,9.40625,26.6875Q9.40625,27.043,9.16016,27.3164L8.72266,27.7539ZM4.56641,19.87891Q4.29297,20.125,3.9375,20.125Q3.58203,20.125,3.30859,19.87891L0.246094,16.81641Q0,16.54297,0,16.1875Q0,15.83203,0.246094,15.55859L1.55859,14.246094Q1.83203,14,2.1875,14Q2.54297,14,2.81641,14.246094L5.87891,17.30859Q6.125,17.58203,6.125,17.9375Q6.125,18.29297,5.87891,18.56641L5.82422,18.59375L7.4375,20.20703L6.20703,21.4375L4.59375,19.82422L4.56641,19.87891Z"
          fill={isactive ? "#000" : "#9CA3AF"}
          fillOpacity="1"
          // style="mix-blend-mode:passthrough"
        />
      </g>
    </svg>
  );
}
export function Homeicon({ isactive = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="15.75"
      height="14"
      viewBox="0 0 15.75 14"
    >
      <defs>
        <clipPath id="master_svg0_34_5416">
          <rect x="0" y="0" width="15.75" height="14" rx="0" />
        </clipPath>
      </defs>
      <g clip-path="url(#master_svg0_34_5416)">
        <g transform="matrix(1,0,0,-1,0,28.6015625)">
          <g>
            <path
              d="M15.7227,21.30078125Q15.6954,20.94531125,15.4497,20.69922125Q15.2041,20.45312125,14.8492,20.42578125L13.9757,20.42578125L14.003,16.05078125Q13.9757,15.94141125,13.9757,15.83203125L13.9757,15.39453125Q13.9757,14.92968725,13.6482,14.62890625Q13.3479,14.30078125,12.8839,14.30078125L12.4471,14.30078125Q12.3925,14.30078125,12.3653,14.30078125Q12.3107,14.30078125,12.2561,14.30078125L11.3553,14.30078125L10.7002,14.30078125Q10.2361,14.30078125,9.93587,14.62890625Q9.60832,14.92968725,9.60832,15.39453125L9.60832,16.05078125L9.60832,17.80078125Q9.60832,18.18359125,9.36265,18.42969125Q9.11698,18.67578125,8.73484,18.67578125L6.98787,18.67578125Q6.60572,18.67578125,6.36005,18.42969125Q6.11438,18.18359125,6.11438,17.80078125L6.11438,16.05078125L6.11438,15.39453125Q6.11438,14.92968725,5.78683,14.62890625Q5.48657,14.30078125,5.02253,14.30078125L4.36742,14.30078125L3.49393,14.30078125Q3.46664,14.30078125,3.43934,14.30078125Q3.41205,14.30078125,3.38475,14.30078125Q3.33016,14.30078125,3.27556,14.30078125L2.83882,14.30078125Q2.37478,14.30078125,2.07452,14.62890625Q1.74697,14.92968725,1.74697,15.39453125L1.74697,18.45703125Q1.74697,18.48437125,1.74697,18.53906125L1.74697,20.42578125L0.873484,20.42578125Q0.491334,20.45312125,0.245667,20.69922125Q0,20.94531125,0,21.32812125Q0,21.68359125,0.272964,21.98437125L7.26083,28.08208125Q7.56109,28.32808125,7.86135,28.30078125Q8.18891,28.30078125,8.43458,28.10938125L15.4224,21.95703125Q15.75,21.68359125,15.7227,21.30078125Z"
              fill={isactive ? "#000" : "#9CA3AF"}
              fillOpacity="1"
              // style="mix-blend-mode:passthrough"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
