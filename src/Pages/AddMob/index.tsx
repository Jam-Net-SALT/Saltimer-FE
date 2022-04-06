import { Card } from "@mantine/core";
import AddNewMob from "../../components/AddNewMob";

const AddMob = () => {
  return (
    <>
      <div id="overlay" style={{
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0'
      }} />
      <Card shadow='xl' sx={{ '@media(max-width: 500px)': { width: 300 } }}>
        <AddNewMob/>
      </Card>
    </>
  );
};


export default AddMob;
