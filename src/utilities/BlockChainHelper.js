import Eth from "ethjs";
import ethereumjsabi from "ethereumjs-abi";

export default class BlockchainHelper {
  constructor(web3) {
    // eslint-disable-next-line no-undef
    this.web3 = new Web3(web3.currentProvider);
    this.eth = new Eth(web3.currentProvider);
    this.chainId = undefined;
    this.defaultAccount = undefined;
  }

  async initialize() {
    var web3Initiatized = false;
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.enable();
        this.initializeState();
        web3Initiatized = true;
      } catch (error) {
        return undefined;
      }
    } else if (typeof this.web3 !== "undefined") {
      this.initializeState();
      web3Initiatized = true;
    }
    return web3Initiatized;
  }

  initializeState() {
    window.ethjs = this.eth; //TODO - NETWORK CHANGE
  }

  async getAccount() {
    return new Promise(resolve => {
      if (typeof this.eth === "undefined") {
        resolve(undefined);
      }
      this.eth
        .accounts()
        .then(accounts => {
          if (accounts.length === 0) {
            this.defaultAccount = undefined;
            resolve(undefined);
          } else {
            if (
              typeof accounts[0] !== "undefined" &&
              this.defaultAccount !== accounts[0]
            ) {
              this.defaultAccount = accounts[0];
            }
            this.web3.eth.defaultAccount = this.defaultAccount; //TODO - NETWORK CHANGE
            resolve(this.defaultAccount);
          }
        })
        .catch(() => {
          resolve(undefined);
        });
    });
  }

  async getCurrentBlockNumber() {
    return new Promise(resolve => {
      if (typeof this.eth === "undefined") {
        resolve(undefined);
      }

      this.web3.eth.getBlockNumber((error, result) => {
        if (error) {
          resolve(undefined);
        } else {
          resolve(result);
        }
      });
    });
  }

  composeSHA3Message = (types, values) => {
    var sha3Message = ethereumjsabi.soliditySHA3(types, values);
    var msg = "0x" + sha3Message.toString("hex");
    return msg;
  };

  buffSignature = signed => {
    let stripped = signed.substring(2, signed.length);
    let byteSig = Buffer.from(stripped, "hex");
    let buff = new Buffer(byteSig);
    return buff;
  };
}
