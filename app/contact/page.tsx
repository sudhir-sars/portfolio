'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://dummy-url.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="w-[70vw]">
        <div className="flex-col">
          <div className="container mx-auto px-4 py-8 text-white">
            <h1 className="font-bold text-3xl mb-6">Contact Me</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="px-5 button-primary outline-none rounded-lg p-2 w-full"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-semibold mb-2">
                  Email <span className="text-gray-400">(required)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="px-5 button-primary outline-none rounded-lg p-2 w-full"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="block font-semibold mb-2">
                  Mobile Number{' '}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  className="px-5 button-primary outline-none rounded-lg p-2 w-full"
                  onChange={handleChange}
                  value={formData.mobile}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  className="px-5 py-4 button-primary outline-none rounded-lg p-2 w-full"
                  onChange={handleChange}
                  value={formData.message}
                  required
                />
              </div>
              <button
                type="submit"
                className="button-primary px-8 py-3 rounded-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
