import React from "react";
import Header from "./components/Header";
import Pirate from "./components/Pirate";
import AddPirate from "./components/AddPirate";
// import piratesFile from "./data/sample-pirates-array";

import firebase from "./firebase";

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
    getPirates();
  }, []);

  const getPirates = () => {
    firebase.db
      .collection("pirates")
      .get()
      .then((pirates) => {
        pirates.forEach((doc) => {
          setPirates((prev) => [...prev, doc.data()]);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // const addPirate = (pirate) => {
  //   setPirates((prev) => [...prev, pirate]);
  // };

  const addPirate = (pirate) => {
    firebase.db
      .collection("pirates")
      .add(pirate)
      .then(async (documentReference) => {
        console.log("document reference ID", documentReference.id);
        getPirates();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // const removePirate = (pirateName) => {
  //   const newPirates = pirates.filter((pirate) => pirate.name !== pirateName);
  //   setPirates(newPirates);
  // };

  const removePirate = (pirateName) => {
    console.log("  ", firebase.db.collection("pirates"));
    firebase.db.collection("pirates").doc(pirateName).delete();
  };

  // const res = await db.collection('cities').doc('DC').delete();

  return (
    <div>
      <Header title={randomize()} />
      <div className="pirate">
        <AddPirate addPirate={addPirate} />

        {pirates.length === 0 ? (
          <p>Add some pirates.</p>
        ) : (
          pirates.map((pirate) => (
            <Pirate
              key={pirate.name}
              tagline={randomize()}
              pirate={pirate}
              removePirate={removePirate}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
