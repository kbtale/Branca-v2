import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ContactModal.css';

interface ContactModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ContactModal({ isOpen: propIsOpen, onClose: propOnClose }: ContactModalProps) {
  const [isOpen, setIsOpen] = useState(propIsOpen || false);
  
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    
    window.addEventListener('openContactModal', handleOpen);
    window.addEventListener('closeContactModal', handleClose);
    
    return () => {
      window.removeEventListener('openContactModal', handleOpen);
      window.removeEventListener('closeContactModal', handleClose);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="neu-modal glassmorphic w-full max-w-lg p-6 rounded-2xl text-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Contacto</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="neu-button-sm w-8 h-8 rounded-full flex items-center justify-center hover:text-club-green transition-colors"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Nombre</label>
                  <input
                    type="text"
                    className="w-full neu-input bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-club-green"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full neu-input bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-club-green"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Mensaje</label>
                  <textarea
                    className="w-full neu-input bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-club-green h-32 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-club-green-light hover:bg-club-green-dark hover:scale-105 text-white py-2 px-4 rounded-lg transition-all duration-200 shadow-lg"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
