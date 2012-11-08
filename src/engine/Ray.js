/**
    Creates a new Ray

    @class A Ray has an origin and a direction. It is for ray casting, mostly to calculate the ray from the mouse and detect 3d rollovers.

    @params o Origin of the ray

    @params d Direction of the ray
 */
J3D.Ray = function(o, d) {
	this.origin = o || new v3();
	this.direction = d || new v3();
	
	this.localOrigin = new v3();
	this.localDirection = new v3();
}

J3D.Ray.fromMousePosition = function(mouseX, mouseY, camera, canvasRect) {
    if(!J3D.Ray._mt) J3D.Ray._mt = new SQR.Matrix44();
    if(!J3D.Ray._nt) J3D.Ray._nt = new SQR.Matrix33();

    if(!canvasRect) {
        canvasRect = {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    var mx = ( (mouseX - canvasRect.x) / canvasRect.width) * 2 - 1;
    var my = (1 - (mouseY - canvasRect.y) / canvasRect.height) * 2 - 1;
	var ra = [mx, my, 0];

    camera.camera.projectionMat.inverse(J3D.Ray._mt);
    J3D.Ray._mt.transformVector(ra);
    camera.globalMatrix.transformVector(ra);

    var r = new J3D.Ray();
    r.origin.fromArray(ra);
    r.direction = r.origin.sub(camera.worldPosition).norm();

	return r;
}

J3D.Ray.prototype.makeLocal = function(t) {
    if(!J3D.Ray._mt) J3D.Ray._mt = new SQR.Matrix44();
    if(!J3D.Ray._nt) J3D.Ray._nt = new SQR.Matrix33();

    this.origin.cp(this.localOrigin);
    t.globalMatrix.inverse(J3D.Ray._mt);
    J3D.Ray._mt.transformVector(this.localOrigin);

    this.direction.cp(this.localDirection);
    t.normalMatrix.inverse(J3D.Ray._nt);
    J3D.Ray._nt.transformVector(this.localDirection);
}