let vDom = [];

function deleteTodo(itemId) {
  var el = document.querySelector(`[data-id="${itemId}"]`);
  el.remove();
}

function createDomElements(existingDOM, currentDOM) {
  var parentEl = document.getElementById("mainArea");

  let added = 0,
    updated = 0,
    deleted = 0,
    total = 0;

  // Now, we'll compare our new vDOM to our actual DOM
  currentDOM.forEach((item) => {
    total++;
    var existingItem = existingDOM.find(function (el) {
      return el.id === String(item.id);
    });
    if (existingItem) {
      // If it exists, update it
      updated++;
      var existingChild = document.querySelector(`[data-id="${item.id}"]`);
      // Remove it from the currentChildren array
      existingChild.children[0].innerHTML = item.title;
      existingChild.children[1].innerHTML = item.description;
    } else {
      // If it doesn't exist, create it
      added++;

      var childEl = document.createElement("div");
      childEl.dataset.id = item.id;

      var grandChildEl1 = document.createElement("span");
      grandChildEl1.innerHTML = item.title;

      var grandChildEl2 = document.createElement("span");
      grandChildEl2.innerHTML = item.description;

      var grandChildElBtn = document.createElement("button");
      grandChildElBtn.innerHTML = "Delete";
      grandChildElBtn.setAttribute("onclick", "deleteTodo(" + item.id + ")");

      childEl.appendChild(grandChildEl1);
      childEl.appendChild(grandChildEl2);
      childEl.appendChild(grandChildElBtn);

      parentEl.appendChild(childEl);
    }
  });

  existingDOM.forEach(function (oldItem) {
    if (!currentDOM.some((item) => item.id === oldItem.id)) {
      deleted++;
      var childToRemove = document.querySelector(`[data-id="${oldItem.id}"]`);
      parentEl.removeChild(childToRemove);
    }
  });

  console.log(
    "Added: ",
    added,
    "Updated: ",
    updated,
    "Deleted: ",
    deleted,
    "Total: ",
    total
  );
}

function updateVirtualDom(data) {
  var exitingDom = [...vDom];
  vDom = data.map(function (item) {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
    };
  });

  createDomElements(exitingDom, vDom);
}

window.setInterval(() => {
  let todos = [];
  let randomLength = Math.floor(Math.random() * 10);

  for (let i = 0; i < randomLength; i++) {
    todos.push({
      id: i + 1,
      title: "GYM- ",
      description: `Time : ${i}:00 PM `,
    });
  }

  updateVirtualDom(todos);
}, 2000);
