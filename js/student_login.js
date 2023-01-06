document.querySelector(".contact_form").style.display = "none";

document.querySelector('#item1').addEventListener('click',function(e){
    document.body.scrollTop = 100;
    document.documentElement.scrollHeight=100;
    document.querySelector('.contact_form').style.display = "block"
    document.querySelector('.contact_form').style.position = "relative"
})





function profile(){
    const sid= documentElement.querySelector('sid');
    const spsw= documentElement.querySelector('spw');
    console.log(sid )

}
