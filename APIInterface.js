async function requestAPI(url, apiKey) {
  try {
    const response = await fetch(url, {
      headers: { "X-TBA-Auth-Key": apiKey },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Return the data directly
  } catch (error) {
    console.error(`${url} had a problem.`, error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

function resetStats() {
  Array.from(team_stat_chart.children).forEach((child) => {
    if (child.id != "team_stat_chart_labels") {
      child.remove()
    }
  })

  clearPlot()
}

function addEventsToEventList(event) {
  new_option = option_template.cloneNode();
  new_option.id = event_index;
  new_option.textContent = event.name;
  new_option.value = event.key;
  event_dropdown.appendChild(new_option);

  event_index += 1;
}

// Function to fetch team information from Blue Alliance API
async function fetchTeamInfo() {
  const team_events_url = `https://www.thebluealliance.com/api/v3/team/frc${team_number}/events/${year}`;

  resetStats();

  try {
    current_data = await requestAPI(team_events_url, APIKey);
    console.log(current_data);
    current_data.forEach((event) => addEventsToEventList(event));
  } catch (error) {
    console.error(error);
  }
}


function addTeamToTeamList(team) {
  new_option = team_option_template.cloneNode();
  new_option.id = team_index;
  new_option.textContent = `${team.team_number} - ${team.nickname}`;
  new_option.value = team.key;
  team_list.appendChild(new_option);

  team_index += 1;
}

// Function to fetch team information from Blue Alliance API
async function fetchEventTeamsInfo() {
  // API endpoint for team information
  event_key = this.value;
  const event_teams_url = `https://www.thebluealliance.com/api/v3/event/${event_key}/teams`;

  resetStats();

  document.querySelector("#team_list").innerHTML = document.querySelector("#team_option").outerHTML

  try {
    current_data = await requestAPI(event_teams_url, APIKey);
    console.log(current_data);
    current_data.forEach((team) => addTeamToTeamList(team));
  } catch (error) {
    console.error(error);
  }

  var team_option_list = document.getElementsByClassName("glassOption");
  for (let i = 0; i < team_option_list.length; i++) {
    team_option_list[i].onclick = () => {
      const team_number = team_option_list[i].textContent.match(/\d+(?= - )/g)[0]
      // Check if the element has the "selected" class
      if (!team_option_list[i].classList.contains("selected")) {
        // Add the "selected" class to indicate the item is selected
        team_option_list[i].classList.add("selected");
        selected_teams.push(team_number)
      } else {
        // Remove the "selected" class
        team_option_list[i].classList.remove("selected");
        selected_teams.splice(selected_teams.indexOf(team_number),1)
      }

      // Log whether the element is selected or not
      console.log("Is selected: " + team_option_list[i].classList.contains("selected"));
      console.log("I clicked on " + team_option_list[i].textContent);

      updateStatGraph(team_number, team_option_list[i].classList.contains("selected"));
      updateStatsTable()
      updateRobotImages(team_number, team_option_list[i].classList.contains("selected"))
    }
  }
}



function getTeamStats (opr_list, rank_list, this_team_number, this_team_name) {
  new_option = team_stat_chart_template.cloneNode(true);
  new_option.id = team_stat_index;
  new_option.childNodes.item(1).textContent = this_team_name;
  new_option.childNodes.item(3).textContent = `${this_team_number.substring(3)}`;
  rank_list.rankings.forEach((rank) => {
    if (rank.team_key == this_team_number) {
      new_option.childNodes.item(5).textContent = `${rank.rank}`;
    }
  });
  new_option.childNodes.item(7).textContent = `${opr_list.oprs[this_team_number].toFixed(2)}`;

  return new_option
}

async function updateStatsTable() {
  // API endpoint for team information
  const event_opr_url = `https://www.thebluealliance.com/api/v3/event/${event_key}/oprs`;
  const event_rank_url = `https://www.thebluealliance.com/api/v3/event/${event_key}/rankings`;

  var opr_list;
  var rank_list;

  team_stat_index = 0;

  try {
    opr_list = await requestAPI(event_opr_url, APIKey);
    rank_list = await requestAPI(event_rank_url, APIKey);

    option_list = document.getElementsByClassName("glassOption");

    let rows = []
    for (let i = 1; i < option_list.length; i++) {
      if (option_list[i].classList.contains("selected")) {
        rows.push(getTeamStats(opr_list, rank_list, option_list[i].value, option_list[i].textContent.split(" - ")[1]))
      }
    }

    rows.sort((a,b) => b.childNodes.item(7).textContent - a.childNodes.item(7).textContent)
    team_stat_chart.innerHTML = "";
    team_stat_chart.appendChild(team_stat_chart_labels);  
    team_stat_chart.append(...rows)
  } catch (error) {
    console.error(error);
  }
}

function updateRobotImages(team_number, selected) {
  var container = document.querySelector("#team_pictures")
  if (selected) {
    const images = getImages()

    let element = document.querySelector(".robot_image_container").cloneNode(true)
    element.className = "robot_image_container"
    element.querySelector("img")["src"] = images[team_number]
    element.id = "robot_image_" + team_number
    element.querySelector(".imageLabel").textContent = team_number

    element.classList.remove("hidden")
    
    container.append(element)
  } else {
    document.querySelector(`#robot_image_${team_number}`).remove()
  }
}