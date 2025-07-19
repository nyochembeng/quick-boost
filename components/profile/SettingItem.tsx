"use client";

const SettingItem = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
    <div className="flex-1">
      <h4 className="font-medium text-gray-900 text-sm sm:text-base">
        {title}
      </h4>
      <p className="text-gray-600 text-xs sm:text-sm">{description}</p>
    </div>
    <div className="sm:ml-4">{children}</div>
  </div>
);

export default SettingItem;
