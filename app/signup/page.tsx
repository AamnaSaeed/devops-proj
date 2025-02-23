"use client";

// React
import React, { useState, useRef } from "react";

// Next JS
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dependencies
import { toast } from "react-toastify";

// Icons
import { RiErrorWarningLine } from "react-icons/ri";

const SignUp = () => {
  // ------------ //
  //  INTERFACES  //
  // ------------ //
  interface FormData {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    reenterPassword: string;
  }

  // ------- //
  //  HOOKS  //
  // ------- //
  const router = useRouter();

  // ------ //
  //  REFS  //
  // ------ //
  const formRef = useRef<HTMLFormElement>(null);

  // -------- //
  //  STATES  //
  // -------- //
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    reenterPassword: "",
  });

  // Only activates once the form is submitted once
  const [isFormTriggered, setIsFormTriggered] = useState(false);
  const [samePasswords, setSamePasswords] = useState(true);

  const [isName, setIsName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isReenterPassword, setIsReenterPassword] = useState(true);

  const [existingEmail, setExistingEmail] = useState(false);
  const [existingPhoneNumber, setExistingPhoneNumber] = useState(false);

  // ---------- //
  //  Handlers  //
  // ---------- //
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Updates the specific field in the form data
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // Check if all the fields are present
    if (!isName && name === "name") setIsName(true);
    if (!isEmail && name === "email") setIsEmail(true);
    if (!isPhoneNumber && name === "phoneNumber") setIsPhoneNumber(true);
    if (!isPassword && name === "password") setIsPassword(true);
    if (!isReenterPassword && name === "reenterPassword") setIsReenterPassword(true);

    // Check if the passwords match
    if (isFormTriggered && (name === "password" || name === "reenterPassword")) {
      let arePasswordsSame = false;

      if (name === "password") arePasswordsSame = value === formData.reenterPassword;
      else if (name === "reenterPassword") arePasswordsSame = formData.password === value;

      setSamePasswords(arePasswordsSame);
    }

    // Check if the email or phone number were already existing
    if (existingEmail) setExistingEmail(false);
    if (existingPhoneNumber) setExistingPhoneNumber(false);
  };

  const handleFormSubmit = async () => {
    if (!formRef.current) return;
    setIsFormTriggered(true);

    console.log("Form Data:", formData);

    // Check if all the fields are present
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password || !formData.reenterPassword) {
      if (!formData.name) setIsName(false);
      else if (!formData.email) setIsEmail(false);
      else if (!formData.phoneNumber) setIsPhoneNumber(false);
      else if (!formData.password) setIsPassword(false);
      else if (!formData.reenterPassword) setIsReenterPassword(false);

      return;
    }

    // Check if the passwords match
    if (formData.password !== formData.reenterPassword) {
      setSamePasswords(false);
      return;
    }

    formRef.current.reset();

    // Now, hit a backend request to sign up the user
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData?.message === "Existing email.") setExistingEmail(true);
        else if (errorData?.message === "Existing phone number.") setExistingPhoneNumber(true);

        // toast.error(errorData?.message || "Something went wrong. Please try again.");
        return;
      }

      toast.success("Account created successfully!");

      // Redirect the user to the home page now
      router.push("/");
    } catch (error: unknown) {
      console.error("Form Submission Error:", error instanceof Error ? error.message : error);
      toast.error("An unknown error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col gap-[2rem] items-center justify-center h-[100vh]">
      <h1 className="text-4xl font-semibold text-neutral-800 mt-[12rem]">Create an account</h1>

      <Form ref={formRef} action={handleFormSubmit} className="flex flex-col gap-[1rem] w-[25vw] justify-center items-center">
        {/* Name Input */}
        <input name="name" type="text" className={`rounded-md px-4 py-3 border-[1px] ${isName ? "border-neutral-300 focus:border-[#10a37f]" : "border-red-500"} focus:outline-none w-full`} placeholder="Full Name" value={formData.name} onChange={handleInputChange} />

        {!isName && (
          <span className="flex flex-row gap-1 justify-center items-center text-red-500 text-sm font-light">
            <RiErrorWarningLine className="text-lg" />
            Please provide a name.
          </span>
        )}

        {/* Email Input */}
        <input name="email" type="email" className={`rounded-md px-4 py-3 border-[1px] ${isEmail && !existingEmail ? "border-neutral-300 focus:border-[#10a37f]" : "border-red-500"} focus:outline-none w-full`} placeholder="Email Address" value={formData.email} onChange={handleInputChange} />

        {(!isEmail || existingEmail) && (
          <span className="flex flex-row gap-1 justify-center items-center text-red-500 text-sm font-light">
            <RiErrorWarningLine className="text-lg" />
            {!isEmail ? "Please provide an email." : "This email is already being used."}
          </span>
        )}

        {/* Phone Number Input */}
        <input name="phoneNumber" type="text" className={`rounded-md px-4 py-3 border-[1px] ${isPhoneNumber && !existingPhoneNumber ? "border-neutral-300 focus:border-[#10a37f]" : "border-red-500"} focus:outline-none w-full`} placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />

        {(!isPhoneNumber || existingPhoneNumber) && (
          <span className="flex flex-row gap-1 justify-center items-center text-red-500 text-sm font-light">
            <RiErrorWarningLine className="text-lg" />
            {!isEmail ? "Please provide an phone number." : "This number is already being used."}
          </span>
        )}

        {/* Password Input */}
        <input name="password" type="password" className={`rounded-md px-4 py-3 border-[1px] ${isPassword && samePasswords ? "border-neutral-300 focus:border-[#10a37f]" : "border-red-500"}  focus:outline-none w-full`} placeholder="Password" value={formData.password} onChange={handleInputChange} />

        {!isPassword && (
          <span className="flex flex-row gap-1 justify-center items-center text-red-500 text-sm font-light">
            <RiErrorWarningLine className="text-lg" />
            Please provide a password.
          </span>
        )}

        {/* Re-enter Password Input */}
        <input name="reenterPassword" type="password" className={`rounded-md px-4 py-3 border-[1px] ${isReenterPassword && samePasswords ? "border-neutral-300 focus:border-[#10a37f]" : "border-red-500"}  focus:outline-none w-full`} placeholder="Re-enter password" value={formData.reenterPassword} onChange={handleInputChange} />

        {(!samePasswords || !isReenterPassword) && (
          <span className="flex flex-row gap-1 justify-center items-center text-red-500 text-sm font-light">
            <RiErrorWarningLine className="text-lg" />
            {!samePasswords ? "Passwords do not match." : "Please re-enter your password."}
          </span>
        )}

        {/* Submit Button */}
        <button disabled={!samePasswords || !isName || !isEmail || !isPhoneNumber || !isPassword || !isReenterPassword || existingEmail || existingPhoneNumber} type="submit" className={`bg-[#10a37f] hover:bg-[#2e8d75] font-light px-4 py-3 m-[1rem] rounded-md transition duration-200 text-white w-full disabled:opacity-50 disabled:cursor-not-allowed`}>
          Continue
        </button>

        {/* Login Link */}
        <span className="flex flex-row gap-[0.5rem] -mt-[1rem] text-sm font-light">
          Already have an account?
          <Link href="/login" className="text-[#10a37f] cursor-pointer">
            Login
          </Link>
        </span>

        {/* OR Divider */}
        <div className="flex flex-row gap-[1rem] mt-[1rem] justify-center items-center w-full text-xs font-light">
          <div className="w-full h-[1px] bg-[#c2c8d0]"></div>
          <span>OR</span>
          <div className="w-full h-[1px] bg-[#c2c8d0]"></div>
        </div>

        {/* Google Login Button */}
        <button type="button" className="flex items-center bg-white border border-neutral-300 rounded-md w-full px-6 py-3 text-sm font-light hover:bg-gray-200">
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-0.5 0 48 48" version="1.1">
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                <g id="Google" transform="translate(401.000000, 860.000000)">
                  <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05">
                    {" "}
                  </path>
                  <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335">
                    {" "}
                  </path>
                  <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853">
                    {" "}
                  </path>
                  <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4">
                    {" "}
                  </path>
                </g>
              </g>
            </g>
          </svg>

          <span>Continue with Google</span>
        </button>
      </Form>
    </div>
  );
};

export default SignUp;
