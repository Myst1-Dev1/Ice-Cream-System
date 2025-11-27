/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
    isOpenModal: boolean;
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode
    type?: React.Dispatch<React.SetStateAction<string>>;
    formRef:any;
    setCategory:any;
}

export function Modal({ isOpenModal, setIsOpenModal, formRef, setCategory, children }: ModalProps) {

    const isDark =
    typeof document !== "undefined" &&
    document.cookie.includes("dark=true");

    return (
        <>
        {isOpenModal &&
            <div className={`fixed z-50 top-0 left-0 right-0 w-full min-h-screen ${isDark ? 'bg-[#202020] text-white' : 'bg-white'}`}>
                <div onClick={() => {
                    setIsOpenModal(false);
                    setCategory('');
                    formRef.current?.reset();
                }} className="w-7 h-7 text-sm bg-[#262626] text-white grid place-items-center rounded-full absolute top-5 right-3 cursor-pointer transition-all duration-500 hover:bg-yellow-400">
                    <FaTimes />
                </div>
                <div className="px-4 py-12">
                    {children}
                </div>
            </div>
        }
        </>
    )
}