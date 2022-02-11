import React, { useRef, useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { Tag, Divider } from "antd";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import UsersScreen from "./UsersScreen";
import ParentsScreen from "./ParentsScreen";
import BookingsScreen from "./BookingsScreen";
import BabySittersScreen from "./BabySittersScreen";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
const { TabPane } = Tabs;

const AdminScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //if user is not admin, will route back to dashboard
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user.isAdmin) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Users" key="1">
          <UsersScreen />
        </TabPane>
        <TabPane tab="Parents" key="2">
          <ParentsScreen />
        </TabPane>
        <TabPane tab="Baby Sitters" key="3">
          <BabySittersScreen />
        </TabPane>
        <TabPane tab="Bookings" key="4">
          <BookingsScreen />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminScreen;
