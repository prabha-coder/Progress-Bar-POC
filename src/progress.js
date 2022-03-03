import { Circle } from "rc-progress";
import "./index.css";

export default (props) => (
  <div style={{ height: "50", width: "50" }}>
    <Circle
      className="progress"
      percent={props.value}
      strokeWidth="4"
      strokeColor=" #c12139"
    />
  </div>
);
