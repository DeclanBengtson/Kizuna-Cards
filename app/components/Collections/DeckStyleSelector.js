// components/DeckStyleSelector.js
import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, X, Edit2, Save, XCircle } from 'lucide-react';


const DeckStyleSelector = ({ selectedStyle, setSelectedStyle }) => {
const [isOpen, setIsOpen] = useState(false);

const deckStyles = [
  { id: 1, name: 'Pink', color: 'bg-pink-500' },
  { id: 2, name: 'Green', color: 'bg-green-500' },
  { id: 3, name: 'Blue', color: 'bg-blue-500' },
  { id: 4, name: 'Purple', color: 'bg-purple-500' },
  { id: 5, name: 'Orange', color: 'bg-orange-500' },
  { id: 6, name: 'Christmas', color: 'bg-red-500' },
];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Deck Style</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between hover:border-gray-300 transition-all"
        >
          {selectedStyle ? (
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full ${selectedStyle.color}`} />
              <span>{selectedStyle.name}</span>
            </div>
          ) : (
            <span className="text-gray-500">Select a style</span>
          )}
          <Plus className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 p-2">
            <div className="grid grid-cols-2 gap-2">
              {deckStyles.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => {
                    setSelectedStyle(style);
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
                >
                  <div className={`w-4 h-4 rounded-full ${style.color}`} />
                  <span>{style.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckStyleSelector;