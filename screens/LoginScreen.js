import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import { login } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {

  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const authCtx = useContext(AuthContext);

  async function logInHandeler({ email, password }) {
    setIsAuthenticate(true)
    try {

      const token = await login(email, password);
      authCtx.authenticate(token);

    } catch (error) {
      Alert.alert('Authentication Failed..!', 'Can\'t log in, you entered wrong email or password. Please try again..');
      setIsAuthenticate(false);
    }
  }

  if (isAuthenticate) {
    return <LoadingOverlay message="Logging You In..." />;
  }

  return <AuthContent isLogin onAuthenticate={logInHandeler} />;
}

export default LoginScreen;