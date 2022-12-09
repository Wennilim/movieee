import React from "react";
import Img from "../assets/popcorn.svg";
import Image from 'next/image'

export default function Logo() {
  return (
    <>
      <Image width={55} src={Img} alt="logo popcorn"/>
      {/* <div>Movieee</div> */}
    </>
  );
}
