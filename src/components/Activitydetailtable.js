import React from 'react';
import {MaterialReactTable} from 'material-react-table';

const ActivityDetailTable = ({ userData, meta }) => {
  // Prepare columns configuration for MaterialReactTable
  const columns = [
    {
      accessorKey: 'date',
      header: 'Date',
    },
    ...meta.map((activityMeta) => ({
      accessorKey: activityMeta.label,
      header: activityMeta.label,
      Cell: ({ row }) => {
        const activityItem = row.original.items.children.find(item => item.label === activityMeta.label);
        return activityItem ? activityItem.count : 0; // Display the activity count or 0 if not found
      },
    })),
  ];

  // Prepare data for MaterialReactTable
  const data = userData.dayWiseActivity.map((dayActivity) => ({
    date: dayActivity.date,
    items: dayActivity.items,
  }));

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnResizing
      enableSorting
      enablePagination
    />
  );
};

export default ActivityDetailTable;
