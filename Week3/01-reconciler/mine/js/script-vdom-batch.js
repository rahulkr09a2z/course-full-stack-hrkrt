let vDom = [];

function deleteTodo(itemId) {
  var el = document.querySelector(`[data-id="${itemId}"]`);
  el.remove();
}

function createDomElements() {
  var parentEl = document.getElementById("mainArea");

  // Get the current children of the parent element and convert it to an array
  var currentChildren = Array.from(parentEl.children);

  let added = 0,
    updated = 0,
    deleted = 0,
    total = 0;

  // Now, we'll compare our new vDOM to our actual DOM
  vDom.forEach((item) => {
    total++;
    var existingChild = currentChildren.find(function (el) {
      return el.dataset.id === String(item.id);
    });
    if (existingChild) {
      // If it exists, update it
      updated++;

      // Remove it from the currentChildren array
      existingChild.children[0].innerHTML = item.title;
      existingChild.children[1].innerHTML = item.description;

      currentChildren = currentChildren.filter(function (el) {
        return el !== existingChild;
      });
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

  currentChildren.forEach(function (el) {
    // Any children left in the currentChildren array no longer exist in the data, so remove them
    deleted++;
    parentEl.removeChild(el);
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
  vDom = data.map(function (item) {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
    };
  });
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
}, 5000);

window.setInterval(() => {
  createDomElements();
}, 1000);
