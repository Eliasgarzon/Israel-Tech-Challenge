import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "@firebase/firestore";
import { projectDb } from "../firebase/config";
import { useEffect, useState } from "react";

export const useCollection = (collectionName, condition, order) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [docLimit, setDocLimit] = useState(10);
  const [docLimitError, setDocLimitError] = useState(null);

  useEffect(() => {
    setDocLimitError(null);
    setIsPending(true);
    let ref = collection(projectDb, collectionName);

    if (condition) {
      ref = query(ref, where(...condition));
    }
    if (order) {
      ref = query(ref, orderBy(...order), limit(docLimit));
    }
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
        setIsPending(false);
        if (snapshot.size + 10 < docLimit) {
          setDocLimitError("No more chirps");
          setIsPending(false);
          return;
        }
      },
      (error) => {
        console.log(error);
        setIsPending("false");
        setError("could not fetch the data");
      }
    );

    return () => unsubscribe();
  }, [collectionName, condition, order, docLimit]);

  const getMoreDocs = (reset) => {
    if (reset) {
      setDocLimit(10);
    } else {
      setDocLimit((prev) => prev + 10);
    }
  };

  return { documents, error, isPending, getMoreDocs, docLimit, docLimitError };
};
