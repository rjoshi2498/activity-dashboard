import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import HC_exportData from "highcharts/modules/export-data";
// Initialize Highcharts modules for exporting and data export functionality
HC_exporting(Highcharts);
HC_exportData(Highcharts);
const BarChart = ({ data, meta }) => {
  // Extract categories from the data for the x-axis labels
  const categories = data.map((row) => row.name);
  // Construct series data for the chart from meta information and data
  const seriesData = meta.map((meta) => ({
    name: meta.label, // Series name from meta label
    // Series data values extracted from totalActivity
    data: data.map((row) =>
      parseInt(
        row.totalActivity.find((activity) => activity.name === meta.label).value
      )
    ),
    color: meta.fillColor, // Series color from meta fillColor
  }));
  // Highcharts configuration options
  const options = {
    chart: {
      type: "column", // Set chart type to column (bar chart)
    },
    title: {
      text: "Activities per user", // Chart title
    },
    xAxis: {
      categories: categories, // Set x-axis categories
    },
    yAxis: {
      min: 0, // Minimum value of y-axis
      title: {
        text: "Activity Value", // Title of y-axis
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b>", // Tooltip format
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true, // Enable data labels
        },
      },
    },
    series: seriesData, // Data for the chart
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
