import { ref, watchEffect } from 'vue';
import { db } from '../firebase/config';

const getCollection = (collection, userUid) => {
  const documents = ref(null);
  const error = ref(null);

  const collectionRef = db
    .collection(collection)
    .where('userUid', '==', userUid)
    .orderBy('createdAt', 'desc');

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      const results = [];
      snap.docs.forEach((doc) => {
        // must wait for the server to create the timestamp & send it back
        // we don't want to edit data until it has done this
        if (doc.data().createdAt) {
          results.push({ ...doc.data(), id: doc.id });
        }
      });

      // update values
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = 'could not fetch the data';
    },
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents, error };
};

export default getCollection;
