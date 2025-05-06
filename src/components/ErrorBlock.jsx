import classes from "./ErrorBlock.module.css";

export default function ErrorBlock({ title, message }) {
  return (
    <div className={classes.errorBlock}>
      <div className={classes.errorBlockIcon}>!</div>
      <div className={classes.errorBlockText}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
