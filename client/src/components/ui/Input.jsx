import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full bg-[#FFF] px-4 py-2 rounded-md border border-gray-400"
  />
));
