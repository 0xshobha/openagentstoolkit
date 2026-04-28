// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./TEEVerifier.sol";

/**
 * @title AgentNFT
 * @dev Implementation of ERC-7857 (Intelligent Digital Assets) concept.
 * Agents are NFTs with encrypted private configuration stored off-chain (0G Storage).
 * Re-encryption proofs are provided via TDX TEE oracle on transfer.
 */
contract AgentNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    TEEVerifier public teeVerifier;

    // Mapping from tokenId to the encrypted data hash on 0G Storage
    mapping(uint256 => bytes32) public encryptedDataHashes;

    event AgentMinted(uint256 indexed tokenId, address indexed owner, bytes32 encryptedDataHash);
    event EncryptedDataUpdated(uint256 indexed tokenId, bytes32 newEncryptedDataHash);
    event SecureTransferCompleted(uint256 indexed tokenId, address indexed from, address indexed to);

    constructor(address initialOwner, address _teeVerifier) ERC721("AgentNFT", "ANFT") Ownable(initialOwner) {
        teeVerifier = TEEVerifier(_teeVerifier);
    }

    function mintAgent(address to, string memory uri, bytes32 encryptedDataHash) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        encryptedDataHashes[tokenId] = encryptedDataHash;
        
        emit AgentMinted(tokenId, to, encryptedDataHash);
        return tokenId;
    }

    function updateEncryptedData(uint256 tokenId, bytes32 newEncryptedDataHash) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        encryptedDataHashes[tokenId] = newEncryptedDataHash;
        emit EncryptedDataUpdated(tokenId, newEncryptedDataHash);
    }

    /**
     * @dev Secure transfer using TEE oracle proof. The proof must be verified
     * by the TEEVerifier.
     */
    function secureTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory tdxProof
    ) public {
        require(ownerOf(tokenId) == from, "Not token owner");
        require(msg.sender == from || isApprovedForAll(from, msg.sender) || getApproved(tokenId) == msg.sender, "Not approved");
        
        // Verify the TDX proof
        // The proof asserts that the content key was re-encrypted for the new owner.
        require(teeVerifier.verifyProof(tdxProof, tokenId, to), "Invalid TEE Proof");

        _transfer(from, to, tokenId);
        emit SecureTransferCompleted(tokenId, from, to);
    }
}
