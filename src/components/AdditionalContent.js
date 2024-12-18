import React from 'react';

function AdditionalContent() {
  const tips = [
    {
      id: 1,
      title: 'Pack Light',
      description: 'Bring only what you need to make your travel easier and more enjoyable.'
    },
    {
      id: 2,
      title: 'Stay Hydrated',
      description: 'Drink plenty of water, especially when flying or in hot climates.'
    },
    {
      id: 3,
      title: 'Learn Basic Phrases',
      description: 'Knowing a few words in the local language can go a long way.'
    },
    {
      id: 4,
      title: 'Keep Copies of Important Documents',
      description: 'Always have a backup of your passport and travel documents.'
    }
  ];

  return (
    <div className="additional-content">
      <h2 className="section-title">Travel Tips</h2>
      <div className="tips-container">
        {tips.map((tip) => (
          <div key={tip.id} className="tip-card">
            <h3 className="tip-title">{tip.title}</h3>
            <p className="tip-description">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdditionalContent; 