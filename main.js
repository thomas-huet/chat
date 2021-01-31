const board = document.getElementById("board");

function show(message) {
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(message));
  board.appendChild(p);
  board.scroll(0, board.scrollHeight);
}

var peer = new Peer();

peer.on("open", function(myId) {

let peers = [];

peer.on("connection", function(conn) {
  console.log("Connection from peer", conn.peer);
  peers.push(conn);
});

function connectToPeer(id) {
  let conn = peer.connect(id);
  conn.on("open", function() {
    console.log("Connection to peer", id);
    peers.push(conn);

    conn.on("data", function(data) {
      show(data.message);
    });
  })
}

if (window.location.hash) {
  connectToPeer(window.location.hash);
}
window.location.hash = myId;

document.getElementById("input").onsubmit = function() {
  inputText = document.getElementById("inputText");
  text = inputText.value;
  show(text);
  for (let peer of peers) {
    peer.send({"message": text});
  }
  inputText.value = "";
  return false;
}

});
