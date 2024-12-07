import React, { useContext, useEffect, useState } from "react";
import { ImBrightnessContrast } from "react-icons/im";
import { TbContrast2Filled } from "react-icons/tb";
import { RiContrastDropFill } from "react-icons/ri";
import { MdFilterBAndW } from "react-icons/md";
import { MdDeblur } from "react-icons/md";
import { IoColorFilter } from "react-icons/io5";
import { PiDropSimpleFill } from "react-icons/pi";
import { FaCrop } from "react-icons/fa6";
import { AiOutlineRotateLeft } from "react-icons/ai";
import { MdOutlineRoundedCorner } from "react-icons/md";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { OptionContext } from "../context/OptionContext";
import { motion } from "motion/react";
import SelectFile from "./SelectFile";
import { option } from "motion/react-client";
import GalleryBtn from "../buttons/GalleryBtn";

const sideBarMenuItems = [
  {
    name: "Brightness",
    property: "brightness",
    type: "filter",
    value: 100,
    range: { min: 0, max: 200 },
    unit: "%",
    icon: ImBrightnessContrast,
  },
  {
    name: "Contrast",
    property: "contrast",
    type: "filter",
    value: 100,
    range: { min: 0, max: 200 },
    unit: "%",
    icon: TbContrast2Filled,
  },
  {
    name: "Saturation",
    property: "saturate",
    type: "filter",
    value: 100,
    range: { min: 0, max: 200 },
    unit: "%",
    icon: RiContrastDropFill,
  },
  {
    name: "Grayscale",
    property: "grayscale",
    type: "filter",
    value: 0,
    range: { min: 0, max: 100 },
    unit: "%",
    icon: MdFilterBAndW,
  },
  {
    name: "Sepia",
    property: "sepia",
    type: "filter",
    value: 0,
    range: { min: 0, max: 100 },
    unit: "%",
    icon: MdDeblur,
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    type: "filter",
    value: 0,
    range: { min: 0, max: 360 },
    unit: "deg",
    icon: IoColorFilter,
  },
  {
    name: "Blur",
    property: "blur",
    type: "filter",
    value: 0,
    range: { min: 0, max: 20 },
    unit: "px",
    icon: PiDropSimpleFill,
  },
  {
    name: "Invert",
    property: "invert",
    type: "filter",
    value: 0,
    range: { min: 0, max: 200 },
    unit: "%",
    icon: TbTriangleInvertedFilled,
  },
  {
    name: "Rotate",
    property: "rotate",
    type: "style",
    value: 0,
    step:10,
    range: { min: 0, max: 360 },
    unit: "deg",
    icon: AiOutlineRotateLeft,
  },
  {
    name: "Border Curve",
    property: "borderRadius",
    type: "style",
    value: 0,
    range: { min: 0, max: 50 },
    unit: "%",
    icon: MdOutlineRoundedCorner,
  },
  {
    name: "Crop",
    property: "crop",
    type: "no-style",
    value: 0,
    range: { min: 0, max: 200 },
    unit: "%",
    url: "",
    icon: FaCrop,
  },
];

const SideBar = () => {
  const {
    CreateBtnShow,
    menuItemOptions,
    setMenuItemOptions,
    selectedMenuOption,
    setSelectedMenuOption,
    resetOptions,
    setResetOptions,
    url,
    undoHistory,
    setUndoHistory,
    redoHistory,
    setRedoHistory,
    currentPage,
    setCurrentPage,
    selectedIndex,
    setSelectedIndex,
  } = useContext(OptionContext);

  const [hoverAnim, setHoverAnim] = useState({});
  useEffect(() => {
    setMenuItemOptions(sideBarMenuItems); // Ensure `sideBarMenuItems` is defined
    setResetOptions(sideBarMenuItems);
  }, [setMenuItemOptions]);

  useEffect(() => {
    if (selectedIndex !== null) {
      setCurrentPage("edit");
      setSelectedMenuOption(menuItemOptions[selectedIndex]);

      if (menuItemOptions[selectedIndex]?.property === "crop") {
        setCurrentPage("crop");
        setSelectedMenuOption(menuItemOptions[selectedIndex]);
      }
    }

    //console.log(menuItemOptions[selectedIndex]?.property)
  }, [selectedIndex]);

  // url history
  useEffect(() => {
    setMenuItemOptions((pre) => {
      return pre.map((option, index) => {
        if (option.property !== "crop") return option;
        return { ...option, url: url };
      });
    });
  }, [url]);

  useEffect(() => {
    if (currentPage === "edit") {
      setMenuItemOptions((pre) => {
        return pre.map((option, index) => {
          if (index !== selectedIndex) return option;
          return { ...option, value: selectedMenuOption.value };
        });
      });
    } else if (selectedMenuOption.property === "crop") {
    }
  }, [selectedMenuOption]);

  // console.log(currentPage);

  // useEffect(() => {
  //   console.log(redoHistory);
  // }, [redoHistory]);

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 m-2 space-y-1">
      {!CreateBtnShow && <SelectFile className="rounded" />}
      <GalleryBtn/>
      <div
        className={`rounded shadow-md bg-secondary text-white ${
          url ? "" : "pointer-events-none opacity-50"
        }`}
      >
        {menuItemOptions?.map((item, index) => (
          <SideBarItems
            key={index}
            icon={item.icon}
            name={item.name}
            onClick={() => {
              setSelectedIndex(index);
              setUndoHistory((pre) => [...pre, menuItemOptions]);
            }}
            selectedIndex={selectedIndex}
            index={index}
            hoverAnim={hoverAnim}
            setHoverAnim={setHoverAnim}
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
  hoverAnim,
  setHoverAnim,
}) {
  return (
    <div
      className={`px-3 py-3 flex items-center hover:bg-hoverIconBg cursor-pointer rounded relative group ${
        selectedIndex === index ? "bg-hoverIconBg" : ""
      }`}
      onClick={onClick}
      onMouseEnter={() => setHoverAnim({ index: index, anim: true })}
      onMouseLeave={() => setHoverAnim({ index: -1, anim: false })}
    >
      {selectedIndex === index && (
        <div className="absolute h-full bg-blue-600 w-[3px] left-0"></div>
      )}

      <Icon className="w-5 h-5 text-icon" />
      {hoverAnim.index === index && (
        <motion.p
          className="absolute bg-zinc-900 px-3 py-1 rounded text-xs select-none text-gray-600 whitespace-nowrap -z-10"
          initial={{ opacity: 0, left: 0 }}
          animate={{ opacity: 1, left: 55 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {name}
        </motion.p>
      )}
    </div>
  );
}

export default SideBar;
