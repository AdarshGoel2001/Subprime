import { useState } from 'react';
import axios from 'axios';

export default function BorrowerChat() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-800">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl ring-4 ring-blue-200 lg:max-w-xl">
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
          Borrower Chat
        </h1>
      </div>
    </div>
  )
}