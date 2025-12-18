"use client";
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);

      const response = await fetch(
        "http://localhost/UmbrellaIdustrialServices/form_processing/traitement/contacteznous.php",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(result.message || "Erreur lors de la soumission.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur réseau est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {submitSuccess ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center shadow-lg animate-fade-in">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="text-amber-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-amber-900 mb-2">
            Contact Envoyé !
          </h3>
          <p className="text-amber-800">
            Merci pour votre intérêt. Nous examinerons votre demande et
            vous contacterons prochainement.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <section id="contact" className="py-20 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="mx-4 text-4xl md:text-5xl font-bold text-amber-900 font-serif">
                Contactez-nous
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Nous sommes à votre disposition pour répondre à <span className='text-amber-700'>toutes vos questions</span> et vous proposer des <span className='text-amber-700'>solutions adaptées à vos besoins</span>
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                  {/* Left side - Contact Info */}
                  <div className="bg-linear-to-br from-amber-700 to-amber-900 text-white p-8 md:w-2/5">
                    <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>

                    <div className="space-y-8">
                      <div className="flex items-start">
                        <div className="bg-amber-600 p-3 rounded-full mr-4">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Notre adresse</h4>
                          <p className="text-amber-100 mt-1">Akwa Nord<br /> à côté de Santa Lucia</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-amber-600 p-3 rounded-full mr-4">
                          <Phone size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Téléphone</h4>
                          <p className="text-amber-100 mt-1">+237 691 814 168</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-amber-600 p-3 rounded-full mr-4">
                          <Mail size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Email</h4>
                          <p className="text-amber-100 mt-1">sales@royalluxmeuble.com</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12">
                      <h4 className="font-semibold mb-3">Horaires d&apos;ouverture</h4>
                      <p className="text-amber-100">Lundi - Vendredi: 8h30 - 18h30</p>
                      <p className="text-amber-100">Samedi: 9h00 - 15h30</p>
                      <p className="text-amber-100">Dimanche: Fermé</p>
                    </div>
                  </div>

                  {/* Right side - Contact Form */}
                  <div className="p-8 md:w-3/5">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>

                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-gray-700 mb-1">Nom complet</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Votre nom"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="votre@email.com"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="subject" className="block text-gray-700 mb-1">Sujet</label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Sujet de votre message"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Votre message ici..."
                          ></textarea>
                        </div>

                        <div className="md:col-span-2 mt-2 flex flex-col sm:flex-row gap-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                          >
                            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                          </button>

                          <Link
                            href="/devis"
                            className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors text-center flex-1"
                          >
                            <span className="inline-block w-full">
                              Demander un devis
                            </span>
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ContactSection;