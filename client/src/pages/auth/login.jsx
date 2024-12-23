import AuthForm from "@/components/Common/AuthForm";
import { loginFormControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function onSubmit() {}

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);

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
