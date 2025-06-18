let submit=document.getElementById("send");
let info=document.getElementById("info");
let person=new Array();
let once=false;
let otpCor=false;
let input=false;
let send1=false;
let main=document.getElementById("main");
submit.addEventListener("click",async()=>
{
    
    if(otpCor==false)
    {
        let name=document.getElementById("name");
        let email=document.getElementById("email");
        let message=document.getElementById("message");
        if(name.value!="" && email.value!="" && message.value!="")
        {
            //const url="https://your-website-preview.co.za/otp";
            
            info.innerHTML="Please wait for the 6 digit pin";
            info.setAttribute("style","color:#00fff7;font-size:30px;");
            main.setAttribute("style","display:none;");
            let sendEmail=email.value;
            console.log(sendEmail);
            
            if(once==false)
            {
                const url="https://your-website-preview.co.za/otp";
                const res=await fetch(url,
                {
                    method:"POST",
                    headers:
                    {
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(
                    {
                        Email:sendEmail
                    })
                });
                const dataIN=await res.json();
                main.setAttribute("style","display:block;");
                input=dataIN;
                once=true;
            }
            if(input!=false)
            {    
                info.innerHTML="Pin sent to<br><label style='font-size:15px;'>"+email.value+"</label><br>Check your Email inbox or spam folder";
                person=[name.value,email.value,message.value];
                console.log(person);
                email.remove();
                message.remove();
                name.value="";
                name.setAttribute("placeholder","Enter Your OTP here");
                otpCor=true;

                let resend=document.createElement("button");
                resend.setAttribute("onclick","reSend()");
                resend.innerHTML="Resend OTP";
                resend.setAttribute("style","border:none;background-color:rgba(0,0,0,0);");
                let change=document.createElement("button");
                change.setAttribute("onclick","changeEm()");
                change.setAttribute("style","border:none;background-color:rgba(0,0,0,0);");
                change.innerHTML="Change Email";
                let br=document.createElement("br");
                main.appendChild(br);
                main.appendChild(resend);
                main.appendChild(br);
                main.appendChild(change);

            }
            else
            {
                once=false;
                info.innerHTML="Please try again or refresh the page";
            }
        }
        else
        {
            info.innerHTML="Please complete the form";
            info.setAttribute("style","color:red;font-size:30px;");
        }
    }
    else
    {
        let pin=document.getElementById("name");
        pin.setAttribute("placeholder","Please enter 6 digit pin here");
        console.log(pin.value+" "+input);
        let pinVal=pin.value;
        if(input==pinVal)
        {
            info.innerHTML="Sending your info";
            info.setAttribute("style","color:#00fff7;font-size:30px;");
            const url="https://your-website-preview.co.za/user";
            if(send1==false)
            {    
                main.setAttribute("style","display:none;");
                const res=await fetch(url,
                {
                    method:"POST",
                    headers:
                    {
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(
                    {
                        Person:person
                    })
                });
                const dataIN=await res.json();
                send1=true;
                info.innerHTML="Sent"
                pin.remove();
                let submit=document.getElementById("send");
                submit.remove();
                main.setAttribute("style","display:block;");
                main.remove();
            }
        }
        else
        {
            info.innerHTML="You have entered the incorrect pin<br>Try again";
            pin.setAttribute("placeholder","Incorrect");
            info.setAttribute("style","color:red;font-size:30px;");
        }
    }

});

async function reSend()
{
    main.setAttribute("style","display:none;");
    const url="https://your-website-preview.co.za/otp";
    info.innerHTML="Please wait while we resend your pin";
    const res=await fetch(url,
    {
        method:"POST",
        headers:
        {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
        {
            Email:person[1]
        })
    });
    const dataIN=await res.json();
    input=dataIN;
    info.innerHTML="Please enter the new pin";
    main.setAttribute("style","display:block;");
}

async function changeEm()
{
    main.setAttribute("style","display:none;");
    const url="https://your-website-preview.co.za/otp";
    person[1]=prompt("Please enter the new email");
    info.innerHTML="Please wait while we change to<br><label style='font-size:15px;'>"+person[1]+"</label><br> and resend your pin";
    const res=await fetch(url,
    {
        method:"POST",
        headers:
        {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
        {
            Email:person[1]
        })
    });
    const dataIN=await res.json();
    info.innerHTML="Please enter the new pin sent to<br>"+person[1];
    input=dataIN;
    main.setAttribute("style","display:block;");
}