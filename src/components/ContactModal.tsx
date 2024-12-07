import { useState } from 'react';
import '../styles/ContactModal.css';

interface ContactModalProps {
  defaultOpen?: boolean;
}

export default function ContactModal({ defaultOpen = false }: ContactModalProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-modal-container">
      {isOpen && (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/20 focus:border-club-green-light focus:outline-none focus:ring-2 focus:ring-club-green-light"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/20 focus:border-club-green-light focus:outline-none focus:ring-2 focus:ring-club-green-light"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/20 focus:border-club-green-light focus:outline-none focus:ring-2 focus:ring-club-green-light"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-club-green-light hover:bg-club-green-dark text-white font-bold py-2 px-8 rounded-lg transition-colors duration-200"
            >
              Enviar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
