import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);

const signup = async (email, password, username) => {
  error.value = null;

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(email, password);

    if (!res) {
      throw new Error('Something went wrong, could not complete the signup. Please try again.');
    }

    await res.user.updateProfile({ displayName: username });

    error.value = null;
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }

  return null;
};

const useSignup = () => ({ error, signup });

export default useSignup;
