import { useState } from 'react';
import { ethers } from "ethers";
import './App.css';

function App() {
  //state variables
  const [tokens, setTokens] = useState([]);
  const [address, setAddress] = useState("");
 
  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setAddress(address);
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
        contracts: []
      });
      return tokens;
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
                  <td className='whitespace-nowrap px-4 py-4 text-blue-500'>{token.name}</td>
                  <td className='whitespace-nowrap px-4 py-4 text-blue-500'>{token.symbol}</td>
                  <td className='whitespace-nowrap px-4 py-4 text-blue-500'>{ethers.formatUnits(token.amount, token.decimals)}</td>
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
