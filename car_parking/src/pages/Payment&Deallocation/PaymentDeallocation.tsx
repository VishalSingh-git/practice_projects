import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../component/GlobalContext";

interface Slot {
  id: string;
  occupied: boolean;
  vehicleNumber?: string;
  parkingTime?: string;
  exitParkingTime?: string;
}

interface TotalCharge {
  TotalTime: number;
  TotalCharge: number;
}

const PaymentDeallocation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const value = useContext(GlobalContext);
  const updatedSlots = value?.data;
  const exitSlot = location.state as Slot;


  const [totalCharge, setTotalCharge] = useState<TotalCharge>({
    TotalTime: 0,
    TotalCharge: 0,
  });

  const [loading, setLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const calculateTotalCharge = () => {
    const deallocateSlot = updatedSlots?.find(
      (slot: Slot) => exitSlot?.id === slot?.id
    );
    const currentDate = new Date().toDateString();
    let startTime: Date | null = new Date(
      currentDate + " " + deallocateSlot?.parkingTime
    );
    let endTime: Date | null = new Date(
      currentDate + " " + deallocateSlot?.exitParkingTime
    );
    let timeDifference: number | null =
      startTime && endTime ? endTime.getTime() - startTime.getTime() : null;
    const totalParkedTime =
      timeDifference !== null ? timeDifference / (1000 * 60 * 60) : 0;

    if (totalParkedTime <= 2) {
      setTotalCharge({ TotalTime: totalParkedTime, TotalCharge: 10 });
    } else {
      const additionalHours = Math.ceil(totalParkedTime - 2);

      setTotalCharge({
        TotalTime: totalParkedTime,
        TotalCharge: 10 + additionalHours * 10,
      });
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    const requestBody = {
      "car-registration": exitSlot?.vehicleNumber,
      charge: totalCharge?.TotalCharge,
    };

    try {
      const response = await axios.post("https://httpstat.us/200", requestBody);

      console.log(response);
      if (response.status === 200) {
        setPaymentCompleted(true);
        console.log("Payment successful");
      } else {
        console.error("Payment failed");
      }
    } catch (error) {
      console.error("Error making payment:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    calculateTotalCharge();
  }, []);

  const handleDeallocate = () => {
    const deallocateSlot = updatedSlots?.filter(
      (slot: Slot) => exitSlot?.id !== slot?.id
    );

    if (deallocateSlot) {
      value?.handleData(deallocateSlot);
      navigate("/allSlots");
    }
  };

  return (
    <div>
      <Typography
        sx={{
          color: "white",
          backgroundColor: "#1976d2",
          height: 50,
          fontSize: "large",
          textAlign: "center",
          pl:4
        }}
      >
        Payment And Deallocation
      </Typography>

      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "100vh" }}
      >
        <Card
          sx={{ height: "200px", width: "auto", backgroundColor: "#f8bbd0" }}
        >
          <CardContent>
            <Typography>Veahicle Number :{exitSlot?.vehicleNumber}</Typography>
            <Typography>
              Parked Duration :{totalCharge?.TotalTime ?? 0}
            </Typography>
            <Typography>
              Parking Charges:{totalCharge?.TotalCharge ?? 0}
            </Typography>

            <Stack alignItems={"center"}  sx={{mt:3}}>
            {paymentCompleted ? (
              <Button variant="contained" onClick={handleDeallocate}>
                Deallocate
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ bgcolor: "red" }}
                disabled={loading}
                onClick={handlePayment}
              >
                {" "}
                {loading ? "Processing..." : "Pay"}
              </Button>
            )}
            </Stack>

          </CardContent>
        </Card>{" "}
      </Stack>
    </div>
  );
};

export default PaymentDeallocation;
