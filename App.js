import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import TicketScreen from './screens/TicketScreen';

/**
 * Simple screen switcher (no React Navigation) so the prototype stays easy to read.
 * "home" shows the demo ticket list; "ticket" shows the full ticket UI.
 */
export default function App() {
  const [screen, setScreen] = useState('home');

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {screen === 'home' ? (
        <HomeScreen onOpenTicket={() => setScreen('ticket')} />
      ) : (
        <TicketScreen onBack={() => setScreen('home')} />
      )}
    </SafeAreaProvider>
  );
}
