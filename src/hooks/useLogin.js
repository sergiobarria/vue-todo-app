import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);

const login = async (email, password) => {
  error.value = null;

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    error.value = null;

    return res;
  } catch (err) {
    error.value = 'Invalid user email or password. Please try again with valid credentials.';
  }
  return null;
};

const useLogin = () => ({ error, login });

export default useLogin;
