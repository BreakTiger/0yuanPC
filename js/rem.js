var deviceWidth
setHtmlFontSize()

if(window.addEventListener){
    window.addEventListener('ressize',function(){
        setHtmlFontSize()
    },false)
}

function setHtmlFontSize(){
    deviceWidth=document.documentElement.clientWidth>1920?1920:document.documentElement.clientWidth
    document.getElementsByTagName('html')[0].style.cssText='font-size:'+ deviceWidth / 19.20 + 'px !important'
}