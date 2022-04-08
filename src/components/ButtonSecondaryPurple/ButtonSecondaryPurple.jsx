import { Button } from "@mui/material";

const ButtonSecondaryPurple = ({ label, onClick }) => {
  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#9f2dc7",
          borderColor: "#9f2dc7",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          height: "45px",
        }}
        onClick={onClick}
      >
        {label}
      </Button>
    </>
  );
};

export default ButtonSecondaryPurple;
