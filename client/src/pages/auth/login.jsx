import AuthForm from "@/components/Common/CommonForm";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        Swal.fire({
          title: "Welcome to Whimsy",
          imageUrl:
            "http://res.cloudinary.com/dwrhqimh9/image/upload/v1737358260/kb90vz3s5qqqdcx4tuzi.jpg",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "whimsy bags logo",
        });
      } else {
        Swal.fire({
          title: "Login Failed!",
          text:
            data?.payload?.message || "Something went wrong, please try again.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome to Whimsy
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            to="/auth/register"
            className="font-medium text-primary ml-2 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
      <AuthForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      ></AuthForm>
    </div>
  );
};

export default AuthLogin;
