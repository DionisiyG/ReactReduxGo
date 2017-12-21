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