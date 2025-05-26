"use client";

import { login, register, UserResponse } from "@/API";
import { User } from "@/types";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";

export const CreateProfile = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [authorizedUser, setAuthorizedUser] = useState<UserResponse | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const rawData = window.localStorage.getItem("userData");
    if (rawData) {
      setAuthorizedUser(JSON.parse(rawData) as UserResponse);
    }
  }, []);

  const handleRegister = async (userData: User & { password: string }) => {
    setIsLoading(true);
    try {
      const { data } = await register(userData);
      window.localStorage.setItem("userData", JSON.stringify(data));
      window.location.reload();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (loginData: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const { data } = await login(loginData);
      window.localStorage.setItem("userData", JSON.stringify(data));
      window.location.reload();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return authorizedUser ? (
    <div className="max-w-7xl m-auto p-8 pt-12">
      <h3>Hey, {authorizedUser.user.name}. You are authorized</h3>
    </div>
  ) : (
    <section className="max-w-7xl m-auto p-8 pt-12">
      <div className="flex gap-14 mb-4">
        <button
          onClick={() => setIsLogin(false)}
          className="border p-4 rounded-xl w-40 text-blue-700 focus:bg-blue-300 focus:text-blue-950"
        >
          Register
        </button>
        <button
          onClick={() => setIsLogin(true)}
          className="border p-4 rounded-xl w-40 text-blue-700 focus:bg-blue-300 focus:text-blue-950"
        >
          Login
        </button>
      </div>
      {isLogin ? (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleLogin}
        >
          <Form className="flex flex-col gap-2">
            <label htmlFor="firstName">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              className="border-2 border-sky-700 rounded-xl p-2 w-96"
            />
            <label htmlFor="firstName">Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              className="border-2 border-sky-700 rounded-xl p-2 w-96"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-96 border-2 rounded-xl bg-sky-200 hover:bg-sky-300 border-sky-700 mt-4 p-4 text-blue-600 hover:text-blue-800 transition duration-600 ease-in"
            >
              Log in
            </button>
            <p className="text-red-500">{error}</p>
          </Form>
        </Formik>
      ) : (
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            desiredJobTitle: "",
            aboutMe: "",
          }}
          onSubmit={handleRegister}
        >
          <Form className="flex flex-col gap-2">
            <label htmlFor="firstName">Name</label>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className="border-2 border-sky-700 rounded-xl p-2 w-96"
            />
            <label htmlFor="firstName">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              className="border-2 border-sky-700 rounded-xl p-2 w-96"
            />
            <label htmlFor="firstName">Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              className="border-2 border-sky-700 rounded-xl p-2 w-96"
            />
            <label htmlFor="firstName">Desired Job Title</label>
            <Field
              type="text"
              name="desiredJobTitle"
              placeholder="Desired Job Title"
              className="border-2 border-sky-700 rounded-xl p-2 w-96"
            />
            <label htmlFor="firstName">About me</label>
            <Field
              type="textarea"
              name="aboutMe"
              placeholder="About Me"
              className="border-2 border-sky-700 rounded-xl p-2 w-96"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-96 border-2 rounded-xl bg-sky-200 hover:bg-sky-300 border-sky-700 mt-4 p-4 text-blue-600 hover:text-blue-800 transition duration-600 ease-in"
            >
              Register
            </button>
            <p className="text-red-500">{error}</p>
          </Form>
        </Formik>
      )}
    </section>
  );
};
