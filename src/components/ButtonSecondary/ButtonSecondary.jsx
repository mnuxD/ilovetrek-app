import { Button } from "@mui/material";
const ButtonSecondary = ({ label, onClick }) => {
  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#FF7B5F",
          borderColor: "#FF7B5F",
          padding: "10px 40px",
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

export default ButtonSecondary;
