import React from "react";
import SidebarTile from "./SidebarTile";
import {
  BsFillPersonFill,
  BsThreeDotsVertical,
  BsFillChatLeftTextFill,
  BsClockHistory,
} from "react-icons/bs";
import { MdGroups } from "react-icons/md";

const Sidebar = () => {
  return (
    // <div className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 ">
    //   <ul className="md:flex-col md:min-w-full flex flex-col list-none">
    //     <SidebarTile to="#" title="Room 1" />
    //     <SidebarTile to="#" title="Room 1" />
    //     <SidebarTile to="#" title="Room 1" />
    //   </ul>
    // </div>
    <div>
      <div className="p-2 bg-sky-500 flex justify-between">
        <button className="bg-white border rounded-full inline-flex w-10 h-10 justify-center">
          <BsFillPersonFill className="text-2xl self-center" />
        </button>
        <div className="flex  space-x-4 w-full justify-end text-lg">
          <button>
            <MdGroups className="self-center" />
          </button>
          <button>
            <BsClockHistory className="self-center" />
          </button>
          <button>
            <BsFillChatLeftTextFill className="self-center" />
          </button>
          <button>
            <BsThreeDotsVertical className="self-center" />
          </button>
        </div>
      </div>
      <ul>
        <SidebarTile to="#" title="Room 1" />
        <SidebarTile to="#" title="Room 2" />
        <SidebarTile to="#" title="Room 3" />
      </ul>
    </div>
  );
};

export default Sidebar;
