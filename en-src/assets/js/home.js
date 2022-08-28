initNavigationBar();
initLanguageSwitch();
initFooter();

const BANNER_RATIO = 0.625; // 10:16
const BANNER_INTERVAL = 3600;

const bannerContainer = $("#banner-container");
const bannerCanvas = $("#banner-canvas");
const bannerMask = $("#banner-mask");
const blank = $("#blank");
let bannerButtons = [];
let wasFullScreen = null;   // neither true nor false
const refreshBannerButton = function () {
    let i = -parseInt(bannerCanvas.css("left")) / window.innerWidth;
    $("a.banner-button").css("opacity", "");
    bannerButtons[i].css("opacity", "1");
};
for (let i = 0; i < bannerCanvas.children("div").length; i++) {
    let bannerButton = $('<a class="banner-button clickable circle"></a>').click(function () {
        bannerCanvas.css("left", -i * window.innerWidth + "px");
        refreshBannerButton();
    });
    bannerButtons[i] = bannerButton;
    $("#banner-control").append(bannerButton);
}
const restore = function () {
    bannerContainer.css("position", "relative");
    bannerContainer.css("filter", "none");
    bannerMask.hide();
    blank.hide();
    $(window).off("scroll");
};
const resize = function () {
    blank.height(2 * AVAILABLE_HEIGHT);
    $("div.banner").width(window.innerWidth);
    let bcHeight = window.innerWidth * BANNER_RATIO;
    bcHeight = Math.min(bcHeight, AVAILABLE_HEIGHT);
    bannerContainer.height(bcHeight);
    let fullScreen = bcHeight >= AVAILABLE_HEIGHT;
    if (wasFullScreen !== fullScreen) {
        if (fullScreen) {
            // fullscreen mode
            bannerContainer.css("position", "fixed");
            bannerContainer.css("filter", "blur(40px)");
            bannerContainer.show();
            bannerMask.show();
            blank.show();

            bannerMask.width(window.innerWidth).height(AVAILABLE_HEIGHT).css("line-height", AVAILABLE_HEIGHT + "px");
            $(window).scroll(function () {
                const r = (1 - Math.min(document.documentElement.scrollTop / AVAILABLE_HEIGHT, 1));
                bannerContainer.css("filter", "blur(" + 40 * r + "px)");
                bannerMask.css("opacity", r);
                if (document.documentElement.scrollTop > AVAILABLE_HEIGHT) {
                    restore();
                    document.documentElement.scrollTop = 0;
                }
            });
        } else {
            // restore
            restore();
        }
        wasFullScreen = fullScreen;
    }
};
resize();
$(window).resize(resize);

const bannerForward = function () {
    const left = parseInt(bannerCanvas.css("left")) - window.innerWidth;
    const end = Math.abs(left) >= bannerCanvas.width();
    if (end) bannerCanvas.append(bannerCanvas.find("div").first().clone(true));
    bannerCanvas.animate({left: left + "px"}, function () {
        if (end) {
            bannerCanvas.css("left", "0px");
            bannerCanvas.find("div").last().remove();
        }
        refreshBannerButton();
    });
};
const bannerBackward = function () {
    refreshBannerButton(parseInt(bannerCanvas.css("left")) / window.innerWidth);
    let left = parseInt(bannerCanvas.css("left"));
    const end = Math.abs(left) <= 0;
    if (end) {
        bannerCanvas.prepend(bannerCanvas.find("div").last().clone(true));
        bannerCanvas.css("left", -window.innerWidth + "px");
        left -= window.innerWidth;
    }
    bannerCanvas.animate({left: left + window.innerWidth + "px"}, function () {
        if (end) {
            bannerCanvas.css("left", 2 * window.innerWidth - bannerCanvas.width() + "px");
            bannerCanvas.find("div").first().remove();
        }
        refreshBannerButton();
    });
};
let timerID = setInterval(bannerForward, BANNER_INTERVAL);
bannerContainer.mouseenter(function () {
    if (timerID != null) clearInterval(timerID);
    timerID = null;
    bannerContainer.mouseleave(function () {
        if (timerID == null) timerID = setInterval(bannerForward, BANNER_INTERVAL);
        bannerContainer.off("mouseleave");
    });
});

refreshBannerButton();