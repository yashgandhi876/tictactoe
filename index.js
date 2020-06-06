const boxs = Array.from(document.querySelectorAll(".box"));
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const box5 = document.querySelector(".box5");
const box6 = document.querySelector(".box6");
const box7 = document.querySelector(".box7");
const box8 = document.querySelector(".box8");
const box9 = document.querySelector(".box9");
const winnerteam = document.querySelector(".winnerteam");
const bttn = document.querySelector("#bttn");
const winnername = document.querySelector(".winnername");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const playwithmac = document.querySelector("#playwithmac");
const playwithfrd = document.querySelector("#playwithfrd");
const playwith = document.querySelector(".playwith");

let flag = true;
let counter = 0;
let winarray = [
  ["box1", "box2", "box3"],
  ["box4", "box5", "box6"],
  ["box7", "box8", "box9"],
  ["box1", "box4", "box7"],
  ["box2", "box5", "box8"],
  ["box3", "box6", "box9"],
  ["box1", "box5", "box9"],
  ["box3", "box5", "box7"],
];

const checkWin = (counter, winarray) => {
  if (counter >= 3) {
    winarray.map((arr) => {
      let winning_team_X = 0;
      let winning_team_Y = 0;
      arr.map((ele) => {
        if (eval(ele).innerHTML === "X") {
          winning_team_X++;
        }
        if (eval(ele).innerHTML === "O") {
          winning_team_Y++;
        }
      });
      if (winning_team_X === 3) {
        winnername.innerHTML += `${
          player1.value ? player1.value : "player1"
        }(X)`;
        winnerteam.classList.remove("d-none");
      }
      if (winning_team_Y === 3) {
        winnername.innerHTML += `${
          player2.value ? player2.value : "player1"
        }(O)`;
        winnerteam.classList.remove("d-none");
      }
    });
    if (counter === 9) {
      winnername.innerHTML = "Match Draw";
      winnerteam.classList.remove("d-none");
    }
  }
};

const playWithFriend = () => {
  boxs.map((box) => {
    box.addEventListener("click", (e) => {
      if (!e.target.innerHTML) {
        counter++;
        if (flag) {
          e.target.innerHTML = "X";
          flag = false;
        } else {
          e.target.innerHTML = "O";
          flag = true;
        }
        checkWin(counter, winarray);
      }
    });
  });
};

const playWithMac = () => {
  player2.value = "MACHINE";
  player2.readOnly = true;
  boxs.map((box) => {
    box.addEventListener("click", (e) => {
      let count = 0;
      while (true) {
        if (count < 10) {
          let ai = Math.round(Math.random() * (10 - 1) + 1);
          console.log(ai);
          if (ai > 0 && ai < 10 && !e.target.classList.contains(`box${ai}`)) {
            if (!eval(`box${ai}`).innerHTML) {
              eval(`box${ai}`).innerHTML = "O";
              counter++;
              checkWin(counter, winarray);
              break;
            }
          }
          count++;
        } else {
          break;
        }
      }
      if (!e.target.innerHTML) {
        counter++;
        e.target.innerHTML = "X";
        checkWin(counter, winarray);
      }
    });
  });
};

bttn.addEventListener("click", () => {
  location.reload();
  winnerteam.classList.add("d-none");
});

playwithmac.addEventListener("click", () => {
  playwith.classList.add("d-none");
  playWithMac();
});
playwithfrd.addEventListener("click", () => {
  playwith.classList.add("d-none");
  playWithFriend();
});
