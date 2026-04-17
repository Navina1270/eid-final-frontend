import Table from '@/components/Common/Table/Table';
import React from 'react';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
 
const ConnectorTimeseriesLink = () => {
  const labels = [
    "Username",
    "Host",
    "Port",
    "Source Path",
    "S3",
    "Actions"
  ];
 
  const handleEdit = (row) => {
    console.log("Edit clicked for:", row);
  };
 
  const handleDelete = (row) => {
    console.log("Delete clicked for:", row);
  };
 
  const tableData = [
    {
      Username: "admin_user",
      Host: "192.168.0.1",
      Port: "5432",
      "Source Path": "/data/input",
      S3: "s3://bucket-name/folder",
      Actions: (
        <div className="flex gap-2">
          <PencilIcon
            className="h-5 w-5 text-blue-400 cursor-pointer hover:text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit("admin_user");
            }}
          />
          <TrashIcon
            className="h-5 w-5 text-red-400 cursor-pointer hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete("admin_user");
            }}
          />
        </div>
      )
    },
    {
      Username: "db_user",
      Host: "10.0.0.5",
      Port: "3306",
      "Source Path": "/db/backups",
      S3: "s3://archive/db",
      Actions: (
        <div className="flex gap-2">
          <PencilIcon
            className="h-5 w-5 text-blue-400 cursor-pointer hover:text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit("db_user");
            }}
          />
          <TrashIcon
            className="h-5 w-5 text-red-400 cursor-pointer hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete("db_user");
            }}
          />
        </div>
      )
    }
  ];
 
  return (
    <div>
      <Table labels={labels} tableData={tableData} />
    </div>
  );
};
 
export default ConnectorTimeseriesLink;