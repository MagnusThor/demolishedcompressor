z = function() {
    c = String.fromCharCode;
    q = document.querySelector.bind(document);
    i = q("img");
    x = q("#c").getContext("2d");
    x.drawImage(q("img"),0,0);
    d = x.getImageData(0, 0, i.width, i.height).data;
    b = [];
    s = 1E6;
    p = b.push.bind(b);    
    l = function(a) {
        var w = (a / d.length) * 100;
        q("#p").style.width = w + "%";
        for (i = a; i < a + s && i < d.length; i += 4) p(c(d[i])), p(c(d[i + 1])), p(c(d[i + 2]));
        a < d.length ? setTimeout(function() {
            l(a + s)
        }, 100) : (s = b.join("").replace(/\\0/g, " "), (0, eval)(s),q("#p").style.display = "h")
    };
    l(0)
};