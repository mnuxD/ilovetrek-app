import { Button } from "@mui/material";

const ButtonPrimaryForm = ({ label }) => {
  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#9f2dc7",
          border: "1px solid #9f2dc7",
        }}
        type="submit"
      >
        {label}
      </Button>
    </>
  );
};

export default ButtonPrimaryForm;
