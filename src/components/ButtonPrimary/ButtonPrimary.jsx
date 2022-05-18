import { Button } from "@mui/material";

const ButtonPrimary = ({ label, onClick, disabled }) => {
  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#9f2dc7",
          border: "1px solid #9f2dc7",
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    </>
  );
};

export default ButtonPrimary;
