// ==UserScript==
// @name         FB remove ads
// @namespace    example.org
// @version      0.1
// @description  FB remove ads
// @author       You
// @match        https://www.facebook.com/*
// @downloadURL  https://raw.githubusercontent.com/diekaines/block_facebook_ads/main/hiq_reklamat.user.js
// @grant        none
// ==/UserScript==

//make the ads DIV opactity 0.1
var css = '.reklama_me_hover{opacity:0.01; } .reklama_me_hover:hover{ opacity: 1 !important }';
var style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.getElementsByTagName('head')[0].appendChild(style);

var sa_reklama_jane_hequr = 1;


//show the tooltip when ad is removed
var stili_extra = document.createElement('style')
stili_extra.innerText = '.reklama_tooltip_container, .drink_water_container { text-align: center;position: fixed;z-index: 9999999;font-size: 20px;color: white ;background-color: red ;padding: 10px;bottom: 20px;width: 200px;left: calc(50% - 100px); }  .drink_water_container {position: relative; left: auto;width: 100%;margin-top: 40px;box-sizing: border-box; } '
document.querySelector('body').appendChild ( stili_extra )



function remove_tooltipin (){

    
    document.querySelector('.reklama_tooltip_container').remove();

}


function shto_tooltip(){

   sa_reklama_jane_hequr++;

    var teksti = document.createElement('div')
    teksti.setAttribute('class','reklama_tooltip_container')
    teksti.innerText = 'Reklama u hoq ' ;
    document.querySelector('body').appendChild(teksti)

}


function is_element_in_viewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


function remove_ads(el) {


    var all_chars = []

    var kot = document.querySelectorAll(' a > span > span > div ').forEach(function(main_span_sponsored){

    if(!is_element_in_viewport ( main_span_sponsored ) ) {
            return ;
    }

      // console.log('kalledss')

        //if we have already added the reklama_me_hover class , bail out
        //if(main_span_sponsored.closest('div[data-pagelet]').classList.contains('reklama_me_hover') ) {
       //     console.log('No run, has reklama_me_hover already')
       //    return true;
       // }


        main_span_sponsored.childNodes.forEach( function (el) {
            //console.log(el.innerText);
            //if ( window.getComputedStyle(el).position =='relative' && window.getComputedStyle(el).display !='none' ){
            if ( window.getComputedStyle(el).position =='relative' && window.getComputedStyle(el).width != '0px'  ){
                all_chars[ window.getComputedStyle(el).order ] = el.innerText
                 //console.log(el.innerText);
            }
        })



         var is_text_value_Sponsored = all_chars.join('')
          console.log(is_text_value_Sponsored);
         if( is_text_value_Sponsored == 'Sponsored') {
           console.log('found sponsoreddddddddddd');
             //main_span_sponsored.closest('div[data-pagelet]').classList.add('reklama_me_hover');

             main_span_sponsored
                 .parentElement.parentElement.parentElement.parentElement.parentElement
                 .parentElement.parentElement.parentElement.parentElement.parentElement
                 .parentElement.parentElement.parentElement.parentElement.parentElement
                 .parentElement.parentElement.parentElement.parentElement.parentElement
                 .parentElement.parentElement.parentElement.parentElement.parentElement
                 .classList.add('reklama_me_hover')
                 //.remove() ;
                 .innerHTML = '<h3 class="drink_water_container">Drink water '+ sa_reklama_jane_hequr +'</h3>'

                 shto_tooltip()


				setTimeout(function() {
					document.querySelector('.reklama_tooltip_container').remove();
				}, 1000); // <-- time in milliseconds


                //window.setTimeOut( 'remove_tooltipin', 300 );

         }

      

         is_text_value_Sponsored = '';
         all_chars = []


    })



}



//remove the ads on sidebar
function remove_ads_sidebar(){

     var a_ka_ad = document.querySelectorAll('div[role="complementary"] div div div div div div div div div div h3 span') ;
     [...a_ka_ad].forEach(function(single_span ){

         //console.log( single_span.innerText )

         if( single_span.innerText == 'Sponsored' ){
            console.log('removed sidebar ads ')
            single_span
                 .parentElement.parentElement.parentElement.parentElement.parentElement
                 .parentElement.parentElement.parentElement.parentElement.parentElement
                 .remove();

         }


     })

}




const removeFbclid = (href) => {

    const fbclidURL = new URL(href)

     //fbclidURL.searchParams.delete("fbclid")

    if (fbclidURL.host === "l.facebook.com" && fbclidURL.searchParams.get("u")) {
        href = decodeURI(fbclidURL.searchParams.get("u"))

        //href.searchParams.delete("fbclid")

       // console.log("decided")
     //   console.log(href )
    } else {
        fbclidURL.searchParams.delete("fbclid")
        href = fbclidURL.href
    }
    return href
}





const deleteFbclidLink = () => {

    const fbclidLinkList = document.querySelectorAll('a[href*="fbclid"]')

  if (!fbclidLinkList || fbclidLinkList.length === 0) {
    return
  }

// console.log(fbclidLinkList);

  for (const fbclidLink of fbclidLinkList) {
     // console.log(fbclidLink.href)
    fbclidLink.addEventListener("click",
      function (event) {
        event.preventDefault()
        window.open(removeFbclid(this.href))
      },
      false)
    fbclidLink.href = removeFbclid(fbclidLink.href)
  }
}




const excute = () => {

    //remove fcb click ID
    window.addEventListener("DOMSubtreeModified", deleteFbclidLink)
    window.addEventListener("scroll", deleteFbclidLink)
    window.addEventListener("click", deleteFbclidLink)
    window.addEventListener("hover", deleteFbclidLink)
    window.addEventListener("contextmenu", deleteFbclidLink)

   //window.addEventListener("DOMSubtreeModified", remove_ads)
   window.addEventListener("scroll", remove_ads)
    window.addEventListener("DOMContentLoaded", remove_ads)
   // window.addEventListener("click", remove_ads)
   // window.addEventListener("hover", remove_ads)
  //  window.addEventListener("contextmenu", remove_ads)


    //remove the sidebar ads
    window.addEventListener("scroll", remove_ads_sidebar)
    window.addEventListener("DOMContentLoaded", remove_ads_sidebar)


}

(function() {
    'use strict';

	excute()
})();
