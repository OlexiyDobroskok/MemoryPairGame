import { getScore } from "./score.js";

export const getPlayerLvl = (score) => {
  const lvl1 = 1000;
  const lvl2 = 2000;
  const lvl3 = 4000;
  const lvl4 = 8000;
  const lvl5 = 20000;
  if (score < lvl1)
    return {
      lvl: 1,
      lvlPercent: (score * 100) / lvl1,
      img: "./assets/images/score-icon/arturo-icon.png",
    };
  if (score < lvl2)
    return {
      lvl: 2,
      lvlPercent: ((score - lvl1) * 100) / (lvl2 - lvl1),
      img: "./assets/images/score-icon/denver-icon.png",
    };
  if (score < lvl3)
    return {
      lvl: 3,
      lvlPercent: ((score - lvl2) * 100) / (lvl3 - lvl2),
      img: "./assets/images/score-icon/tokio-icon.png",
    };
  if (score < lvl4)
    return {
      lvl: 4,
      lvlPercent: ((score - lvl3) * 100) / (lvl4 - lvl3),
      img: "./assets/images/score-icon/alicia-icon.png",
    };
  if (score < lvl5)
    return {
      lvl: 5,
      lvlPercent: ((score - lvl4) * 100) / (lvl5 - lvl4),
      img: "./assets/images/score-icon/professor-icon.png",
    };
};

export const renderPlayerPanel = () => {
  const { sumScore, isLvlUp } = getScore();
  const { lvl, lvlPercent, img } = getPlayerLvl(sumScore);
  document.querySelector(".player__lvl").innerText = `level ${lvl}`;
  document.querySelector(".player__img").src = img;
  const playerBar = document.querySelector(".player__bar");
  if (isLvlUp) {
    playerBar.style.backgroundSize = "100% 100%";
    setTimeout(() => {
      playerBar.style.transition = "background-size 0s ease";
      playerBar.style.backgroundSize = "0% 100%";
    }, 1000);
    setTimeout(() => {
      playerBar.style.transition = "background-size 1s ease";
      playerBar.style.backgroundSize = `${lvlPercent}% 100%`;
    }, 1500);
  } else {
    playerBar.style.transition = "background-size 1s ease";
    playerBar.style.backgroundSize = `${lvlPercent}% 100%`;
  }
};
