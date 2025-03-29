import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Mail, Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              <span className='bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent'>
                Job
              </span>
              <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                Nova
              </span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Connecting talent with opportunities. Find your dream job or perfect candidate with JobNova.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="/about" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group">
                  <span className="w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/jobs" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group">
                  <span className="w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  Find Jobs
                </a>
              </li>
              <li>
                <a href="/employers" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group">
                  <span className="w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  For Employers
                </a>
              </li>
              <li>
                <a href="/career-advice" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group">
                  <span className="w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  Career Advice
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Resources
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group">
                  <span className="w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group">
                  <span className="w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group">
                  <span className="w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center group">
                  <span className="w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mx-4">Stay Updated</h3>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4 text-sm">Get the latest job opportunities delivered to your inbox.</p>
              <div className="space-y-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-50/50 border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                  Subscribe
                  <Mail className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/80 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} JobNova. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { Icon: Facebook, color: 'hover:text-blue-600' },
                { Icon: Twitter, color: 'hover:text-blue-400' },
                { Icon: Linkedin, color: 'hover:text-blue-700' },
                { Icon: Instagram, color: 'hover:text-pink-600' },
                { Icon: Github, color: 'hover:text-gray-900' }
              ].map(({ Icon, color }, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`text-gray-400 ${color} transition-all duration-300 hover:scale-110 transform`}
                  aria-label={Icon.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;