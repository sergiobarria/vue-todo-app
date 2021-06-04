import { ref } from 'vue';
import { db } from '../firebase/config';

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  const docRef = db.collection(collection).doc(id);

  const updateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.update(updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = 'Could not update the document';
    }

    return null;
  };

  return { error, isPending, updateDoc };
};

export default useDocument;
