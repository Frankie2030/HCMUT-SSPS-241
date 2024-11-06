import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";

export function VerticalTabs({ item }) {
  const [selectedTab, setSelectedTab] = useState("1");

  return (
    <div>
      {/* Dropdown for mobile screens */}
      <div className="mb-4 block md:hidden">
        <Select
          label="Select Tab"
          value={selectedTab}
          onChange={(value) => setSelectedTab(value)}
          className="w-full"
        >
          {item.map(({ label, value }) => (
            <Option key={value} value={value} className="text-left">
              {label}
            </Option>
          ))}
        </Select>
      </div>

      {/* Tabs layout for larger screens */}
      <Tabs
        value={selectedTab}
        orientation="vertical"
        className="hidden md:flex md:flex-row"
        onChange={(value) => setSelectedTab(value)}
      >
        <TabsHeader
          className="w-full bg-transparent md:w-72"
          indicatorProps={{
            className: "bg-gray-900/10 shadow-none !text-gray-900 md:w-72",
          }}
        >
          {item.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              className="flex w-full items-center gap-2 px-4 py-3 md:px-6 md:py-5"
            >
              <div className="flex w-full items-center gap-3 text-left">
                <div className="flex-shrink-0">{icon}</div>
                <Typography
                  variant="h5"
                  className="text-left text-sm md:text-base"
                >
                  {label}
                </Typography>
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="w-full md:ml-10">
          {item.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="py-0 text-left">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>

      {/* Display selected tab content on smaller screens */}
      <div className="mt-4 block md:hidden">
        {item
          .filter(({ value }) => value === selectedTab)
          .map(({ value, desc }) => (
            <div key={value} className="py-0 text-left">
              {desc}
            </div>
          ))}
      </div>
    </div>
  );
}
