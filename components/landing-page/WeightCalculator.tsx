'use client';

import { useState } from 'react';

export default function WeightCalculator() {
  const [weight, setWeight] = useState(220);
  const potentialLoss = Math.round(weight * 0.2);

  const handleWeightChange = (value: number) => {
    const newWeight = Math.max(100, Math.min(600, value));
    setWeight(newWeight);
  };

  return (
    <div className="md:w-1/2 w-full flex items-center justify-center p-6 rounded-3xl bg-white overflow-hidden">
      <div className="text-center md:text-left max-w-md w-full">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          How much weight can you shed by next spring?
        </h2>

        <hr className="my-5" />

        <div className="sema-info">
          <div className="sema-info-slider">
            <h3 className="py-3 text-lg font-semibold">Your current weight:</h3>
            
            <input
              name="weight"
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => handleWeightChange(Number(e.target.value))}
              className="input"
              min="100"
              max="600"
            />
            <br />

            <input
              name="weight_slider"
              id="weightSlider"
              type="range"
              value={weight}
              onChange={(e) => handleWeightChange(Number(e.target.value))}
              min="100"
              max="600"
              className="slider"
            />

            <div className="tag bg-[linear-gradient(164deg,#d2ffda_0%,#e6fbff_50%,#b5d3fd_100%)]">
              You could
              <br />
              easily lose:
              <div className="value">
                <span id="lbs">{potentialLoss}</span> <span>lbs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

