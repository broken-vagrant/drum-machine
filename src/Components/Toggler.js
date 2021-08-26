const Toggler = ({ name, title, options, value, ...otherInputProps }) => {
  return (
    <fieldset aria-label={`${name} switcher`} role="radiogroup">
      {title && <legend>{title}</legend>}
      <div className="c-toggle">
        <label htmlFor={`${name}__option1`}>{options[0]}</label>
        <span className="c-toggle__wrapper">
          <input
            type="radio"
            name={name || "PleaseChooseName"}
            id={`${name}__option1`}
            checked={value === options[0]}
            {...otherInputProps}
          />
          <input
            type="radio"
            name={name || "PleaseChooseName"}
            id={`${name}__option2`}
            checked={value === options[1]}
            {...otherInputProps}
          />
          <span aria-hidden="true" className="c-toggle__background"></span>
          <span aria-hidden="true" className="c-toggle__switcher"></span>
        </span>
        <label htmlFor={`${name}__option2`}>{options[1]}</label>
      </div>
    </fieldset>
  );
};

export default Toggler;
