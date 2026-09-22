//@ts-nocheck
import React, { useState } from "react";
import "./navprofile.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authHandle } from "../../features/auth/authService.js";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAuth, removeAuth } from "../../features/auth/authSlice.ts";
import { removeUser } from "../../features/user/userSlice.js";
import type { RootState } from "../../app/store.ts"
import { Skeleton } from "../ui/skeleton.tsx";
import { pickAvatar } from "@/utils/avatarHandle.ts";

export default function NavProfile() {
  const [accountDiv, setAccountDiv] = useState(false);
  const isAuth = useSelector((state: RootState) => state.userAuth.status);
  const authInfo = useSelector((state: RootState) => state.userAuth.authInfo);
  const loading = useSelector((state: RootState) => state.userAuth.loading);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    authHandle
      .logoutService()
      .then((data) => {
        dispatch(removeAuth());
        dispatch(removeUser());
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className="main-h-ur-p"
      onClick={() => {
        accountDiv ? setAccountDiv(false) : setAccountDiv(true);
      }}
    >
      <div className="header-user-profile">
        {isAuth === "authenticated" && authInfo ? (
          <>
            <img src={pickAvatar(authInfo.picture)} alt="user profile" />
            <div className="header-username">
              <strong>{authInfo?.name}</strong>
              {authInfo?.trainer ? <small>Certified Trainer</small> : <small>Normal User</small>}

            </div>
          </>
        ) : (
          <img
            src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"
            alt="default profile"
          />
        )}
      </div>
      {accountDiv && !loading && (
        <div className="header-s-account">
          <ul>
            <li>
              <Link to="/">My Account</Link>
            </li>
            {isAuth === "authenticated" && (
              <li>
                <Link to="/account">Profile</Link>
              </li>
            )}
            <li>
              <Link to="/settings/general">Settings</Link>
            </li>
            {isAuth === "authenticated" ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      )}
      {accountDiv && loading &&(
        <div className="header-s-account">
          <ul>
            <li>
              <Skeleton className=" w-full h-4 bg-gray-500 dark:bg-gray-700 m-1"/>
            </li>
            <li>
              <Skeleton className=" w-full h-4 bg-gray-500 dark:bg-gray-700 m-1"/>
            </li>
            <li>
              <Skeleton className=" w-full h-4 bg-gray-500 dark:bg-gray-700 m-1"/>
            </li>
            <li>
              <Skeleton className=" w-full h-4 bg-gray-500 dark:bg-gray-700 m-1"/>
            </li>
            <li>
              <Skeleton className=" w-full h-4 bg-gray-500 dark:bg-gray-700 m-1"/>
            </li>
            <li>
              <Skeleton className=" w-full h-4 bg-gray-500 dark:bg-gray-700 m-1"/>
            </li>
            <li>
              <Skeleton className=" w-full h-4 bg-gray-500 dark:bg-gray-700 m-1"/>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
