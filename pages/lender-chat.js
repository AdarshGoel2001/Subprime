import { useState } from 'react';
import axios from 'axios';
import { Chat } from "@pushprotocol/uiweb";

export default function LenderChat() {
  return(
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-800">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl ring-4 ring-blue-200">
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
          Lender Chat
        </h1>
        <div className="random">
          <Chat
            account="0x6430C47973FA053fc8F055e7935EC6C2271D5174" //user address
            supportAddress="0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d" //support address
            apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
            env="staging"
          />
        </div>
      </div>
    </div>
  );
}