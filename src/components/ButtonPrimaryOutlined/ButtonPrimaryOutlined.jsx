import { Button } from "@mui/material";

const ButtonPrimaryOutlined = ({ label, onClick }) => {
  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: "white",
          border: "1px solid #9f2dc7",
          color: "#9f2dc7",
        }}
        onClick={onClick}
      >
        {label}
      </Button>
    </>
  );
};

export default ButtonPrimaryOutlined;
