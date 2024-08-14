'use client';

import { useState } from 'react';
import Footer from '../components/Footer';

export default function CoachingRequestClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    experience: '',
    dailyTrainingDuration: '',
    weeklyTrainingDays: '',
    currentProgram: '',
    nutrition: '',
    goals: '',
    message: '',
    phone: '', 
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('');

    const res = await fetch('/api/coaching-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setResponseMessage(
        'Koçluk talebiniz başarıyla iletildi. Size dönüş yapacağız!'
      );
    } else {
      setResponseMessage(`Talep gönderilemedi: ${data.message}`);
    }

    setFormData({
      name: '',
      email: '',
      age: '',
      gender: '',
      experience: '',
      dailyTrainingDuration: '',
      weeklyTrainingDays: '',
      currentProgram: '',
      nutrition: '',
      goals: '',
      message: '',
      phone: '', 
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="max-w-screen-md mx-auto p-4 mt-16 bg-white dark:bg-zinc-900 mb-6">
        {responseMessage && (
          <div className="mb-4 p-4 rounded bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 text-center">
            {responseMessage}
          </div>
        )}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Koçluk Talebi
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              İsim
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              E-posta
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Telefon
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Yaş
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Cinsiyet
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option value="">Seçiniz</option>
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Antrenman Tecrübesi (yıl)
            </label>
            <input
              type="number"
              name="experience"
              id="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="dailyTrainingDuration"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Günlük Antrenman Süresi (saat)
            </label>
            <input
              type="number"
              name="dailyTrainingDuration"
              id="dailyTrainingDuration"
              value={formData.dailyTrainingDuration}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="weeklyTrainingDays"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Haftalık Antrenman Günleri
            </label>
            <input
              type="number"
              name="weeklyTrainingDays"
              id="weeklyTrainingDays"
              value={formData.weeklyTrainingDays}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="currentProgram"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mevcut Program (Kardiyo, Ağırlık, Kombinasyon vb.)
            </label>
            <input
              type="text"
              name="currentProgram"
              id="currentProgram"
              value={formData.currentProgram}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="nutrition"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Beslenme Bilgileri (Öğün sayısı, diyet türü vb.)
            </label>
            <input
              type="text"
              name="nutrition"
              id="nutrition"
              value={formData.nutrition}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="goals"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Hedefler (Kilo verme, Kas kazanma, Performans artırma vb.)
            </label>
            <input
              type="text"
              name="goals"
              id="goals"
              value={formData.goals}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mesaj
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
