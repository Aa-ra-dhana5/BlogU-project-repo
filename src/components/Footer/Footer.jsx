import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-10 mt-auto">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo & Copyright */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4">
                <Logo width="100px" />
              </div>
              <p className="text-sm opacity-90">&copy; 2025 BlogU. All Rights Reserved.</p>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="w-1/2 md:w-1/4 lg:w-1/6 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul>
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                <li key={item} className="mb-2">
                  <Link className="text-white opacity-80 hover:opacity-100 transition duration-300" to="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/2 md:w-1/4 lg:w-1/6 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul>
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                <li key={item} className="mb-2">
                  <Link className="text-white opacity-80 hover:opacity-100 transition duration-300" to="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/4 lg:w-1/6">
            <h3 className="text-lg font-semibold mb-4">Legals</h3>
            <ul>
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                <li key={item} className="mb-2">
                  <Link className="text-white opacity-80 hover:opacity-100 transition duration-300" to="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
