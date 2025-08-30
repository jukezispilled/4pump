'use client';
import { useState } from 'react';

export default function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Info Icon */}
      <button
        onClick={openModal}
        className="text-[#890000] underline cursor-pointer"
        aria-label="Information"
      >
        FAQ
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-4 border border-[#890000] max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#890000]">Info</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="text-gray-700 text-center">
              <p>
                4chan is a 4chan inspired platform for <a href="https://bonk.fun" className='inline text-blue-600 underline'>bonk.fun</a> and crypto culture. We aim to be the hub for major discourse of all crypto topics. Since we are heavily inspired by 4chan many of the same features the internet has loved for decades are available. For example the legendary greentext with &gt; and reply to post with &gt;&gt;. 4bonk was built by a dedicated team with a passion for crypto and the extreme culture that comes with it. We are a small team of traders, developers, and overall crypto-natives. We built 4pump because we believe there {`isn't`} anything like this for the general crypto culture. Enjoy the platform, we put our heart and souls into this! And {`don't`} forget to behave(as much as cryptopunks can be expected to)
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};