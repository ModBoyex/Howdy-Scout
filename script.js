let event_index = 0;
let team_index = 0;
let team_stat_index = 0;

let event_key;
var current_stat;
var selected_teams = [];

var plot = document.getElementById("stat_graph");

var event_dropdown = document.getElementById("event_dropdown");
var option_template = document.getElementById("option").cloneNode();

var team_list = document.getElementById("team_list");
var team_option_template = document.getElementById("team_option").cloneNode();

var team_stat_chart = document.getElementById("team_stat_chart");
var team_stat_chart_labels = document.getElementById("team_stat_chart_labels");
var team_stat_chart_template = document.getElementById("team_stat_chart_option").cloneNode(true);

var scout_stat_picker = document.getElementById("stat_dropdown");
var scout_stat_template = document.querySelector(".stat_option").cloneNode(true);

const team_number = 6377;
const year = new Date().getFullYear();
const APIKey = "UVsAfK9zInMmgPxhfmdEvqPThM51zgyZL7sP6mLFRTPAZtvzbwFyL6yifjbnvcbU";

document.getElementById("team_stat_chart_option").remove();

document.addEventListener("DOMContentLoaded", fetchTeamInfo);
event_dropdown.onchange = fetchEventTeamsInfo;

setupStatPicker();
scout_stat_picker.onchange = changeStatGraph;

var layout = {
    autosize: true,
    width: plot.offsetWidth,
    height: plot.offsetHeight,
    margin: {
        l: 30,
        r: 10,
        b: 45,
        t: 5,
        pad: 4,
    },
    paper_bgcolor: "#FFFFFF00",
    plot_bgcolor: "#FFFFFF00",
    showlegend: true,
    legend: {
        font: {
            color: "rgb(150, 150, 150)"
        }
    },
    xaxis: {
        title: "Qual Matches",
        titlefont: {
            size: 16,
            color: "rgb(150, 150, 150)",
        },
        tickfont: {
            size: 14,
            color: "rgb(150, 150, 150)",
        },
        gridcolor: "rgb(100, 100, 100)"

    },

    yaxis: {
        min: 0,
        tickfont: {
            size: 14,
            color: "rgb(150, 150, 150)",
        },
        gridcolor: "rgb(100, 100, 100)"
    },
};

const color_discrete_sequence = [
    "dodgerBlue",
    "fireBrick",
    "darkGreen",
    "orange",
    "yellow",
    "pink",
    "purple",
    "aqua",
    "brown",
    "darkOliveGreen",
    "blue",
    "red",
    "greenYellow",
    "indigo",
    "maroon",
    "midnightBlue",
    "olive",
    "teal",
    "tan",
    "slateGrey",
    "royalBlue"
]