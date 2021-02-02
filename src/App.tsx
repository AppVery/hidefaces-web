import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img className="h-12 w-12" src={logo} alt="ChitChat Logo" />
          </div>
          <div>
            <div className="text-xl font-medium text-black">HideFaces.app</div>
            <p className="text-gray-500">Hello TailwindCss!</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
