import React, { useState, useEffect } from "react";
import { RiHome4Line,  RiFolder2Line, RiPlantLine, RiStackLine,  } from "react-icons/ri";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { Sidebar, SubMenu, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // For user authentication
import md5 from 'md5'; // For generating Gravatar URL
import './style.css'; // Import CSS file for styling
import { FaUser } from "react-icons/fa";

function Dashboard (){
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [userName, setUserName] = useState(""); // State for user name
  const [userAvatar, setUserAvatar] = useState(""); // State for user avatar
  const navigate = useNavigate(); // Use navigate for routing

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName ); // Get the user's display name
        const avatarUrl = getGravatarUrl(user.email); // Generate the Gravatar URL
        setUserAvatar(avatarUrl);
      } else {
        setUserName(""); // Clear user data if not authenticated
        setUserAvatar("");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  // Function to generate Gravatar URL from email
  const getGravatarUrl = (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    const hashedEmail = md5(trimmedEmail);
    return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon&r=g`;
  };

  return (
    <div>
      <Sidebar
        className={`app ${toggled ? "toggled" : ""}`}
        style={{ height: "100%", position: "absolute" }}
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      >
        <main>
          <Menu>
            {collapsed ? (
              <MenuItem
                icon={<FiChevronsRight />}
                onClick={handleCollapsedChange}
              ></MenuItem>
            ) : (
              <MenuItem
                suffix={<FiChevronsLeft />}
                onClick={handleCollapsedChange}
              >
                <div
                  style={{
                    padding: "9px",
                    fontWeight: "bold",
                    fontSize: 14,
                    letterSpacing: "1px"
                  }}
                >
                  {/* Display avatar and name */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={userAvatar}
                      alt="User Avatar"
                      style={{ borderRadius: "50%", width: "30px", height: "30px", marginRight: "10px" }}
                    />
                    <span>{userName}</span>
                  </div>
                </div>
              </MenuItem>
            )}
            <hr />
          </Menu>

          <Menu>
            <MenuItem
              icon={<RiHome4Line />}
              onClick={() => navigate("/")}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<FaUser />}
              onClick={() => navigate("/user-profile")}
            >
              Account
            </MenuItem>
            <SubMenu defaultOpen label={"Plant Management"} icon={<RiPlantLine />}>
              <MenuItem onClick={() => navigate("/home-screen-plants")}>
                Home Screen Plants
              </MenuItem>
              <MenuItem onClick={() => navigate("/add-plants-screen")}>
                Add Plants
              </MenuItem>
              <MenuItem onClick={() => navigate("/edit-plants-screen/:plantId")}>
                Edit Plants
              </MenuItem>
              <MenuItem onClick={() => navigate("/plant-detail-screen/:id")}>
                Plant Details
              </MenuItem>
            </SubMenu>
            <SubMenu defaultOpen label={"Data Management"} icon={<RiFolder2Line />}>
              <MenuItem onClick={() => navigate("/history")}>
                Sensor Data History
              </MenuItem>
              <MenuItem onClick={() => navigate("/current-data")}>
                Current Data Dashboard
              </MenuItem>
            </SubMenu>
            <MenuItem
              icon={<RiStackLine />}
              onClick={() => navigate("/detect")}
            >
              Disease Detection
            </MenuItem>
          </Menu>
        </main>
      </Sidebar>
    </div>
  );
}

export default Dashboard;
