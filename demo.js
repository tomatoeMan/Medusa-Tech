let h1=document.getElementById("h1Heading");
let p1=document.getElementById("pHeading");
let box1=document.getElementById("box1");
let box2=document.getElementById("box2");
const data="https://your-website-preview.co.za/checkEm";
let labelArr=new Array();
let funcArr=new Array();

function setButtons()
{
    let signUpB=document.getElementById("signUp");
    let logInB=document.getElementById("logIn");

    let divB1=document.getElementById("divB1");
    let divB2=document.getElementById("divB2");

    signUpB.setAttribute("class","signUpB");
    logInB.setAttribute("class","logInB");

    divB1.setAttribute("class","signUp");
    divB2.setAttribute("class","logIn");

    signUpB.addEventListener("click",async()=>
    {
        
    });
    
}

function loadOrder()
{
    //h1load();
    if (isFacebookApp()) 
    {
        // Code to execute if the user is in the Facebook in-app browser
        if(window.innerWidth<800)
        {
            h1.setAttribute("class","h1HeaderF");
            setTimeout(ploadFacebook,800);
            setTimeout(loadRotate,2850)
        }
    } 
    else 
    {
        let stop=false;
        h1.setAttribute("class","h1Header");
        setTimeout(ploadGoogle,800);
        setTimeout(setButtons,3000);
        setTimeout(loadRotate,2000);
        //setTimeout(loadRotate,5900);
       
            setTimeout(setTimeStart,2600);
            
            for(let i=1;i<=9;i++)
            {
                let temp="l"+i.toString();
                labelArr[i]=document.getElementById(temp);
            }
            let c=1;
            function setTimeStart()
            {    
                if(c==8)
                {
                    labelArr[c].setAttribute("class","l2");
                }
                else if(c!=9 && c<8)
                {
                    labelArr[c].setAttribute("class","l1");
                }
                if(c==9)
                {
                    setTimeout(thrD,2000);
                }
                c++;
                if(c==labelArr.length)
                {
                    stop=true;
                    
                }
                if(stop==false)
                {
                    startNext();
                }
            }
            function startNext()
            {
                setTimeout(setTimeStart,50);
            }
            function thrD()
            {
                labelArr[9].setAttribute("class","l3");
                //loadRotate();
                
            }
        
        
        // Code to execute if the user is not in the Facebook in-app browser
    }
   
}

function h1loadGoogle()
{
    h1.setAttribute("class","h1Header");
}

function ploadGoogle()
{
    p1.setAttribute("class","p1Header");
}

function h1loadFacebook()
{
    h1.setAttribute("class","h1HeaderF");
}

function ploadFacebook()
{
    p1.setAttribute("class","p1HeaderF");
}

function loadRotate()
{
    box1.setAttribute("class","box1");
    box2.setAttribute("class","box2");
    
}



loadOrder();

function isFacebookApp() 
{
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return (userAgent.indexOf("FBAN") > -1) || (userAgent.indexOf("FBAV") > -1);
}


let headerW=document.getElementById("header").offsetWidth;
let headerH=document.getElementById("header").offsetHeight;


VANTA.NET({
  el: "#tech",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x3fddff,
  backgroundColor: 0x0,
  maxDistance: 25.00,
  spacing: 14.00
})

let Swi=false;

let g=255;
let b=247;

let g1;
let b1;

let once=false;

function headerImg() 
{
    
}

headerImg();
let q=setInterval(headerImg,20);

//animate();