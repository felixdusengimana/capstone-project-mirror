"use client";
import Button from '@/components/atoms/Button';
import DotsLoadingAnimation from '@/components/atoms/DotsLoadingAnimation';
import Input from '@/components/atoms/Input';
import Logo from '@/components/molecules/Logo';
import { InitiateTransaction } from '@/services/pay';
import { useGetTransactionByReference } from '@/services/transactions';
import { usePaymentStore } from '@/store/payment';
import { EPaymentMethod, EPaymentProvider, EStatus } from '@/types';
import { tipSchemaPhone, TipSchemaPhoneType } from '@/types/pay';
import { normalizePhoneNumber } from '@/utils/phone';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@nextui-org/theme';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


const PaymentUI = () => {
  const [checked, setChecked] = useState(EPaymentMethod.MTN_MOBILE_MONEY);
  const [isConfirming, setIsConfirming] = useState(false);
  const [transactionReference, setTransactionReference] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(EStatus.PENDING);
  const router = useRouter();
  const { amount, email, clear, name, creatorUserName, currency, donorUserName, note, phoneNumber, createFullName, setPhoneNumber } = usePaymentStore();
  const {data:transactionStatus,isLoading } = useGetTransactionByReference(transactionReference, paymentStatus, 3 )

  const { mutate, isPending } = useMutation({
    mutationFn: () => InitiateTransaction({
      paymentProvider: EPaymentProvider.POKET_MONEY,
      amount,
      currency,
      creatorUserName,
      donorUserName,
      note,
      phoneNumber,
      email,
      name: name ?? "",
    }),
    onSuccess: (data) => {
      setTransactionReference(data?.data?.transactionReference);
    },
    onError: () => {
      toast.error("An error occurred while initiating the transaction, Please try again");
      setIsConfirming(false);
    },
  });



  const {
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<TipSchemaPhoneType>({
    resolver: zodResolver(tipSchemaPhone),
    defaultValues: {
      phoneNumber
    },
  });

  const onSubmit = (data: TipSchemaPhoneType) => {
    const phoneNumber = normalizePhoneNumber(data.phoneNumber);
    if (!Boolean(phoneNumber) || phoneNumber.length < 10 || phoneNumber.length > 10) {
      setError("phoneNumber", {
        type: "manual",
        message: "Please enter a valid phone number",
      });
      return;
    }

    if (
      checked === EPaymentMethod.MTN_MOBILE_MONEY
      && !(phoneNumber.startsWith("078") || phoneNumber.startsWith("079"))
    ) {
      setError("phoneNumber", {
        type: "manual",
        message: "Please enter a valid MTN Mobile Money number",
      });
      return;
    }

    if (checked === EPaymentMethod.AIRTEL_MONEY && !(phoneNumber.startsWith("072") || phoneNumber.startsWith("073"))) {
      setError("phoneNumber", {
        type: "manual",
        message: "Please enter a valid Airtel Money number",
      });
      return;
    }

    setPhoneNumber(phoneNumber);
    mutate();
    setIsConfirming(true);
  }
  useEffect(() => {
    if (transactionStatus) {
      setPaymentStatus(transactionStatus);
      setIsConfirming(transactionStatus === EStatus.PENDING);
    }
  }, [transactionStatus, isLoading]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col-reverse md:flex-row w-full max-w-3xl">
        <div className="p-8 w-full">
          <div className="flex gap-8 justify-between items-center mb-4">
            <Logo type='dark' />
            <div className="">
              <p className="text-sm font-semibold text-gray-800">Support {createFullName}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>
          {paymentStatus === EStatus.PENDING ? <div className="flex flex-col w-full  items-baseline mb-6">
            <p className="text-xl font-bold text-gray-900">{amount.toLocaleString()} RWF</p>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none">
              Transaction breakdown
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline-block ml-1">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div> : null}
          {paymentStatus === EStatus.SUCCESSFUL ? (
            <div className="relative  px-8 lg:px-0 text-lg">
              <svg
                className="absolute -left-10"
                width="86"
                height="26"
                viewBox="0 0 86 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="-32"
                  width="118"
                  height="26"
                  rx="13"
                  fill="#10B981"
                  fillOpacity="0.29"
                />
              </svg>
              <svg
                width="86"
                height="26"
                viewBox="0 0 86 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -right-16 rotate-180 top-[50%] transform -translate-y-1/2"
              >
                <rect
                  x="-32"
                  width="118"
                  height="26"
                  rx="13"
                  fill="#10B981"
                  fillOpacity="0.29"
                />
              </svg>

              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[30%]"
              >
                <circle cx="11" cy="11" r="11" fill="#AFE2D4" />
              </svg>

              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0"
              >
                <circle cx="11" cy="11" r="11" fill="#B3AFE2" />
              </svg>

              <div className="flex h-full items-center justify-center flex-col text-gray-800 py-10">
                <svg
                  width="65"
                  height="64"
                  viewBox="0 0 65 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" width="64" height="64" rx="32" fill="#10B981" />
                  <path
                    d="M43.6834 24.0164C43.5285 23.8602 43.3441 23.7362 43.141 23.6516C42.9379 23.567 42.7201 23.5234 42.5001 23.5234C42.2801 23.5234 42.0622 23.567 41.8591 23.6516C41.656 23.7362 41.4717 23.8602 41.3167 24.0164L28.9001 36.4498L23.6834 31.2164C23.5225 31.061 23.3326 30.9388 23.1245 30.8568C22.9165 30.7748 22.6943 30.7346 22.4706 30.7385C22.247 30.7424 22.0263 30.7902 21.8212 30.8794C21.616 30.9685 21.4305 31.0972 21.2751 31.2581C21.1197 31.419 20.9975 31.6089 20.9155 31.817C20.8335 32.0251 20.7933 32.2473 20.7971 32.4709C20.801 32.6945 20.8489 32.9152 20.938 33.1203C21.0272 33.3255 21.1559 33.511 21.3167 33.6664L27.7167 40.0664C27.8717 40.2227 28.056 40.3466 28.2591 40.4313C28.4622 40.5159 28.6801 40.5594 28.9001 40.5594C29.1201 40.5594 29.3379 40.5159 29.541 40.4313C29.7441 40.3466 29.9285 40.2227 30.0834 40.0664L43.6834 26.4664C43.8526 26.3104 43.9876 26.1209 44.0799 25.9101C44.1723 25.6993 44.22 25.4716 44.22 25.2414C44.22 25.0113 44.1723 24.7836 44.0799 24.5728C43.9876 24.3619 43.8526 24.1725 43.6834 24.0164Z"
                    fill="white"
                  />
                </svg>

                <h2 className="mt-8 text-2xl font-bold">🎉 Another one! 🎉</h2>
                <p className="max-w-[307px] text-center mt-4">
                  Your support means a lot—you are truly amazing! <br/>
                  Your kindness touches us deeply, and  {" "}
                  <span className="font-bold">{createFullName}</span> 
                  {" "}  appreciates you 🙏🏾!
                </p>
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  clear();
                  router.back();
                }}
              >
                Gift Again
              </Button>

              <Link href={"/"}>
                <Button className="w-full mt-3" variant="gray">
                  Back Home
                </Button>
              </Link>
            </div>
          ) : (paymentStatus === EStatus.FAILED) ? (
            <>
              <div className='text-red-500 flex items-center flex-col justify-center'>
                🥹 We failed to process this transaction. 🙏🏾 Please give it another shot.
              </div>

              <Button
                className="w-full mt-8"
                onClick={() => {
                  setPaymentStatus(EStatus.PENDING);
                  setIsConfirming(false);
                  setTransactionReference("");
                }}
              >
                Try Again 🙏🏾
              </Button>
            </>
          ) : (paymentStatus === EStatus.CANCELLED) ? (
            <div>
              🥹 It seems like you cancelled the transaction. 🙏🏾 Please give it another shot.
            </div>
          ) : isConfirming ? <div className='text-black flex items-center flex-col justify-center'>
            <DotsLoadingAnimation />
            <p className='text-center'>
              Waiting for approval...

            </p>
            <p className='text-center'>
              If you do not see a popup prompt on your cell phone, Dial 
              <b>
                {checked === EPaymentMethod.MTN_MOBILE_MONEY ? "*182*7*1#" : <span>*182*5*6*1# <small>or</small> *500*5*6*1#</span>}
              </b>To approve payment!</p>
          </div> : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-sm text-gray-700 mb-4">Please enter your {checked.replaceAll("_", " ").toLocaleLowerCase()} details to begin payment</p>
              <div>
                <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-700">
                  PHONE NUMBER
                </label>

                <Input
                  error={errors.phoneNumber?.message}
                  value={watch("phoneNumber")}
                  left={<p className='mr-2'>🇷🇼</p>}
                  name="phoneNumber"
                  onChange={(e) => setValue("phoneNumber", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })}
                  id="phoneNumber"
                  placeholder={checked === EPaymentMethod.MTN_MOBILE_MONEY ? "078/079 000 000" : "072 000 000"}
                />
              </div>
              <Button
                isLoading={isPending}
                disabled={isConfirming}
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Pay RWF {amount?.toLocaleString()}
              </Button>
            </form>
          )}
          <div className="mt-4 flex gap-1 text-center border w-fit p-2 mx-auto">
            <svg className='w-4 h-4 text-[#7d5f39] fill-[#7d5f39]' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_509_"> <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></path> </g> </g></svg>
            <span className="text-xs text-[#7d5f39]">SECURED BY PESATONE</span>
          </div>
        </div>


        {(!isConfirming && paymentStatus == EStatus.PENDING) ? (<div className="bg-gray-50 w-full md:w-1/2 p-6 flex flex-col justify-start">
          <div className="flex justify-end">
            <button onClick={() => {
              if (confirm("Are you sure you want to cancel this payment?")) {
                clear();
                router.back();
              }
            }} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <h2 className="text-sm font-semibold text-gray-700 mb-4">PAYMENT OPTIONS</h2>
          <div className='flex flex-row md:flex-col gap-4'>
            {Object.values(EPaymentMethod).map((method) => (
              <button
                onClick={() => setChecked(method)}
                className={cn("flex items-center rounded-md py-2 px-3 w-full cursor-pointer capitalize",
                  checked === method ? "bg-[#ff9a00]" : "text-gray-700 hover:bg-gray-200 focus:outline-none focus:bg-gray-200",
                )} key={method}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                  <path d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2z" />
                </svg>
                {method.replaceAll("_", " ")}
              </button>
            ))
            }
          </div>
        </div>) : null}
      </div>
    </div>
  );
};

export default PaymentUI;