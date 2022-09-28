function Create3DPolygon(n=100, sdistance=5, r=5, ) {
    // Create Canvas
    let Canvas = document.createElement("div");
    Canvas.classList.add("canvas");
    document.body.appendChild(Canvas);
    // Div creating loop
    i=0
    while (i < n) {
        let Vertex = document.createElement("div")
        Vertex.classList.add("vertex");
        Canvas.appendChild(Vertex)
        i++
    }
    

}

window.addEventListener('load', function () {
    Create3DPolygon();
})