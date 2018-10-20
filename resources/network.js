function add_node(data, id, name, x, y, size) {
    data.nodes.push({id:id, label:name, x:x, y:y, size:size});
}

function add_edge(data, id, id_source, id_dest) {
    data.edges.push({id:id, source:id_source, target:id_dest});
}