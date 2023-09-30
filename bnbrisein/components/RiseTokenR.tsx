import { ERC20_RISEIN_CONTRACT_ADDRESS } from "@/constants/contracts";
import {
  useAddress,
  useContract,
  useTokenBalance,
  useTokenSupply,
} from "@thirdweb-dev/react";
import React from "react";

type Props = {};

const RiseToken = (props: Props) => {
  const address = useAddress();
  const { contract } = useContract(ERC20_RISEIN_CONTRACT_ADDRESS, "token");
  const { data: tokenSupply, isLoading: tokenSupplyIsLoading } =
    useTokenSupply(contract);
  const { data: tokenBalance, isLoading: tokenBalanceIsLoading } =
    useTokenBalance(contract, address);
  return (
    <div className="flex text-center">
      <div>
        {tokenSupplyIsLoading ? (
          <h4>Total Supply is loading</h4>
        ) : (
          <div>
            <h3 className="text-2xl">{tokenSupply?.symbol} Token</h3>
            <h4 className="text-sm pt-4">Total Supply: {tokenSupply?.displayValue}</h4>
          </div>
        )}
        <div>
          {tokenBalanceIsLoading ? (
            <p>Your balance is loading</p>
          ) : (
            <p className="text-sm">Your Balance: {tokenBalance?.displayValue} </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiseToken;
