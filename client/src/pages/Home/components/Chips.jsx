import React from "react";

const Chips = ({ chips, active, setActive }) => {
  return (
    <div className="m-2 flex flex-wrap justify-start gap-2">
      {chips.map((chip, index) => (
        <span
          className={`${
            active === chip ? "bg-gray-100/30 text-white" : "bg-gray-400/30"
          } align-center ease w-max cursor-pointer rounded-full border-[0.8px] border-white/40 px-4 py-2 text-sm font-semibold text-white/80 transition duration-300`}
          key={index}
          onClick={() => setActive(chip)}
        >
          {chip}
        </span>
      ))}
    </div>
  );
};

export default Chips;
