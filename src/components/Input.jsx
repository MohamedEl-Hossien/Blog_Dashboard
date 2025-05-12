import classes from "./Input.module.css";

export default function Input({
  label,
  name,
  type,
  textArea,
  error,
  ...props
}) {
  let InputField = "input";
  if (textArea) {
    InputField = "textarea";
  }
  return (
    <div className={classes.control}>
      <label htmlFor={name}>{label}</label>
      <InputField id={name} type={type} name={name} required {...props} />
      {error && <p className={classes.controlError}>{error}</p>}
    </div>
  );
}
