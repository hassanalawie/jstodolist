var form = document.getElementById("form");
var itemList = document.getElementById("todos");

function addItem(e) {
  e.preventDefault();
  const input = document.getElementById("input").value;
  if (input != "") {
    // Create new li element
    const li = document.createElement("li");
    // Add class
    li.className = "todo";
    // Add id
    li.id = "todo";
    // Add text node with input value
    li.appendChild(document.createTextNode(input));
    // Create del button element
    var deleteBtn = document.createElement("button");
    // Add classes to del button
    deleteBtn.className = "delete";
    // Append text node
    deleteBtn.appendChild(document.createTextNode("X"));
    // Append button to li
    li.appendChild(deleteBtn);
    // Append li to list
    itemList.appendChild(li);
    console.log(itemList);
  } else {
    alert("Write something lazy");
  }
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Great Job, confirm your deletion")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

function priority(e) {
  if (e.target.classList.contains("todo")) {
    var li = e.target;
    li.style.backgroundColor = "lightgreen";
  }
}
function dbpriority(e) {
  if (e.target.classList.contains("todo")) {
    var li = e.target;
    li.style.backgroundColor = "red";
    const list = document.getElementById("todos");
    const first = document.getElementById("todo");
    list.insertBefore(li, first);
    console.log(first);
  }
}

itemList.addEventListener("click", removeItem);
form.addEventListener("submit", addItem);
itemList.addEventListener("click", priority);
itemList.addEventListener("dblclick", dbpriority);
