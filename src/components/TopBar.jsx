import React, { useContext, useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { OptionContext, UploadContext, UserContext } from "../context/OptionContext";
import { GrUndo } from "react-icons/gr";
import { GrRedo } from "react-icons/gr";
import { motion } from "motion/react";
import { PiExportFill } from "react-icons/pi";
import { RiUploadCloudFill } from "react-icons/ri";
import { menu } from "motion/react-m";
import { GiConsoleController } from "react-icons/gi";

const topBarMenuItems = [
  {
    name: "Undo",
    property: "undo",
    active: false,
    icon: GrUndo,
  },
  {
    name: "Redo",
    property: "redo",
    active: false,
    icon: GrRedo,
  },
  {
    name: "Reset",
    property: "reset",
    active: false,
    icon: GrPowerReset,
  },
  {
    name: "Export",
    property: "export",
    active: false,
    icon: PiExportFill,
  },
  {
    name: "Save Cloud",
    property: "save-cloud",
    active: false,
    icon: RiUploadCloudFill,
  },
];

const TopBar = () => {
  const {
    topMenuItems,
    setTopMenuItems,
    menuItemOptions,
    setMenuItemOptions,
    resetOptions,
    setResetOptions,
    selectedMenuOption,
    setSelectedMenuOption,
    download,
    setDownload,
    url,
    setUrl,
    undoHistory,
    setUndoHistory,
    redoHistory,
    setRedoHistory,
  } = useContext(OptionContext);

  const {uploadMadal, setUploadMadal} = useContext(UploadContext)
  const {userData, setLoginMadalOpen, setSignInMadalOpen } = useContext(UserContext);


  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setTopMenuItems(topBarMenuItems); // Ensure `sideBarMenuItems` is defined
  }, [topBarMenuItems]);

  //console.log(undoHistory)

  useEffect(() => {
    if (!menuItemOptions && !url) return;
    if (selectedItem === "reset") {
      setMenuItemOptions(resetOptions);
      //console.log(resetOptions)
      const crop = resetOptions.find((option) => option.property === "crop");
      setUrl(crop.url);
    } else if (selectedItem === "export") {
      setDownload(true);
    } else if (selectedItem === "undo" && undoHistory.length > 0) {
      //setRedoHistory(pre => [...pre,menuItemOptions])
      const popOption = undoHistory.pop();
      setMenuItemOptions(popOption);
      setRedoHistory((pre) => [...pre, popOption]);
      const crop = popOption.find((option) => option.property === "crop");
      setUrl(crop.url);
    } else if (selectedItem === "redo" && redoHistory.length > 0) {
      const popOption = redoHistory.pop();
      setMenuItemOptions(popOption);
      setUndoHistory((pre) => [...pre, popOption]);
      const crop = popOption.find((option) => option.property === "crop");
      setUrl(crop.url);
    } else if(selectedItem === "save-cloud" && url !== null){
      if(userData){
        setUploadMadal(true)
      }else{
        setSignInMadalOpen(true)
      }
    
    }

    const updatedOption = menuItemOptions.find(
      (item) => item.property === selectedMenuOption?.property
    );

    if (updatedOption) {
      setSelectedMenuOption(updatedOption);
    }

    setSelectedItem(null);
  }, [selectedItem]);

  useEffect(() => {
    const updateActiveState = (property, isActive) => {
      setTopMenuItems((prev) =>
        prev.map((option) =>
          option.property !== property
            ? option
            : { ...option, active: isActive }
        )
      );
    };

    updateActiveState("undo", undoHistory.length > 0);
    updateActiveState("redo", redoHistory.length > 0);
    updateActiveState("reset", url !== null);
    updateActiveState("export", url !== null);
    updateActiveState("save-cloud", url !== null);
  }, [undoHistory, redoHistory, url]);

  // useEffect(() => {
  //   if (selectedIndex !== null) {
  //     setSelectedMenuOption(menuItemOptions[selectedIndex]);
  //   }
  // }, [selectedIndex]);

  // useEffect(() => {
  //   setMenuItemOptions((pre) => {
  //    return pre.map((option, index) => {
  //     if(index !== selectedIndex) return option
  //       return{...option, value: selectedMenuOption.value}
  //     });
  //   });
  // }, [selectedMenuOption]);

  return (
    <div className="fixed top-10 sm:top-0 inset-x-2 sm:left-1/2 sm:transform sm:-translate-x-1/2 mt-2 rounded shadow-md bg-secondary text-white z-50 sm:w-fit">
      <div className="flex justify-around sm:justify-center">
        {topMenuItems?.map((item, index) => (
          <SideBarItems
            key={index}
            icon={item.icon}
            name={item.name}
            active={item.active}
            onClick={() => {
              setSelectedIndex(index);
              setSelectedItem(item.property);
            }}
            selectedIndex={selectedIndex}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

function SideBarItems({
  icon: Icon,
  name,
  onClick,
  selectedIndex,
  index,
  active,
}) {
  return (
    <div
      className="px-3 py-1 flex flex-col items-center justify-center gap-1 hover:bg-hoverIconBg cursor-pointer"
      onClick={onClick}
    >
      <Icon
        className={`w-5 h-5 text-icon cursor-pointer ${
          active ? "" : "pointer-events-none opacity-20"
        }`}
      />
      <motion.p
        className={`text-xs text-textpara whitespace-nowrap select-none ${
          active ? "" : "pointer-events-none opacity-50"
        }`}
      >
        {name}
      </motion.p>
    </div>
  );
}

export default TopBar;
