function deleteTodo(itemId) {
  var el = document.querySelector(`[data-id="${itemId}"]`);
  el.remove();
}

function createDomElements(data) {
  var parentEl = document.getElementById("mainArea");

  /**
   * mainArea
   *    div
   *        span    -title
   *        span    -description
   *        button  - delete
   *    div
   */
  let added = 0;
  // Removing all children from parentEl
  parentEl.innerHTML = "";
  data.forEach((item) => {
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
  });
  console.log("added", added);
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

  createDomElements(todos);
}, 5000);
