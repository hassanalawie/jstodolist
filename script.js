var form = document.getElementById("form");
var itemList = document.getElementById("todos");
var clear = document.getElementById("clear");
let i = 0;
if (localStorage.length > 0) {
  i = localStorage.length;
} else {
  i = 0;
}
let x = 0;

// Adding an item to the list

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
    // console.log("hello");
    // console.log(li.style.backgroundColor);
    // Create del button element
    var deleteBtn = document.createElement("button");
    // Add classes to del button
    deleteBtn.className = "delete fas fa-paw";
    // Append button to li
    li.appendChild(deleteBtn);
    // Append li to list
    itemList.appendChild(li);
    // console.log(itemList);

    emptyWriting();
    // updateList();
    let listItems = new Array();

    listItems.push(JSON.stringify(input));
    localStorage.setItem(JSON.stringify(i), JSON.stringify(input));
    i = i + 1;
  } else {
    alert("Write something lazy");
  }
}

// Removing an item from the list

function removeItem(e) {
  let i = 0;

  let c = localStorage.length;
  if (e.target.classList.contains("delete")) {
    if (confirm("Great Job, confirm your deletion")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
      let ting = getChildIndex(li);
      localStorage.removeItem(ting);
      for (let a = 0; a < c - parseInt(ting) - 1; a++) {
        saveOrder(ting, i);
        i = i + 1;
        localStorage.removeItem(JSON.stringify(parseInt(ting) + i));
      }
    }
  }
}

function saveOrder(thing, i) {
  var sub = localStorage.getItem(JSON.stringify(parseInt(thing) + 1 + i));
  localStorage.setItem(JSON.stringify(parseInt(thing) + i), sub);

  return thing;
}

// Getting child index for deletion on local storage
function getChildIndex(child) {
  for (var i = 0, len = localStorage.length; i < len; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];

    if (value.replace('"', "").replace('"', "") == child.innerText) {
      // console.log(key);
      return key;
    }
  }
}

// Giving the green light on an item

function priority(e) {
  if (!e.shiftKey) {
    if (e.target.classList.contains("todo")) {
      var li = e.target;
      li.style.backgroundColor = "lightgreen";
      li.className = "todo green";
      let ting = getChildIndex(li);
      localStorage.setItem(ting, li.innerText + " green");
    }
  }
}

// // Doubleclicking to signify priority

function dbpriority(e) {
  if (e.shiftKey) {
    if (e.target.classList.contains("todo")) {
      var li = e.target;
      li.className = "todo";
      li.style.backgroundColor = "red";
      li.className = "todo red";
      let ting = getChildIndex(li);
      localStorage.setItem(ting, li.innerText + " red");
      // localStorage.removeItem(ting);
      console.log(getChildIndex(li));
    }
  }
}

// Emptying the list

function clearAll(e) {
  if (confirm("Are you sure you'd like to delete everything?")) {
    while (itemList.childElementCount > 0) {
      var li = document.getElementById("todo");
      itemList.removeChild(li);
      localStorage.clear();
      i = 0;
    }
  }
  return i;
}

// Clear the input aread when submitting
function emptyWriting() {
  document.getElementById("input").value = "";
}

// Access local storage

function populateUI() {
  let i = 0;
  let keyindex = JSON.stringify(i);
  while (i < localStorage.length) {
    const li = document.createElement("li");
    // Add id
    li.id = "todo";
    // Add text node with input value
    if (localStorage.getItem(i).includes("green")) {
      li.className = "todo green";
    } else if (localStorage.getItem(i).includes("red")) {
      li.className = "todo red";
    } else {
      li.className = "todo";
    }
    li.appendChild(
      document.createTextNode(
        localStorage
          .getItem(i)
          .replace('"', "")
          .replace('"', "")
          .replace(" green", "")
          .replace(" red", "")
      )
    );
    // Create del button element
    var deleteBtn = document.createElement("button");
    // Add classes to del button
    deleteBtn.className = "delete fas fa-paw";
    // Append button to li
    li.appendChild(deleteBtn);
    // Append li to list
    itemList.appendChild(li);
    // console.log(itemList);
    i = parseInt(i);
    i = i + 1;
    if (Object.keys(localStorage).includes("undefined")) {
      // localStorage.removeItem("undefined");
    }
  }
}

// Pop2

// Event listeners
clear.addEventListener("click", clearAll);
itemList.addEventListener("click", removeItem);
form.addEventListener("submit", addItem);
itemList.addEventListener("click", priority);
itemList.addEventListener("click", dbpriority);
populateUI();
