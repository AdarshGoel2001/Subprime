import { useState } from 'react';
import axios from 'axios';

export default function KYC() {
  const ethAddress = "0xabcd"; // set eth address from metamask
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [aadhaar, setAadhaar] = useState();
  const [dob, setDob] = useState();

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [cid, setCid] = useState("randomcidhere");
  const [qrLink, setQrLink] = useState("https://api-staging.polygonid.com/v1/offers-qrcode/2010c6a2-bbff-45ae-90a2-cb82bd3c49e7/download?sessionID=f3b30d04-b741-47c9-8a5a-118c05872059");

  const formSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let body = {
      fname,
      lname,
      aadhaar,
      dob,
      ethAddress,
      haha: "hehe"
    }

    console.log(body)

    axios.post('http://localhost:8000/api/kyc', body)
      .then(response => {
        console.log(response)
        setCid(response.data.cid);
        setQrLink(response.data.qrLink);
        setLoading(false);
        setDone(true);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
  <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-800">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl ring-4 ring-blue-200 lg:max-w-xl">
      <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
          {done ? "Success!" : "Know Your Customer"}
      </h1>
      {done ? <div className="mt-4">
          <div className="mb-4 text-medium text-center font-semibold text-red-400">🤖 Beep-Boop. Last step:</div>
          <div className="mb-2">
            <label htmlFor="cid" className="block text-sm font-semibold text-blue-500">1. Store your CID</label>
            <input value={cid} disabled type="text" id="cid" name="cid" className="block w-full px-4 py-2 mt-2 text-blue-400 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
          </div>
          <div className="mb-2">
            <label htmlFor="qrLink" className="block text-sm font-semibold text-blue-500">2. Scan the QR using <b className="text-purple-600">Polygon App</b></label>
            <img src={qrLink} id="qrLink" name="qrLink" className="block mx-auto my-4 border border-blue-400 rounded-xl"/>
          </div>
        </div> : (
          <form className="mt-6" onSubmit={formSubmit}>
            <div className="mb-2 flex align-center">
              <div className="w-3/6 mr-2">
                <label htmlFor="first" className="block text-sm font-semibold text-blue-500">First Name</label>
                <input onChange={e => setFname(e.target.value)} required type="text" id="first" name="first" className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
              </div>
              <div className="w-3/6 ml-2">
                <label htmlFor="last" className="block text-sm font-semibold text-blue-500">Last Name</label>
                <input onChange={e => setLname(e.target.value)} required type="text" id="last" name="last" className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="photo" className="block text-sm font-semibold text-blue-500">Photo</label>
              <input onChange={e => console.log("hehe")} type="file" accept="image/png, image/jpeg" id="photo" name="photo" className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 file:cursor-pointer file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700"/>
            </div>
            <div className="mb-2">
              <label htmlFor="aadhaar" className="block text-sm font-semibold text-blue-500">Aadhaar</label>
              <input onChange={e => setAadhaar(e.target.value)} required type="text" id="aadhaar" name="aadhaar" className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
            </div>
            <div className="mb-2">
              <label htmlFor="dob" className="block text-sm font-semibold text-blue-500">Date Of Birth</label>
              <input onChange={e => setDob(e.target.value)} required type="date" id="dob" name="dob" className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
            </div>
            <div className="mb-2">
              <label htmlFor="ethereum" className="block text-sm font-semibold text-green-500">Ethereum Address</label>
              <input value={ethAddress} readOnly type="text" id="ethereum" name="ethereum" className="block w-full px-4 py-2 mt-2 text-blue-400 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
            </div>
            <div className="mt-6">
              <button type="submit" className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform ${loading ? "bg-blue-400" : "bg-blue-700 hover:bg-blue-600 focus:bg-blue-600"} rounded-md focus:outline-none`}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        )
      }
      <p className="mt-8 text-xs font-light text-center text-gray-700">
        {done ? "After finishing this step, you can " : "Already done with KYC? "}
        <a
          href="/proposal"
          className="font-medium text-blue-600 hover:underline"
        >
          Submit a Proposal
        </a>
      </p>
    </div>
  </div>)
}