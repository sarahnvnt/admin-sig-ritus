import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import { getCultures, getProvinces, getUsers } from "../../redux/apiCalls";
import "./home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { provinces } = useSelector((state) => state.provinces);
  // const { users } = useSelector((state) => state.users);
  const { cultures } = useSelector((state) => state.cultures);

  useEffect(() => {
    getProvinces(dispatch);
    getUsers(dispatch);
    getCultures(dispatch);
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1 style={{ textAlign: "center" }}>
          Admin Sistem Informasi Geografis
        </h1>
        {/* <p>Selamat Datang di halaman Admin Sistem Informasi Geografis</p> */}
        <div className="widgets">
          <Widget type="ritus" value={cultures.length} />
          <Widget type="provinces" value={provinces.length} />
          {/* <Widget type="products" value={users.length} /> */}
        </div>
        <div className="charts">
          {/* <Chart title="Last 6 Months Revenue" aspect={2 / 1} /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
