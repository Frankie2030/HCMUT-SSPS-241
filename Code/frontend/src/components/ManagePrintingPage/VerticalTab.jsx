import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";

export function VerticalTabs({ item }) {
  const componentStyle = {
    width: "300px",
    height: "60px",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: "6%",
    paddingBottom: "6%",
    textAlign: "left",
    margin: "2%",
  };
  return (
    <Tabs value="1" orientation="vertical">
      <TabsHeader
        className="bg-transparent w-72"
        indicatorProps={{
          className: "bg-gray-900/10 shadow-none !text-gray-900 w-72",
        }}
      >
        {item.map(({ label, value, icon }) => (
          <Tab
            key={value}
            value={value}
            className="flex items-center justify-start gap-2"
            style={componentStyle}
          >
            <div className="flex gap-3 items-center">
              {icon}
              <Typography variant="h5">{label}</Typography>
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        className="ms-10"
      >
        {item.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="py-0">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
