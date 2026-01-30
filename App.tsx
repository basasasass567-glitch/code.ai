
import React, { useState, useEffect, useMemo } from 'react';
import { PersonalityData } from './types';
import { csvRawData } from './csvData';
import Dashboard from './components/Dashboard';
import Predictor from './components/Predictor';
import DatasetView from './components/DatasetView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'predictor' | 'dataset'>('dashboard');
  const [data, setData] = useState<PersonalityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Parse the massive CSV data provided
    const parseCSV = () => {
      const lines = csvRawData.split('\n');
      const result: PersonalityData[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const cols = lines[i].split(',');
        
        result.push({
          id: parseInt(cols[0]),
          Time_spent_Alone: parseFloat(cols[1]) || 0,
          Stage_fear: cols[2] as 'Yes' | 'No',
          Social_event_attendance: parseFloat(cols[3]) || 0,
          Going_outside: parseFloat(cols[4]) || 0,
          Drained_after_socializing: cols[5] as 'Yes' | 'No' | '',
          Friends_circle_size: parseFloat(cols[6]) || 0,
          Post_frequency: parseFloat(cols[7]) || 0,
          Personality: cols[8] as 'Extrovert' | 'Introvert'
        });
      }
      setData(result);
      setIsLoading(false);
    };

    parseCSV();
  }, []);

  const stats = useMemo(() => {
    if (data.length === 0) return null;
    const extroverts = data.filter(d => d.Personality === 'Extrovert');
    const introverts = data.filter(d => d.Personality === 'Introvert');
    
    return {
      total: data.length,
      extrovertCount: extroverts.length,
      introvertCount: introverts.length,
      avgFriendsExtro: extroverts.reduce((acc, curr) => acc + curr.Friends_circle_size, 0) / extroverts.length,
      avgFriendsIntro: introverts.reduce((acc, curr) => acc + curr.Friends_circle_size, 0) / introverts.length,
    };
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">PersonaAI</h1>
          </div>
          
          <nav className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {(['dashboard', 'predictor', 'dataset'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-500 font-medium">Processing Dataset...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && stats && <Dashboard data={data} stats={stats} />}
            {activeTab === 'predictor' && <Predictor data={data} />}
            {activeTab === 'dataset' && <DatasetView data={data} />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          Built with Gemini 3 Pro & React 18 &middot; High Efficiency Personality Classification
        </div>
      </footer>
    </div>
  );
};

export default App;
