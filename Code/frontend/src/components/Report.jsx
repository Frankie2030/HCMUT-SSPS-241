import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import {
  UserIcon,
  CurrencyDollarIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import ReactToPrint from "react-to-print";

const areaChartConfig = {
  type: "area",
  height: 240,
  series: [
    {
      name: "Revenue",
      data: [50, 100, 150, 300, 450, 600, 800, 1000, 1200],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: true,
      },
      background: "#f4f7f6", // Soft background
    },
    title: {
      text: "Revenue Growth",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#333"],
      },
    },
    colors: ["#3f83f8"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          fontSize: "12px",
          colors: "#666",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: "#666",
        },
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      strokeDashArray: 5,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `$${val}K`,
      },
    },
  },
};

const scatterChartConfig = {
  type: "scatter",
  height: 240,
  series: [
    {
      name: "New Users",
      data: [
        { x: "Apr", y: 50 },
        { x: "May", y: 70 },
        { x: "Jun", y: 40 },
        { x: "Jul", y: 60 },
        { x: "Aug", y: 90 },
        { x: "Sep", y: 70 },
        { x: "Oct", y: 110 },
        { x: "Nov", y: 100 },
        { x: "Dec", y: 130 },
      ],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: true,
      },
    },
    colors: ["#ff6347"],
    xaxis: {
      title: {
        text: "Months",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: "#333",
        },
      },
    },
    yaxis: {
      title: {
        text: "New Users",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    grid: {
      borderColor: "#ccc",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val} Users`,
      },
    },
  },
};

const columnChartConfig = {
  type: "bar",
  height: 240,
  series: [
    {
      name: "Pages Printed",
      data: [500, 450, 700, 300, 650, 800, 400, 550, 900, 1000],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: true,
      },
    },
    title: {
      text: "Printer Usage",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: [
        "Printer 1",
        "Printer 2",
        "Printer 3",
        "Printer 4",
        "Printer 5",
        "Printer 6",
        "Printer 7",
        "Printer 8",
        "Printer 9",
        "Printer 10",
      ],
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Pages Printed",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    colors: ["#3f83f8"],
    grid: {
      borderColor: "#e7e7e7",
      strokeDashArray: 5,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val} Pages`,
      },
    },
  },
};

const pieChartConfig = {
  type: "pie",
  height: 240,
  series: [300, 400, 250, 200, 150, 100, 350, 450, 500, 600],
  options: {
    title: {
      text: "User Printing Distribution",
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    labels: [
      "User 1",
      "User 2",
      "User 3",
      "User 4",
      "User 5",
      "User 6",
      "User 7",
      "User 8",
      "User 9",
      "User 10",
    ],
    colors: [
      "#3f83f8",
      "#ffa500",
      "#ff6347",
      "#32cd32",
      "#8a2be2",
      "#ff69b4",
      "#8b4513",
      "#00ced1",
      "#9400d3",
      "#ff4500",
    ],
    legend: {
      position: "bottom",
      labels: {
        colors: "#333",
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val} Pages`,
      },
    },
  },
};

class PrintableComponent extends React.PureComponent {
  render() {
    return (
      <div className="flex flex-col gap-10 pt-10">
        {/* Revenue Chart */}
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-[#3f83f8] p-5 text-white">
              <CurrencyDollarIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Revenue
              </Typography>
              <Typography variant="paragraph" color="blue-gray">
                Number of Sold Pages
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...areaChartConfig} />
          </CardBody>
        </Card>

        {/* New Users Chart */}
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-[#3f83f8] p-5 text-white">
              <UserIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                New User
              </Typography>
              <Typography variant="paragraph" color="blue-gray">
                Number of first-use User in this month
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...scatterChartConfig} />
          </CardBody>
        </Card>

        {/* Pages Printed by Printers */}
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-[#3f83f8] p-5 text-white">
              <PrinterIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Printer Usage
              </Typography>
              <Typography variant="paragraph" color="blue-gray">
                Pages Printed by Printers
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...columnChartConfig} />
          </CardBody>
        </Card>

        {/* Pages Printed by Users */}
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-[#3f83f8] p-5 text-white">
              <UserIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                User Printing
              </Typography>
              <Typography variant="paragraph" color="blue-gray">
                Pages Printed by Users
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...pieChartConfig} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

class Report extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <Button color="blue">Export</Button>}
          content={() => this.componentRef}
        />
        <PrintableComponent ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Report;
