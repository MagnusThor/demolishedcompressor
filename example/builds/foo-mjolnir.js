
var DR = (function () {
    function DR(canvas, v, f) {
        this.canvas = canvas;
        this.header = "#version 300 es\n        #ifdef GL_ES\n                precision highp float;\n                precision highp int;\n                precision mediump sampler3D;\n        #endif\n        ";
        this.targets = new Map();
        this.programs = new Map();
        this.textureCache = new Map();
        this.gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true });
        var gl = this.gl;
        var c = 0, d;
        for (var i in gl)
            "function" == typeof gl[i] && (d = (c++ & 255).toString(16), d = d.match(/^[0-9].*$/) ? "x" + d : d, gl[d] = gl[i]);
        gl.df(0, 0, canvas.width, canvas.height);
        this.buffer = gl.x71();
        this.surfaceBuffer = gl.x71();
        this.mainProgram = gl.x73();
        this.cS(this.mainProgram, 35633, this.header + v);
        this.cS(this.mainProgram, 35632, this.header + f);
        gl.af(this.mainProgram);
        gl.d4(this.mainProgram);
        this.screenVertexPosition = gl.x91(this.mainProgram, "pos");
        gl.x87(this.screenVertexPosition);
        gl.x5b(34962, this.buffer);
        gl.x64(34962, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]), 35044);
    }
    DR.prototype.cS = function (program, type, source) {
        var gl = this.gl;
        var shader = gl.x75(type);
        gl.b6(shader, source);
        gl.x6c(shader);
        gl.x59(program, shader);
    };
    DR.prototype.aP = function (name) {
        var p = this.gl.x73();
        this.programs.set(name, p);
        return p;
    };
    DR.prototype.t = function (image) {
        var gl = this.gl;
        var texture = gl.x76();
        gl.x5e(3553, texture);
        gl.bf(3553, 0, 6408, 6408, 5121, image);
        gl.x8d(3553);
        return texture;
    };
    DR.prototype.aA = function (textures, cb) {
        var _this = this;
        var c = Object.keys(textures).length;
        Object.keys(textures).forEach(function (key) {
            var m = new Image();
            m.onload = function (e) {
                _this.textureCache.set(key, _this.t(m));
                if (_this.textureCache.size === c)
                    cb();
            };
            m.src = textures[key].src;
        });
    };
    DR.prototype.aB = function (name, vertex, fragment, textures) {
        var _this = this;
        var gl = this.gl;
        var target = this.cT(this.canvas.width, this.canvas.height, textures ? textures : []);
        this.targets.set(name, target);
        var program = this.aP(name);
        this.cS(program, 35633, this.header + vertex);
        this.cS(program, 35632, this.header + fragment);
        gl.af(program);
        gl.d4(program);
        if (textures) {
            textures.forEach(function (tk) {
                var m = _this.textureCache.get(tk);
                gl.x5e(3553, m);
            });
        }
        this.vertexPosition = gl.x91(program, "pos");
        gl.x87(this.vertexPosition);
        return this;
    };
    DR.prototype.R = function (time) {
        var _this = this;
        var gl = this.gl;
        var main = this.mainProgram;
        var i = 0;
        this.programs.forEach(function (current, key) {
            gl.d4(current);
            var target = _this.targets.get(key);
            gl.c5(gl.a2(current, "resolution"), _this.canvas.width, _this.canvas.height);
            gl.c1(gl.a2(current, "time"), time);
            target.textures.forEach(function (tk) {
                var loc = gl.a2(current, tk);
                gl.x58(33984 + i);
                gl.c3(loc, i);
                i++;
            });
            gl.x5b(34962, _this.surfaceBuffer);
            gl.de(0, 2, 5126, false, 0, 0);
            gl.x5b(34962, _this.buffer);
            gl.de(0, 2, 5126, false, 0, 0);
            gl.x5c(36160, target.framebuffer);
            gl.x67(16384 | 256);
            gl.x84(4, 0, 6);
        });
        gl.d4(main);
        gl.c5(gl.a2(main, "resolution"), this.canvas.width, this.canvas.height);
        gl.c1(gl.a2(main, "time"), time);
        gl.x5b(34962, this.buffer);
        gl.de(0, 2, 5126, false, 0, 0);
        this.targets.forEach(function (target, key) {
            gl.c3(gl.a2(main, key), i);
            gl.x58(33984 + i);
            gl.x5e(3553, target.texture);
            i++;
        });
        gl.x5c(36160, null);
        gl.x67(16384 | 256);
        gl.x84(4, 0, 6);
    };
    DR.prototype.cT = function (width, height, textures) {
        var gl = this.gl;
        var t = {
            "framebuffer": gl.x72(),
            "renderbuffer": gl.x74(),
            "texture": gl.x76(),
            "textures": textures
        };
        gl.x5e(3553, t.texture);
        gl.bf(3553, 0, 6408, width, height, 0, 6408, 5121, null);
        gl.be(3553, 10242, 33071);
        gl.be(3553, 10243, 33071);
        gl.be(3553, 10240, 9728);
        gl.be(3553, 10241, 9728);
        gl.x5c(36160, t.framebuffer);
        gl.x8b(36160, 36064, 3553, t.texture, 0);
        gl.x5d(36161, t.renderbuffer);
        gl.b3(36161, 33189, width, height);
        gl.x8a(36160, 36096, 36161, t.renderbuffer);
        gl.x5e(3553, null);
        gl.x5d(36161, null);
        gl.x5c(36160, null);
        return t;
    };
    DR.prototype.run = function (t) {
        var _this = this;
        var fps = 60;
        var pt = performance.now();
        var interval = 1000 / fps;
        var dt = 0;
        var a = function (t) {
            requestAnimationFrame(a);
            dt = t - pt;
            if (dt > interval) {
                pt = t - (dt % interval);
                _this.R(pt / 1000);
            }
        };
        a(t | 0);
        return this;
    };
    return DR;
}());


var Example = (function () {
    function Example() {
    }
    Example.run = function () {
        var player;
        var vertex = "layout(location = 0) in vec2 pos; \n        out vec4 fragColor;\n        void main() { \n            gl_Position = vec4(pos.xy,0.0,1.0);\n        }";
        var fragment = "uniform float time;uniform vec2 mouse,resolution;uniform sampler2D iChannel0,iChannel1,iChannel2,iChannel3,iChannel4,fft;out vec4 fragColor;\n#define RAY_STEPS 100\n#define SHADOW_STEPS 50\n#define LIGHT_COLOR vec3(1.,.97,.93)\n#define AMBIENT_COLOR vec3(.75,.65,.6)\n#define SPECULAR 0.65\n#define DIFFUSE 1.0\n#define AMBIENT 0.35\n#define BRIGHTNESS 1.5\n#define GAMMA 1.35\n#define SATURATION.8\n#define detail.00004\n#define t time*.2\nvec3 lightdir=normalize(vec3(.1,-.15,-1.));const vec3 origin=vec3(-1.,.2,0.);float det=0.;vec3 pth1;mat2 rot(float v){return mat2(cos(v),sin(v),-sin(v),cos(v));}vec4 formula(vec4 v){return v.rb=abs(v.rb+1.)-abs(v.rb-1.)-v.rb,v=v*2./clamp(dot(v.rgb,v.rgb),.15,1.)-vec4(.5,.5,.8,0.),v.rg*=rot(.5),v;}float screen(vec3 v){float m=length(v.gb-vec2(.25,0.))-.5,i=length(v.gb-vec2(.25,2.))-.5;return min(max(m,abs(v.r-.3)-.01),max(i,abs(v.r+2.3)-.01));}vec2 de(vec3 v){float r=0.;vec3 m=v;m.b=abs(2.-mod(m.b,4.));vec4 i=vec4(m,1.5);float c=max(0.,.35-abs(v.g-3.35))/.35;\n#ifdef LESSDETAIL\nfor(int f=0;f<6;f++)i=formula(i);float f=max(-m.r-4.,(length(max(vec2(0.),i.gb-2.))-.5)/i.a);\n#else\nfor(int b=0;b<8;b++)i=formula(i);float d=max(-m.r-4.,length(max(vec2(0.),i.gb-3.))/i.a);\n#endif\nfloat b=screen(m),l=min(b,d);if(abs(l-b)<.001)r=1.;return vec2(l,r);}vec2 colorize(vec3 v){v.b=abs(2.-mod(v.b,4.));float m,i=m=0.,r=1000.;for(int f=0;f<15;f++){v=formula(vec4(v,0.)).rgb;float b=i;i=length(v);m+=exp(-10./abs(i-b));r=min(r,abs(i-3.));}return vec2(m,r);}vec3 path(float v){vec3 r=vec3(sin(v)*2.,(1.-sin(v*.5))*.5,-cos(v*.25)*30.)*.5;return r;}vec3 normal(vec3 v){vec3 m=vec3(0.,det,0.);return normalize(vec3(de(v+m.grr).r-de(v-m.grr).r,de(v+m.rgr).r-de(v-m.rgr).r,de(v+m.rrg).r-de(v-m.rrg).r));}float shadow(vec3 v,vec3 r){float m=1.,i=2.*det,f=10.;for(int b=0;b<SHADOW_STEPS;b++){if(i<1.&&f>detail){vec3 l=v-i*r;f=de(l).r;m=min(m,max(50.*f/i,0.));i+=max(.01,f);}}return clamp(m,.1,1.);}float calcAO(const vec3 v,const vec3 m){float r=detail*40.,f=0.,i=13.;for(int b=0;b<5;b++){float d=r*float(b*b);vec3 l=m*d+v;float c=de(l).r;f+=-(c-d)*i;i*=.7;}return clamp(1.-5.*f,0.,1.);}vec3 light(in vec3 v,in vec3 m,in vec3 r,in float i){float b=shadow(v,lightdir),f=calcAO(v,r),d=max(0.,dot(lightdir,-r))*b*DIFFUSE;vec3 l=max(.5,dot(m,-r))*AMBIENT*AMBIENT_COLOR,a=reflect(lightdir,r);float c=pow(max(0.,dot(m,-a))*b,15.)*SPECULAR;vec3 p;vec2 s=colorize(v);if(i>.5)p=vec3(1.),c=c*c;else{float g=pow(s.r*.11,2.);p=mix(vec3(g,g*g,g*g),vec3(g),.5)+.1;p+=pow(max(0.,1.-s.g),5.)*.3;}p=p*f*(l+d*LIGHT_COLOR)+c*LIGHT_COLOR;if(i>.5){vec3 n=v;n.b=abs(1.-mod(n.b,2.));vec3 g=texture(iChannel0,mod(1.-v.bg-vec2(.4,.2),vec2(1.))).rgb*2.;p+=g*abs(.01-mod(v.g-time*.1,.02))/.01*f;p*=max(0.,1.-pow(length(n.gb-vec2(.25,1.)),2.)*3.5);}else{vec3 g=texture(iChannel0,mod(v.br*2.+vec2(.5),vec2(1.))).rgb;g*=abs(.01-mod(v.r-time*.1*sign(v.r+1.),.02))/.01;p+=pow(s.r,10.)*3e-10*g;p+=pow(max(0.,1.-s.g),4.)*pow(max(0.,1.-abs(1.-mod(v.b+time*2.,4.))),2.)*vec3(1.,.8,.4)*4.*max(0.,.05-abs(v.r+1.))/.05;}return p;}vec3 raymarch(in vec3 v,in vec3 m){float r,i,b=r=0.;vec2 f=vec2(1.,0.);vec3 l,c=vec3(0.);for(int p=0;p<RAY_STEPS;p++){if(f.r>det&&b<30.){l=v+b*m;f=de(l);det=detail*(1.+b*50.);b+=f.r;if(f.r<.015)r+=max(0.,.015-f.r)*exp(-b);}}float g=max(0.,dot(normalize(-m),normalize(lightdir)));vec3 d=vec3(max(0.,-m.g+.6))*AMBIENT_COLOR*.5*max(.4,g);if(f.r<det||b<30.){l=l-abs(f.r-det)*m;vec3 p=normal(l);c=light(l,m,p,f.g);c=mix(c,d,1.-exp(-.15*pow(b,1.5)));}else{c=d;vec3 p=(m*3.+vec3(1.3,2.5,1.25))*.3;for(int n=0;n<13;n++)p=abs(p)/dot(p,p)-.9;c+=min(1.,pow(min(5.,length(p)),3.)*.0025);}vec3 p=LIGHT_COLOR*pow(g,25.)*.5;c+=r*(.5+g*.5)*LIGHT_COLOR*.7;c+=p*exp(min(30.,b)*.02);return c;}vec3 move(inout vec3 v){vec3 m=path(t),i=path(t+.7);float r=de(i).r;vec3 f=normalize(i-m);float b=i.r-m.r;b*=min(1.,abs(i.b-m.b))*sign(i.b-m.b)*.7;v.rg*=mat2(cos(b),sin(b),-sin(b),cos(b));b=f.g*1.7;v.gb*=mat2(cos(b),sin(b),-sin(b),cos(b));b=atan(f.r,f.b);v.rb*=mat2(cos(b),sin(b),-sin(b),cos(b));return m;}void main(){pth1=path(t+.3)+origin;vec2 v=gl_FragCoord.rg/resolution.rg*2.-1.;v.g*=resolution.g/resolution.r;vec3 b=normalize(vec3(v*.8,1.)),i=origin+move(b),m=raymarch(i,b);m=clamp(m,vec3(0.),vec3(1.));m=pow(m,vec3(GAMMA))*BRIGHTNESS;m=mix(vec3(length(m)),m,SATURATION);fragColor=vec4(m,1.);}\n";
        var mainVertex = "layout(location = 0) in vec2 pos; \n        out vec4 fragColor;                \n        void main() { \n            gl_Position = vec4(pos.xy,0.0,1.0);\n        }";
        var mainFragment = "uniform float time;\n        uniform vec2 resolution;\n        uniform sampler2D bufferA;\n        out vec4 fragColor;\n        \n        float rand2d(vec2 co) {\n                return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n            }\n            \n            float rand(float n) {\n                return fract(sin(n) * 43758.5453123);\n            }\n            \n            float noise(float p) {\n                    float fl = floor(p);\n                      float fc = fract(p);\n                    return mix(rand(fl), rand(fl + 1.0), fc);\n            }\n            \n            float map(float val, float amin, float amax, float bmin, float bmax) {\n                float n = (val - amin) / (amax-amin);\n                float m = bmin + n * (bmax-bmin);\n                return m;\n            }\n            \n            float snoise(float p){\n                return map(noise(p),0.0,1.0,-1.0,1.0);\n            }\n            \n            float threshold(float val,float cut){\n                float v = clamp(abs(val)-cut,0.0,1.0);\n                v = sign(val) * v;\n                float scale = 1.0 / (1.0 - cut);\n                return v * scale;\n            }\n\n            #define CURVE \n            #define SCANS\n            #define FLICKS\n            //#define GRAINS \n            #define YBUG \n            #define DIRTY\n            //#define STRIP\n            //#define COLOR\n            #define BLINK\n            #define VIG\n            \n            float FREQUENCY = 11.0;\n            \n            vec2 uv_curve(vec2 uv) {\n                    uv = (uv - 0.5) * 2.0;\n                    uv *= 1.2;\t\n                    uv.x *= 1.0 + pow((abs(uv.y) / 5.0), 2.0);\n                    uv.y *= 1.0 + pow((abs(uv.x) / 4.0), 2.0);\n                uv /= 1.15;\n                    uv  = (uv / 2.0) + 0.5;\n                    return uv;\n            }\n            \n            vec3 color(sampler2D tex, vec2 uv){        \n                vec3 color = texture(bufferA,uv).rgb;\n                #ifdef COLOR\n                float bw = (color.r + color.g + color.b) / 3.0;\n                color = mix(color,vec3(bw,bw,bw),.95);\n                float p = 1.5;\n                color.r = pow(color.r,p);\n                color.g = pow(color.g,p-0.1);\n                color.b = pow(color.b,p);\n                #endif\n                return color;\n            }\n            \n            vec3 ghost(sampler2D tex, vec2 uv){\n                #ifdef FLICKS\n                \n                float n1 = threshold(snoise(time*10.),.85);\n                float n2 = threshold(snoise(2000.0+time*10.),.85);\n                float n3 = threshold(snoise(3000.0+time*10.),.85);\n                \n                vec2 or = vec2(0.,0.);\n                vec2 og = vec2(0,0.);\n                vec2 ob = vec2(0.,0);\n            \n                float os = .05;\n                or += vec2(n1*os,0.);\n                og += vec2(n2*os,0.);\n                ob += vec2(0.,n3*os);\n              \n                float r = color(bufferA,uv + or).r;\n                float g = color(bufferA,uv + og).g;\n                float b = color(bufferA,uv + ob).b;\n                vec3 color = vec3(r,g,b);\n                return color;\n                #else \n                return texture(bufferA,uv).rgb;\n                #endif\n            }\n            \n            vec2 uv_ybug(vec2 uv){\n                float n4 = clamp(noise(200.0+time*2.)*14.,0.,2.);\n                uv.y += n4;\n                uv.y = mod(uv.y,1.);\n                return uv;\n            }\n            \n            vec2 uv_hstrip(vec2 uv){\n                float vnoise = snoise(time*6.);\n                float hnoise = threshold(snoise(time*10.),.5);\n            \n                float line = (sin(uv.y*10.+vnoise)+1.)/2.;\n                line = (clamp(line,.9,1.)-.9)*10.;\n                \n                uv.x += line * 0.03 * hnoise;\n                uv.x = mod(uv.x,1.);\n                return uv;\n            }\n            \n            \n\n                  \n        void main(){                \n\n\n                float t = float(int(time * FREQUENCY));\n    \n                vec2 uv = gl_FragCoord.xy / resolution.xy;\n                                \n                #ifdef CURVE\n                uv = uv_curve(uv);\n                #endif\n            \n                vec2 ouv = uv;\n                \n                #ifdef GRAINS\n                float xn = threshold(snoise(time*10.),.7) * 0.05;\n                float yn = threshold(snoise((500.0+time)*10.),.7) * 0.05;\n                \n                float r = rand2d(uv+(t+100.0)*.01);\n                uv = uv + vec2(xn,yn) * r;\n                #endif\n                \n                 \n                #ifdef YBUG\n                uv = uv_ybug(uv);\n                #endif\n            \n                #ifdef STRIP\n                uv = uv_hstrip(uv);\n                #endif\n                \n               \n                vec2 onePixel = vec2(0.0, 1.0) / resolution.xy * 3.;\n                #ifdef BLUR\n                vec3 colorA = ghost(bufferA,uv + onePixel,or,og,ob);\n                vec3 colorB = ghost(bufferA,uv - onePixel,or,og,ob);\n                vec3 colorC = ghost(bufferA,uv,or,og,ob);\n                vec3 color = (colorA+colorB+colorC)/3.0;\n                #else\n                vec3 color = ghost(bufferA,uv);\n                #endif\n            \n                //color = colorC;\n                \n                float scanA = (sin(uv.y*3.1415*resolution.y/2.7)+1.)/2.;\n                float scanB = (sin(uv.y*3.1415*1.)+1.)/2.;\n                #ifdef SCANS\n                color *= .75 + scanA * .25;\n                //color *= .5 + scanC * .5;\n                //color *= scanB;    \n                #endif\n                \n                #ifdef BLINK\n                float blink = .96 + .04*(sin(time*100.)+1.)/2.;\n                color *= blink;\n                #endif\n                \n                #ifdef VIG\n                float vig = 44.0 * (ouv.x * (1.0-ouv.x) * ouv.y * (1.0-ouv.y));\n                    vig *= mix( 0.7, 1.0, rand(t + 0.5));\n                color *= .6 + .4*vig;\n                #endif\n                 \n                #ifdef DIRTY\n                color *= 1.0 + rand2d(uv+t*.01) * 0.2;\t\n                #endif\n            \n                vec3 backColor = vec3(.4,.4,.4);\n                if (ouv.x < 0.0 || ouv.x > 1.0)\n                            color = backColor;\n                    if (ouv.y < 0.0 || ouv.y > 1.0)\n                            color = backColor;\n            \n                fragColor = vec4(color,1.0);\n             \n        }";
        var canvas = document.querySelector("#w");
        player = new DR(canvas, mainVertex, mainFragment);
        player.aA({
            iChannel0: {
                src: "../assets/iChannel0.png"
            }
        }, function () {
            player.aB("bufferA", vertex, fragment, ["iChannel0"]).run();
        });
    };
    return Example;
}());

//exports.Example = Example;
setTimeout(function () {
    Example.run();
}, 3000);
