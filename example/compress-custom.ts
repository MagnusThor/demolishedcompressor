import { Compressor } from "../src/Compressor";

let html = `<style>body{margin:0;background:#000};</style><div id="p" style="right:50%;bottom:50%;transform:translate(50%,50%);position:absolute;z-index:2;height:40px;background:#fff"></div><canvas style="width:100%;height:100vh;left:0;position:absolute;z-index:1" id=w width=640 height=360/>`;


let customScript = `z=function(){c=String.fromCharCode;q=document.querySelector.bind(document);i=q("img");x=q("#c").getContext("2d");x.drawImage(q("img"),0,0);d=x.getImageData(0,0,i.width,i.height).data;b=[];s=1E3;p=b.push.bind(b);l=function(a){var e=(a-s)/d.length*100;q("#p").style.width=e+"%";for(i=a;i<a+s&&i<d.length;i+=4)p(c(d[i])),p(c(d[i+1])),p(c(d[i+2]));a<d.length?setTimeout(function(){l(a+s)},100):(s=b.join("").replace(/\\0/g," "),(0,eval)(s),q("#p").style.display='none')};l(0)};`;

Compressor.Pngify("/example/builds/demo.min.js","/example/builds/demo-custom.png.html",html, customScript)
