const { task } = require("hardhat/config");

require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@openzeppelin/hardhat-upgrades");

task("deploy", "Deploy contract").setAction(async () => {
  const deploy = require("./scripts/deploy");
  await deploy();
});

task("upgrade", "Upgrade contract").setAction(async () => {
  const upgrade = require("./scripts/upgrade");
  await upgrade();
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "coredao_testnet",
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    coredao: {
      chainId: 1116,
      url: "https://rpc.coredao.org",
      accounts: [process.env.PRIVATE_KEY],
      gasMultiplier: 1,
    },
    coredao_testnet: {
      chainId: 1115,
      url: "https://rpc.test.btcs.network",
      accounts: [process.env.PRIVATE_KEY],
      gasMultiplier: 1,
    }
  },
  etherscan: {
    apiKey: {
      coredao: process.env.CORE_API_KEY,
      coredao_testnet: process.env.CORE_TESTNET_API_KEY,
    },
    customChains: [
      {
        network: "coredao",
        chainId: 1116,
        urls: {
          apiURL: "https://openapi.coredao.org/api",
          browserURL: "https://scan.coredao.org/",
        },
      },
      {
        network: "coredao_testnet",
        chainId: 1115,
        urls: {
          apiURL: "https://api.test.btcs.network/api",
          browserURL: "https://scan.test.btcs.network/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false
  }
};
