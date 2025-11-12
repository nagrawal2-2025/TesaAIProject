import { useState } from 'react';
import LandingPage from './components/LandingPage';
import UseCaseOverview from './components/UseCaseOverview';
import { sampleUseCases } from './data/sampleData';
import { LanguageProvider } from './contexts/LanguageContext';

type Screen = 'landing' | 'overview';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');

  return (
    <LanguageProvider>
      {currentScreen === 'landing' ? (
        <LandingPage onStartJourney={() => setCurrentScreen('overview')} />
      ) : (
        <UseCaseOverview
          useCases={sampleUseCases}
          onBackToHome={() => setCurrentScreen('landing')}
        />
      )}
    </LanguageProvider>
  );
}

export default App;
