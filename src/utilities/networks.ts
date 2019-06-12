export const NETWORKS: Networks = {
  1: "Main Ethereum Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  42: "Kovan Test Network"
};

interface Networks {
  [key: number]: string;
}
