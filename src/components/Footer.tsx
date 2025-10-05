
import Link from 'next/link';
import { Shield, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="font-bold text-lg">LIC Agent</h3>
                <p className="text-sm text-gray-400">Raththi Saravanan</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Securing your family's future with trusted LIC policies and expert financial guidance.
            </p>
            <div className="flex space-x-4">
                <a href="https://www.facebook.com/srathi.financialadvisor" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                </a>
                <a href="https://www.instagram.com/rathi.saravanan.rshv_we4/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                </a>
                <a href="https://www.youtube.com/@GetFinancialindependence" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/life-insurance" className="text-gray-400 hover:text-white transition-colors">Life Insurance</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Term Plans</span></li>
              <li><span className="text-gray-400">Endowment Plans</span></li>
              <li><span className="text-gray-400">Money Back Plans</span></li>
              <li><span className="text-gray-400">Pension Plans</span></li>
              <li><span className="text-gray-400">ULIPs</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-400">+91 99019 97606</p>
                  <p className="text-gray-400">+91 73377 36767</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                <p className="text-gray-400">mailmerathi.saravanan@gmail.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <p className="text-gray-400">Siddartha Sapphire,<br />Kudlu Main Road,<br />Bangalore - 560068</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Designed, Developed & Maintained by Chang Group of IT Solutions | LIC is a registered trademark of Life Insurance Corporation of India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
