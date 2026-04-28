// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ValidationRegistry
 * @dev Handles independent validation requests for agents.
 * Integrates with KeeperHub to automatically dispatch validation jobs.
 */
contract ValidationRegistry {
    struct ValidationRequest {
        bytes32 agentId;
        address auditor;
        address requester;
        bool isCompleted;
        bytes32 responseHash;
    }

    uint256 public nextRequestId;
    mapping(uint256 => ValidationRequest) public requests;

    // KeeperHub listens to this event
    event ValidationRequested(uint256 indexed requestId, bytes32 indexed agentId, address indexed auditor);
    event ValidationCompleted(uint256 indexed requestId, bytes32 responseHash);

    function requestValidation(bytes32 agentId, address auditor) external returns (uint256) {
        uint256 requestId = nextRequestId++;
        
        requests[requestId] = ValidationRequest({
            agentId: agentId,
            auditor: auditor,
            requester: msg.sender,
            isCompleted: false,
            responseHash: bytes32(0)
        });

        emit ValidationRequested(requestId, agentId, auditor);
        return requestId;
    }

    // KeeperHub or the auditor calls this to submit the response
    function submitValidationResponse(uint256 requestId, bytes32 responseHash) external {
        ValidationRequest storage req = requests[requestId];
        require(!req.isCompleted, "Validation already completed");
        require(msg.sender == req.auditor, "Only designated auditor can submit");

        req.isCompleted = true;
        req.responseHash = responseHash;

        emit ValidationCompleted(requestId, responseHash);
    }
}
