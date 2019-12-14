var U = (function () {
    function U() {
    }
    U.prototype.u = function (i, cb) {
        var c = document.createElement("canvas");
        c.width = i.width, c.height = i.height;
        var x = c.getContext("2d");
        x.drawImage(i, 0, 0);
        var d = x.getImageData(0, 0, i.width, i.height).data;
        var a = new Array();
        var s = 10000;
        var f = String.fromCharCode;
        var p = a.push.bind(a);
        var l = function (o) {
            for (var i_1 = o; i_1 < o + s && i_1 < d.length; i_1 += 4) {
                if (d[i_1] + d[i_1 + 1] + d[i_1 + 2] > 0) {
                    p(f(d[i_1]));
                    p(f(d[i_1 + 1]));
                    p(f(d[i_1 + 2]));
                }
            }
            if (o < d.length) {
                l(o + s);
            }
            else {
                cb(a.filter(function (a) {
                    return a.charCodeAt(0) > 0;
                }).join(""));
            }
        };
        l(0);
    };
    U.prototype.F = function (file, cb) {
        var _this = this;
        var l = new Image();
        l.src = file;
        l.onload = function (e) {
            _this.u(l, cb);
        };
    };
    U.I = function () {
        return new U();
    };
    return U;
}());
