import { Card, CardBody, Typography } from "@material-tailwind/react";

const SimpleCard = ({ icon, headertext, bodytext }) => {
  return (
    <Card className="w-2/3 transform rounded-lg transition duration-500 hover:scale-110 md:w-72 lg:w-56">
      <CardBody className="flex flex-col items-center gap-2">
        {icon}
        <Typography className="text-lg font-bold">{headertext}</Typography>
        <Typography className="text-justify">{bodytext}</Typography>
      </CardBody>
    </Card>
  );
};

export default SimpleCard;
