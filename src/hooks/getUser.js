import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const user = ref(projectAuth.currentUser);

projectAuth.onAuthStateChanged((_user) => {
  user.value = _user;
});

const getUser = () => ({ user });

export default getUser;
