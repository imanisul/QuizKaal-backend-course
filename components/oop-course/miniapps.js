import React, { useState } from 'react';

export function Ch1App() {
  const [car, setCar] = useState({ model: 'Unknown', speed: 0 });
  return (
    <div className="p-4 bg-gray-900 rounded text-white flex flex-col items-center">
      <h3 className="font-bold mb-4">Object Builder: Car</h3>
      <div className="mb-4">Model: {car.model} | Speed: {car.speed} km/h</div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 rounded" onClick={() => setCar({ ...car, model: 'Tesla' })}>Set Model</button>
        <button className="px-4 py-2 bg-green-600 rounded" onClick={() => setCar({ ...car, speed: car.speed + 10 })}>Accelerate</button>
      </div>
    </div>
  );
}

export function Ch2App() {
  const [balance, setBalance] = useState(100);
  return (
    <div className="p-4 bg-gray-900 rounded text-white flex flex-col items-center">
      <h3 className="font-bold mb-4">Bank Account Simulator</h3>
      <div className="text-2xl mb-4 font-mono">${balance}</div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-red-600 rounded" onClick={() => setBalance(b => Math.max(0, b - 50))}>Withdraw $50</button>
        <button className="px-4 py-2 bg-green-600 rounded" onClick={() => setBalance(b => b + 50)}>Deposit $50</button>
      </div>
    </div>
  );
}

export function Ch3App() {
  const [locked, setLocked] = useState(true);
  return (
    <div className="p-4 bg-gray-900 rounded text-white flex flex-col items-center">
      <h3 className="font-bold mb-4">Secure Vault (Encapsulation)</h3>
      <div className="mb-4">{locked ? '🔒 Locked (Data Hidden)' : '🔓 Unlocked (Data Visible: Secret=42)'}</div>
      <button className="px-4 py-2 bg-purple-600 rounded" onClick={() => setLocked(!locked)}>Toggle Access</button>
    </div>
  );
}

export function Ch4App() {
  return (
    <div className="p-4 bg-gray-900 rounded text-white flex gap-4 justify-center">
      <div className="p-4 border border-blue-500 rounded"><h4 className="font-bold">Stack</h4><p className="text-sm">Primitives, Pointers</p></div>
      <div className="p-4 border border-green-500 rounded"><h4 className="font-bold">Heap</h4><p className="text-sm">Objects, Arrays</p></div>
    </div>
  );
}

export function Ch5App() {
  const [mode, setMode] = useState('user');
  return (
    <div className="p-4 bg-gray-900 rounded text-white flex flex-col items-center">
      <h3 className="font-bold mb-4">Abstraction: Coffee Machine</h3>
      <div className="flex gap-4 mb-4">
        <button className={`px-4 py-2 rounded ${mode === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`} onClick={() => setMode('user')}>User View</button>
        <button className={`px-4 py-2 rounded ${mode === 'engineer' ? 'bg-red-600' : 'bg-gray-700'}`} onClick={() => setMode('engineer')}>Internal View</button>
      </div>
      <div className="p-4 border border-dashed rounded w-full text-center">
        {mode === 'user' ? '☕ [Press Button to Brew]' : '⚙️ Water Temp: 92°C | Pressure: 9 bar | Pump: Active'}
      </div>
    </div>
  );
}

export function Ch6App() {
  return (
    <div className="p-4 bg-gray-900 rounded text-white text-center">
      <h3 className="font-bold mb-4">Inheritance Tree</h3>
      <div className="p-2 border border-blue-500 inline-block rounded mb-2">Animal (eat, sleep)</div>
      <br/>↓<br/>
      <div className="p-2 border border-green-500 inline-block rounded">Dog (bark) inherits (eat, sleep)</div>
    </div>
  );
}

export function Ch7App() {
  const [animal, setAnimal] = useState('Dog');
  const sound = animal === 'Dog' ? 'Woof!' : animal === 'Cat' ? 'Meow!' : 'Quack!';
  return (
    <div className="p-4 bg-gray-900 rounded text-white flex flex-col items-center">
      <h3 className="font-bold mb-4">Polymorphism (makeSound)</h3>
      <select className="mb-4 bg-gray-800 text-white p-2 rounded" value={animal} onChange={e => setAnimal(e.target.value)}>
        <option>Dog</option><option>Cat</option><option>Duck</option>
      </select>
      <div className="text-xl italic">"{sound}"</div>
    </div>
  );
}

export function Ch8App() {
  return <div className="p-4 bg-gray-900 rounded text-white text-center">Engine is composed inside Car (Cannot exist without Car)</div>;
}

export function Ch9App() {
  return <div className="p-4 bg-gray-900 rounded text-white text-center">Professor aggregated in Department (Can exist without Department)</div>;
}

export function Ch10App() {
  const [error, setError] = useState(false);
  return (
    <div className="p-4 bg-gray-900 rounded text-white flex flex-col items-center">
      <h3 className="font-bold mb-4">Exception Handling (Try/Catch)</h3>
      <button className="px-4 py-2 bg-red-600 rounded mb-4" onClick={() => setError(true)}>Throw Error</button>
      {error && <div className="p-2 bg-red-900 rounded text-red-200">Error caught! Program didn't crash. <button onClick={() => setError(false)} className="underline ml-2">Reset</button></div>}
    </div>
  );
}

export function Ch11App() {
  return <div className="p-4 bg-gray-900 rounded text-white text-center font-mono">file.open('data.txt') -> read() -> file.close()</div>;
}

export function Ch12App() {
  return (
    <div className="p-4 bg-gray-900 rounded text-white flex justify-center gap-4">
      <div className="animate-pulse p-2 bg-blue-600 rounded">Thread 1 (UI)</div>
      <div className="animate-pulse p-2 bg-purple-600 rounded" style={{ animationDelay: '0.5s' }}>Thread 2 (Network)</div>
    </div>
  );
}
