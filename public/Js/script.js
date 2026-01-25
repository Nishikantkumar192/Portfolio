new Typed("#type", {
    strings: ["MERN-Stack Developer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

let sideMenu=document.querySelector(".sideMenu");
let hamDiv=document.querySelector(".hamDiv");
hamDiv.addEventListener("click",()=>{
    sideMenu.style.marginLeft="0"
    hamDiv.style.display="none";
})

let crossSign=document.querySelector(".crossSign");
crossSign.addEventListener("click",()=>{
    sideMenu.style.marginLeft="-500px";
    hamDiv.style.display="block";
})