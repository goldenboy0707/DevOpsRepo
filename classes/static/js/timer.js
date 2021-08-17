var start = new Date().getTime();
var now, elapsed, d, h, m, format;
setInterval(function() {
  now = new Date().getTime();
  elapsed = now - start;
  d = Math.floor(elapsed / 86400000);
  h = Math.floor(elapsed % 86400000 / 3600000);
  m = Math.floor(elapsed % 3600000 / 60000);
  format = d + "j " + ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) ;
  document.getElementById("noblocking-timer").innerHTML = format;
}, 1000);
toggle.addEventListener("click", () => document.getElementById("server-state").classList.toggle('on') , false);
function reset_timer(){
    start = new Date().getTime();
}