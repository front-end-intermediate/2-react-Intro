import React from "react";
import "../assets/css/Pirate.css";
import avatar from "../assets/img/avatar.png";

function Pirate({
  tagline,
  removePirate,
  pirate: { name, death, weapon, vessel, description },
}) {
  return (
    <section>
      <summary>
        <img src={avatar} alt="pirate" />
        <h3>{name}</h3>
        <ul>
          <li>Died: {death}</li>
          <li>Weapon: {weapon}</li>
          <li>Vessel: {vessel}</li>
        </ul>
      </summary>
      <article>
        <h2>{tagline}</h2>
        <p>{description}</p>
        <button onClick={() => removePirate(name)}>Remove Pirate</button>
      </article>
    </section>
  );
}

// class Pirate extends React.Component {
//   render() {
//     const { name, year, weapon, vessel, description } = this.props.pirate;
//     const { tagline, removePirate } = this.props;
//     return (
//       <section>
//         <summary>
//           <img src={avatar} alt="pirate" />
//           <h3>{name}</h3>
//           <ul>
//             <li>Died: {year}</li>
//             <li>Weapon: {weapon}</li>
//             <li>Vessel: {vessel}</li>
//           </ul>
//         </summary>
//         <article>
//           <h2>{tagline}</h2>
//           <p>{description}</p>
//           <button onClick={() => removePirate(name)}>Remove Pirate</button>
//         </article>
//       </section>
//     );
//   }
// }

export default Pirate;
