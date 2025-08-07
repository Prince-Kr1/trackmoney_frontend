import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  console.log("User in DashboardLayout:", user); // DEBUG LINE

  return (
    <div>
      <Navbar />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
