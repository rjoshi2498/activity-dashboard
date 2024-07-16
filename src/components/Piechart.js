import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_exporting from "highcharts/modules/exporting";
import HC_exportData from "highcharts/modules/export-data";
HC_exporting(Highcharts);
HC_exportData(Highcharts);

const PieChart = ({ data, meta }) => {
  const seriesData = data.map(row => ({
    name: row.name,
    y: row.totalActivity.reduce((sum, activity) => sum + parseInt(activity.value), 0),
  }));

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Most Number of activities',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [{
      name: 'Total Activity',
      colorByPoint: true,
      data: seriesData,
    }],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
