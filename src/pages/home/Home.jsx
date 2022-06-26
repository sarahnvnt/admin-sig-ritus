import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
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
        <div className="widgets">
          <Widget type="user" value={cultures.length} />
          <Widget type="order" value={provinces.length} />
          {/* <Widget type="products" value={users.length} /> */}
        </div>
        <div className="charts">
          {/* <Featured /> */}
          {/* <Chart title="Last 6 Months Revenue" aspect={2 / 1} /> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
