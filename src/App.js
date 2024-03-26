import { useState } from 'react';
import { ethers } from "ethers";
import './App.css';

function App() {
  //state variables
  const [tokens, setTokens] = useState([]);
  const [address, setAddress] = useState("");
  const [eth,setEth] = useState();
 
  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setAddress(address);
    fetchEth();
    fetchTokens()
      .then((data) => {
        setTokens(data.assets);
      })
      .catch((err) => setTokens([]));
    };

    const fetchTokens = async () => {
      if (!ethers.isAddress(address)){
        alert("Please enter a valid Ethereum wallet address");
        return;
      }
      const provider = new ethers.JsonRpcProvider(
        "https://greatest-wiser-tab.quiknode.pro/5547b455e95e1f15626cfb9e8045daa549389c9c/"
      );
      const tokens = await provider.send("qn_getWalletTokenBalance",{
        wallet: address,
        // contracts: []
        contracts: [
          "0xdAC17F958D2ee523a2206206994597C13D831ec7",//USDT
          "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",//BNB
          "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",//USDC
          "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", //stETH
          "0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1",//TONCOIN
          "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", //SHIB
          "0x514910771AF9Ca656af840dff83E8264EcF986CA", //Link


        ]
      });
      return tokens;
    };

    const fetchEth = async () => {
      const provider = new ethers.JsonRpcProvider(
        "https://greatest-wiser-tab.quiknode.pro/5547b455e95e1f15626cfb9e8045daa549389c9c/"
        );
      //fetch ETH balance
      const eth = await provider.send("eth_getBalance", [address, "Latest"]);
      
      setEth(eth);
    };

    return(
      <div className="h-screen w-screen justify-center space-x-3 ml-5">
      <div className="flex space-x-3 w-screen h-14 ml-2 mt-10">
        <form 
          onSubmit={handleSubmit}
          className='w-6/12 h-15 relative block overflow-hidden rounded-md border 
          border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:rinf-1 foucs-within:rinf-blue-600
          dark:border-gray-700 dark:bg-gray-800'>
          
          <input
          onChange={(e) => setAddress(e.target.value)}
          type='text' placeholder='Enter your Address here '
          className='mt-1 w--full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'/>
          <button
          type="submit"
          className="rounded-lg top-1 right-1 bottom-1 border absolute w-42 text-sm justify-center bg-blue-400
          text-white p-3 font-bold"
          >
            Show me the tokens</button>
        </form>
      </div>
      {eth &&(
        <div className='relative mt-10 text-gray-900'>
          ETH balance:&nbsp; <strong>{ethers.formatEther(eth)}</strong>
          </div>
      )}

      {tokens.length > 0 && (
        <div className='relative overflow-x-auto justify-center space-x-3 w-6/12 h-140 mt-10 mb-10'>
          <h1 className='text-3xl'>Tokens</h1>
          <table>
            <thead>
              <tr>
                <th className='whitespace-nowrap px-4 py-4 text-left font-bold'>Name</th>
                <th className='whitespace-nowrap px-4 py-4 text-left font-bold'>Symbol</th>
                <th className='whitespace-nowrap px-4 py-4 text-left font-bold'>Balance</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {tokens.map((token, index) => (
                <tr key={index}>
                    {token.symbol && (
                      <>
                      <td className='whitespace-nowrap px-4 py-4 text-blue-500'>{token.name}</td>
                      <td className='whitespace-nowrap px-4 py-4 text-blue-500'>{token.symbol}</td>
                      <td className='whitespace-nowrap px-4 py-4 text-blue-500'>{ethers.formatUnits(token.amount, token.decimals)}</td>
                      </>
                    )}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      ) }
    </div>
    )  
}
export default App;
