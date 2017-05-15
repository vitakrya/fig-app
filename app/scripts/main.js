var two = new Two({
  fullscreen: true
});
// var two2 = new Two({fullscreen: false});

// two.appendTo(document.getElementById('app'));
// var circle = two.makeCircle(100, 70, 30);
// var rect = two.makeRectangle(180, 50, 70, 30);
// var curve1 = two.makeCurve(230, 60, 250, 40, 270, 110, 290, 70, true);
// curve1.linewidth = 2;
// // curve1.scale = 1.25;
// curve1.rotation = Math.PI / 4;
// circle.fill = '#e901d3';
// rect.fill = '#901593';
// two.update();

// two2.appendTo(document.getElementById('app1'));
// var group1 = two2.makeGroup();
// var rect2 = two2.makeRectangle(60, 100, 80, 60);
// var circle2 = two2.makeCircle(120, 80, 40, 40);
// circle2.fill = '#90c311';
// group1.add(rect2);
// group1.add(circle2);
// two2.update();

two.appendTo(document.getElementById('app1'));
var earthAngle = 0,
  moonAngle = 0,
  distance = 30,
  radius = 50,
  padding = 100,
  orbit = 200,
  offset = orbit + padding,
  orbits = two.makeGroup();

var earthOrbit = two.makeCircle(offset, offset, orbit);
earthOrbit.noFill();
earthOrbit.linewidth = 4;
earthOrbit.stroke = '#ccc';
orbits.add(earthOrbit);

function getPositions(angle, orbit) {
  return {
    x: Math.cos(angle * Math.PI / 180) * orbit,
    y: Math.sin(angle * Math.PI / 180) * orbit
  };
}

var pos = getPositions(earthAngle++, orbit),
    earth = two.makeCircle(pos.x + offset, pos.y + offset, radius);

earth.stroke = '#123456';
earth.linewidth = 4;
earth.fill = '#194878';

two.bind('update', function (frameCount) {
  var pos = getPositions(earthAngle++, orbit);
  earth.translation.x = pos.x + offset;
  earth.translation.y = pos.y + offset;
});

var moonOrbit = two.makeCircle(earth.translation.x, earth.translation.y, radius + distance);
moonOrbit.noFill();
moonOrbit.linewidth = 4;
moonOrbit.stroke = '#ccc';
orbits.add(moonOrbit);
var pos = getPositions(moonAngle, radius + distance),
  moon = two.makeCircle(earth.translation.x + pos.x, earth.translation.y + pos.y, radius / 4);

moonAngle += 5;
moon.fill = '#474747';

two.bind('update', function(frameCount) {
  var moonPos = getPositions(moonAngle, radius + distance);
  moon.translation.x = earth.translation.x + moonPos.x;
  moon.translation.y = earth.translation.y + moonPos.y;
  moonAngle += 5;
  moonOrbit.translation.x = earth.translation.x;
  moonOrbit.translation.y = earth.translation.y;
});

orbits.visible = false;

two.play();
