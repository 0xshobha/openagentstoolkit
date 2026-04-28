const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const teeVerifier = await hre.ethers.deployContract("TEEVerifier", [deployer.address]);
  await teeVerifier.waitForDeployment();
  console.log("TEEVerifier deployed to:", await teeVerifier.getAddress());

  const agentNFT = await hre.ethers.deployContract("AgentNFT", [deployer.address, await teeVerifier.getAddress()]);
  await agentNFT.waitForDeployment();
  console.log("AgentNFT deployed to:", await agentNFT.getAddress());

  const identityRegistry = await hre.ethers.deployContract("IdentityRegistry");
  await identityRegistry.waitForDeployment();
  console.log("IdentityRegistry deployed to:", await identityRegistry.getAddress());

  const reputationRegistry = await hre.ethers.deployContract("ReputationRegistry");
  await reputationRegistry.waitForDeployment();
  console.log("ReputationRegistry deployed to:", await reputationRegistry.getAddress());

  const validationRegistry = await hre.ethers.deployContract("ValidationRegistry");
  await validationRegistry.waitForDeployment();
  console.log("ValidationRegistry deployed to:", await validationRegistry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
