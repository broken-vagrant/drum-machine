import { generateId } from "./utils";

const Toggler = ({ name, title, options, value, ...otherInputProps }) => {
  const nameId = generateId(name);
  return (
    <fieldset aria-label={`${name} switcher`} role="radiogroup">
      {title && <legend>{title}</legend>}
      <div className="c-toggle">
        <label htmlFor={`${nameId}__option1`}>{options[0]}</label>
        <span className="c-toggle__wrapper">
          <input
            type="radio"
            name={name || "PleaseChooseName"}
            id={`${nameId}__option1`}
            checked={value === options[0]}
            {...otherInputProps}
          />
          <input
            type="radio"
            name={name || "PleaseChooseName"}
            id={`${nameId}__option2`}
            checked={value === options[1]}
            {...otherInputProps}
          />
          <span aria-hidden="true" className="c-toggle__background"></span>
          <span aria-hidden="true" className="c-toggle__switcher"></span>
        </span>
        <label htmlFor={`${nameId}__option2`}>{options[1]}</label>
      </div>
    </fieldset>
  );
};

export default Toggler;
