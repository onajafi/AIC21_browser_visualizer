let mainTable;
let pathTable;
let graphic_positioned;
let cellLocationLabel;
let map;

window.onload = () => {
  pathTable = document.getElementById("path-table");
  graphic_positioned = document.querySelector("div.positioned");
  mainTable = document.getElementById("main-table");
  cellLocationLabel = document.getElementById("cell-location");
};

let graphicLog;

function loadLog(log) {
  graphicLog = log;
  // let rowsCount = log.init.graphicMap.row;
  // let colsCount = log.init.graphicMap.col;
  let map_height = log.game_config.map_height;
  let map_width = log.game_config.map_width;

  // let pathsInCells = new Array(rowsCount);
  // for (let i = 0; i < rowsCount; i++) {
  //   pathsInCells[i] = new Array(colsCount);
  // }
  map = new Array(map_height);
  for (let i = 0; i < map_height; i++) {
    map[i] = new Array(map_width);
  }
  
  // for (path of log.init.graphicMap.paths)
  //   for (cell of path.cells) {
  //     let inCell = pathsInCells[cell.row][cell.col];
  //     if (inCell == undefined) inCell = new Array();
  //     inCell.push(path.pathId);
  //     pathsInCells[cell.row][cell.col] = inCell;
  //   }

  for (cell of log.game_config.cells_type){
    map[cell.row][cell.col]={
      "type" : cell.cell_type, 
      "resource_value" : -1, 
      "resource_type": 2,
      "ants": []
    };
  }
  // log.game_config.base_health
  // log.game_config.worker_health
  // log.game_config.soldier_health
  // log.game_config.team0_name
  // log.game_config.team1_name
  // log.game_config.winner

  pathTable.innerHTML = "";
  for (let i = 0; i < map_height; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < map_width; j++) {
      const cell = document.createElement("td");
      if (map[i][j]) {
        if(map[i][j]["type"] == 0){//Base 0
          const tile = document.createElement("div");
          tile.className = `cell base-0`;
          cell.appendChild(tile);
        }else if(map[i][j]["type"] == 1){//Base 1
          const tile = document.createElement("div");
          tile.className = `cell base-1`;
          cell.appendChild(tile);
        }else if(map[i][j]["type"] == 2){//Empty
          const tile = document.createElement("div");
          tile.className = `cell`;
          cell.appendChild(tile);
        }if (map[i][j]["type"] == 3) {//WALL
          const tile = document.createElement("div");
          tile.className = `cell wall`;
          cell.appendChild(tile);
        }
      }
      row.appendChild(cell);
    }
    pathTable.appendChild(row);
  }

  // mainTable.innerHTML = "";
  // for (let i = 0; i < map_height; i++) {
  //   const row = document.createElement("tr");
  //   for (let j = 0; j < map_width; j++) {
  //     const cell = document.createElement("td");
  //     cell.onmouseover = () => {
  //       cellLocationLabel.innerText = `(row: ${i}, col: ${j})`;
  //     }
  //     row.appendChild(cell);
  //   }
  //   mainTable.appendChild(row);
  // }
}

function viewTurn(turnIndex) {
  let turn = graphicLog.turns[turnIndex];

  // let rowsCount = graphicLog.init.graphicMap.row;
  // let colsCount = graphicLog.init.graphicMap.col;
  let map_height = graphicLog.game_config.map_height;
  let map_width = graphicLog.game_config.map_width;

  //turn.base0_health
  //turn.base1_health


  // let unitsInCells = new Array(rowsCount);
  // for (let i = 0; i < rowsCount; i++) {
  //   unitsInCells[i] = new Array(colsCount);
  // }
  let turn_cells = turn["cells"];
  for (cell of turn_cells){
    map[cell.row][cell.col]["resource_value"]=cell["resource_value"];
    map[cell.row][cell.col]["resource_type"]=cell["resource_type"];
    map[cell.row][cell.col]["ants"]=cell["ants"];
    // map[cell.row][cell.col]={
    //   "type" : cell.cell_type, 
    //   "resource_value" : -1, 
    //   "resource_type": 2,
    //   "ants": []
    // };
  }


  // const spellsOnUnits = {};

  // for (let i = 0; i < turn.playerTurnEvents.length; i++) {
  //   const playerTurnEvent = turn.playerTurnEvents[i];
  //   const turnEvent = playerTurnEvent.turnEvent;
  //   if (turnEvent.isAlive) {
  //     const king = graphicLog.init.graphicMap.kings[i];
  //     for (let x = -1; x <= 1; x++)
  //       for (let y = -1; y <= 1; y++) {
  //         let inCell = unitsInCells[king.row + y][king.col + x];
  //         if (inCell == undefined) inCell = new Array([], [], [], [], []);
  //         inCell[4].push({ pId: playerTurnEvent.pId, hp: turnEvent.hp });
  //         unitsInCells[king.row + y][king.col + x] = inCell;
  //       }
  //   }
  //   for (const unit of turnEvent.units) {
  //     let inCell = unitsInCells[unit.row][unit.col];
  //     if (inCell == undefined) inCell = new Array([], [], [], [], []);
  //     inCell[playerTurnEvent.pId].push(unit);
  //     unitsInCells[unit.row][unit.col] = inCell;
  //   }

  //   for (const spell of turnEvent.mapSpells)
  //     for (const unitId of spell.unitIds) {
  //       if (spellsOnUnits[unitId] == undefined) {
  //         spellsOnUnits[unitId] = new Array();
  //       }
  //       spellsOnUnits[unitId].push(spell);
  //     }
  // }

  // const attacks = {}
  // for (const attack of turn.turnAttacks) {

  //   const key = attack.attackerId.toString();
  //   if (!(key in attacks))
  //     attacks[key] = []

  //   attacks[key].push(attack.defenderId)
  // }


  // let row = mainTable.firstChild;
  // for (let i = 0; i < rowsCount; i++) {
  //   let cell = row.firstChild;
  //   for (let j = 0; j < colsCount; j++) {
  //     cell.innerHTML = "";
  //     let inCell = unitsInCells[i][j];
  //     if (inCell != undefined) {
  //       if (inCell[4].length > 0) {
  //         const cellDiv = document.createElement("div");
  //         const innerCell = document.createElement("div");
  //         cellDiv.className = "king";
  //         const king = inCell[4][0];
  //         innerCell.innerText = king.pId;
  //         innerCell.title = JSON.stringify(king);
  //         innerCell.className = "player-" + king.pId;
  //         cellDiv.appendChild(innerCell);
  //         cell.appendChild(cellDiv);
  //       }
  //       if (inCell.some((value, index) => index < 4 && value.length > 0)) {
  //         const cellDiv = document.createElement("div");
  //         cellDiv.className = "units";
  //         for (let k = 0; k < 4; k++) {
  //           const innerCell = document.createElement("div");
  //           if (inCell[k].length > 0) {
  //             const allSpellsTypeIds = new Set();
  //             for (const unit of inCell[k]) {
  //               const spellsOnUnit = spellsOnUnits[unit.id];
  //               if (spellsOnUnit != undefined) {
  //                 unit.spells = spellsOnUnit;
  //                 for (const spell of spellsOnUnit)
  //                   allSpellsTypeIds.add(spell.typeId);
  //               }

  //               if (unit.id.toString() in attacks)
  //                 unit.attackTargets = attacks[unit.id.toString()]
  //             }
  //             for (const spellTypeId of allSpellsTypeIds)
  //               innerCell.classList.add("spell", `spell-${spellTypeId}`);

  //             innerCell.title = JSON.stringify(inCell[k], null, 2);
  //             innerCell.innerText = inCell[k].length;
  //             innerCell.classList.add("player-" + k);
  //           }
  //           cellDiv.appendChild(innerCell);
  //         }
  //         cell.appendChild(cellDiv);
  //       }
  //     }
  //     cell = cell.nextSibling;
  //   }
  //   row = row.nextSibling;
  // }


  let row = pathTable.firstChild;
  // console.log("pathTable: " + pathTable.innerHTML);
  // console.log("row: " + row.innerHTML);
  for (let i = 0; i < map_height; i++) {
    let cell = row.firstChild;
    for (let j = 0; j < map_width; j++) {
      cell.innerHTML = "";
      if (map[i][j]) {
        const tile = document.createElement("div");

        if(map[i][j]["type"] == 0){//Base 0
          tile.className = `cell base-0`;
        }else if(map[i][j]["type"] == 1){//Base 1
          tile.className = `cell base-1`;
        }else if(map[i][j]["type"] == 2){//Empty
          
          if(map[i][j]["resource_type"]==0){
            tile.className = `cell grass`;
            tile.innerText=map[i][j]["resource_value"];
          }else if(map[i][j]["resource_type"]==1){
            tile.className = `cell bread`;
            tile.innerText=map[i][j]["resource_value"];
          }else{
            tile.className = `cell`;
          }
        }if (map[i][j]["type"] == 3) {//WALL
          tile.className = `cell wall`;
        }

        if(map[i][j]["type"] != 3){//ٔNot a Wall
          if(map[i][j]["ants"].length > 0){
            const ant_tile = document.createElement("div");
            let kargar_0_cnt = 0;
            let kargar_1_cnt = 0;
            let sarbaz_0_cnt = 0;
            let sarbaz_1_cnt = 0;
            for(var idx=0; idx<map[i][j]["ants"].length; idx++){
              let _ant = map[i][j]["ants"][idx];
              if(_ant["type"]==1){//KARGAR
                  if(_ant["team"]==0){
                    kargar_0_cnt++;
                  }else{
                    kargar_1_cnt++;
                  }
              }else{//SARBAZ
                  if(_ant["team"]==0){
                    sarbaz_0_cnt++;
                  }else{
                    sarbaz_1_cnt++;
                  }
              }
            }
            
            if(kargar_0_cnt){
              ant_tile.className = `karegar-0`;
              ant_tile.innerText=kargar_0_cnt;
            }
            if(kargar_1_cnt){
              ant_tile.className = `karegar-1`;
              ant_tile.innerText=kargar_1_cnt;
            }
            if(sarbaz_0_cnt){
              ant_tile.className = `sarbaz-0`;
              ant_tile.innerText=sarbaz_0_cnt;
            }
            if(sarbaz_1_cnt){
              ant_tile.className = `sarbaz-1`;
              ant_tile.innerText=sarbaz_1_cnt;
            }
            tile.appendChild(ant_tile);
          }
        }
        // const ant_tile_1 = document.createElement("div");
        // ant_tile_1.className = `karegar-1`;
        // ant_tile_1.innerText='2';
        // tile.appendChild(ant_tile_1);
        
        // const ant_tile_2 = document.createElement("div");
        // ant_tile_2.className = `karegar-0`;
        // ant_tile_2.innerText='3';
        // tile.appendChild(ant_tile_2);

        cell.appendChild(tile);
      }
      cell = cell.nextSibling
    }
    row = row.nextSibling;
  }

  // <svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="350" stroke="black"/></svg>
  // const line_cont = document.createElement("line");
  // line.setAttribute("x1","50");
  // line.setAttribute("y1","50");
  // line.setAttribute("x2","350");
  // line.setAttribute("y2","350");
  // line.setAttribute("stroke","black");
  // const line_cont = document.createElement("svg");
  // line_cont.setAttribute("width", pathTable.Width);
  // line_cont.setAttribute("width", pathTable.Height);
  // line_cont.appendChild(line_cont);
  // graphic_positioned.appendChild(line_cont);

}

let currentTurnIndex = -1;
let currentTurn = undefined;
function showNextTurn() {
  viewTurn(++currentTurnIndex);
  currentTurn = graphicLog.turns[currentTurnIndex];
  document.getElementById("turn-num").innerText = currentTurn.turn_num;
}

function showPreviousTurn() {
  viewTurn(--currentTurnIndex);
  currentTurn = graphicLog.turns[currentTurnIndex];
  document.getElementById("turn-num").innerText = currentTurn.turn_num;
}

function handleFiles(files) {
  const reader = new FileReader();
  reader.onload = function (e) {
    loadLog(JSON.parse(e.target.result));
  };
  reader.readAsText(files[0]);
}
