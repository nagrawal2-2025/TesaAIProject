import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import UseCaseOverview from './components/UseCaseOverview';
import { UseCase } from './types';
import { LanguageProvider } from './contexts/LanguageContext';
import { useCaseApi } from './services/useCaseApi';

type Screen = 'landing' | 'overview';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUseCases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await useCaseApi.getAll();
      setUseCases(data);
    } catch (err) {
      console.error('Failed to fetch use cases:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch use cases');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentScreen === 'overview') {
      fetchUseCases();
    }
  }, [currentScreen]);

  return (
    <LanguageProvider>
      {currentScreen === 'landing' ? (
        <LandingPage onStartJourney={() => setCurrentScreen('overview')} />
      ) : (
        <UseCaseOverview
          useCases={useCases}
          onBackToHome={() => setCurrentScreen('landing')}
          isLoading={isLoading}
          error={error}
          onRefresh={fetchUseCases}
        />
      )}
    </LanguageProvider>
  );
}

export default App;
