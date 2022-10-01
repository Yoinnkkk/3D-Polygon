function Create3DPolygon(n=36, planes=12) {
    let x = 1, swrapper = document.querySelector('.sphere-wrapper'), rotationX = 0, rotationY = 0;
    while (x <= planes) {
      let plane = document.createElement('div');
      plane.classList.add("plane");
      plane.style.transform = `rotateY(${x * 15}deg)`;
      swrapper.appendChild(plane);
      for (y = 1; y <= n; y++) {
        let spoke = document.createElement('div');
        spoke.classList.add("spoke");
        spoke.innerHTML = `<div class="dot"></div>`;
        spoke.style.transform = `rotateZ(${y}0deg)`;
        plane.appendChild(spoke);
      }
      x++;
    }
    swrapper.parentElement.onmousedown = function(event){catchmousedown(event)}
    function catchmousedown(event) {
        pos3 = event.pageX, pos4 = event.pageY;
        document.onmousemove = function(event){catchmousemove(event)}
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
    function catchmousemove(event) {
        pos1 = pos3 - event.pageX, pos2 = pos4 - event.pageY, pos3 = event.pageX, pos4 = event.pageY;
        rotationX = rotationX + (Math.atan2(pos2, 300) * 180 / Math.PI)
        rotationY = rotationY - (Math.atan2(pos1, 500) * 180 / Math.PI)
        swrapper.style.transform = `rotateX(${rotationX}deg)`
        swrapper.style.transform += `rotateY(${rotationY}deg)`
    }
}

window.addEventListener('load', function () {
    Create3DPolygon();
})