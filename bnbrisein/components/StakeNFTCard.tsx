import { NFT } from "@thirdweb-dev/sdk";
import React from "react";

import {
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import {
  ERC721_RISEIN_CONTRACT_ADDRESS,
  STAKE_CONTRACT_ADDRESS,
} from "@/constants/contracts";

type NFTProps = {
  nft: NFT;
};

const StakeNFTCard = ({ nft }: NFTProps) => {
  const address = useAddress();

  const { contract: ERC721Contract } = useContract(
    ERC721_RISEIN_CONTRACT_ADDRESS,
    "signature-drop",
  );
  const { contract: stakingContract } = useContract(STAKE_CONTRACT_ADDRESS);

  async function stakeNFT(nftId: number[]) {
    if (!address) return;

    const isApproved = await ERC721Contract?.isApproved(
      address,
      STAKE_CONTRACT_ADDRESS,
    );
    if (!isApproved) {
      await ERC721Contract?.setApprovalForAll(STAKE_CONTRACT_ADDRESS, true);
    }

    await stakingContract?.call("stake", [nftId]);
  }

  return (
    <div className="">
      <ThirdwebNftMedia
        metadata={nft?.metadata || {}}
        width="100%"
        height="auto"
      />
      <div>
        <p className="">{nft?.metadata.name}</p>
        <p className="">Token ID#: {nft?.metadata.id}</p>
      </div>
      <Web3Button
        contractAddress={STAKE_CONTRACT_ADDRESS}
        action={() => stakeNFT([parseInt(nft?.metadata.id)])}
        style={{ width: "100%" }}>
        Stake
      </Web3Button>
    </div>
  );
};

export default StakeNFTCard;
