const board = document.getElementById("board");

function show(message) {
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(message));
  board.appendChild(p);
  board.scroll(0, board.scrollHeight);
}

document.getElementById("input").onsubmit = function() {
  inputText = document.getElementById("inputText");
  text = inputText.value;
  show(text);
  inputText.value = "";
  return false;
}
