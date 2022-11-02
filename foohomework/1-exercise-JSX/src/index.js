import React from "react";
import { createRoot } from "react-dom/client";
import { Form } from "./components/form";
import { Critter } from "./components/critter";

const pageStyles = {
  display: "flex",
};

const Exercise = () => {
  return (
    <div style={pageStyles}>
      <Form />
      <Critter />
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<Exercise />);
