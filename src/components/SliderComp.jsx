import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { OptionContext } from "../context/OptionContext";

const SliderComp = () => {
  const { selectedMenuOption, setSelectedMenuOption, currentPage } =
    useContext(OptionContext);
  const [sliderVal, setSliderVal] = useState(selectedMenuOption?.value || 0);

  // Sync the slider value with the selectedMenuOption
  useEffect(() => {
    if (selectedMenuOption) {
      setSliderVal(selectedMenuOption.value);
    }
  }, [selectedMenuOption]);

  // Update the slider value when it changes
  function handleSliderChange(e, newValue) {
    setSliderVal(newValue);
    setSelectedMenuOption((prev) => ({ ...prev, value: newValue }));
  }

  //console.log(selectedMenuOption)

  return (
    <>
      {selectedMenuOption && currentPage == "edit" && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-secondary w-fit px-5 pb-1 pt-2 rounded-lg flex flex-col justify-center items-center gap-2">
          <div>
            <p className="text-textpara text-xs font-semibold">{selectedMenuOption.name.toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-4">
            <Box sx={{ width: 300 }}>
              <Slider
                min={selectedMenuOption.range.min}
                max={selectedMenuOption.range.max}
                step={selectedMenuOption.step}
                value={sliderVal} // Controlled value
                onChange={handleSliderChange} // Update value when changed
                sx={{
                  color: "#FF6500", // Default thumb and track color
                  "& .MuiSlider-thumb": {
                    "&:hover": {
                      boxShadow: "0 0 0 12px rgba(255, 101, 0, 0.3)", // Ripple effect on hover/active
                    },
                  },
                }}
              />
            </Box>
            <div className="text-textpara flex text-sm font-medium">
              <p>{sliderVal}</p>
              <span>{selectedMenuOption.unit}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SliderComp;
