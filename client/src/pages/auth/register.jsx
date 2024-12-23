import AuthForm from "@/components/Common/AuthForm";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    console.log("res");

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        Swal.fire({
          title: "<h1 style='color: #4CAF50'>Registration Successful</h1>",
          text: "Registration Successful, Welcome to Whimsy",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#4caf50",
        }).then(() => {
          navigate("/auth/login");
        });
      } else {
        Swal.fire({
          title: "Registration Failed!",
          text:
            data?.payload?.message || "Something went wrong, please try again.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
      console.log(data);
    });
  }
  console.log(formData);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            to="/auth/login"
            className="font-medium text-primary ml-2 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <AuthForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      ></AuthForm>
    </div>
  );
};

export default AuthRegister;
