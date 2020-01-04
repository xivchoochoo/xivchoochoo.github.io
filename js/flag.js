var dragables = document.getElementsByClassName("mydragable")

for (var i = 0, ele; ele = dragables[i++]; ) {
  dragElement(ele);
}

for (var i = 0, ele; ele = dragables[i++]; ) {
  LoadElementPos(ele);
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    var nx = elmnt.offsetLeft - pos1;
    if (nx > 1000) { nx = 1000;	}
    if (nx < 0) {  nx = 0; }

    var ny = elmnt.offsetTop - pos2;
    if (ny < 0)	{
    ny = 0;
  }

  elmnt.style.left = nx + "px";
  elmnt.style.top = ny + "px";

}

function closeDragElement() {
  /* stop moving when mouse button is released:*/
  document.onmouseup = null;
  document.onmousemove = null;
  SaveElementPos(elmnt);
  }
}

function LoadElementPos(elment) {
  var cords = window.localStorage.getItem(elment.id);

  if (cords != null) {
    var cc = JSON.parse(cords);

    elment.style.left = cc.x;
    elment.style.top = cc.y;
  }
}

function SaveElementPos(elment) {
  var cc = { x: elment.style.left, y: elment.style.top }
  window.localStorage.setItem(elment.id,JSON.stringify(cc));
}

function clearMarkers() {
  var r = confirm("Clear all markers? (Warning, this cannot be undone.)");
  if (r == true) {
    var r2 = confirm("You sure? (Warning, this cannot be undone.)");
    if (r2 == true) {
      localStorage.clear();
      location.reload();
    }
  }
}
