export function genTree (width, deep) {
  let root = {
    id: 0,
    root: true,
    children: []
  }

  for (let i = 0; i < width; i++) {
    let node = {
      id: i,
      parent: root
    }
    if (deep) {
      node.children = []
      for (let j = 0; j < deep; j++) {
        node.children.push({
          id: j,
          parent: node
        })
      }
    }
    root.children.push(node)
  }
  return root
}

