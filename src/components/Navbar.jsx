import React, { useEffect, useState } from "react";
import { FaPlus, FaReddit, FaUser } from "react-icons/fa";
import "../styles/Navbar.css";
import { SignInButton, UserButton, useUser, useAuth } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, isLoading } = useConvexAuth(); // Convex auth
  const { isSignedIn, user } = useUser(); // Clerk auth
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Auth state changed:", { isSignedIn, user, isAuthenticated });
  //   // const fetchToken = async () => {
  //   //   // const token = getToken({ template: "convex" });
  //   //   // console.log(token);

  //   //   console.log(user, user.id);

  //   //   const { getToken } = useAuth();
  //   //   console.log(getToken({ template: "convex" }));
  //   // };
  //   // fetchToken();
  // });

  return (
    <nav className="navbar text-black">
      <div className="navbar-content">
        <Link to="/" className="logo-link">
          <div className="logo-container">
            <FaReddit className="reddit-icon" />
            <span className="site-name">Reddit</span>
          </div>
        </Link>

        <SearchBar />

        <div className="nav-actions">
          <Unauthenticated>
            <SignInButton mode="modal">
              <button className="sign-in-button">Sign In</button>
            </SignInButton>
          </Unauthenticated>
          <Authenticated>
            <div className="dropdown-container">
              <button className="icon-button" onClick={() => setShow(true)}>
                <FaPlus />
              </button>
              {show && (
                <Dropdown isOpen={show} onClose={() => setShow(false)} />
              )}
            </div>
            <button
              className="icon-button"
              onClick={() => user?.username && navigate(`/u/${user.username}`)}
              title="View Profile"
            >
              <FaUser />
            </button>
            <UserButton />
          </Authenticated>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
