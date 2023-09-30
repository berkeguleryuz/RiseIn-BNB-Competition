"use client"
import React from "react";
import { MediaRenderer } from "@thirdweb-dev/react";

type NFTCardProps = {
  isLoading: boolean;
  title: string;
  description: string;
  image: string;
  className?: string;
};

const NFTCard = (props: NFTCardProps) => {
  return (
    <>
      {props.isLoading ? (
        <div className="text-xl">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="w-full rounded-sm border mb-2 border-lime-500 ">
          <MediaRenderer
            src={props.image}
            width="256px"
            height="256px"
          />
          <div className="">
            <h1 className="">{props.title}</h1>
            <p>{props.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NFTCard;
