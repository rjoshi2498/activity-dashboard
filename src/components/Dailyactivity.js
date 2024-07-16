import Highcharts from 'highcharts';
import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// Initialize Highcharts modules for exporting and data export functionality
HC_exporting(Highcharts);
HC_exportData(Highcharts);

const Dailyactivity = ({ data, meta }) => {
  // State to keep track of the selected user
  const [selectedUser, setSelectedUser] = useState('');

  // Extract unique days from the first user's day-wise activity
  const days = data[0].dayWiseActivity.map(activity => activity.date);

  // Handle user selection from dropdown
  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  // Get activity counts for a specific label for all users and days
  const getActivityCounts = (label) => {
    return days.map(day => ({
      name: day,
      data: data.map(row => {
        const activity = row.dayWiseActivity.find(activity => activity.date === day);
        const count = activity.items.children.find(item => item.label === label).count;
        return { user: row.name, count: parseInt(count) };
      }),
    }));
  };

  // // Filter data based on the selected user
  // const filteredData = selectedUser ? data.filter(row => row.name === selectedUser) : data;

  // Construct series data for Highcharts
  const seriesData = meta.map(meta => ({
    name: meta.label, // Series name from meta label
    data: getActivityCounts(meta.label).map(day => ({
      name: day.name, // Day name
      y: day.data // Sum of counts for the day
        .filter(val => !selectedUser || val.user === selectedUser)
        .reduce((acc, val) => acc + val.count, 0),
      users: day.data // Users and their counts for the tooltip
        .filter(val => val.count > 0 && (!selectedUser || val.user === selectedUser))
        .map(val => `${val.user}: ${val.count}`).join('<br/>')
    })),
    color: meta.fillColor, // Series color from meta fillColor
  }));

  // Highcharts configuration options
  const options = {
    chart: {
      type: 'column', // Set chart type to column (bar chart)
    },
    title: {
      text: 'Day-Wise User Activity Chart', // Chart title
    },
    xAxis: {
      categories: days, // Set x-axis categories
      title: {
        text: 'Day', // Title of x-axis
      },
    },
    yAxis: {
      min: 0, // Minimum value of y-axis
      title: {
        text: 'Activity Value', // Title of y-axis
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      formatter: function () {
        // Custom tooltip formatter to show activity counts per user
        let tooltip = `<b>${this.x}</b><br/>`;
        this.points.forEach(point => {
          tooltip += `<b style="color:${point.series.color}">${point.series.name}:</b> ${point.y}<br/>`;
          tooltip += point.point.users ? `${point.point.users}<br/>` : '';
        });
        return tooltip;
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true, // Enable data labels
        },
      },
    },
    series: seriesData, // Series data for the chart
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
        <InputLabel id="user-select-label">Select User</InputLabel>
        <Select
          labelId="user-select-label"
          value={selectedUser}
          onChange={handleUserChange}
          label="Select User"
        >
          <MenuItem value=""><em>All Users</em></MenuItem>
          {data.map(row => (
            <MenuItem key={row.name} value={row.name}>{row.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Dailyactivity;
