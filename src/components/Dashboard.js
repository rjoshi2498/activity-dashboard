
import BarChart from './Barchart';
import PieChart from './Piechart';
import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
import Dailyactivity from './Dailyactivity';
import ActivityDetailTable from './Activitydetailtable';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Dashboard = ({ data }) => {
  const [selectedUser, setSelectedUser] = useState('');

  // Extract rows from the data prop
  const rows = data.data.AuthorWorklog.rows;

  // Find data for the selected user
  const selectedUserData = rows.find(row => row.name === selectedUser);

  // Function to get fill color based on activity label
  const getFillColor = (label) => {
    const colors = {
      "PR Open": "#EF6B6B",
      "PR Merged": "#61CDBB",
      "Commits": "#FAC76E",
      "PR Reviewed": "#C2528B",
      "PR Comments": "#0396A6",
      "Incident Alerts": "#5F50A9",
      "Incidents Resolved": "#8F3519",
    };
    return colors[label] || "#000000";
  };

  // Handle user selection change
  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  // Enhance activity meta data with fill colors
  const activityMeta = data.data.AuthorWorklog.activityMeta.map(meta => ({
    ...meta,
    fillColor: getFillColor(meta.label),
  }));

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <h1>Author Worklog Dashboard</h1>
      </Grid>
      
      <Grid item xs={12} container spacing={3}>
        {/* Placeholder for future components */}
        {/* {totalActivityMap.map((item) => {
          <Grid item xs={12} sm={2}>
            <Paper elevation={5} style={{ padding: 16 }}>
              {item.key}
            </Paper>
          </Grid>
        })} */}
      </Grid>

      <Grid item xs={12} container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <BarChart data={rows} meta={activityMeta} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <PieChart data={rows} meta={activityMeta} />
          </Paper>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Dailyactivity data={rows} meta={activityMeta} />
        </Paper>
      </Grid>

      <Grid item xs={5}>
        {/* If no user data is provided, prompt the user to select a user */}
        {!selectedUser && (
          <div style={{ color: 'red' }}>Select a user to view their activity details.</div>
        )}
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="user-select-label">Select User</InputLabel>
          <Select
            labelId="user-select-label"
            value={selectedUser}
            onChange={handleUserChange}
            label="Select User"
          >
            <MenuItem value=""><em>All Users</em></MenuItem>
            {rows.map(row => (
              <MenuItem key={row.name} value={row.name}>{row.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

    {selectedUser && (
      <Grid item xs={12}>
        <ActivityDetailTable userData={selectedUserData} meta={activityMeta} />
      </Grid>
    )}
    </Grid>
  );
};

export default Dashboard;
