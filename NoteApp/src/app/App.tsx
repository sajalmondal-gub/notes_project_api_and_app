import '../../global.css';
import { NavigationProvider } from './providers/NavigationProvider';
import { AuthProvider } from '../hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <NavigationProvider />
    </AuthProvider>
  );
}

export default App;
