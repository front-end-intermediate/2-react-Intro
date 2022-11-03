import React from "react";
import Header from "./components/Header";
import Pirate from "./components/Pirate";
import AddPirate from "./components/AddPirate";
import { db } from "./firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const pirateCalls = [
  "Aaarg, belay that!",
  "Avast me hearties!",
  "Shiver me timbers!",
];

const randomize = () =>
  pirateCalls[Math.floor(Math.random() * pirateCalls.length)];

function App() {
  const [pirates, setPirates] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "pirates"));
    // const unsub =
    onSnapshot(q, (querySnapshot) => {
      let piratesArray = [];
      querySnapshot.forEach((doc) => {
        piratesArray.push({ ...doc.data(), id: doc.id });
      });
      setPirates(piratesArray);
    });
    // return () => unsub();
  }, []);

  const addPirate = async (pirate) => {
    await addDoc(collection(db, "pirates"), {
      name: pirate.name,
      vessel: pirate.vessel,
      weapon: pirate.weapon,
      death: pirate.death,
      desc: pirate.desc,
      image: "avatar.png",
    });
  };

  // const removePirate = (pirateName) => {
  //   const newPirates = pirates.filter((pirate) => pirate.name !== pirateName);
  //   // setPirates(newPirates);
  //   setPirates([...newPirates]);
  // };

  const removePirate = async (id) => {
    await deleteDoc(doc(db, "pirates", id));
  };

  return (
    <div>
      <Header title={randomize()} />
      <p>{JSON.stringify(pirates)}</p>
      <div className="pirate">
        <AddPirate addPirate={addPirate} />
        {pirates.map((pirate) => (
          <Pirate
            key={pirate.id}
            tagline={randomize()}
            pirate={pirate}
            removePirate={removePirate}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
