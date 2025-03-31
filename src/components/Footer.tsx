
import React from 'react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-slate-600 text-sm">
              Guardian Care Pro partners with National Crime Check to provide reliable background screening for care professionals.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'How It Works', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-600 hover:text-teal-600 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {['FAQ', 'Support', 'Legal Requirements', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-600 hover:text-teal-600 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Stay Connected</h3>
            <p className="text-slate-600 text-sm mb-4">
              Subscribe to our newsletter for updates on compliance requirements.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="rounded-l-md border border-slate-300 px-3 py-2 text-sm flex-grow"
              />
              <Button className="rounded-l-none bg-teal-600 hover:bg-teal-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-slate-200 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Guardian Care Pro. All rights reserved.</p>
          <p className="mt-1">
            <small>
              National Crime Check is a registered trademark and service. Guardian Care Pro is not affiliated with NCC.
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
