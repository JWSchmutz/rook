const submitGame = () => {
  const game = {
    winners: [
      document.getElementById("player1A").value,
      document.getElementById("player1B").value,
    ],
    losers: [
      document.getElementById("player2A").value,
      document.getElementById("player2B").value,
    ],
  };
  db.collection("games").add(game);
};

db.collection("games")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      allTableData[data.winners[0]].w++;
      allTableData[data.winners[1]].w++;
      allTableData[data.losers[0]].l++;
      allTableData[data.losers[1]].l++;
      console.log(allTableData[data.winners[0] + data.winners[1]]);
      if (allTableData[data.winners[1] + data.winners[0]] !== undefined) {
        allTableData[data.winners[1] + data.winners[0]].w++;
      } else {
        console.log(data.winners[0] + data.winners[1]);
        allTableData[data.winners[0] + data.winners[1]].w++;
      }
      if (allTableData[data.losers[1] + data.losers[0]] === "number") {
        allTableData[data.losers[1] + data.losers[0]].l++;
      } else {
        allTableData[data.losers[0] + data.losers[1]].l++;
      }
    });
    for (keys in allTableData) {
      fillInTable(keys);
    }
  });

const allTableData = {
  d: {
    w: 0,
    l: 0,
  },
  p: {
    w: 0,
    l: 0,
  },
  j: {
    w: 0,
    l: 0,
  },
  a: {
    w: 0,
    l: 0,
  },
  w: {
    w: 0,
    l: 0,
  },
  dp: {
    w: 0,
    l: 0,
  },
  dj: {
    w: 0,
    l: 0,
  },
  da: {
    w: 0,
    l: 0,
  },
  dw: {
    w: 0,
    l: 0,
  },
  pj: {
    w: 0,
    l: 0,
  },
  pa: {
    w: 0,
    l: 0,
  },
  pw: {
    w: 0,
    l: 0,
  },
  ja: {
    w: 0,
    l: 0,
  },
  jw: {
    w: 0,
    l: 0,
  },
  aw: {
    w: 0,
    l: 0,
  },
};

const fillInTable = (person) => {
  document.getElementById(`${person}-wins`).textContent =
    allTableData[person].w;
  document.getElementById(`${person}-losses`).textContent =
    allTableData[person].w;
  document.getElementById(`${person}-win-rate`).textContent =
    (100 * allTableData[person].w) /
      (allTableData[person].l + allTableData[person].w) +
    "%";
};
