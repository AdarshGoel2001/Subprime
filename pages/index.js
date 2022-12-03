import Head from "next/head";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState } from "react";
import deved from "../public/bank.gif";
import logo from "../public/our-logo.png";
import kyc from "../public/kyc.webp";
import borrower from "../public/borrower.webp";
import lender from "../public/lender.webp";
import Image from "next/image";
import { useWeb3Modal, Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const { address, isConnected } = useAccount();

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>SubPrime: Under-collateral, ZK Loans</title>
        <meta name="description" content="Loan application based on polygon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" bg-white px-10 dark:bg-gray-900 md:px-20 lg:px-20">
        <section className="min-h-screen">
          <nav className="py-2 mb-12 flex justify-between dark:text-white">
            <Image src={logo} width={165} height={75} />

            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className=" cursor-pointer text-2xl"
                />
              </li>
              <li></li>
            </ul>
          </nav>
          <div className="text-center p-10 py-10">
            <h2 className="text-5xl py-2 text-teal-600 font-medium dark:text-teal-400 md:text-6xl">
              SubPrime
            </h2>
            <h3 className="text-2xl py-2 dark:text-white md:text-3xl">
              Under Collateral & ZK Loans
            </h3>
            {!isConnected && (
              <button onClick={() => open()}>Connect Wallet</button>
            )}

            <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 relative overflow-hidden mt-20 md:h-96 md:w-96">
              <Image src={deved} layout="fill" objectFit="cover" />
            </div>
          </div>
        </section>
        <section>
          <div>
            <h3 className="text-3xl py-1 dark:text-white ">How it Works</h3>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              Solving the biggest
              <span className="text-teal-500"> Banking </span>
              Problem by providing{" "}
              <span className="text-teal-500"> Under Collateralized </span>
              Loans
            </p>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              We provide loans by ZK Proofs
            </p>
          </div>
          <div className="lg:flex gap-10">
            <div className="text-center shadow-lg p-10 rounded-xl my-10  dark:bg-white flex-1">
              <Image src={borrower} width={300} height={200} />
              <h3 className="text-lg font-medium pt-8 pb-2  ">Borrower</h3>
              <p className="py-2">Cds;kadsjbfasdkjbfsad;;vksdajb;dsv</p>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
              <Image src={lender} width={300} height={200} />
              <h3 className="text-lg font-medium pt-8 pb-2 ">Lender</h3>
              <p className="py-2">waiefppfbiuwebfpuwebfpwuebfpuiew</p>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
              <Image src={kyc} width={300} height={200} />
              <h3 className="text-lg font-medium pt-8 pb-2 ">KYC Verifier</h3>
              <p className="py-2">d;sandfnsaod;fnosa;dnfosdaknfo;nsd</p>
            </div>
          </div>
        </section>
        <section className="py-10">
          <div>
            <h3 className="text-3xl py-1 dark:text-white ">Our Plans</h3>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              Solving the biggest
              <span className="text-teal-500"> Problem </span>
              in <span className="text-teal-500"> Banking </span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
