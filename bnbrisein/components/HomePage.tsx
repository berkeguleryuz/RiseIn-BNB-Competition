"use client";

import RiseNFT from "./RiseNFTMintL";
import RiseBalance from "./RiseBalanceR";
import RiseToken from "./RiseTokenR";
import Status from "./Status";
import RiseStaking from "./RiseStakingM";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div>
      <div className="text-center self-center">
        <Status />
        <div className="box h-[100px] w-10/12 mx-auto max-md:mt-[-50px]" />
      </div>
      <div className="justify-between grid mx-11 lg:grid-col sm:flex">
        <RiseNFT />
        <RiseStaking />
        <div>
          <RiseToken />
          <RiseBalance />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
