let inputSize = "";
let Players = [];
let images = [
  "images/anna.png",
  "images/nikolina.png",
  "images/sebastian.png",
  "images/marvin.png",
  "images/stefanie.png",
  "images/paulin.png",
  "images/hermine.png",
  "images/nina.png",
  "images/carolin.png",
  "images/antonia.png",
  "images/julia.png",
  "images/franziska.png",
  "images/esra.png",
  "images/niklas.png"
];

let playersImage;

// a function to dynamically import images from a folder
// function importAll(r) {
//     let images = {};
//     r.keys().map((item, index) => {
//         images[item.replace('./', '')] = r(item);
//     });
//     return images;
// }
// const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

function submitSize() {
  inputSize = parseInt(document.getElementById("input-size").value);

  // console.log(inputSize); //to confirm it has been added to the array
  for (let i = 0; i < Players * 1; i++) {
    let playerName = Players[i];
    document.getElementById(
      "showSelectedNames"
    ).innerHTML += `<div class=teamGenerated> ${playerName} </div>`;
  }
}

function submitNames() {
  let selectedSelectors = document
    .getElementById("images-wrapper-selected")
    .querySelectorAll(".member.selected");

  let selected = [];
  selectedSelectors.forEach(function(node) {
    let image = node.querySelector("img").getAttribute("src");
    let name = node.querySelector("p").innerText;

    selected.push({
      name,
      image
    });

    //Randomly Swap The  Members
    selected = selected.sort((a, b) => 0.3 - Math.random());
    Players = selected;
  });

  let teams = generateTeamsArray(selected);
  console.log(teams);
  console.log(selected);
  document.getElementById("showSelectedNames").innerHTML = "";

  //Displaying Teams
  for (let i = 0; i < teams.length; i++) {
    let parentDiv = document.createElement("div");
    parentDiv.className = "col-lg-6";
    let heading = document.createElement("h4");
    heading.textContent = `Team No.${i + 1}`;
    parentDiv.append(heading);

    for (let j = 0; j < teams[i].length; j++) {
      let div = document.createElement("div");
      div.className = "member";
      let playersImage = document.createElement("img");
      playersImage.src = teams[i][j].image;
      let name = teams[i][j].name;
      playersImage.className = "player-image";
      let p = document.createElement("p");
      p.textContent = name;

      // returns a random integer from 1 to 9
      let random = Math.floor(Math.random() * 8) + 1;
      let role = "";
      console.log(random);
      if (random > 0 && random <= 3) {
        role = "Observer";
      } else if (random > 3 && random <= 6) {
        role = "Customer";
      } else {
        role = "Employee";
      }

      console.log(random, " ", role);

      let roleParagraph = document.createElement("p");
      roleParagraph.textContent = role;
      roleParagraph.className = "text-muted roleText";

      div.append(playersImage);
      div.append(p);
      div.append(roleParagraph);
      parentDiv.append(div);

      // document.getElementById("showSelectedNames").innerHTML += `<div class=teamGenerated>Team :${i + 1} ${teams[i][j].name} </div>`
    }
    document.getElementById("showSelectedNames").append(parentDiv);
  }
}

let generateTeamsArray = selected => {
  selected = [...selected];
  let teams = [];
  let perTeam = parseInt(document.getElementById("input-size").value);
  while (selected.length > 0) {
    teams.push(selected.splice(0, perTeam)); //Extracting Chunks of Data from Selected Members to form Team
  }
  return teams;
};

// function submitNames() {
//     let playerName = document.getElementById("input-players").value;
//     let playerImage = playerNameFromSrc;
//     Players.push({
//         name: playerName,
//         image: playerImage
//     })

// document.getElementById("input-players").value = ""
// let allSelectedNames = [...document.querySelectorAll('span.selected')].map((el) => {
//     return el.getAttribute('data-name')
// })

// alert(allSelectedNames)

for (let i = 0; i < images.length; i++) {
  // let playerNameFromSrc = ""
  let div = document.createElement("div");
  div.className = "member available";
  let playersImage = document.createElement("img");
  playersImage.src = images[i];
  let name = images[i]
    .split("/")
    .pop()
    .split(".")
    .slice(0, -1)
    .join(".");
  playersImage.className = "player-image";
  let p = document.createElement("p");
  name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  p.textContent = name;
  div.append(playersImage);
  div.append(p);

  div.onclick = function(e) {
    if (div.className.indexOf("available") != -1) {
      div.className = div.className.replace("available", "selected");
      document.getElementById("images-wrapper").removeChild(div);
      document.getElementById("images-wrapper-selected").append(div);
    } else {
      div.className = div.className.replace("selected", "available");
      document.getElementById("images-wrapper-selected").removeChild(div);
      document.getElementById("images-wrapper").append(div);
    }
    // playerNameFromSrc = e.target.src.split('/').pop().split('.').slice(0, -1).join('.');
    // Players.push(playerNameFromSrc)
    // console.log("playerNameFromSrc", playerNameFromSrc)
    // document.getElementById("showSelectedNames").innerHTML += `<div class=teamGenerated> ${playerNameFromSrc} </div>`
    // playersImage.remove();
  };
  document.getElementById("images-wrapper").append(div);
}

// Get the input field
let input = document.getElementById("input-size");

// Execute a function when the user releases a key on the keyboard
// input.addEventListener("keydown", function (addTo) {
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.keyCode === 13) {
//         // Cancel the default action, if needed

//         input.push(document.getElementById("input").value);

//         document.getElementById("userinput").value = ""

//     }
// });

document
  .getElementById("team-settings")
  .addEventListener("submit", function(e) {
    e.preventDefault();

    let inputValue = document.getElementsByTagName("input")[0].value;
    let textAreaValue = document.getElementsByTagName("textarea")[0].value;

    let peopleArray = formatTextareaValue(textAreaValue);

    let isValidInputValue = validateUserInput(inputValue);
    let isValidTextarea = validateUserInput(peopleArray.length);

    generateErrors(isValidInputValue, isValidTextarea);

    if (isValidInputValue && isValidTextarea) {
      document.getElementById("team-container").innerHTML = "";
      generateAllTeams(peopleArray, inputValue);
    }
  });
