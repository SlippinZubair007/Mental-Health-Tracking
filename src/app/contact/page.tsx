"use client"
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Message sent successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-light text-white/90 leading-tight">
                Let's
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                  Connect
                </span>
              </h1>
              <p className="text-lg text-white/70 font-light max-w-md">
                Reach out to us for any inquiries, feedback, or support. We're here to help you on your mental health journey.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-white/90 font-medium">Email</p>
                  <p className="text-white/60">Mindflow@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <Phone className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white/90 font-medium">Phone</p>
                  <p className="text-white/60">111 300 300</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-white/90 font-medium">Location</p>
                  <p className="text-white/60">Pakistan, Lahore</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Message</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-white/40 text-sm">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/40"></div>
            <span>We'll get back to you within 24 hours</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}