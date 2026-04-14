import React from "react";
import Logo from "./Logo";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content border-t border-white/10">
      <div className="footer p-10 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <Logo />
          <p className="text-sm opacity-70 leading-relaxed">
            Empowering the next generation with creative, fun, and safe learning tools.
          </p>
          {/* Social Links */}
          <div className="flex gap-4 text-xl mt-2">
            <a href="#" className="hover:text-primary transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-primary transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-primary transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-primary transition-colors"><FaLinkedin /></a>
          </div>
        </div>

        {/* Links */}
        <nav>
          <h6 className="footer-title text-primary tracking-widest uppercase">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
        </nav>

        <nav>
          <h6 className="footer-title text-primary tracking-widest uppercase">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>

        <nav>
          <h6 className="footer-title text-primary tracking-widest uppercase">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
        </nav>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-10 py-6 border-t border-white/5 text-center text-xs opacity-50">
        <p>© {new Date().getFullYear()} Hero Kids. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;