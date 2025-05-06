import classes from "./LoadingIndicator.module.css";

export default function LoadingIndicator() {
  return (
    <div className={classes.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
