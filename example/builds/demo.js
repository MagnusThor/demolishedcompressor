/*
    
*/

var P = (function () {
    function P() {
    }
    P.I = function (q, v, f, x, y, b, u, k) {
        var g = q.getContext('webgl2');
        for (var i in g)
            g[i[0] + i[6]] = g[i];
        g.f1 = g.uniform1f;
        g.f2 = g.uniform2f;
        g.i1 = g.uniform1i;
        var a = Object.keys(b ? b : {});
        var p = g.cP();
        var s = g.cS(35633);
        g.sS(s, this.h + v);
        g.ce(s);
        g.aS(p, s);
        s = g.cS(35632);
        g.sS(s, this.h + f);
        g.ce(s);
        g.aS(p, s);
        g.lo(p);
        g.ug(p);
        g.bf(34962, g.cB());
        g.eV(0);
        g.vA(0, 2, 5120, 0, 0, 0);
        g.bD(34962, new Int8Array([-3, 1, 1, -3, 1, 1]), 35044);
        a.forEach(function (k) {
            var m = new Image();
            m.onload = function () {
            };
            m.src = b[k].d;
        });
        var dt = function () { return performance.now() / 1000; };
        var tm = dt();
        var L = function () {
            var t = tm - dt();
            g.f1(g.gf(p, 'time'), t);
            g.f2(g.gf(p, 'resolution'), x, y);
            k && Object.keys(k).forEach(function (v) {
                k[v](g.gf(p, v), g, p, t);
            });
            a.forEach(function (k, i) {
                g.aT(33984 + i);
                g.i1(g.gf(p, k), i);
            });
            g.dr(6, 0, 3);
            requestAnimationFrame(L);
        };
        L();
        u && u(g, p);
    };
    P.h = "#version 300 es\n#ifdef GL_ES\nprecision highp float;\nprecision highp int;\nprecision mediump sampler3D;\n#endif\n";
    return P;
}());


Synth = function() {
    function b() {}
    return b.G = function(a, d, h, e) {
            var c = document.createElement("canvas").getContext("webgl2");
            for (g in c) c[g[0] +
                g[6]] = c[g];
            c.f1 = c.uniform1f;
            c.f2 = c.uniform2f;
            var b = c.cP();
            var g = c.cS(35633);
            c.sS(g, this.vs);
            c.ce(g);
            c.aS(b, g);
            g = c.cS(35632);
            if (c.sS(g, a), c.ce(g), c.aS(b, g), !c.getShaderParameter(g, c.COMPILE_STATUS)) throw c.getShaderInfoLog(g).trim().split("\n").forEach(function(a) {
                return console.warn("[shader] " + a)
            }), Error("Error while compiling fragment");
            return c.vr(0, 0, h, e), c.lo(b), c.ug(b), c.bf(34962, c.createBuffer()), c.eV(0), c.vA(0, 2, 5120, 0, 0, 0), c.bD(34962, new Int8Array([-3, 1, 1, -3, 1, 1]), 35044), c.f1(c.gf(b, "sampleRate"),
                    d), c.f2(c.gf(b, "resolution"), h, e),
                function(a, f, g) {
                    g = g || new Uint8Array(h * e * 4);
                    return c.f1(c.gf(b, "bufferTime"), a / d), c.f1(c.gf(b, "channel"), f), c.dr(6, 0, 3), c.rx(0, 0, h, e, 6408, 5121, g), g
                }
        }, b.P = function(a) {
            var d = [],
                h = 0,
                e = 0,
                c = new AudioContext,
                b = c.createGain(),
                g = c.createDynamicsCompressor(),
                l = c.createGain();
            l.gain.value = .6;
            b.connect(g);
            g.connect(l);
            l.connect(c.destination);
            var f = function(h, e) {
                    var f = c.createBufferSource();
                    f.connect(b);
                    var g = a(h, 0),
                        k = c.createBuffer(2, g.length, c.sampleRate);
                    return k.getChannelData(0).set(g),
                        a(h, 1, g), k.getChannelData(1).set(g), f.buffer = k, f.start(e), d.push({
                            data: g,
                            width: 128,
                            height: 64,
                            bufferTime: h,
                            destroy: function() {
                                f.disconnect(b)
                            }
                        }), {
                            b: h + g.length,
                            t: e + k.duration
                        }
                },
                p = function() {
                    var a = f(h, e);
                    h = a.b;
                    e = a.t
                };
            ! function m() {
                d = d.filter(function(a) {
                    return !(a.bufferTime + a.data.length < Math.floor(c.currentTime * c.sampleRate) && (a.destroy(), 1))
                });
                a && c.currentTime + 8 > e && p();
                setTimeout(m, 100)
            }()
        }, b.vs = "#version 300 es\n#ifdef GL_ES\nprecision highp float;\nprecision highp int;\nprecision mediump sampler3D;\n#endif\nlayout(location = 0) in vec2 pos;out vec4 fragColor;void main(){gl_Position = vec4(2.0*pos-1.0,.0,1.0);}",
        b
}(),
__extends = this && this.__extends || function() {
    var b = function(a, d) {
        return (b = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(a, d) {
                a.__proto__ = d
            } || function(a, d) {
                for (var c in d) d.hasOwnProperty(c) && (a[c] = d[c])
            })(a, d)
    };
    return function(a, d) {
        function h() {
            this.constructor = a
        }
        b(a, d);
        a.prototype = null === d ? Object.create(d) : (h.prototype = d.prototype, new h)
    }
}(),
// TextureBase = function() {
//     function b() {
//         this.perm = this.seed(255)
//     }
//     return b.prototype.normalize = function(a) {
//             var d = this.length(a);
//             return 0 != d ?
//                 this.func(a, function(a, b) {
//                     return a / d
//                 }) : a
//         }, b.prototype.fract = function(a) {
//             return a % 1
//         }, b.prototype.abs = function(a) {
//             return a.map(function(a, b) {
//                 return Math.abs(a)
//             })
//         }, b.prototype.func = function(a, d) {
//             return a.map(function(a, b) {
//                 return d(a, b)
//             })
//         }, b.prototype.toScale = function(a, d) {
//             return (a - 0) / (d - 0) * 2 + -1
//         }, b.prototype.dot = function(a, d) {
//             return a[0] * d[0] + a[1] * d[1] + a[2] * d[2]
//         }, b.prototype.length = function(a) {
//             return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])
//         }, b.prototype.fade = function(a) {
//             return a * a * a * (a * (6 * a - 15) + 10)
//         },
//         b.prototype.lerp = function(a, d, b) {
//             return d + a * (b - d)
//         }, b.prototype.grad = function(a, d, b, e) {
//             a &= 15;
//             var c = 8 > a ? d : b;
//             d = 4 > a ? b : 12 == a || 14 == a ? d : e;
//             return (0 == (1 & a) ? c : -c) + (0 == (2 & a) ? d : -d)
//         }, b.prototype.scale = function(a) {
//             return (1 + a) / 2
//         }, b.prototype.seed = function(a) {
//             for (var d = [], b = [], e = 0; a >= e; e++) b.push(e);
//             for (e = 0; a >= e; e++) {
//                 var c = a * Math.random(),
//                     k = b[~~c];
//                 b.splice(c, 1, b[e]);
//                 b.splice(e, 1, k)
//             }
//             for (e = 0; e < a; e++) d[a + e] = d[e] = b[e];
//             return d
//         }, b.prototype.noise = function(a, d, b) {
//             var e = this.perm,
//                 c = 255 & ~~a,
//                 h = 255 & ~~d,
//                 g = 255 & ~~b;
//             a -= ~~a;
//             d -=
//                 ~~d;
//             b -= ~~b;
//             var l = this.fade(a),
//                 f = this.fade(d),
//                 p = this.fade(b),
//                 n = e[c] + h,
//                 m = e[n] + g;
//             n = e[n + 1] + g;
//             h = e[c + 1] + h;
//             c = e[h] + g;
//             g = e[h + 1] + g;
//             return this.scale(this.lerp(p, this.lerp(f, this.lerp(l, this.grad(e[m], a, d, b), this.grad(e[c], a - 1, d, b)), this.lerp(l, this.grad(e[n], a, d - 1, b), this.grad(e[g], a - 1, d - 1, b))), this.lerp(f, this.lerp(l, this.grad(e[m + 1], a, d, b - 1), this.grad(e[c + 1], a - 1, d, b - 1)), this.lerp(l, this.grad(e[n + 1], a, d - 1, b - 1), this.grad(e[g + 1], a - 1, d - 1, b - 1)))))
//         }, b
// }(),
// Texture = function() {
//     function b(a, b) {
//         var d = this;
//         this.width =
//             a;
//         this.height = b;
//         this.coord = function(a, b, e, h, f, p) {
//             return p.apply(d.helpers, [
//                 [a[0], a[2], a[1]], b, e, h, f
//             ])
//         };
//         var e = document.createElement("canvas");
//         e.width = a;
//         e.height = b;
//         this.ctx = e.getContext("2d");
//         this.ctx.fillStyle = "#000000";
//         this.ctx.fillRect(0, 0, this.width, this.height);
//         this.buffer = this.ctx.getImageData(0, 0, this.width, this.height);
//         this.helpers = new TextureBase
//     }
//     return b.createTexture = function(a, d, h) {
//         a = new b(a, d);
//         return a.render(h), a.toBase64()
//     }, b.prototype.render = function(a) {
//         for (var b = this.buffer, h = this.width,
//                 e = this.height, c, k = 0; k < h; k++)
//             for (var g = 0; g < e; g++) {
//                 c = 4 * (k + g * h);
//                 var l = this.coord([b.data[c + 0], b.data[c + 1], b.data[c + 2]], k, g, h, e, a);
//                 b.data[c + 0] = l[0];
//                 b.data[c + 1] = l[1];
//                 b.data[c + 2] = l[2]
//             }
//         this.ctx.putImageData(b, 0, 0)
//     }, b.prototype.toBase64 = function() {
//         return this.ctx.canvas.toDataURL("image/png")
//     }, b
// }(),
// TextureCanvas = function(b) {
//     function a(a, h) {
//         return b.call(this, a, h) || this
//     }
//     return __extends(a, b), a.prototype.draw = function(a) {
//         return a.apply(this.helpers, [this.ctx, this.width, this, this.height])
//     }, a.createTexture = function(b,
//         h, e) {
//         b = new a(b, h);
//         return b.draw(e), b.toBase64()
//     }, a
// }(Texture),

dsp = "#version 300 es\n#ifdef GL_ES\nprecision highp int;\nprecision highp float;\n#endif\nuniform float sampleRate;uniform vec2 resolution;uniform float channel,bufferTime;out vec4 fragColor;float f=3.14,g=6.28;float s(float f,float s,float r){return sin(f*s+g*r);}float s(float s,float r){return sin(g*r*s);}float n(float s,float r){return abs(1.-mod(2.*r*s,2.))*2.-1.;}float n(float f){float r=128.843,g=.8*n(r/3.,f)+.05*s(r*2.,f),e=s(.18,f),b=s(.04,f),o=.8*s(g,2.+(1.+e)*(2.+(1.+b)*12.),f)+.7*s(r,f);return.4*o;}void main(){float f=bufferTime+4.*(gl_FragCoord.g*resolution.r+gl_FragCoord.r)/sampleRate;vec4 r=vec4(n(f),n(f+1./sampleRate),n(f+2./sampleRate),n(f+3./sampleRate));fragColor=(r+1.)/2.;}",

generator = Synth.G(dsp, 44100, 128, 64);

// kaliset = Texture.createTexture(512, 512, function(b, a, d, h, e) {
//     var c = this,
//         k = Math;
//     b = .18 * function(a) {
//         for (var b = 0, d = b, e = 0; 13 > e; e++) {
//             var g = d;
//             d = c.length(a);
//             var h = c.dot(a, a);
//             a = c.func(a, function(a, b) {
//                 return k.abs(a) / h - .5
//             });
//             b += k.exp(-1 / k.abs(d - g))
//         }
//         return b
//     }([c.toScale(a, h), c.toScale(d, h), 0]);
//     return [Math.abs(280.5 * b), Math.abs(b * b * 331.5), Math.abs(b * b * b * 255)]
// });

  var s = "uniform float time;uniform vec2 mouse,resolution;vec3 v=vec3(0.);float i;void f(vec2 v){i=fract(sin(dot(v,vec2(113.421,17.329)))*3134.12);}float f(){return fract(sin(i++)*3143.45);}float n(vec3 f){const vec3 i=vec3(.63248,.78632,.875);float r=1.;for(int m=0;m<5;m++){f=2.*clamp(f,-i,i)-f;float n=max(.70968/dot(f,f),1.);f*=n;r*=n;}if(v.r>=0.)v+=abs(f);float m=length(f.rg);return max(m-.92784,abs(m*f.b)/length(f))/r;}float s(vec3 v){return n(v);}vec3 t(in vec3 v){vec2 f=vec2(1.,-1.)*.5773*.0005;return normalize(f.rgg*s(v+f.rgg)+f.ggr*s(v+f.ggr)+f.grg*s(v+f.grg)+f.rrr*s(v+f.rrr));}vec3 p(in vec3 v){return t(v);}mat2 x(float v){return mat2(cos(v),sin(v),-sin(v),cos(v));}mat3 f(in vec3 v,in vec3 f,in float i){vec3 m=normalize(f-v),s=normalize(cross(m,vec3(sin(i),cos(i),0.))),d=normalize(cross(s,m));return mat3(s,d,m);}void n(out vec3 v,out vec3 f,in float m){float i=.3*m+10.;v=vec3(2.772*sin(i),.424,.82*cos(i));f=vec3(1.,0.,-.03);}float f(in vec3 v,in vec3 f){const float m=20.,i=.001;float r=i*2.,n=0.,d=-1.;for(int b=0;b<128;b++){if(r<i||n>m)break;r=s(v+f*n);n+=r;}if(n<m)d=n;return d;}vec3 m(float v){return vec3(cos(v),sin(v),-.65+abs(sin(v*.7))*.25)*(2.+sin(v*1.7)*.5)+vec3(0.,0.,1.);}vec3 e(vec3 v){return v;}vec4 e(vec3 i,vec3 r,float n,float b,float g){f(gl_FragCoord.rg+b);vec3 d=m(b+1.),c;d.b+=n;i.b-=n;float a=s(i)*.8,o=a*f(),u=a,p=1.,x=0.;vec4 l=vec4(0.,0.,0.,1.),z,h=vec4(-1.);for(int C=0;C<99;C++){if(u>o+x)c=i+r*(o+x),c+=(d-c)*-c.b/(d.b-c.b);else c=i+r*o;a=s(c);if(u>o+x){float k=.05*length(i+r*(o+x)-d);l.rgb+=l.a*vec3(1.,1.,.7)*exp(-k*40.)*smoothstep(0.,.01,a);if(o+x+k>u){x=0.;o=u;if(o>20.)break;}else x+=k;}else{if(a<p&&h.a<0.){float k=clamp(a/(g*o),0.,1.);if(k<.95)z=vec4(k,z.rgb),h=vec4(o,h.rgb),l.a*=k;}p=a;u=o+a*(.6+.2*f());}}vec3 k=vec3(0.);for(int C=0;C<4;C++){if(h.r<0.)continue;v=vec3(0.);c=i+r*h.r;vec3 F=t(c),D=d-c,w;v=sin(v)*.3+vec3(.8,.6,.4);float Z=exp(-dot(D,D)*.2);c+=D*-c.b/D.b;D=normalize(D);w=Z*v*max(0.,dot(F,D));float Y=max(0.,dot(F,-r));w+=exp(-o)*v*Y;a=smoothstep(0.,.005,s(c));w+=Z*vec3(2.,2.,1.7)*max(0.,dot(F,D))*a;if(r.b<0.&&a>0.)w+=Z*vec3(4.,3.,1.4)*pow(max(0.,dot(reflect(r,F),D)),5.)*(1.-.25*Y)*a;k=mix(w,k,z.r);z=z.gbar;h=h.gbar;}l.rgb=clamp(l.rgb+k,0.,1.);return vec4(e(l.rgb),o);}out vec4 fragColor;void main(){float v,i,d,c=i=.3;vec2 m=gl_FragCoord.rg/resolution.rg+mouse/4.;vec3 s,r;n(s,r,time*.1);v=mod(time,18.85);mat3 a=f(s,r,0.);vec3 k=normalize(a*vec3(m.rg,3.5));vec4 b=e(s,k,.3,v*.12,3./resolution.g);fragColor=b;}";
    
  P.I(q("canvas"), "layout(location= 0) in vec2 pos; out vec4 fragColor;void main(){gl_Position=vec4(pos.xy,0.,1.0);}", 
  s, innerWidth, innerHeight,{}, 
  function() {
            q("#w").addEventListener("click", function() {
                Synth.P(generator)
            })
        
    });



