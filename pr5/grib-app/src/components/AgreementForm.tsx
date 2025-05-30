'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setAccepted } from '@/redux/agreementSlice';
import type { RootState } from '@/redux/store';

export default function AgreementForm() {
  const dispatch = useDispatch();
  const isAccepted = useSelector((state: RootState) => state.agreement.accepted);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAccepted(e.target.checked));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAccepted) {
      alert('Пользовательское соглашение принято!');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-white">Пользовательское соглашение</h1>
      
      <div className="mb-6 text-sm text-gray-300">
        <p className="mb-2">
          Настоящее Пользовательское соглашение регулирует отношения между пользователем и владельцем сайта.
          Используя данный сайт, вы соглашаетесь с условиями настоящего соглашения.
        </p>
        <p>
          Владелец сайта оставляет за собой право изменять условия данного соглашения без предварительного уведомления.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAccepted}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
            />
            <span className="ml-2 block text-sm text-gray-200">
              Я принимаю условия пользовательского соглашения
            </span>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={!isAccepted}
          className={`w-full py-2 px-4 rounded-md ${
            isAccepted
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Подтвердить
        </button>
      </form>
    </div>
  );
} 