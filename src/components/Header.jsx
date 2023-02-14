import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div className="flex">
          <img
            src="data:image/png;base64,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"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="font-bold tracking-wider">Pata Hostel</h1>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-[#17202A]"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-black border-b-[#17202A]"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "text-black border-b-[#17202A]"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
