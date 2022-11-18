import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';

function SignupScreen() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandeler({ email, password }) {
    setIsAuthenticate(true)
    try {

     const token = await createUser(email, password);

      authCtx.authenticate(token);

    } catch (error) {

      Alert.alert('Authentication Failed...!', 'could not create user, please check your input and try again...');
      setIsAuthenticate(false);
    }

    
  }

  if (isAuthenticate) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return <AuthContent onAuthenticate={signupHandeler} />;
}

export default SignupScreen;