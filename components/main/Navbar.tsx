// import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";
import { Socials } from "@/constants";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="/"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src="/NavLogo.svg"
            alt="logo"
            width={40}
            height={40}
            className="cursor-pointer hover:animate-slowspin"
          />

          <span className="text-2xl mt-3 font-bold ml-[10px] hidden md:block text-gray-300">
            Web.Dev
          </span>
        </a>

        <div className="w-[550px] h-full flex flex-row items-center justify-between md:mr-20 ">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            <a href="/" className="cursor-pointer">
              Home
            </a>
            <a href="/about" className="cursor-pointer">
              About
            </a>
            <a href="/contact" className="cursor-pointer">
              Contact
            </a>
            
            <a href="https://github.com/sudhir-sars" target="_blank" className="cursor-pointer">
              Projects
            </a>
            <a href="/publications" className="cursor-pointer">
              Publications
            </a>
          </div>
        </div>

        <div className="flex flex-row gap-5">
          {Socials.map((social) => (
            <Image
              src={social.src}
              alt={social.name}
              key={social.name}
              width={24}
              height={24}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;