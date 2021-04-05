import React from "react";
import Header from "./components/Header";
import Pirate from "./components/Pirate";
import AddPirate from "./components/AddPirate";

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
    const pirateRef = firebase.database().ref("pirates");
    pirateRef.on("value", (snapshot) => {
      const pirates = snapshot.val();
      const pirateList = [];
      for (let id in pirates) {
        pirateList.push({ id, ...pirates[id] });
      }
      setPirates(pirateList);
    });
  };

  const addPirate = (pirate) => {
    const pirateRef = firebase.database().ref("pirates");
    pirateRef.push(pirate);
  };

  const removePirate = (pirate) => {
    const pirateRef = firebase.database().ref("pirates").child(pirate);
    pirateRef.remove();
  };

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
