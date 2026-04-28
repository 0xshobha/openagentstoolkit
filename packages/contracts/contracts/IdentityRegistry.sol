// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IdentityRegistry
 * @dev Implementation of ERC-8004 Trustless Agent Registry.
 * Records the agent's public profile (stored on 0G Storage).
 */
contract IdentityRegistry {
    struct AgentProfile {
        address owner;
        bytes32 profileHash; // 0G Storage hash
        uint256 registeredAt;
        bool active;
    }

    // Mapping from agent ID (e.g., hash of unique name/pubkey) to Profile
    mapping(bytes32 => AgentProfile) public profiles;

    event AgentRegistered(bytes32 indexed agentId, address indexed owner, bytes32 profileHash);
    event AgentProfileUpdated(bytes32 indexed agentId, bytes32 newProfileHash);

    function register(bytes32 agentId, bytes32 profileHash) external {
        require(profiles[agentId].registeredAt == 0, "Agent already registered");
        
        profiles[agentId] = AgentProfile({
            owner: msg.sender,
            profileHash: profileHash,
            registeredAt: block.timestamp,
            active: true
        });

        emit AgentRegistered(agentId, msg.sender, profileHash);
    }

    function updateProfile(bytes32 agentId, bytes32 newProfileHash) external {
        require(profiles[agentId].owner == msg.sender, "Not agent owner");
        
        profiles[agentId].profileHash = newProfileHash;
        emit AgentProfileUpdated(agentId, newProfileHash);
    }
}
