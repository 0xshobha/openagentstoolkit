import { ethers } from "ethers";

/**
 * Implements ERC-8128 HTTP Message Signatures with Ethereum.
 * Signs outgoing requests so the receiver can verify the agent identity.
 */
export class RequestSigner {
  constructor(private wallet: ethers.Wallet) {}

  /**
   * Generates headers for an HTTP request based on RFC 9421.
   * Note: This is a simplified implementation for demonstration.
   */
  async signRequest(method: string, url: string, body: string): Promise<Record<string, string>> {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const contentDigest = ethers.keccak256(ethers.toUtf8Bytes(body));
    
    const signatureInput = `sig1=("@method" "@path" "content-digest" "timestamp");created=${timestamp}`;
    
    // Construct the signing string according to HTTP message signatures
    const urlObj = new URL(url);
    const signingString = `\"@method\": ${method.toLowerCase()}\n\"@path\": ${urlObj.pathname}\n\"content-digest\": ${contentDigest}\n\"timestamp\": ${timestamp}\n\"@signature-params\": ${signatureInput}`;

    const signature = await this.wallet.signMessage(signingString);

    return {
      "Content-Digest": `sha-256=:${contentDigest.slice(2)}:`,
      "Signature-Input": `sig1=${signatureInput}`,
      "Signature": `sig1=:${signature.slice(2)}:`,
      "X-Agent-Address": this.wallet.address
    };
  }
}
