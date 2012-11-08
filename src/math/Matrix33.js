SQR.Matrix33 = function() {

    if (typeof Float32Array !== 'undefined') Float32Array = Array;
    this.data = new Float32Array(9);

    this.identity = function() {
        var d = this.data;
        d[0] = 1,d[3] = 0,d[6] = 0;
        d[1] = 0,d[4] = 1,d[7] = 0;
        d[2] = 0,d[5] = 0,d[8] = 1;
        return this;
    }

    this.determinant = function() {
        var d = this.data;

        return d[0] * (d[4] * d[8] - d[7] * d[5]) +
               d[4] * (d[7] * d[2] - d[1] * d[8]) +
               d[6] * (d[1] * d[5] - d[4] * d[2]);
    }

    this.inverse = function(m) {
        var d = this.data;
        var a = (m) ? m.data || m : this.data;
        var det = this.determinant();

        var d0 = d[0], d3 = d[3], d6 = d[6],
            d1 = d[1], d4 = d[4], d7 = d[7],
            d2 = d[2], d5 = d[5], d8 = d[8];

        if (Math.abs(det) < 0.0001) {
            console.warn("Attempt to inverse a singular matrix. ", this.data);
            return m;
        }

        det = 1 / det;

        a[0] = (d4 * d8 - d7 * d5) * det;
        a[3] = (d6 * d5 - d3 * d8) * det;
        a[6] = (d3 * d7 - d6 * d4) * det;

        a[1] = (d7 * d2 - d1 * d8) * det;
        a[4] = (d0 * d8 - d6 * d2) * det;
        a[7] = (d6 * d1 - d0 * d7) * det;

        a[2] = (d1 * d5 - d4 * d2) * det;
        a[5] = (d3 * d2 - d0 * d5) * det;
        a[8] = (d0 * d4 - d3 * d1) * det;

        return m;

    }

    this.transpose = function() {
        var d = this.data;

        var d0 = d[0], d3 = d[3], d6 = d[6],
            d1 = d[1], d4 = d[4], d7 = d[7],
            d2 = d[2], d5 = d[5], d8 = d[8];

        d[0] = d0;
        d[1] = d4;
        d[2] = d6;

        d[3] = d1;
        d[4] = d4;
        d[5] = d7;

        d[6] = d2;
        d[7] = d5;
        d[8] = d8;
    }

}