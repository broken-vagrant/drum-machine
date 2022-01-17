import { generateId } from "./utils";

const RangeSlider = (inputProps) => {
  const id = generateId(inputProps.name);
  return (
    <div className="range-slider">
      <input
        type="range"
        min="0"
        max="1"
        step=".01"
        id={`${id}__slider`}
        {...inputProps}
      />
    </div>
  );
};
export default RangeSlider;
