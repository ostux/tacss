/**
 * author: Andras Toth - 2017
 * andras@andrastoth.eu
 */

/* variables */
 var BRP_M = 479;
 var BRP_D = 900;
 var BRP_S = (BRP_D - BRP_M)/2 + BRP_M;

var FIXED = '-fixed';
var VISIBLE = 'is-visible';
var HIDEING = 'is-hideing';
var HIDDEN = 'is-hidden';
var ACTIVE = 'active';

var DRAWER = 'drawer';
var DRAWER_TOGGLE = 'drawer-toggler';
var DRAWER_CLOSE = 'drawer--close';

var TAB_ITEM = 'tab-item';
var TOGGLE = 'toggle-for';
var REMOVE = 'remove';
var HIDE = 'hide';
/* variables end*/

/* global_functions */
function isFixed(element) {
    var e = document.querySelector("."+element);
    if (e.classList.contains(element+ FIXED)) {
        return true;
    }
    return false;
}

function handleClick(event) {
    if (event.target !== event.currentTarget) {
        //alert remove handler
        if (event.target.classList.contains(REMOVE)) {
            doRemove(event.target);
        }
        //alert hide handler
        if (event.target.classList.contains(HIDE)) {
            doHide(event.target);
        }
        //toggle and tab show / hide toggler
        if (event.target.hasAttribute(TOGGLE)) {
            if (event.target.classList.contains(TAB_ITEM)) {
                doTab(event.target) ;
            } else {
                doToggle(event.target.getAttribute(TOGGLE));
            }
        }
    }
    event.stopPropagation();
}

(function() {
    if (document.addEventListener) {
        document.addEventListener("click", handleClick, false);
    }
})();
/* global_functions end*/

/* toggle fixed drawer */
function toggleFixedDrawer(drawer) {
    console.log( "fixed: " + isFixed(DRAWER));
    console.log( "width: " + document.body.clientWidth < BRP_S);
    console.log( "visible: " + drawer.classList.contains(VISIBLE));
    if ((!isFixed(DRAWER) || document.body.clientWidth < BRP_S) && (drawer.classList.contains(VISIBLE))) {
        var closeLayer = document.createElement("div");
        closeLayer.classList.add(DRAWER_CLOSE);
        drawer.parentNode.insertBefore(closeLayer, drawer);
        closeLayer.addEventListener("click", function () {
            closeLayer.parentNode.removeChild(closeLayer);
            drawer.classList.add(HIDEING);
            console.log("mi a fasz?");
            drawer.classList.toggle(VISIBLE);
            setTimeout(function() {
               drawer.classList.remove(HIDEING);
            }, 350);
        })
    }
}
/* end toggle fixed drawer */

/* drawer */
(function() {
    if (document.querySelector("."+DRAWER_TOGGLE)) {
        var drawerToggle = document.querySelector("."+DRAWER_TOGGLE);
        drawerToggle.addEventListener("click", function() {
            var drawer = document.querySelector("."+DRAWER);
            drawer.classList.toggle(VISIBLE);
            toggleFixedDrawer(drawer);
        }, false);
    }
})();
/* drawer end */

/* remove */
function doRemove(remove) {
    remove.parentNode.parentNode.removeChild(remove.parentNode);
}
/* remove end */

/* remove */
function doHide(hide) {
    hide.parentNode.classList.toggle(HIDDEN);
}
/* remove end */

/* toggle and tab */
function doToggle(toggleID) {
    document.getElementById(toggleID).classList.toggle(VISIBLE);
}

function doTab(tabID) {
    var tabs = tabID.parentNode.getElementsByClassName(TAB_ITEM);
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].classList.contains(ACTIVE)) {
            tabs[i].classList.remove(ACTIVE);
        }
        if (document.getElementById(tabs[i].getAttribute(TOGGLE)).classList.contains(VISIBLE)) {
            document.getElementById(tabs[i].getAttribute(TOGGLE)).classList.remove(VISIBLE)
        }
    }
    tabID.classList.add(ACTIVE);
    document.getElementById(tabID.getAttribute(TOGGLE)).classList.add(VISIBLE);
}
/* toggle and tab end */

/* toggle drawer by touch swipe. left-right: open, right-left:close */
https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchEnd(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.changedTouches[0].clientX;
    var yUp = evt.changedTouches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ((document.body.clientWidth * 0.65) > Math.abs( xDiff )) {
        return;
    }

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            if  ((document.body.clientWidth * 0.20) > xDown) {
                return;
            }
            /* left swipe */
            if (document.querySelector("."+DRAWER)) {
                var drawer = document.querySelector("."+DRAWER);
                if (drawer.classList.contains(VISIBLE)) {
                    if (document.querySelector("."+DRAWER_CLOSE)) {
                        document.querySelector("."+DRAWER_CLOSE).click();
                    }
                }
            }
        } else {
            //console.log("right: " , (document.body.clientWidth * 0.80) , xDown);
            if  ((document.body.clientWidth * 0.50) < xDown) {
                return;
            }
            /* right swipe */
            if (document.querySelector("."+DRAWER)) {
                var drawer = document.querySelector("."+DRAWER);
                if (!drawer.classList.contains(VISIBLE)) {
                    drawer.classList.toggle(VISIBLE);
                    toggleFixedDrawer(drawer);
                }
            }
        }
    }
    // else {
    //     if ( yDiff > 0 ) {
    //         /* up swipe */
    //     } else {
    //         /* down swipe */
    //     }
    // }
    /* reset values */
    xDown = null;
    yDown = null;
};
/* toggle drawer by touch swipe */
