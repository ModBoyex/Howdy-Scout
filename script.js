let event_index = 0;
let team_index = 0;
let team_stat_index = 0;

let event_key;
let current_stat;

var event_dropdown = document.getElementById("event_dropdown");
var option_template = document.getElementById("option").cloneNode();

var team_list = document.getElementById("team_list");
var team_option_template = document.getElementById("team_option").cloneNode();

var team_stat_chart = document.getElementById("team_stat_chart");
var team_stat_chart_labels = document.getElementById("team_stat_chart_labels");
var team_stat_chart_template = document.getElementById("team_stat_chart_option").cloneNode(true);

var scout_stat_picker = document.getElementById("stat_dropdown");
var scout_stat_template = document.getElementById("stat_option").cloneNode(true);

const team_number = 6377;
const year = new Date().getFullYear();
const APIKey = "UVsAfK9zInMmgPxhfmdEvqPThM51zgyZL7sP6mLFRTPAZtvzbwFyL6yifjbnvcbU";

document.getElementById("team_stat_chart_option").remove();

document.addEventListener("DOMContentLoaded", fetchTeamInfo);
event_dropdown.onchange = fetchEventTeamsInfo;

setupStatPicker();
scout_stat_picker.onchange = updateStatGraph;