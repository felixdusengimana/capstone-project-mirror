"use client";
import DotsLoadingAnimation from '@/components/atoms/DotsLoadingAnimation';
import Input from '@/components/atoms/Input';
import Logo from '@/components/molecules/Logo';
import { EPaymentMethod } from '@/types';
import { cn } from '@nextui-org/theme';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const PaymentUI = () => {
  const [checked, setChecked] = useState(EPaymentMethod.MTN_MOBILE_MONEY);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden flex w-full max-w-3xl">
        <div className="p-8 w-full">
          <div className="flex gap-8 justify-between items-center mb-4">
            <Logo type='dark' />
            <div className="">
              <p className="text-sm font-semibold text-gray-800">Support charles</p>
              <p className="text-xs text-gray-500">lvhii@mailinator.com</p>
            </div>
          </div>
          <div className="flex flex-col w-full  items-baseline mb-6">
            <p className="text-xl font-bold text-gray-900">1,000 RWF</p>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none">
              Transaction breakdown
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline-block ml-1">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {isConfirming ? <div className='text-black flex items-center flex-col justify-center'>
<DotsLoadingAnimation/>
            <p className='text-center'>
              Waiting for approval...

            </p>
            <p className='text-center'>
            If you do not see a popup prompt on your cell phone, Dial *182*7*1# To approve payment!            </p>
          </div> : (
            <div>
              <p className="text-sm text-gray-700 mb-4">Please enter your {checked.replaceAll("_", " ").toLocaleLowerCase()} details to begin payment</p>
              <div>
                <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-700">
                  PHONE NUMBER
                </label>

                <Input
                  left={<p className='mr-2'>🇷🇼</p>}
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder={checked === EPaymentMethod.MTN_MOBILE_MONEY ? "078 000 000" : "072 000 000"}
                />
              </div>
              <button
                onClick={() => {
                  setIsConfirming(true);
                  setTimeout(() => {
                    setIsConfirming(false);
                  }, 5000);
                }}
                disabled={isConfirming}
                type="button"
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Pay RWF 1,000
              </button>
            </div>
          )}
          <div className="mt-4 flex gap-1 text-center border w-fit p-2 mx-auto">
            <svg className='w-4 h-4 text-[#7d5f39] fill-[#7d5f39]' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_509_"> <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></path> </g> </g></svg>
            <span className="text-xs text-[#7d5f39]">SECURED BY PESATONE</span>
          </div>
        </div>

        
          {!isConfirming&&(<div className="bg-gray-50 w-1/2 p-6 flex flex-col justify-start">
          <div className="flex justify-end">
            <button onClick={() => {
              if (confirm("Are you sure you want to cancel this payment?")) {
                router.back();
              }
            }} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <h2 className="text-sm font-semibold text-gray-700 mb-4">PAYMENT OPTIONS</h2>
            <div className='flex flex-col gap-4'>
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
        </div>)}
      </div>
    </div>
  );
};

export default PaymentUI;