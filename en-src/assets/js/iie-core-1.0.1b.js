console.log("Developed by 2016-Now ATATC.");
console.log("[DEBUG] Core version: 👉");


const NAVIGATION_BAR_HEIGHT = $("#nb").height();
const AVAILABLE_HEIGHT = window.innerHeight - NAVIGATION_BAR_HEIGHT;
$("html").css("opacity", "0");

const initialize = function () {
    $("html").css("opacity", "initial");
    const square = function () {
        $(this).height($(this).width());
    };
    $(".square").each(square);
    $(".circle").each(square).each(function () {
        $(this).css("border-radius", $(this).width() / 2 + "px");
    });
    $("a.clickable").attr("href", "javascript:;");
};

const dynamic = function () {
    $("#main").css("margin-top", NAVIGATION_BAR_HEIGHT);
};
dynamic();
$(window).resize(dynamic);


const SECTION_TITLES = ["Home", "About Us", "Programs", "Educational Stories", "Contact"];
const initNavigationBar = function (except = 0) {
    const nb = $("#nb");
    nb.append($("<img class='logo' src='assets/img/logo.png' alt='logo'>"));
    for (let i = 0; i < 5; i++) {
        const sectionTitle = $("<a class='section-title'>" + SECTION_TITLES[i] + "</a>");
        if (i !== except) {
            sectionTitle.addClass("animated-underline clickable").click(function () {
                location.href = SECTION_TITLES[i].toLowerCase().replaceAll(" ", "-") + ".html";
            });
        } else {
            sectionTitle.addClass("active");
        }
        nb.append(sectionTitle);
    }
};
const initLanguageSwitch = function () {
    $("#ls").html("<strong>EN</strong>/中");
};
const initFooter = function () {
    const ft = $("#ft");
    const title = $("<h2>International Intelligent Education LTD.</h2>");
    const contact = $("<ul><li><i class='fa fa-map'></i> Address: <a class='animated-color' href='geo:43.846963316993104, -79.38221174196637'>9011 Leslie St, Richmond Hill, ON L4B 3B6</a></li>" +
        "<li><i class='fa fa-phone'></i> Phone: <a class='animated-color' href='tel:+1647-985-6128'>(+1) 647-985-6128</a></li>" +
        "<li><i class='fa fa-envelope'></i> E-Mail: <a class='animated-color' href='mailto:info@inteledu.ca'>info@inteledu.ca</a></li></ul>");
    const bottom = $("<div class='horizontal'><h4><a class='animated-color'>Privacy Policy</a></h4>&nbsp;&nbsp;&nbsp;&nbsp;" +
        "<h4><a class='animated-color'>Site Map</a></h4>&nbsp;&nbsp;&nbsp;&nbsp;" +
        "<h4><a class='animated-color'>Accessibility</a></h4></div>");
    const socialMedia = $("<div class='horizontal'>" +
        "<a href='https://u.wechat.com/EOBe_ctsl_FVammRJZ3p_sQ'><img class='qrcode' src='assets/img/qrcode-wechat-1.png' alt='wechat qrcode for miss lu'></a>" +
        "<a href='https://u.wechat.com/kBpr2VkEMtouR3sRwJYCe-E'><img class='qrcode' src='assets/img/qrcode-wechat-2.png' alt='wechat qrcode for miss wu'></a>" +
        "</div><p><a class='animated-color' href='https://www.xiaohongshu.com/user/profile/5e937e3700000000010099e5'>Xiaohongshu 小红书</a> | <a class='animated-color' href='https://www.zhihu.com/people/mumulanlan'>Zhihu 知乎</a></p>");
    const copyright = $("<p><em>Copyright &copy; IIE All rights reserved.</em> Site developed by 2016-Now ATATC with ❤.</p>");
    ft.append(title, contact, bottom, socialMedia, copyright);
};


const debugView = function () {
    [].forEach.call($("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)});
};