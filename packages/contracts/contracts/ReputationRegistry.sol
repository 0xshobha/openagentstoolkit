// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ReputationRegistry
 * @dev Stores tamper-proof on-chain feedback for agents.
 */
contract ReputationRegistry {
    struct Feedback {
        address client;
        uint8 score; // 1 to 5
        string description;
        uint256 timestamp;
    }

    mapping(bytes32 => Feedback[]) public agentFeedback;

    event FeedbackSubmitted(bytes32 indexed agentId, address indexed client, uint8 score);

    function submitFeedback(bytes32 agentId, uint8 score, string calldata description) external {
        require(score >= 1 && score <= 5, "Score must be between 1 and 5");

        agentFeedback[agentId].push(Feedback({
            client: msg.sender,
            score: score,
            description: description,
            timestamp: block.timestamp
        }));

        emit FeedbackSubmitted(agentId, msg.sender, score);
    }

    function getFeedbackCount(bytes32 agentId) external view returns (uint256) {
        return agentFeedback[agentId].length;
    }
}
