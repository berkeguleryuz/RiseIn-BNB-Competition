import { ThirdwebNftMedia, useOwnedNFTs } from "@thirdweb-dev/react";
import React from "react";
import { NFT } from "@thirdweb-dev/sdk";
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import {
  ERC721_RISEIN_CONTRACT_ADDRESS,
  STAKE_CONTRACT_ADDRESS,
} from "@/constants/contracts";

type NFTProps = {
};

const RiseBalance = ( Props : NFTProps) => {
  const address = useAddress();
  const { contract: ERC721Contract } = useContract(
    ERC721_RISEIN_CONTRACT_ADDRESS,
    "custom",
  );
  const { data: ownedERC721NFTs, isLoading: ownedERC721NFTsIsLoading } =
    useOwnedNFTs(ERC721Contract, address);

  const { contract: stakingContract } = useContract(STAKE_CONTRACT_ADDRESS);

  async function stakeNFT(nftId: number[]) {
    if (!address) return;

    const approve = await ERC721Contract?.erc721.isApproved(
      address,
      STAKE_CONTRACT_ADDRESS,
    );
    if (!approve) {
      await ERC721Contract?.erc721.setApprovalForAll(
        STAKE_CONTRACT_ADDRESS,
        true,
      );
    }

    await stakingContract?.call("stake", [nftId]);
  }
  return (
    <div className="items-center text-center self-center justify-center mt-2">
      <h5 className="text-2xl text-lime-600">NFT Balance</h5>
      <h5 className="text-sm">(Unstaked)</h5>
      {ownedERC721NFTsIsLoading ? (
        <p>Loading NFTs...</p>
      ) : ownedERC721NFTs && ownedERC721NFTs.length > 0 ? (
        ownedERC721NFTs.map((nft) => (
          <div key={nft?.metadata.id}>
            <h4> ID: #{nft?.metadata.id}</h4>
            <div className="text-center flex items-center justify-center">
              <ThirdwebNftMedia
                metadata={nft?.metadata || {}}
                width="128px"
                height="128px"
              />
            </div>
            <Web3Button
              contractAddress={STAKE_CONTRACT_ADDRESS}
              action={() => stakeNFT([parseInt(nft?.metadata.id)])}
              style={{ width: "100%" }}>
              Stake
            </Web3Button>
          </div>
        ))
      ) : (
        <p>No NFTs owned.</p>
      )}
      
    </div>
  );
};

export default RiseBalance;
