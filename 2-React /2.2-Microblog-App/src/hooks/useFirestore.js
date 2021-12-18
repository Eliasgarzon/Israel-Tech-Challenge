import { projectDb } from "../firebase/config";
import {
  addDoc,
  setDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };

    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "GOT_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const isUserDb = collectionName === "users";

  const ref = collection(projectDb, collectionName);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (document) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const addedDocument = !isUserDb
        ? await addDoc(ref, document)
        : await setDoc(doc(projectDb, collectionName, document.uid), document);
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const getDocument = async (docId) => {
    try {
      const docRef = doc(projectDb, "users", docId);
      const docSnap = await getDoc(docRef);
      const docInfo = docSnap.data();
      dispatchIfNotCancelled({
        type: "GOT_DOCUMENT",
        payload: docInfo,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateDocumentArray = async (docId, property, option) => {
    try {
      const docRef = doc(projectDb, collectionName, docId);
      if (option.type === "PUSH") {
        await updateDoc(docRef, { [property]: arrayUnion(option.payload) });
      }
      if (option.type === "FILTER") {
        await updateDoc(docRef, { [property]: arrayRemove(option.payload) });
      }
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, response, getDocument, updateDocumentArray };
};
