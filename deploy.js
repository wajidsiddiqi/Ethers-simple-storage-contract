const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

let main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying plaese wait...");
  const contract = await contractFactory.deploy();
  // console.log(contract);
  // const transactionReceipt =
  await contract.deployTransaction.wait(1);
  console.log(`Contract Address: ${contract.address}`);
  // console.log(transactionReceipt);

  //* get the favorite number
  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current fav number: ${currentFavoriteNumber}`);
  const transactionResponse = await contract.store(5);
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedfavoritenumber = await contract.retrieve();
  console.log(`Updated fav number: ${updatedfavoritenumber}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
