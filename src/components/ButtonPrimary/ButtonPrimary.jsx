import { Button } from "@mui/material";

const ButtonPrimary = ({ label, onClick }) => {
  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#9f2dc7",
          borderColor: "#9f2dc7",
        }}
        onClick={onClick}
      >
        {label}
      </Button>
    </>
  );
};

export default ButtonPrimary;
