import React from "react";
import { fire as firestore } from "./firebase";

function usePirates() {
  const [data, setData] = React.useState({
    error: null,
    loading: true,
    pirates: [],
  });

  React.useEffect(() => {
    const unsubscribe = firestore
      .firestore()
      .collection("pirates")
      .onSnapShot(
        (snapshot) => {
          setData({
            error: null,
            loading: false,
            pirates: snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
              death: doc.data().death,
              weapon: doc.data().weapon,
              vessel: doc.data().vessel,
              description: doc.data().description,
            })),
          });
        },
        (error) => {
          setData({
            error,
            loading: false,
            pirates: [],
          });
        }
      );
    return unsubscribe;
  }, []);
  return data;
}

export default usePirates;
