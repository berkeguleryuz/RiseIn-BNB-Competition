"use client"
import { ERC721_RISEIN_CONTRACT_ADDRESS } from "@/constants/contracts";
import {
  Web3Button,
  useAddress,
  useClaimedNFTSupply,
  useContract,
  useContractMetadata,
  useTotalCount,
} from "@thirdweb-dev/react";
import React from "react";
import NFTCard from "./NFTCard";

type Props = {};

const RiseNFT = (props: Props) => {
  const address = useAddress();
  const { contract } = useContract(ERC721_RISEIN_CONTRACT_ADDRESS, "erc721");
  const { data: totalClaimed, isLoading: totalClaimedIsLoading } =
    useClaimedNFTSupply(contract);
  const { data: contractMetadata, isLoading: contractMetadataIsLoading } =
    useContractMetadata(contract);
  return (
    <div className="flex">
      <div className="rounded-xl text-center">
          <NFTCard
            image={contractMetadata?.image!}
            isLoading={contractMetadataIsLoading}
            title={contractMetadata?.name!}
            description={contractMetadata?.description!}
            className="rounded-xl"
          />

        <Web3Button
          contractAddress={ERC721_RISEIN_CONTRACT_ADDRESS}
          action={(contract) => contract.erc721.claim(1)}
          onSuccess={() => alert("NFT Claimed!")}>
          Claim NFT
        </Web3Button>
        <h1>
          Total Supply: 20
        </h1>
        <h2>
          Total Claimed:{" "}
          {totalClaimedIsLoading ? "Loading" : `${totalClaimed?.toNumber()}`}
        </h2>
      </div>
    </div>
  );
};

export default RiseNFT;
