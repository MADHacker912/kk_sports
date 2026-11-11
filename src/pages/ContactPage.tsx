import React, { useState } from 'react';
import { DISPLAY_PHONE } from '../utils/whatsapp';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Cricket Equipment');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `*STORE INQUIRY - K.K. SPORTS*\n\n` +
      `*Name:* ${name || 'Customer'}\n` +
      `*Phone:* ${phone || 'Not provided'}\n` +
      `*Interest:* ${category}\n` +
      `*Message:* ${message || 'Inquiring about store visit / equipment availability'}\n\n` +
      `_Sent from K.K. Sports Web Portal_`;

    window.open(
      `https://wa.me/919569886010?text=${encodeURIComponent(formatted)}`,
      '_blank'
    );
  };

  return (
    <div className="w-full bg-[#F8F7F3] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Top Hero Container */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE6DC] border border-[#DDD8CC] text-xs font-headline font-semibold text-[#52634B] tracking-wide mb-6">
          <MapPin className="w-3.5 h-3.5 text-[#52634B]" />
          <span>VISIT US · 44/319, MESTON ROAD, PARADE, KANPUR</span>
        </div>

        <h1 className="font-headline text-3xl sm:text-5xl font-bold tracking-tight text-[#272923] leading-tight mb-6">
          The Flagship Sanctuary. <br />
          Experience Equipment Before You Play.
        </h1>

        <p className="font-body text-base sm:text-lg text-[#77776F] max-w-3xl leading-relaxed">
          Whether you need to test the sweet spot of an English willow bat, get a badminton frame restrung, or procure sports day kits for your academy, our specialists are ready to assist you.
        </p>
      </div>

      {/* Main Grid: Store Info Cards & Message Form */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
        {/* Left Column: Store Details (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#DDD8CC] shadow-xs">
            <div className="flex items-start gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] flex items-center justify-center text-[#52634B] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline text-base font-bold text-[#272923]">Store Address</h3>
                <p className="font-body text-xs text-[#77776F] mt-1 leading-relaxed">
                  44/319, Meston Road, Parade,<br />
                  Kanpur, Uttar Pradesh – 208001
                </p>
                <p className="font-body text-[11px] text-[#52634B] mt-2 font-medium">
                  Landmark: Near historic Parade Market Junction
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#F1EFE8] flex items-start gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] flex items-center justify-center text-[#52634B] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline text-base font-bold text-[#272923]">Operating Hours</h3>
                <div className="font-body text-xs text-[#77776F] mt-1 space-y-1">
                  <p><span className="text-[#272923] font-medium">Monday – Saturday:</span> 10:30 AM – 8:30 PM</p>
                  <p><span className="text-[#272923] font-medium">Sunday:</span> 11:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#F1EFE8] flex items-start gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] flex items-center justify-center text-[#52634B] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline text-base font-bold text-[#272923]">Direct Helpline</h3>
                <p className="font-body text-xs text-[#77776F] mt-1">
                  {DISPLAY_PHONE}
                </p>
                <p className="font-body text-[11px] text-[#77776F] mt-0.5">
                  Available for phone calls &amp; WhatsApp inquiries
                </p>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=44/319+Meston+Road+Parade+Kanpur+208001"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#F1EFE8] hover:bg-[#EAE6DC] text-[#272923] font-headline text-xs font-semibold text-center transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-[#EAE6DC] border border-[#DDD8CC] text-xs font-body text-[#77776F]">
            <p className="font-headline font-bold text-[#272923] mb-1">Parking &amp; Access Tip</p>
            <p>Two-wheeler parking available immediately outside store. For four-wheelers, Parade municipal parking area is situated a short 2-minute walk away.</p>
          </div>
        </div>

        {/* Right Column: Contact & Visit Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DDD8CC] p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#F1EFE8] flex items-center justify-center text-[#52634B]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-headline text-xl font-bold text-[#272923]">
                Connect with the Meston Road Counter
              </h2>
              <p className="font-body text-xs text-[#77776F]">
                Our staff answers immediately during store hours
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-body text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-headline text-xs font-semibold text-[#272923] mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CC] bg-[#F8F7F3] text-[#272923] focus:outline-none focus:border-[#52634B] focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block font-headline text-xs font-semibold text-[#272923] mb-1.5">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98390 XXXXX"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CC] bg-[#F8F7F3] text-[#272923] focus:outline-none focus:border-[#52634B] focus:bg-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-headline text-xs font-semibold text-[#272923] mb-1.5">
                Area of Interest
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CC] bg-[#F8F7F3] text-[#272923] focus:outline-none focus:border-[#52634B] focus:bg-white text-xs"
              >
                <option value="Cricket Equipment (SS / SG English Willow)">Cricket Equipment (SS / SG English Willow)</option>
                <option value="Atelier Services (Bat Knocking / Oiling / Toe Guard)">Atelier Services (Bat Knocking / Oiling / Toe Guard)</option>
                <option value="Badminton & Precision Racket Restringing">Badminton &amp; Precision Racket Restringing</option>
                <option value="Match Footballs (Cosco / Nivia) & Shin Guards">Match Footballs (Cosco / Nivia) &amp; Shin Guards</option>
                <option value="School / Academy Bulk Equipment Supply">School / Academy Bulk Equipment Supply</option>
                <option value="Recreational Indoor Games & Toys">Recreational Indoor Games &amp; Toys</option>
              </select>
            </div>

            <div>
              <label className="block font-headline text-xs font-semibold text-[#272923] mb-1.5">
                Message / Equipment Requirement
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let us know what you are looking for or any questions regarding bat grain, weight, or availability..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CC] bg-[#F8F7F3] text-[#272923] focus:outline-none focus:border-[#52634B] focus:bg-white text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#272923] text-white hover:bg-[#3D4037] font-headline text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message to WhatsApp Desk</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
