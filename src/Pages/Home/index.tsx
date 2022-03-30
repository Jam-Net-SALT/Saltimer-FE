import React from "react";
import PlaceholderTitle from "../../components/PlaceholderTitle";
import LoginCard from "../../components/LoginCard";

function HomePage() {
  return (
    <div>
      <PlaceholderTitle />
        <div style={{display: 'flex', justifyContent:'center'}}>
            <LoginCard />
        </div>
    </div>
  );
}

export default HomePage;
