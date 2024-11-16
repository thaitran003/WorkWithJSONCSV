const mongoose = require('mongoose');
const fs = require('fs');
const { parse } = require("csv-parse");


mongoose.connect('mongodb://127.0.0.1:27017/KHDL')
    .then(() => console.log('Connected!'));

const Schema = mongoose.Schema;
const Any = Schema.Types.Mixed;
const Number = Schema.Types.Number;
const match = new Schema({
    area: Any,
    competition: Any,
    season: Any,
    match_id: Any,
    utcDate: Any,
    status: Any,
    matchday: Any,
    stage: Any,
    group: Any,
    lastUpdated: Any,
    homeTeam: Any,
    awayTeam: Any,
    score: Any,
    odds: Any,
    referees: Any
});

const matchModel = mongoose.model('matches', match);

const matchAndH2h = new Schema({
    area: Any,
    competition: Any,
    season: Any,
    match_id: Any,
    utcDate: Any,
    status: Any,
    matchday: Any,
    stage: Any,
    group: Any,
    lastUpdated: Any,
    homeTeam: Any,
    awayTeam: Any,
    score: Any,
    odds: Any,
    referees: Any,
    head2head: Any
});

const matchAndH2hModel = mongoose.model('matche_any_h2h', matchAndH2h);




const score = new Schema({
    area: Any,
    competition: Any,
    season: Any,
    match_id: Any,
    score: Any,
    utcDate: Any,
    status: Any,
    matchday: Any,
    stage: Any,
    group: Any,
    lastUpdated: Any,
    homeTeam: Any,
    awayTeam: Any,
    odds: Any,
    referees: Any,
    head2head: Any
});

const scoreModel = mongoose.model('scores', score);



const standing = new Schema({
    stage: Any,
    type: Any,
    group: Any,
    table: Any
});

const standingModel = mongoose.model('standings', standing);


const team = new Schema({
    team_id: Any,
    area: Any,
    name: Any,
    shortName: Any,
    tla: Any,
    crest: Any,
    address: Any,
    website: Any,
    founded: Any,
    clubColors: Any,
    venue: Any,
    runningCompetitions: Any,
    coach: Any,
    squad: Any,
    staff: Any,
    lastUpdated: Any
});

const teamModel = mongoose.model('teams', team);


const final = new Schema({
    match_id: Number,
    homeTeam: Any,
    awayTeam: Any,
    homeGoalHT: Number,
    awayGoalHT: Number,
    homeGoalFT: Number,
    awayGoalFT: Number,
    label: Number,
    pos_home: Number,
    p_home: Number,
    gd_home: Number,
    form_score_home: Number,
    pos_away: Number,
    p_away: Number,
    gd_away: Number,
    form_score_away: Number,
    h2h_home_points: Number,
    h2h_away_points: Number,
});

const finalModel = mongoose.model('finals', final);

// fs.readFile('files/teams/team_2024.json', async function (err, data) {
//     const result = JSON.parse(data);
//     // const dataInserts = result.matches.map((item) => {
//     //     return {
//     //         ...item,
//     //         match_id: item.id
//     //     }
//     // })

//     await teamModel.create(result.teams)

// });
let a = null;
fs.createReadStream("files/finals/final1_table.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", async function (row) {
        await finalModel.create(
            {
                match_id: row[1],
                homeTeam: row[2],
                awayTeam: row[3],
                homeGoalHT: row[4],
                awayGoalHT: row[5],
                homeGoalFT: row[6],
                awayGoalFT: row[7],
                label: row[8],
                pos_home: row[9],
                p_home: row[10],
                gd_home: row[11],
                form_score_home: row[12],
                pos_away: row[13],
                p_away: row[14],
                gd_away: row[15],
                form_score_away: row[16],
                h2h_home_points: row[17],
                h2h_away_points: row[18],
            }
        )
    })
console.log(a);





