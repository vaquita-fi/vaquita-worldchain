import React from "react";

const page = () => {
  return (
    <>
      <div className="mt-2 bg-white border-solid px-6 py-4 border-1 border-b-4 border-black rounded-xl gap-2 flex flex-col">
        <p className="text-xl font-bold text-center">Wanna learn more?</p>
        <p>Checkout our social to learn more about Vaquita</p>
      </div>
      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => window.open("https://x.com/vaquitaprotocol", "_blank")}
          className="border-1 border-b-4 border-black rounded-xl flex flex-col w-1/2 items-center gap-2 px-4 py-2  hover:opacity-80"
        >
          {/* <FaXTwitter size={20} /> */}
          Twitter
        </button>
        <button
          onClick={() => window.open("https://t.me/vaquitaprotocol", "_blank")}
          className="border-1 border-b-4 border-black rounded-xl bg-gradient-to-r from-blue-100 to-purple-200 flex flex-col w-1/2 items-center gap-2 px-4 py-2 hover:opacity-80"
        >
          {/* <FaTelegram size={20} /> */}
          Telegram
        </button>
      </div>
    </>
  );
};

export default page;
