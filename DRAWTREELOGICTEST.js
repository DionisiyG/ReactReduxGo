function drawNestedSetsTree(data, node) {

  const rootElement = data.find(el => el.left === 0);

  const rootUl = createTree(rootElement, document.createElement('ul'), data);

  node.appendChild(rootUl);
}

function findChildren({ lft, rgt }, arr, container = []) {
  if (rgt - lft <= 1) return container;

  const child = arr.find(el => el.lft === lft + 1);
  child && container.push(child);

  return child && 
  child.rgt + 1 < rgt 
  ?
  findChildren({ lft: child.rgt, rgt }, arr, container) 
  :
  container;
}

function createTree(node, ul, arr) {
  const li = document.createElement('li');
  li.innerText = node.title;
  ul.appendChild(li);

  const children = findChildren(node, arr);
  if (children.length) {
    const liUl = document.createElement('ul');
    children.forEach(el => createTree(el, liUl, arr));
    li.appendChild(liUl);
  }
  return ul;
}
//___________________________________________________________________________

function init(){
  var node = document.getElementById('tree');
  var data = [{
    title: "Одежда",
    left: 1,
    right: 22
  }, {
    title: "Мужская",
    left: 2,
    right: 9
  }, {
    title: "Женская",
    left: 10,
    right: 21
  }, {
    title: "Костюмы",
    left: 3,
    right: 8
  }, {
    title: "Платья",
    left: 11,
    right: 16
  }, {
    title: "Юбки",
    left: 17,
    right: 18
  }, {
    title: "Блузы",
    left: 19,
    right: 20
  }, {
    title: "Брюки",
    left: 4,
    right: 5
  }, {
    title: "Жакеты",
    left: 6,
    right: 7
  }, {
    title: "Вечерние",
    left: 12,
    right: 13
  }, {
    title: "Летние",
    left: 14,
    right: 15
  }];
  drawNestedSetsTree(data, node);
}

function drawNestedSetsTree(data, node) {
  node.innerHTML = '';

  if (data.length) {
    var ul = document.createElement('ul');
    var tree = fetchChildElement(ul);
    node.appendChild(tree);
  }

  function fetchChildElement(container, left, right) {
    data.filter(filterItems); //go through data array
    return container;

    function filterItems(item) {
      if (item.left === (left || 1)) {
        var element = document.createElement('li');
        element.innerHTML = item.title;

        //check if element got nested elements, if true - call function again
        if (item.left + 1 < item.right) {
          var childContainer = document.createElement('ul');
          var child = fetchChildElement(childContainer, item.left + 1, item.right - 1);
          element.appendChild(child);
        }

        //add element to container
        container.appendChild(element);

        //check if next element exists and call function for them
        if (right && item.right < right) {
          fetchChildElement(container, item.right + 1, right);
        }
      }
    }
  }
}