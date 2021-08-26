const RangeSlider = (inputProps) => {
  return (
    <div className="range-slider">
      <input
        type="range"
        min="0"
        max="1"
        step=".01"
        id={`${inputProps.name}__slider`}
        {...inputProps}
      />
    </div>
  );
};
export default RangeSlider;
