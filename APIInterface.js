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
  // team_rank_element.textContent = "-";
  // team_opr_element.textContent = "-";
  // team_epa_element.textContent = "-";
  return null;
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
  const event_teams_url = `https://www.thebluealliance.com/api/v3/event/${this.value}/teams`;

  resetStats();

  try {
    current_data = await requestAPI(event_teams_url, APIKey);
    console.log(current_data);
    current_data.forEach((team) => addTeamToTeamList(team));
  } catch (error) {
    console.error(error);
  }
}
