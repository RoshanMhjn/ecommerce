import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Select } from "../ui/select";
import { Checkbox } from "../ui/checkbox";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-black`}
    >
      <CardContent
        className={`
        grid gap-4`}
      >
        <div className="pt-4">
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {addressInfo?.address}
          </p>
          <p>
            <span className="font-semibold">City:</span> {addressInfo?.city}
          </p>
          <p>
            <span className="font-semibold">Pincode:</span>{" "}
            {addressInfo?.pincode}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>
            {addressInfo?.phone}
          </p>
          <p>
            <span className="font-semibold">Notes:</span> {addressInfo?.notes}
          </p>
        </div>
        <Checkbox />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
