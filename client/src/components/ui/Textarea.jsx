import { forwardRef } from "react";

export const Textarea = forwardRef((props, ref, rows = 2) => (
  <textarea
    {...props}
    ref={ref}
    className="w-full bg-white  px-4 py-2 rounded-md border border-gray-400"
    rows={rows}
  />
));
