/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const DataCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: any;
}) => {
  return (
    <div className="p-5 rounded-lg border bg-dark-100 shadow-lg flex flex-col items-start">
      <div className="flex items-center justify-between w-full">
        <p className="text-sm">{label}</p>

        {icon}
      </div>
      <div className="mt-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
};

export default DataCard;
