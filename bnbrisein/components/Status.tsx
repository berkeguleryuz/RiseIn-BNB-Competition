"use client";
import { PROFILE_STATUS_CONTRACT_ADDRESS } from "@/constants/contracts";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import React, { useState } from "react";

type Props = {};

const Status = (props: Props) => {
  const address = useAddress();
  const { contract } = useContract(PROFILE_STATUS_CONTRACT_ADDRESS);
  const { data: profileStatus, isLoading: profileStatusIsLoading } =
    useContractRead(contract, "userStatus", [address]);
  const [status, setStatus] = useState("");

  const updateStatus = async () => {
    await contract?.getAddress();
    if (!profileStatus.exists) {
      await contract?.call("createStatus", [status]);
      setStatus("");
      return;
    }
    await contract?.call("updateStatus", [status]);
    setStatus("");
  };
  return (
    <div className="flex text-center self-center justify-center">
      <div className="grid grid-flow-row">
        <div className="grid grid-flow-row-dense mx-20 mt-6">
          <h3 className="text-2xl font-bold">Current Status</h3>
          {profileStatusIsLoading ? (
            "Loading..."
          ) : profileStatus.exists ? (
            profileStatus.statusMessage
          ) : (
            <i>You did not choose status yet</i>
          )}
        </div>
        <div className="border rounded-xl border-gray-300 bg-lime-500 mt-6">
          <div className="border rounded-xl border-gray-300  text-center self-center ">
            <h3>Update Status</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <input
                type="text"
                value={status}
                placeholder="Status"
                required
                className={"border text-black "}
                onChange={(e) => setStatus(e.target.value)}
                style={{
                  width: "100%",
                  height: "2rem",
                  padding: "1rem",
                }}
              />
              <Web3Button
                contractAddress={PROFILE_STATUS_CONTRACT_ADDRESS}
                action={updateStatus}
                className="!bg-lime-900 !text-white text-center items-center justify-center">
                Update
              </Web3Button>
            </div>
          </div>
          <div className="">
            <h3>
              {!address ? (
                "You need to connect"
                ) : (
                  <b>
                  Status Exists: &nbsp;
                  {profileStatusIsLoading
                    ? "Loading..."
                    : profileStatus.exists
                    ? "True"
                    : "False"}
                </b>
              )}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
