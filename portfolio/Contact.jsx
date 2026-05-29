import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', msg: '' });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', msg: 'Please fill in all fields.' });
      setIsSubmitting(false);
      return;
    }

    try {
      window.location.href = `mailto:sahilsharma092006@gmail.com?subject=Portfolio Contact from ${form.name}&body=${form.message} (%0A%0AFrom: ${form.email})`;
      setStatus({ type: 'success', msg: 'Email client opened! Send the message to sahilsharma092006@gmail.com' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({ type: 'error', msg: 'Failed to open email client.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section text-white flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
      <div className="flex-1">
        <h3 className="text-3xl font-bold mb-4">Send a Message</h3>
        <p className="text-gray-400 mb-8">I will reply to your email within 24 hours.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none font-medium focus:border-cyan-400 transition-colors"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none font-medium focus:border-cyan-400 transition-colors"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="What do you want to say?"
            value={form.message}
            onChange={handleChange}
            required
            className="p-4 bg-white/5 border border-white/10 rounded-xl outline-none font-medium focus:border-cyan-400 transition-colors resize-none"
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-400 text-black py-4 px-8 rounded-xl outline-none font-bold shadow-lg transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Opening Client...' : 'Send Message'}
          </button>

          {status.msg && (
            <p className={`text-sm font-medium mt-2 ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {status.msg}
            </p>
          )}
        </form>
      </div>
      
      <div className="flex-1 flex flex-col gap-6 pt-4">
        <h3 className="text-2xl font-bold mb-2">Connect Directly</h3>
        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-400 transition-colors">
          <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center font-bold text-xl">@</div>
          <div>
            <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">Email</p>
            <a href="mailto:sahilsharma092006@gmail.com" className="text-sm font-medium">sahilsharma092006@gmail.com</a>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500 transition-colors">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">in</div>
          <div>
            <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">LinkedIn</p>
            <a href="https://www.linkedin.com/in/sahil-sharma-1419773a9/" target="_blank" rel="noreferrer" className="text-sm font-medium">sahil-sharma-1419773a9</a>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-pink-500 transition-colors">
          <div className="w-12 h-12 bg-pink-500/10 text-pink-500 rounded-lg flex items-center justify-center font-bold text-xl">ig</div>
          <div>
            <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">Instagram</p>
            <a href="https://www.instagram.com/Saaahil_996" target="_blank" rel="noreferrer" className="text-sm font-medium">@Saaahil_996</a>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
          <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center font-bold text-xl">ph</div>
          <div>
            <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">Phone</p>
            <p className="text-sm font-medium">+91 7741089635</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;