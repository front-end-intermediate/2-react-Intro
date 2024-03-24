const pirateContainer = document.querySelector(".pirateContainer");
const pirateForm = document.querySelector("#addPirate");

pirateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(pirateForm);
  const name = formData.get("name");
  const vessel = formData.get("vessel");
  const weapon = formData.get("weapon");
  const year = formData.get("year");

  fetch("http://localhost:3001/pirates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, vessel, weapon, year }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

fetch("http://localhost:3001/pirates")
  .then((res) => res.json())
  .then((data) => {
    setPirates(data);
  });

function setPirates(pirates) {
  let markup = pirates
    .map((pirate) => {
      return `<div>
            <h3>${pirate.name}</h3>
            <p>${pirate.vessel}</p>
            <p>${pirate.weapon}</p>
            <p>${pirate.year}</p>
          </div>`;
    })
    .join("");
  pirateContainer.innerHTML = markup;
}
