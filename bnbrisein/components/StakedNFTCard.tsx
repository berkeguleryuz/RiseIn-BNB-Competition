"use client"
import React from "react";
import {
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useNFT,
} from "@thirdweb-dev/react";
import {
  ERC721_RISEIN_CONTRACT_ADDRESS,
  STAKE_CONTRACT_ADDRESS,
} from "@/constants/contracts";
type NFTProps = {
  tokenId: number;
};

const StakedNFTCard = ({ tokenId }: NFTProps) => {
  const { contract: ERC721Contract } = useContract(
    ERC721_RISEIN_CONTRACT_ADDRESS,
    "custom",
  );
  const { contract: stakingContract } = useContract(STAKE_CONTRACT_ADDRESS);
  const { data: nftMetadata, isLoading: nftMetadataIsLoading } = useNFT(
    ERC721Contract,
    tokenId,
  );

  return (
    <div className="">
      <div className="flex ml-3">
        <ThirdwebNftMedia
          metadata={nftMetadata?.metadata! || {}}
          width="128px"
          height="128px"
          style={{ borderRadius: "50%", alignItems: "center" }}
        />
      </div>

      <div className="text-center items-center self-center justify-center">
        <p className="">{nftMetadata?.metadata.name!}</p>
        <p className="">Token: # {nftMetadata?.metadata.id!}</p>
      </div>
      <Web3Button
        contractAddress={STAKE_CONTRACT_ADDRESS}
        action={(contract) => contract.call("withdraw", [[tokenId]])}
        style={{ width: "100%" }}>
        Unstake
      </Web3Button>
    </div>
  );
};

export default StakedNFTCard;
