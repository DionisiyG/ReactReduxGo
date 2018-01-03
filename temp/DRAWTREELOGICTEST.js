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
  var data = [
    {
      description: "aasdas0",
      lft: 0,
      rgt: 11
    },
    {
      description: "aasdas1",
      lft: 1,
      rgt: 2
    },
    {
      description: "aasdas2",
      lft: 3,
      rgt: 10
    },
    {
      description: "aasdas2-1",
      lft: 4,
      rgt: 9
    },
    {
      description: "aasdas2-1-1",
      lft: 5,
      rgt: 6
    },
    {
      description: "aasdas2-1-2",
      lft: 7,
      rgt: 8
    },
  ];
  drawNestedSetsTree(data, node);
}

function drawNestedSetsTree(data, node) {
  node.innerHTML = '';

  if (data.length) {
    var ul = document.createElement('ul');
    var tree = fetchChildElement(ul);
    node.appendChild(tree);
  }

  function fetchChildElement(container, lft, rgt) {
    data.filter(filterItems); //go through data array
    return container;

    function filterItems(item) {
      if (item.lft === (lft || 0)) {
        var element = document.createElement('li');
        element.innerHTML = item.description;

        //check if element got nested elements, if true - call function again
        if (item.lft + 1 < item.rgt) {
          var childContainer = document.createElement('ul');
          var child = fetchChildElement(childContainer, item.lft + 1, item.rgt - 1);
          element.appendChild(child);
        }

        //add element to container
        container.appendChild(element);

        //check if next element exists and call function for them
        if (rgt && item.rgt < lft) {
          fetchChildElement(container, item.rgt + 1, rgt);
        }
      }
    }
  }
}