import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FAQS, RESTAURANT_INFO } from '../data/restaurantInfo';

export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen, showToast } = useCart();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    subject: 'General Feedback',
    message: '',
  });

  if (!isContactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.name.trim() || !feedback.message.trim()) {
      showToast('Please fill out your name and message.');
      return;
    }
    setFormSubmitted(true);
    showToast('Feedback submitted! Thank you.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsContactOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white text-neutral-900 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-neutral-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFBE24] text-neutral-950 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-xl uppercase tracking-wider text-white">
                Contact & Support
              </h3>
              <span className="text-xs text-neutral-400 font-mono">
                We're always here to listen and help
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsContactOpen(false)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Quick Contact Info Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#F7F4EF] border border-neutral-200">
              <Phone className="w-5 h-5 text-[#F5A623] mb-2" />
              <h5 className="font-heading font-bold text-xs uppercase text-neutral-950">
                Call Us
              </h5>
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-xs text-neutral-700 hover:text-black font-semibold mt-0.5 block">
                {RESTAURANT_INFO.phone}
              </a>
              <span className="text-[10px] text-neutral-500 block">Open 11:00 AM – 11:30 PM</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F4EF] border border-neutral-200">
              <Mail className="w-5 h-5 text-[#F5A623] mb-2" />
              <h5 className="font-heading font-bold text-xs uppercase text-neutral-950">
                Email Support
              </h5>
              <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-xs text-neutral-700 hover:text-black font-semibold mt-0.5 block">
                {RESTAURANT_INFO.email}
              </a>
              <span className="text-[10px] text-neutral-500 block">Avg. response under 2 hrs</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F4EF] border border-neutral-200">
              <MapPin className="w-5 h-5 text-[#F5A623] mb-2" />
              <h5 className="font-heading font-bold text-xs uppercase text-neutral-950">
                Flagship Store
              </h5>
              <p className="text-xs text-neutral-700 font-semibold mt-0.5">
                Connaught Place, Delhi
              </p>
              <span className="text-[10px] text-neutral-500 block">Dine-in & take-out</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <h4 className="font-heading font-bold text-base uppercase text-neutral-950 mb-3">
              Send Us a Message
            </h4>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h5 className="font-bold text-emerald-950 text-sm">
                  Thank You for Your Feedback!
                </h5>
                <p className="text-xs text-emerald-700">
                  Our manager has received your note and will get in touch if required.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Roy"
                      value={feedback.name}
                      onChange={(e) => setFeedback((p) => ({ ...p, name: e.target.value }))}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ananya@example.com"
                      value={feedback.email}
                      onChange={(e) => setFeedback((p) => ({ ...p, email: e.target.value }))}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your dining experience, party catering inquiry, or feedback..."
                    value={feedback.message}
                    onChange={(e) => setFeedback((p) => ({ ...p, message: e.target.value }))}
                    className="w-full text-xs p-3 rounded-xl border border-neutral-200"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#FFBE24]" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQs Accordion */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-base uppercase text-neutral-950 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F5A623]" />
              Frequently Asked Questions
            </h4>

            <div className="space-y-2">
              {FAQS.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left text-xs font-heading font-bold uppercase text-neutral-900 flex items-center justify-between gap-4"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-3.5 pt-0 text-xs text-neutral-600 leading-relaxed border-t border-neutral-200/60 bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
