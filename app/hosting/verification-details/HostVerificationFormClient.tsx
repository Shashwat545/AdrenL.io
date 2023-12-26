"use client";

import Heading from "@/app/components/Heading";
import Button from "@/app/components/chat/Button";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User } from "@prisma/client";

export default async function HostVerificationFormClient({
  currentUser,
}: {
  currentUser: User;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      bankingName: "",
      ifscCode: "",
      aadharCard: "",
      panCard: "",
      accountNo: "",
    },
  });
  const onSubmit = (data: any) => {
    axios
      .post("/api/hosting/hostVerificationDetails", {
        id: currentUser.id,
        ...data,
      })
      .then(() => {
        toast.success("Host Verification Details Added Successfully");
      });
  };

  const image = watch("aadharCard");

  const handleAadharUpload = (result: any) => {
    setValue("aadharCard", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const handlePANUpload = (result: any) => {
    setValue("panCard", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  console.log(currentUser);

  if (currentUser?.host.isVerified) {
    return (
      <div className="flex items-center justify-center h-[640px]">
        <div className="max-w-2xl bg-white rounded-md overflow-hidden shadow-md">
          <div className="bg-green-500 p-4">
            <h1 className="text-white text-2xl font-semibold">
              Verification Successful
            </h1>
          </div>
          <div className="p-4">
            <p className="text-gray-700">
              Congratulations! Your verification was successful.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentUser?.host.accountNo) {
    return (
      <>
        <div className="flex min-h-[650px] w-full md:mt-24 justify-center px-4">
          <div className="flex w-[700px] max-w-3xl text-2xl flex-col rounded py-12 px-6 text-black-800 shadow-sm">
            <h2 className="mb-2 text-bold text-3xl text-red-500">
              Verification in Progress
            </h2>
            <p className="mb-12">
              It usually takes 2-3 days to verify your account.
              <br></br>We will notify you once your account is verified.
            </p>
            <div className="mb-2 flex gap-2">
              <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-600"></span>
              <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-500"></span>
              <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-400"></span>
              <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-300"></span>
              <span className="mb-2 h-[15px] flex-1 rounded-xl bg-blue-200"></span>
              <span className="mb-2 h-[15px] flex-1 rounded-xl bg-green-200"></span>
              <span className="mb-2 h-[15px] flex-1 rounded-xl bg-gray-900"></span>
              <span className="mb-2 h-[15px] flex-1 rounded-xl bg-gray-900"></span>
              <span className="mb-2 h-[15px] flex-1 rounded-xl bg-gray-900"></span>
            </div>
            <small>Our team is reviewing</small>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="m-auto flex w-1/2 flex-col gap-4">
      <h1 className="font-bold text-2xl underline">Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="input-wrapper flex flex-col">
          <label htmlFor="bankingName" className="text-sm font-semibold">
            Banking Name
          </label>
          <input
            type="text"
            {...register("bankingName", {
              required: "Name is required",
            })}
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
          {errors.bankingName && (
            <p className="text-xs italic text-red-500">
              {errors.bankingName.message}
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="username" className="text-sm font-semibold">
            IFSC Code
          </label>
          <input
            type="text"
            {...register("ifscCode", {
              required: "IFSC Code is required",
            })}
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
          {errors.ifscCode && (
            <p className="text-xs italic text-red-500">
              {errors.ifscCode.message}
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="accountNo" className="text-sm font-semibold">
            Account No
          </label>
          <input
            type="password"
            {...register("accountNo", {
              required: "Account No is required",
            })}
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
          {errors.accountNo && (
            <p className="text-xs italic text-red-500">
              {errors.accountNo.message}
            </p>
          )}
        </div>

        <div className="flex">
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleAadharUpload}
            uploadPreset="kx4yy8db"
          >
            <Button secondary type="button">
              <span className="mr-2">Upload Aadhar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </Button>
          </CldUploadButton>
        </div>
        
        <div className="flex">
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handlePANUpload}
          uploadPreset="kx4yy8db"
        >
            <Button secondary type="button">
              <span className="mr-2">Upload PAN Card</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </Button>
          </CldUploadButton>
        </div>
        <input
          type="submit"
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md cursor-pointer"
        />
      </form>
    </div>
  );
}
