let crossSign=document.querySelector(".crossSign");
let sideMenu=document.querySelector(".sideMenu");
let hamDiv=document.querySelector(".hamDiv");
crossSign.addEventListener("click",()=>{
    sideMenu.style.marginLeft="-500px"
    hamDiv.style.display="block";
})
hamDiv.addEventListener("click",()=>{
    sideMenu.style.marginLeft="0px";
    hamDiv.style.display="none";
})