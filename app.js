let crossSign=document.querySelector(".crossSign");
let sideMenu=document.querySelector(".sideMenu");
crossSign.addEventListener("click",()=>{
    console.log("crossSign clicked");
    sideMenu.style.marginLeft="-500px"
})
let hamDiv=document.querySelector(".hamDiv");
hamDiv.addEventListener("click",()=>{
    console.log("hamDiv clicked");
    sideMenu.style.marginLeft="0px";
})