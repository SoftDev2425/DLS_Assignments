import axios from "axios";
import React, { useEffect } from "react";

const HomePage = () => {
  const [data, setData] = React.useState("");

  const healthCheck = async () => {
    const response = await axios.get("http://localhost:8080/healthcheck");
    setData(response.data);
  };

  useEffect(() => {
    healthCheck();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1>Home Page</h1>
      <p>Healthcheck: {data ? data : "Loading..."}</p>
    </div>
  );
};

export default HomePage;
