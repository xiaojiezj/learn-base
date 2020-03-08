import "./style.css";
import Icon from "./icon.png";

function componet() {
  var element = document.createElement("div");
  element.innerText = "hello, webpack";
  element.className = "hello";

  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);
  return element;
}
document.body.appendChild(componet());
