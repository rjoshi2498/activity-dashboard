import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChart = ({ data, meta }) => {
  const categories = data.map(row => row.name);
  const seriesData = meta.map(meta => ({
    name: meta.label,
    data: data.map(row => parseInt(row.totalActivity.find(activity => activity.name === meta.label).value)),
    color: meta.fillColor,
  }));

  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Line Chart',
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Activity Value',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>',
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: seriesData,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
