import { ethers } from "ethers";

const AGENT_NFT_ABI = [
  "function mintAgent(address to, string memory uri, bytes32 encryptedDataHash) public returns (uint256)",
  "function updateEncryptedData(uint256 tokenId, bytes32 newEncryptedDataHash) public",
  "function secureTransfer(address from, address to, uint256 tokenId, bytes memory tdxProof) public",
  "function encryptedDataHashes(uint256) view returns (bytes32)",
  "function ownerOf(uint256) view returns (address)"
];

export class AgentNFTClient {
  private nftContract: ethers.Contract;

  constructor(
    nftAddress: string,
    private signerOrProvider: ethers.Signer | ethers.Provider
  ) {
    this.nftContract = new ethers.Contract(nftAddress, AGENT_NFT_ABI, signerOrProvider);
  }

  async mintAgent(to: string, uri: string, encryptedDataHash: string) {
    const tx = await this.nftContract.mintAgent(to, uri, encryptedDataHash);
    return tx.wait();
  }

  async secureTransfer(from: string, to: string, tokenId: number, tdxProof: string) {
    const tx = await this.nftContract.secureTransfer(from, to, tokenId, tdxProof);
    return tx.wait();
  }

  async getEncryptedDataHash(tokenId: number) {
    return this.nftContract.encryptedDataHashes(tokenId);
  }
}
