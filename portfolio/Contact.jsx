import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, 'messages'), {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        message: form.message,
        createdAt: serverTimestamp(),
      });

      alert('Thank you! Your message has been sent.');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please check your Firebase rules.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto">
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="p-3 bg-tertiary rounded-lg outline-none border-none font-medium"
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="p-3 bg-tertiary rounded-lg outline-none border-none font-medium"
        />
        <textarea
          name="message"
          rows="7"
          placeholder="What do you want to say?"
          value={form.message}
          onChange={handleChange}
          required
          className="p-3 bg-tertiary rounded-lg outline-none border-none font-medium"
        />
        <button
          type="submit"
          className="bg-secondary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </section>
  );
};

export default Contact;