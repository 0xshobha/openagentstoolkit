// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract TEEVerifier is Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    mapping(address => bool) public authorizedEnclaves;

    event EnclaveAuthorized(address indexed enclave);
    event EnclaveRevoked(address indexed enclave);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function authorizeEnclave(address enclave) external onlyOwner {
        authorizedEnclaves[enclave] = true;
        emit EnclaveAuthorized(enclave);
    }

    function revokeEnclave(address enclave) external onlyOwner {
        authorizedEnclaves[enclave] = false;
        emit EnclaveRevoked(enclave);
    }

    function verifyProof(bytes memory proof, uint256 tokenId, address to) public view returns (bool) {
        // Create a hash of the operation being verified
        bytes32 messageHash = keccak256(abi.encodePacked("RE_ENCRYPT", tokenId, to));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        
        address signer = ethSignedMessageHash.recover(proof);
        return authorizedEnclaves[signer];
    }
}
