let pro_type=["lip_liner","lipstick","foundation","eyeliner","eyeshadow",
"blush","bronzer","mascara","eyebrow","nail_polish"];
let unique=[];
let type_img=["images/img1.jpeg","images/img2.jpeg","images/img3.jpg","images/img4.jpeg","images/img5.jpg",
"images/img6.jpeg","images/img7.jpeg","images/img8.jpeg","images/img9.jpeg","images/img10.jpeg"]
document.body.style.backgroundImage="linear-gradient( to bottom right,#BF953F,#FCF6BA,#B38728, #FBF5B7,#AA771C)";
var div1= document.createElement("div");
div1.setAttribute("class","main_contain")

let flash=["images/main1.JPEG","images/main2.JPEG",
"images/main3.jpg","images/main4.JPEG",
"images/main5.JPEG"]
let botdiv=document.createElement("div");
let count=0;
var bot_img=document.createElement("div");
function front_design(){
   var topdiv = document.createElement("div");
   topdiv.setAttribute("class","topdiv");
   topdiv.innerHTML=`<img class="top_img" src="images/makeup1.JPEG">
   <div class="top_content"><q>Skincare might be the hot topic du jour, but if you’re a beauty-lover (you are reading Byrdie, after all), 
   it’s likely that makeup was your first love. Whether it was playing with your mom’s MAC Taupe lipstick or spending all your free time
    at Sephora in high school when it *finally* came to your Midwestern mall (guilty)—there’s something spellbinding and mesmerizing about
     every little product when you grow up a makeup-lover. And of course, there’s the fun that comes with harnessing them to express yourself
      in your own unique way.</q></div>`  

    for(let i=0; i<10;i++){
        var img_contain= document.createElement("div");

        img_contain.setAttribute("class","images_container");
        
        const name = pro_type[i].charAt(0).toUpperCase() + pro_type[i].slice(1);
    
        img_contain.innerHTML=`<img id="front_img" class="${name}" onclick="product(event)" src="${type_img[i]}" alt="cosmetics" >
                       <p class="type_name">${name}</p>`;

        div1.append(img_contain);
    }
    document.body.append(topdiv, div1);
}

front_design();

function flashimg(){
    bot_img.innerHTML="";
    if(count>4){
        count=0;
    }
 bot_img.setAttribute("class","tops_img");
 bot_img.innerHTML=`
 <img class="flash_img" src="${flash[count]}">`;
 botdiv.append(bot_img);
 document.body.append(botdiv);
 count++;
}

flashimg()
setInterval(flashimg,1000);

var typ1=document.createElement("div");
typ1.setAttribute("class","typ1")

async function product(event){
  
 var header= document.createElement("div");
 header.setAttribute("class","header");
 header.innerHTML=`
<img class="backfor" onclick="backward()" src="images/back.png">
<img class="backfor" onclick="brand()" src="images/for.png">`;

 pro_types=  event.target.className;
  
 try{
 var data=await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${pro_types}`);
var data1= await data.json();

 data1.forEach(({image_link,name,price,price_sign,description})=>{
 var lipdoc= document.createElement("div")
 lipdoc.setAttribute("class","images_container");
 lipdoc.innerHTML=`
 <img class="pro-img" src="${image_link}"/>
 <p class="pro-name">${name}</p>
 <p class="pro-price">${price}${price_sign}</p>
 <p class="pro-description">${description}</p>`
 typ1.append(lipdoc);
});
 }
 catch(error){
  console.log(error);
}
document.body.innerHTML="";
document.body.append(header,typ1);

}


backward=()=>{
  document.body.innerHTML="";
  front_design();
}