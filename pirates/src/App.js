function App() {
  return (
    <>
      <Pirate name="John">Avast</Pirate>
    </>
  );
}

function Pirate({ name, children }) {
  return (
    <p>
      {name}, {children}
    </p>
  );
}

export default App;
