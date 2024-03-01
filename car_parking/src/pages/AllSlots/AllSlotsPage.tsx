import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../component/GlobalContext";

import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface Slot{
  id: string;
  occupied: boolean;
  vehicleNumber?: string;
  parkingTime?: string;
  exitParkingTime?: string;

}
const AllSlotsPage :React.FC = () => {
  const navigate = useNavigate();

  const value = useContext(GlobalContext);

  const NumberOfSlots = Number(value?.NumberOfSlots);

  const [allSlots, setAllSlots] = useState<Slot[]>(value?.data ??[]);
  const [vehicleNumber, setVehicleNumber] = useState<string>("");

  const [isSnackbar, setSnackbar] = useState<boolean>(false);

  console.log(allSlots);

  useEffect(() => {
    if (!value?.data.length) {
      const array = [];
      value?.handleNumberOfSlots(0)
      for (let i = 1; i <= NumberOfSlots; i++) {
        const randomId = Math.random().toString(36).slice(2, 9);
        const newObj = { id: randomId, occupied: false };
        array.push(newObj);
      }
      setAllSlots(array);
      value?.handleData(array);
    }
  }, [NumberOfSlots]);

  const handleSnackbar = () => {
    setSnackbar(false);
  };

  const handleVehicleNumberChange = (e: ChangeEvent<HTMLInputElement>) :void=> {
    setVehicleNumber(e.target.value);
  };

  const handleSlotAllocation = () :void => {
    const availableSlots = allSlots?.filter((slots: Slot) => !slots.occupied);

    if (availableSlots?.length === 0) {
      setSnackbar(true);
    } else {
      const randomAvailableSlots =
        availableSlots[Math.floor(Math.random() * availableSlots?.length)];
      const currentTime = new Date().toLocaleTimeString();
      const updateSlots = allSlots?.map((slot: Slot) =>
        slot.id === randomAvailableSlots.id
          ? {
              ...slot,
              vehicleNumber: vehicleNumber,
              occupied: true,
              parkingTime: currentTime,
            }
          : slot
      );

      setAllSlots(updateSlots);
      value?.handleData(updateSlots);
    }
  };

  const handleSlotDeallocation = (exitSlot: Slot) => {
    const exitTime = new Date().toLocaleTimeString();
    const updatedSlot = allSlots?.map((slot: Slot) =>
      slot.id === exitSlot.id
        ? { ...slot, exitParkingTime: exitTime, occupied: false }
        : slot
    );

    value?.handleData(updatedSlot);
    setAllSlots(updatedSlot );

    navigate("/payment_deallocation", { state: exitSlot });
  };

  return (
    <div>
      <Typography
        variant="h4"
        sx={{  backgroundColor: "#616161", color: "white",p:2 }}
      >
        All Parking Slots
      </Typography>
      <Stack
        direction={"row"}
        spacing={3}
        sx={{ p: 1,backgroundColor:"#b3e5fc" }}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        <TextField
          variant="outlined"
          onChange={handleVehicleNumberChange}
          label="Enter Vehicle Number"
          value={vehicleNumber}
        />
        <Button variant="contained"  onClick={handleSlotAllocation}>
          Submit
        </Button>
      </Stack>
      <Grid
        container
        direction={"row"}
        sx={{ backgroundColor: "#90a4ae", minHeight: "100vh",rowGap: "0 !important" ,}}
      >
        {allSlots?.map((slot: Slot) => (
          <Grid
            item
            key={slot.id}
            sx={{ width: "auto", height: "150px", m: 2}}
          >
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {" "}
                  <strong>Id :</strong> {slot.id}
                </Typography>
                <Typography variant="h6">
                  {" "}
                  <>Vehicle Number :</> {slot.vehicleNumber}
                </Typography>
                <Divider />
                <Typography sx={{ color: "blue" }}>
                  Parking Time :{slot.parkingTime}{" "}
                </Typography>
                {slot.occupied && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleSlotDeallocation(slot);
                    }}
                  >
                    Exit
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackbar}
        onClose={handleSnackbar}
        autoHideDuration={5000}
        message="Parking is Full"
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#ff0000', // Change to your desired color
          },
        }}
      />
    </div>
  );
};

export default AllSlotsPage;
