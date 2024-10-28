import React from 'react';
import {Input, DatePicker, useState, H6} from "@material-tailwind/react";

const Datetime = () => {
    return(
    <div className="flex flex-wrap mt-5">
            <div className="w-full lg:w-6/12 px-4">
                <H6 color="gray">Date</H6>
                <Input
                    type="date"
                    color="lightBlue"
                    size="regular"
                    outline={true}
                    placeholder="Select a date"
                />
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <H6 color="gray">Time</H6>
                <Input
                    type="time"
                    color="lightBlue"
                    size="regular"
                    outline={true}
                    placeholder="Select a time"
                />
            </div>
        </div>
    );
};
export default Datetime;
