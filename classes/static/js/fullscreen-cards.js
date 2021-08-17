function resize_left(){
    document.getElementById("left-container").classList.toggle('col-xl-6');
    document.getElementById("left-container").classList.toggle('col-xl-12');
    document.getElementById("right-container").classList.toggle('d-none');
    ticket_table.redraw();

};
function resize_right(){
    document.getElementById("right-container").classList.toggle('col-xl-6');
    document.getElementById("right-container").classList.toggle('col-xl-12');
    document.getElementById("left-container").classList.toggle('d-none');
};

document.getElementById("left-fullscreen").addEventListener("click", () => resize_left() , false);
document.getElementById("right-fullscreen").addEventListener("click", () => resize_right() , false);