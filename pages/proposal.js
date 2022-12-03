import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useState } from 'react';

const PK = 'f80f8f01a2a34a6977d09f84ecf03eadcd4a4f73a52cee71218504964c6c33dc'; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async(proposal) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `NEW LOAN PROPOSAL`,
        body: proposal
      },
      payload: {
        title: `New loan proposal!`,
        body: proposal,
        cta: '',
        img: ''
      },
      channel: 'eip155:5:0xf6f1058c985572422b6ed0B5Fd4Af2Ba2704922B', // your channel address
      env: 'staging'
    });
    // apiResponse?.status === 204, if sent successfully!
    console.log('API repsonse: ', apiResponse);
    return apiResponse?.status === 204;
  } catch (err) {
    console.error('Error: ', err);
  }
  return;
}

export default function Proposal() {
  const [amount, setAmount] = useState();
  const [time, setTime] = useState();

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const proposal = `hyperboy is requesting a loan of ${amount} DAI for a period of ${time} months`

    const sent = await sendNotification(proposal);
    setLoading(false);
    if (sent) {
      setDone(true);
    }
  }

  return (<div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-800">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl ring-4 ring-blue-200 lg:max-w-xl">
      <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
        {done ? "Submitted!" : "Submit Proposal"}
      </h1>
      {done ? <div className="mt-4">
        <div className="mb-4 text-medium text-center font-semibold text-green-500">✅ Your proposal is sent to lenders, you will be notified when someone is interested.</div>
      </div> : <form className="mt-6" onSubmit={formSubmit}>
        <div className="mb-2">
          <label htmlFor="amount" className="block text-sm font-semibold text-blue-500">Amount (DAI)</label>
          <input onChange={e => setAmount(e.target.value)} required type="text" id="amount" name="amount" className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>
        <div className="mb-2">
          <label htmlFor="time" className="block text-sm font-semibold text-blue-500">Time (in months)</label>
          <input onChange={e => setTime(e.target.value)} required min="0" type="number" id="time" name="time" className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>
        <div className="mt-6">
          <button type="submit" className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform ${loading ? "bg-blue-400" : "bg-blue-700 hover:bg-blue-600 focus:bg-blue-600"} rounded-md focus:outline-none`}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>}
      <p className="mt-8 text-xs font-light text-center text-gray-700">
        {done ? "Meanwhile you can read our " : "Before proceeding, please read our "}
        <a
          href="/tnc"
          className="font-medium text-blue-600 hover:underline"
        >
          Terms and Conditions
        </a>
      </p>
    </div>
  </div>);
}