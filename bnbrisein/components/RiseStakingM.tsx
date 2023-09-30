import {
  ERC20_RISEIN_CONTRACT_ADDRESS,
  ERC721_RISEIN_CONTRACT_ADDRESS,
  STAKE_CONTRACT_ADDRESS,
} from "@/constants/contracts";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import StakedNFTCard from "./StakedNFTCard";

type Props = {};

const RiseStaking = (props: Props) => {
  const address = useAddress();
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const { contract: stakeContract } = useContract(STAKE_CONTRACT_ADDRESS);
  const { contract: ERC20Contract } = useContract(
    ERC20_RISEIN_CONTRACT_ADDRESS,
    "token",
  );

  const { data: tokenBalance, isLoading: tokenBalanceIsLoading } =
    useTokenBalance(ERC20Contract, address);

  const { data: stakedERC721NFTs, isLoading: stakedERC721NFTsIsLoading } =
    useContractRead(stakeContract, "getStakeInfo", [address]);

  useEffect(() => {
    if (!stakeContract || !address) return;

    async function getClaimableRewards() {
      const claimableRewards = await stakeContract?.call("getStakeInfo", [
        address,
      ]);
      setClaimableRewards(claimableRewards);
    }
    getClaimableRewards();
  }, [address, stakeContract]);
  return (
    <div className="items-center text-center">
      <div>
        {stakedERC721NFTsIsLoading ? (
          <p>Loading...</p>
        ) : stakedERC721NFTs && stakedERC721NFTs.length > 0 ? (
          stakedERC721NFTs[0].map((stakedNFT: BigNumber, index: number) => (
            <div
              key={index}
              className="text-center items-center flex justify-center">
              <h3>Staked NFT Section</h3>
              <StakedNFTCard tokenId={stakedNFT.toNumber()} />
            </div>
          ))
        ) : (
          <p>No NFTs staked.</p>
        )}
      </div>
    </div>
  );
};

export default RiseStaking;
