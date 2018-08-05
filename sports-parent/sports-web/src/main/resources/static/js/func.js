function MM_findObj(n, d) { //v4.01
    var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
    if (!x && d.getElementById) x = d.getElementById(n); return x;
}

function MM_showHideLayers() { //v6.0
    var i, p, v, obj, args = MM_showHideLayers.arguments;
    for (i = 0; i < (args.length - 2) ; i += 3) if ((obj = MM_findObj(args[i])) != null) {
        v = args[i + 2];
        if (obj.style) { obj = obj.style; v = (v == 'show') ? 'visible' : (v == 'hide') ? 'hidden' : v; }
        obj.visibility = v;
    }

}
var ua = navigator.userAgent.toLowerCase();
var ieNum = 0;
var showCont = 0;
var loadSbDetailTime = new Date();
var sData = new Object();
try {
    if (document.all && typeof (document.documentMode) != "undefined")
        ieNum = document.documentMode;
}
catch (e) {
    ieNum = 0;
}
function ScoreDetail(ID) {
    var theURL = '/detail/' + ID + '.html';
    window.open(theURL, '', 'width=670,height=520,top=40,left=40,resizable=yes,scrollbars=yes');
}
document.write('<script language="javascript" type="text/javascript" src="/Script/Cookie.js"></script>');
if (!window.createPopup) {
    window.createPopup = function () {
        var __createPopup = function () {
            var SetElementStyles = function (element, styleDict) {
                var style = element.style;
                for (var styleName in styleDict) style[styleName] = styleDict[styleName];
            }
            var eDiv = document.createElement('div');
            SetElementStyles(eDiv, { 'position': 'absolute', 'top': 0 + 'px', 'left': 0 + 'px', 'width': 0 + 'px', 'height': 0 + 'px', 'zIndex': 1000, 'display': 'none', 'overflow': 'hidden' });
            eDiv.body = eDiv;
            var opened = false;
            var setOpened = function (b) {
                opened = b;
            }
            var getOpened = function () {
                return opened;
            }
            var getCoordinates = function (oElement) {
                var coordinates = { x: 0, y: 0 };
                while (oElement) {
                    coordinates.x += oElement.offsetLeft;
                    coordinates.y += oElement.offsetTop;
                    oElement = oElement.offsetParent;
                }
                return coordinates;
            }
            return {
                htmlTxt: '',
                document: eDiv,
                isOpen: getOpened(),
                isShow: false,
                hide: function () {
                    SetElementStyles(eDiv, { 'top': 0 + 'px', 'left': 0 + 'px', 'width': 0 + 'px', 'height': 0 + 'px', 'display': 'none' });
                    eDiv.innerHTML = '';
                    this.isShow = false;
                },
                show: function (iY, iX, iWidth, iHeight, oElement) {
                    if (!getOpened()) {
                        document.body.appendChild(eDiv); setOpened(true);
                    };
                    this.htmlTxt = eDiv.innerHTML;
                    if (this.isShow) { this.hide(); };
                    eDiv.innerHTML = this.htmlTxt;
                    var coordinates = getCoordinates(oElement);
                    eDiv.style.top = (iX + coordinates.x) + 'px';
                    eDiv.style.left = (iY + coordinates.y) + 'px';
                    eDiv.style.width = iWidth + 'px';
                    eDiv.style.height = iHeight + 'px';
                    eDiv.style.display = 'block';
                    this.isShow = true;
                }
            }
        }
        return __createPopup();
    }
}
//显示进球窗口
var startani_C, startani_A, startani_B, pop_TC;
var oPopup;
try { oPopup = window.createPopup(); }
catch (e) { }

function ShowCHWindow(str, matchnum) {
    imagewidth = 460;
    imageheight = 28 + 33 * matchnum;

    var st = "<style type='text/css'>";
    st = st + ".tips td {font-family: 'Tahoma', '宋体';font-size: 13px;}";
    st = st + ".line td { border-bottom:solid 1px #FFD8CA; line-height:32px;}";
    st = st + "</style>";
    st = st + "<table class='tips' width=460 border=0 cellpadding=0 cellspacing=0 style='border: 3px solid #090;background-color: #FFF;'>";
    st = st + "<tr style='background-color: #DBECA6;'><td height=22 colspan=6><SPAN style='margin-left:6px'><B>捷报比分网 入球提示</B></SPAN></td></tr>";
    st = st + str;
    st = st + "</table>";

    x = 280;
    y = 1;
    switch (Config.winLocation) {
        case 0:
            x = (screen.width - imagewidth) / 2;
            y = 1;
            break;
        case 1:
            x = (screen.width - imagewidth) / 2;
            y = screen.height - imageheight - 30;
            break;
        case 2:
            x = 2;
            y = (screen.height - imageheight) / 2;
            break;
        case 3:
            x = screen.width - imagewidth - 2;
            y = (screen.height - imageheight) / 2;
            break;
        case 4:
            x = 1;
            y = 1;
            break;
        case 5:
            x = screen.width - imagewidth - 2;
            y = 1;
            break;
        case 6:
            x = 1;
            y = screen.height - imageheight - 30;
            break;
        case 7:
            x = screen.width - imagewidth - 2;
            y = screen.height - imageheight - 30;
            break;
    }

    oPopupBody = oPopup.document.body;
    oPopupBody.innerHTML = st;
    oPopupBody.style.cursor = "pointer";
    oPopupBody.title = "点击关闭";
    oPopupBody.onclick = dismisspopup;
    oPopupBody.oncontextmenu = dismisspopup;
    pop_TC = 50;
    pop();
}

function pop() {
    try {
        oPopup.show(x, y, imagewidth, imageheight);
        startani_A = setTimeout("pop()", 300);  //显示15秒
        if (pop_TC < 0) { dismisspopup(); };
        pop_TC = pop_TC - 1;
    } catch (e) { }
}
function dismisspopup() {
    clearTimeout(startani_A);
    oPopup.hide();
}

function Recommend(ID) {
    window.open("http://guess.nowscore.com/news/Recommend/" + ID + ".htm");
}

function showgoallist(ID) {
    window.open("http://score.nowscore.com/detail/" + ID + ".html");
}
function showmatchinfo(ID) {
    window.open("http://score.nowscore.com/data/matchInfo.aspx?id=" + ID);
}
function analysis(ID) {
    var theURL = "http://score.nowscore.com/analysis/" + ID + ".html";
    window.open(theURL);
}

function AsianOdds(ID) {
    var theURL = "http://score.nowscore.com/odds/match.aspx?id=" + ID;
    window.open(theURL);
}

function EuropeOdds(ID) {
    var theURL = "http://score.nowscore.com/1x2/" + ID + ".htm";
    window.open(theURL);
}

function TeamPanlu_10(ID) {
    var theURL = "http://score.nowscore.com/panlu/" + ID + ".html";
    window.open(theURL, "", "width=640,height=700,top=10,left=100,resizable=yes,scrollbars=yes");
}
function oddsDetail(ID, cId) {
    window.open("http://score.nowscore.com/odds/3in1Odds.aspx?id=" + ID + "&companyid=" + cId, "", "");
}
function NBATeam(id)
{
    window.open("http://nba.NowScore.com/Team/Default.aspx?TeamID=" + id);
}
function NBAAsiaOdds(id)
{
    window.open("http://score.nowscore.com/nba/oddsComp.aspx?id=" + id);
}
function NBAEuropeOdds(id)
{
    window.open("http://score.nowscore.com/nba/odds/1x2.aspx?id=" + id);
}
function NBAAnalysis(id)
{
    window.open("http://score.nowscore.com/nbaAnalysis/" + id + ".html");
}
function NBALive(id)
{
    window.open("http://nba.nowscore.com/cn/Tech/TechTxtLive.aspx?MatchID=" + id);
}
function NBAZouShi(id,cid)
{
    window.open("http://score.nowscore.com/nba/odds/2in1Odds.aspx?id=" + id+"&cid="+cid);
}


var zXml = {
    useActiveX: (typeof ActiveXObject != "undefined"),
    useXmlHttp: (typeof XMLHttpRequest != "undefined")
};
zXml.ARR_XMLHTTP_VERS = ["MSXML2.XmlHttp.6.0", "MSXML2.XmlHttp.3.0"];
function zXmlHttp() { }
zXmlHttp.createRequest = function () {
    if (zXml.useXmlHttp) return new XMLHttpRequest();
    if (zXml.useActiveX)  //IE < 7.0 = use ActiveX
    {
        if (!zXml.XMLHTTP_VER) {
            for (var i = 0; i < zXml.ARR_XMLHTTP_VERS.length; i++) {
                try {
                    new ActiveXObject(zXml.ARR_XMLHTTP_VERS[i]);
                    zXml.XMLHTTP_VER = zXml.ARR_XMLHTTP_VERS[i];
                    break;
                } catch (oError) { }
            }
        }
        if (zXml.XMLHTTP_VER) return new ActiveXObject(zXml.XMLHTTP_VER);
    }
    alert("对不起，您的电脑不支持 XML 插件，请安装好或升级浏览器。");
};

var flash_sound = Array(5);
flash_sound[0] = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='1' height='1' id='image1'><param name='movie' value='images/sound.swf'><param name='quality' value='high'><param name='wmode' value='transparent'></object><embed src='images/sound.swf' quality='high' pluginspage=' http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed>";
flash_sound[1] = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='1' height='1' id='image1'><param name='movie' value='images/notice.swf'><param name='quality' value='high'><param name='wmode' value='transparent'></object><embed src='images/notice.swf' quality='high' pluginspage=' http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed>";
flash_sound[2] = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='1' height='1' id='image1'><param name='movie' value='images/base.swf'><param name='quality' value='high'><param name='wmode' value='transparent'></object><embed src='images/base.swf' quality='high' pluginspage=' http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed>";
flash_sound[3] = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='1' height='1' id='image1'><param name='movie' value='images/deep.swf'><param name='quality' value='high'><param name='wmode' value='transparent'></object><embed src='images/deep.swf' quality='high' pluginspage=' http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed>";
flash_sound[4] = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='1' height='1' id='image1'><param name='movie' value='images/oddsSound.swf'><param name='quality' value='high'><param name='wmode' value='transparent'></object><embed src='images/oddsSound.swf' quality='high' pluginspage=' http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed>";

var state_ch = Array(18);
state_ch[0] = "推迟,推遲,Defer";
state_ch[1] = "中断,中斷,Halt";
state_ch[2] = "腰斩,腰斬,Halt";
state_ch[3] = "<font color=green>待定</font>,<font color=green>待定</font>,<font color=green>Wait</font>";
state_ch[4] = "取消,取消,Cancel";
state_ch[13] = "<b>完</b>,<b>完</b>,<b>Ft</b>";
state_ch[14] = ",,";
state_ch[15] = "上,上,Part1";
state_ch[16] = "<font color=blue>中</font>,<font color=blue>中</font>,<font color=blue>Half</font>";
state_ch[17] = "下,下,Part2";
state_ch[18] = "加,加,Ot";
state_ch[19] = "点,點,PSO";

var GoalCn = "平手,平/半,半球,半/一,一球,一/球半,球半,球半/两,两球,两/两球半,两球半,两球半/三,三球,三/三球半,三球半,三球半/四,四球,四/四球半,四球半,四球半/五,五球,五/五球半,五球半,五球半/六,六球,六/六球半,六球半,六球半/七,七球,七/七球半,七球半,七球半/八,八球,八/八球半,八球半,八球半/九,九球,九/九球半,九球半,九球半/十球,十球,十球/十球半,十球半,十球半/十一球".split(",");
function Goal2GoalCn(goal) { //数字盘口转汉汉字
    if (isNaN(goal) || goal === null || goal === "")
        return "";
    goal = parseFloat(goal);
    var g = Math.abs(goal);
    var i = g * 4;
    return (goal < 0 ? "受" : "") + (i < GoalCn.length ? GoalCn[i] : g+"球");
}
var GoalCn2 = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];
function Goal2GoalCn2(goal) {
    if (isNaN(goal) || goal === null || goal === "")
        return "";
    else {
        if (parseInt(goal * 4) >= GoalCn2.length) return goal;
        return GoalCn2[parseInt(goal * 4)];
    }
}



//定义Config
var Config = new Object();
Config.language = 1;
Config.matchType = 0;
Config.oddsSound = 0;
Config.fontsize = 12;
Config.rank = 0;
Config.explain = 1;
Config.redcard = 1;
Config.detail = 1;
Config.vs = 1;
Config.odds = 1;
Config.yp = 1;
Config.op = 0;
Config.dx = 1;
Config.sound = 0;
Config.winLocation = 0;
Config.companyID = 3;
Config.showSbOddsDetail = 1;
Config.ifAlias = 0;

Config.getCookie = function (type) {
    var Cookie = getCookie("Cookie");
    if (Cookie == null) Cookie = "";
    var Cookie = Cookie.split("^");
    if (Cookie.length <= 14) writeCookie("Cookie", null);
    else {
        this.language = parseInt(Cookie[0]);
        this.matchType = parseInt(Cookie[1]);
        this.oddsSound = parseInt(Cookie[2]);
        this.fontsize = parseInt(Cookie[3]);
        this.rank = parseInt(Cookie[4]);
        this.explain = parseInt(Cookie[5]);
        this.redcard = parseInt(Cookie[6]);
        this.detail = parseInt(Cookie[7]);
        this.vs = parseInt(Cookie[8]);
        this.yp = parseInt(Cookie[9]);
        this.op = parseInt(Cookie[10]);
        this.dx = parseInt(Cookie[11]);
        this.sound = parseInt(Cookie[12]);
        this.winLocation = parseInt(Cookie[13]);
    }
    if (Cookie.length > 14) this.companyID = parseInt(Cookie[14]);
    if (Cookie.length > 15) this.showSbOddsDetail = parseInt(Cookie[15]);
    if (Cookie.length > 16) this.ifAlias = parseInt(Cookie[16]);
    try {
        var lang = Config.language;
        if (Config.ifAlias && document.getElementById("Languagealias") != null)
            lang = "alias";
        document.getElementById("Language" + lang).className = "selected";
        if (this.rank == 1) document.getElementById("rank").checked = true;
        if (this.explain == 0) document.getElementById("explain").checked = false;
        if (this.redcard == 0) document.getElementById("redcard").checked = false;
        if (this.detail == 0) document.getElementById("detail").checked = false;
        if (this.vs == 0) document.getElementById("vs").checked = false;
        if (this.sound == -1) document.getElementById("soundCheck").checked = false;
        if (this.sound > 0) document.getElementById("sound").value = this.sound;
        if (this.oddsSound == 1) document.getElementById("oddsSound").checked = true;
        if (this.winLocation == -1) document.getElementById("windowCheck").checked = false;
        if (this.winLocation > 0) document.getElementById("winLocation").value = this.winLocation;
        if (type == "2in1") {
            if (this.yp == 1) document.getElementById("yp").checked = true;
            if (this.op == 1) document.getElementById("op").checked = true;
            if (this.dx == 1) document.getElementById("dx").checked = true;
            if (this.showSbOddsDetail == 0) document.getElementById("showSbOddsDetail").checked = false;
        }
        else
            document.getElementById("MatchType" + Config.matchType).className = "selected";
    }
    catch (e) { }
}

Config.writeCookie = function () {
    var value = this.language + "^" + this.matchType + "^" + this.oddsSound + "^" + this.fontsize + "^" + this.rank + "^" + this.explain + "^" + this.redcard + "^" + this.detail + "^" + this.vs + "^" + this.yp + "^" + this.op + "^" + this.dx + "^" + this.sound + "^" + this.winLocation + "^" + this.companyID + "^" + this.showSbOddsDetail + "^" + this.ifAlias;
    writeCookie("Cookie", value);
}
function showExplain(exlist, hometeam, guestteam) {
    // 广东体育; 1 | 1; 2 | 5; 12 | 90, 1 - 1; 2 - 2; 1, 2 - 2; 5 - 4; 1
    hometeam = hometeam.replace(/<[^>].*?>/g, "");
    guestteam = guestteam.replace(/<[^>].*?>/g, "");
    hometeam = hometeam.split("(")[0];
    guestteam = guestteam.split("(")[0];
    var explainList = "";
    if (exlist) {
        var arrExplain = exlist.split('|');
        if (arrExplain[0].split(';')[0] != "")
            explainList += arrExplain[0].split(';')[0] + "<br>";
        //        if (arrExplain[0].split(';')[1] == "1")
        //            explainList += "<a href=http://www.310win.com/buy/jingcai.aspx target=_blank><font color=red>[购买竞彩]</font></a> <br>";
        if (arrExplain[1].split(';')[0] != "") {

            explainList += "先开球(";
            if (arrExplain[1].split(';')[0] == "1")
                explainList += hometeam + ")";
            else if (arrExplain[1].split(';')[0] == "2")
                explainList += guestteam + ")";
            if (arrExplain[1].split(';')[1] == "")
                explainList += "<br>";
        }
        if (arrExplain[1].split(';')[1] != "") {
            if (arrExplain[1].split(';')[1] == "1")
                explainList += " <a href=http://tvhk.city007.net/ target=_blank><font color=blue>[独家宽频]</font></a><br>";
            else
                explainList += " <a href=http://www.310tv.com/ target=_blank><font color=blue>[免费直播]</font></a><br>";
        }
        if (arrExplain[2].split(';')[0] != "") {
            explainList += "角球数(" + arrExplain[2].split(';')[0] + ") | ";
            explainList += "角球数(" + arrExplain[2].split(';')[1] + ")<br>";
        }
        var scoresList = arrExplain[3].split(';');
        if (scoresList[0] != "") {
            explainList += scoresList[0].split(',')[0] + "分钟[" + scoresList[0].split(',')[1] + "],";
            if (scoresList[1] != "")
                explainList += "两回合[" + scoresList[1] + "],";
            if (scoresList[2] != "") {
                if (scoresList[2].split(',')[0] == "1")
                    explainList += "120分钟[" + scoresList[2].split(',')[1] + "],";
                else
                    explainList += "加时[" + scoresList[2].split(',')[1] + "],";
            }
            if (scoresList[3] != "")
                explainList += "点球[" + scoresList[3] + "],";
            explainList += (scoresList[4] == "1" ? hometeam : guestteam) + "胜出";
        }
        else
        // explainList = explainList.Trim("<br>".ToCharArray());
            explainList = explainList.substring(0, explainList.length - 4);
    }
    return explainList;
}
var sbOddsChangeHttp = zXmlHttp.createRequest();
var old = "", oldHalf = "";
function LoadSbDetailFile() {
    if (strCompanyID.indexOf("," + Config.companyID + ",") != -1) {
        var detail = document.getElementById("span_sbDetail");
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.charset = "utf-8";
        if (Config.companyID == "3")
            s.src = "data/sbOddsData.js?" + Date.parse(new Date());
        else
            s.src = "data/runOddsData_" + Config.companyID + ".js?" + Date.parse(new Date());
        detail.removeChild(detail.firstChild);
        detail.appendChild(s, "script");
        loadSbDetailTime = new Date();
    }
}
function hiddenSbDetail() {
    document.getElementById("ifShow").value = 0;
    old = "";
    oldHalf = "";
    showCont = 0;
    MM_showHideLayers('sbOddsDetail', '', 'hidden');
}
function showSbDetail() {
    document.getElementById("ifShow").value = 1;
    MM_showHideLayers('sbOddsDetail', '', 'show');
}
function showOddsDetail(obj, event) {
    if (Config.showSbOddsDetail == 0) return;
    var i = obj.attributes["aLoc"].value;
    if (showCont > 0) return;
    var cid = Config.companyID;
    var width = 515;
    var hasRunning = true;
    var scheduleId = A[i][0];
    var homeTeam = A[i][5];
    var guestTeam = A[i][8];
    var sclassName = B[A[i][1]][1 + Config.language];
    if (B[A[i][1]][7] !== "") {
        sclassName = "<a href='http://info.nowscore.com/" + (Config.language == 0 ? "cn" : "big") + "/" + B[A[i][1]][7] + "' target='_blank' style='color:#FFF'>" + sclassName + "</a>";
    }
    var hOrder = A[i][20];
    var gOrder = A[i][21];
    var strScore = "VS";
    var matchState = parseInt(A[i][12]);
    if (matchState > 0 || matchState == -1) {
        if (matchState == -1)
            strScore = "<b><font style='color:red;'>" + A[i][13] + " - " + A[i][14] + "</font></b>";
        else
            strScore = "<b><font style='color:blue;'>" + A[i][13] + " - " + A[i][14] + "</font></b>";
    }
    var html = new Array();
    var strGoals;
    if (Math.floor((new Date() - loadSbDetailTime) / 600) > 60) LoadSbDetailFile();
    if (typeof (sData[scheduleId]) == "undefined")
        return;
    var arrOdds = sData[scheduleId];
    if (typeof (arrOdds[0][6]) == "undefined" || arrOdds[0][6] == "") {
        width = 406;
        hasRunning = false;
    }
    //    html.push('<div style="width:' + width + 'px" class="livetab">');
    html.push('<table width="' + width + '" border="0" cellpadding="0" cellspacing="1">');
    html.push('<tr>');
    html.push('<td width="' + (hasRunning ? "11%" : "14%") + '" height="31" bgcolor="#770088" style="color:#FFF">' + sclassName + '</td>');
    html.push('<td width="' + (hasRunning ? "34" : "33") + '%" bgcolor="#FDFEE0" style="text-align:right">' + (hOrder != "" ? '<sup>[<font color="#9f0000">' + hOrder + '</font>]</sup>' : '') + '<b>' + homeTeam + '</b></td>');
    html.push('<td  id="ffScoreDetail" sid=' + scheduleId + ' width="18%" bgcolor="#FDFEE0">' + strScore + '</td>');
    html.push('<td width="37%" bgcolor="#FDFEE0" style="text-align:left"><b>' + guestTeam + '</b>' + (gOrder != "" ? '<sup>[<font color="#9f0000">' + gOrder + '</font>]</sup>' : '') + '</td>');
    html.push('</tr>');
    html.push('</table>');
    strGoals = scheduleId + "," + matchState + ",";
    if (matchState > 0 || matchState == -1)//让,标准,大
        strGoals += (typeof (arrOdds[0][7]) == "undefined" ? '' : arrOdds[0][7]) + "," + (typeof (arrOdds[0][6]) == "undefined" ? '' : arrOdds[0][6]) + "," + (typeof (arrOdds[0][8]) == "undefined" ? '' : arrOdds[0][8]) + "," + (typeof (arrOdds[1][7]) == "undefined" ? '' : arrOdds[1][7]) + "," + (typeof (arrOdds[1][6]) == "undefined" ? '' : arrOdds[1][6]) + "," + (typeof (arrOdds[1][8]) == "undefined" ? '' : arrOdds[1][8]) + "," + (typeof (arrOdds[2][7]) == "undefined" ? '' : arrOdds[2][7]) + "," + (typeof (arrOdds[2][6]) == "undefined" ? '' : arrOdds[2][6]) + "," + (typeof (arrOdds[2][8]) == "undefined" ? '' : arrOdds[2][8]);
    else
        strGoals += (typeof (arrOdds[0][4]) == "undefined" ? '' : arrOdds[0][4]) + "," + (typeof (arrOdds[0][3]) == "undefined" ? '' : arrOdds[0][3]) + "," + (typeof (arrOdds[0][5]) == "undefined" ? '' : arrOdds[0][5]) + "," + (typeof (arrOdds[1][4]) == "undefined" ? '' : arrOdds[1][4]) + "," + (typeof (arrOdds[1][3]) == "undefined" ? '' : arrOdds[1][3]) + "," + (typeof (arrOdds[1][5]) == "undefined" ? '' : arrOdds[1][5]) + "," + (typeof (arrOdds[2][4]) == "undefined" ? '' : arrOdds[2][4]) + "," + (typeof (arrOdds[2][3]) == "undefined" ? '' : arrOdds[2][3]) + "," + (typeof (arrOdds[2][5]) == "undefined" ? '' : arrOdds[2][5]);
    html.push('<table id="ffOddsDetail" width="' + width + 'px" border="0" cellpadding="0" cellspacing="1"  style="background-color:#AEBFCA" odds="' + strGoals + '">');
    html.push('<tr>');
    html.push('<td width="' + (hasRunning ? "11%" : "14%") + '" bgcolor="#4864B7">&nbsp;</td>');
    if (hasRunning)
        html.push('<td colspan="3" bgcolor="#ECEDEB">滚球指数(全场)</td>');
    html.push('<td colspan="3" bgcolor="#F2F9FD">即时指数(全场)</td>');
    html.push('<td colspan="3" bgcolor="#FEF7ED">初盘指数(全场)</td>');
    html.push('</tr>');
    html.push('<tr>');
    html.push('<td bgcolor="#4864B7" class="li_ti">亚 <a href="/odds/3in1Odds.aspx?companyid=' + cid +'&id=' + scheduleId + '" target="_blank"><font color=yellow>走势</font></a></td>');
    if (hasRunning) {
        html.push('<td width="35" bgcolor="#ECEDEB">' + changeData(arrOdds[0][6]) + '</td>');
        html.push('<td width="90" bgcolor="#ECEDEB">' + Goal2GoalCn(arrOdds[0][7]) + '</td>');
        html.push('<td width="35" bgcolor="#ECEDEB">' + changeData(arrOdds[0][8]) + '</td>');
    }
    html.push('<td width="' + (hasRunning ? "35" : "11%") + '" bgcolor="#F2F9FD">' + getStrDiv(arrOdds[0][3], arrOdds[0][0]) + '</td>');
    html.push('<td width="' + (hasRunning ? "90" : "21%") + '" bgcolor="#F2F9FD">' + getStrDiv2(arrOdds[0][4], arrOdds[0][1], 1) + '</td>');
    html.push('<td width="' + (hasRunning ? "35" : "11%") + '" bgcolor="#F2F9FD">' + getStrDiv(arrOdds[0][5], arrOdds[0][2]) + '</td>');
    html.push('<td width="' + (hasRunning ? "35" : "11%") + '" bgcolor="#FEF7ED">' + (typeof (arrOdds[0][0]) == "undefined" ? '&nbsp;' : changeData(arrOdds[0][0])) + '</td>');
    html.push('<td width="' + (hasRunning ? "90" : "21%") + '" bgcolor="#FEF7ED">' + Goal2GoalCn(arrOdds[0][1]) + '</td>');
    html.push('<td width="' + (hasRunning ? "35" : "11%") + '" bgcolor="#FEF7ED">' + (typeof (arrOdds[0][2]) == "undefined" ? '&nbsp;' : changeData(arrOdds[0][2])) + '</td>');
    html.push('</tr>');
    html.push('<tr>');
    html.push('<td bgcolor="#4864B7" class="li_ti">欧 <a href="/odds/3in1Odds.aspx?companyid=' + cid +'&id=' + scheduleId + '" target="_blank"><font color=yellow>走势</font></a></td>');
    if (hasRunning) {
        html.push('<td bgcolor="#ECEDEB">' + (typeof (arrOdds[1][6]) == "undefined" ? '&nbsp;' : changeData(arrOdds[1][6])) + '</td>');
        html.push('<td bgcolor="#ECEDEB">' + (typeof (arrOdds[1][7]) == "undefined" ? '&nbsp;' : changeData(arrOdds[1][7])) + '</td>');
        html.push('<td bgcolor="#ECEDEB">' + (typeof (arrOdds[1][8]) == "undefined" ? '&nbsp;' : changeData(arrOdds[1][8])) + '</td>');
    }
    html.push('<td bgcolor="#F2F9FD">' + getStrDiv(arrOdds[1][3], arrOdds[1][0]) + '</td>');
    html.push('<td bgcolor="#F2F9FD">' + (typeof (arrOdds[1][4]) == "undefined" ? '&nbsp;' : getStrDiv(arrOdds[1][4], arrOdds[1][1])) + '</td>');
    html.push('<td bgcolor="#F2F9FD">' + getStrDiv(arrOdds[1][5], arrOdds[1][2]) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[1][0]) == "undefined" ? '&nbsp;' : changeData(arrOdds[1][0])) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[1][1]) == "undefined" ? '&nbsp;' : changeData(arrOdds[1][1])) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[1][2]) == "undefined" ? '&nbsp;' : changeData(arrOdds[1][2])) + '</td>');
    html.push('</tr>');
    html.push('<tr>');
    html.push('<td bgcolor="#4864B7" class="li_ti">大 <a href="/odds/3in1Odds.aspx?companyid=' + cid +'&id=' + scheduleId + '" target="_blank"><font color=yellow>走势</font></a></td>');
    if (hasRunning) {
        html.push('<td bgcolor="#ECEDEB">' + (typeof (arrOdds[2][6]) == "undefined" ? '&nbsp;' : changeData(arrOdds[2][6])) + '</td>');
        html.push('<td bgcolor="#ECEDEB">' + (typeof (arrOdds[2][7]) == "undefined" ? '&nbsp;' : Goal2GoalCn2(arrOdds[2][7])) + '</td>');
        html.push('<td bgcolor="#ECEDEB">' + (typeof (arrOdds[2][8]) == "undefined" ? '&nbsp;' : changeData(arrOdds[2][8])) + '</td>');
    }
    html.push('<td bgcolor="#F2F9FD">' + getStrDiv(arrOdds[2][3], arrOdds[2][0]) + '</td>');
    html.push('<td bgcolor="#F2F9FD">' + (typeof (arrOdds[2][4]) == "undefined" ? '&nbsp;' : getStrDiv2(arrOdds[2][4], arrOdds[2][1], 2)) + '</td>');
    html.push('<td bgcolor="#F2F9FD">' + getStrDiv(arrOdds[2][5], arrOdds[2][2]) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[2][0]) == "undefined" ? '&nbsp;' : changeData(arrOdds[2][0])) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[2][1]) == "undefined" ? '&nbsp;' : Goal2GoalCn2(arrOdds[2][1])) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[2][2]) == "undefined" ? '&nbsp;' : changeData(arrOdds[2][2])) + '</td>');
    html.push('</tr>');
    html.push('</table>');
    if (matchState > 0 || matchState == -1)//让,大,标准
        strGoals = (typeof (arrOdds[3][7]) == "undefined" ? '' : arrOdds[3][7]) + "," + (typeof (arrOdds[3][6]) == "undefined" ? '' : arrOdds[3][6]) + "," + (typeof (arrOdds[3][8]) == "undefined" ? '' : arrOdds[3][8]) + "," + (typeof (arrOdds[4][7]) == "undefined" ? '' : arrOdds[4][7]) + "," + (typeof (arrOdds[4][6]) == "undefined" ? '' : arrOdds[4][6]) + "," + (typeof (arrOdds[4][8]) == "undefined" ? '' : arrOdds[4][8]) + "," + (typeof (arrOdds[5][7]) == "undefined" ? '' : arrOdds[5][7]) + "," + (typeof (arrOdds[5][6]) == "undefined" ? '' : arrOdds[5][6]) + "," + (typeof (arrOdds[5][8]) == "undefined" ? '' : arrOdds[5][8]);
    else
        strGoals = (typeof (arrOdds[3][4]) == "undefined" ? '' : arrOdds[3][4]) + "," + (typeof (arrOdds[3][3]) == "undefined" ? '' : arrOdds[3][3]) + "," + (typeof (arrOdds[3][5]) == "undefined" ? '' : arrOdds[3][5]) + "," + (typeof (arrOdds[4][4]) == "undefined" ? '' : arrOdds[4][4]) + "," + (typeof (arrOdds[4][3]) == "undefined" ? '' : arrOdds[4][3]) + "," + (typeof (arrOdds[4][5]) == "undefined" ? '' : arrOdds[4][5]) + "," + (typeof (arrOdds[5][4]) == "undefined" ? '' : arrOdds[5][4]) + "," + (typeof (arrOdds[5][3]) == "undefined" ? '' : arrOdds[5][3]) + "," + (typeof (arrOdds[5][5]) == "undefined" ? '' : arrOdds[5][5]);
    html.push('<table width="' + width + '" border="0" cellpadding="0" cellspacing="0">');
    html.push('<tr height=30px" bgcolor="#FDFEE0" style="text-align:center;">');
    html.push('<td>');
    if (typeof(getSbAd1)==="function")
        html.push(getSbAd1((hasRunning ? "515px" : "406px")));
    html.push('</td></tr>');
    html.push('</table>');
    html.push('<table id="fhOddsDetail" width="' + width + 'px" border="0" cellpadding="0" cellspacing="1"  style="background-color:#AEBFCA" odds="' + strGoals + '">');
    html.push(' <tr>');
    html.push('<td width="' + (hasRunning ? "11%" : "14%") + '" bgcolor="#4864B7">&nbsp;</td>');
    if (hasRunning)
        html.push('<td colspan="3" bgcolor="#ECEDEB">滚球指数(上半场)</td>');
    html.push('<td colspan="3" bgcolor="#F2F9FD">即时指数(上半场)</td>');
    html.push('<td colspan="3" bgcolor="#FEF7ED">初盘指数(上半场)</td>');
    html.push('</tr>');
    html.push('<tr>');
    var noData = typeof (arrOdds[3][0]) === "undefined";
    html.push('<td bgcolor="#4864B7" class="li_ti">亚' + (noData ? '' : '<a href="/odds/3in1Odds.aspx?companyid=' + cid + '&t=1&id=' + scheduleId + '" target="_blank"><font color=yellow>走势</font></a>')+'</td>');
    if (hasRunning) {
        typeof (arrOdds[3][6]) === "undefined";
        html.push('<td width="35" bgcolor="#ECEDEB">' + (noData ? '&nbsp;' : changeData(arrOdds[3][6])) + '</td>');
        html.push('<td width="90" bgcolor="#ECEDEB">' + Goal2GoalCn(arrOdds[3][7]) + '</td>');
        html.push('<td width="35" bgcolor="#ECEDEB">' + (noData ? '&nbsp;' : changeData(arrOdds[3][8])) + '</td>');
    }
    html.push('<td width="' + (hasRunning ? "35" : "11%") + '" bgcolor="#F2F9FD">' + getStrDiv(arrOdds[3][3], arrOdds[3][0]) + '</td>');
    html.push('<td width="' + (hasRunning ? "90" : "21%") + '" bgcolor="#F2F9FD">' + getStrDiv2(arrOdds[3][4], arrOdds[3][1], 1) + '</td>');
    html.push('<td width="' + (hasRunning ? "35" : "11%") + '" bgcolor="#F2F9FD">' + getStrDiv(arrOdds[3][5], arrOdds[3][2]) + '</td>');
    html.push('<td width="' + (hasRunning ? "35" : "11%") + '" bgcolor="#FEF7ED">' + (typeof (arrOdds[3][0]) == "undefined" || typeof (arrOdds[3][4]) == "undefined" ? '&nbsp;' : changeData(arrOdds[3][0])) + '</td>');
    html.push('<td width="' + (hasRunning ? "90" : "21%") + '" bgcolor="#FEF7ED">' + (typeof (arrOdds[3][1]) == "undefined" || typeof (arrOdds[3][4]) == "undefined" ? '&nbsp;' : Goal2GoalCn(arrOdds[3][1])) + '</td>');
    html.push('<td width="' + (hasRunning ? "35" : "11%") + '" bgcolor="#FEF7ED">' + (typeof (arrOdds[3][2]) == "undefined" || typeof (arrOdds[3][4]) == "undefined" ? '&nbsp;' : changeData(arrOdds[3][2])) + '</td>');
    html.push('</tr>');
    html.push(' <tr>');
    noData = typeof (arrOdds[5][0]) === "undefined";
    html.push('<td bgcolor="#4864B7" class="li_ti">欧' + (noData ? '' : '<a href="/odds/3in1Odds.aspx?companyid=' + cid + '&t=1&id=' + scheduleId + '" target="_blank"><font color=yellow>走势</font></a>') +'</td>');
    if (hasRunning) {
        typeof (arrOdds[5][6]) === "undefined";
        html.push('<td bgcolor="#ECEDEB">' + (noData ? '&nbsp;' : changeData(arrOdds[5][6])) + '</td>');
        html.push('<td bgcolor="#ECEDEB">' + (noData ? '&nbsp;' : changeData(arrOdds[5][7])) + '</td>');
        html.push('<td bgcolor="#ECEDEB">' + (noData ? '&nbsp;' : changeData(arrOdds[5][8])) + '</td>');
    }
    html.push('<td bgcolor="#F2F9FD">' + getStrDiv(arrOdds[5][3], arrOdds[5][0]) + '</td>');
    html.push('<td bgcolor="#F2F9FD">' + (typeof (arrOdds[5][4]) == "undefined" ? '&nbsp;' : getStrDiv(arrOdds[5][4], arrOdds[5][1])) + '</td>');
    html.push('<td bgcolor="#F2F9FD">' + getStrDiv(arrOdds[5][5], arrOdds[5][2]) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[5][0]) == "undefined" || typeof (arrOdds[5][4]) == "undefined" ? '&nbsp;' : changeData(arrOdds[5][0])) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[5][1]) == "undefined" || typeof (arrOdds[5][4]) == "undefined" ? '&nbsp;' : changeData(arrOdds[5][1])) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[5][2]) == "undefined" || typeof (arrOdds[5][4]) == "undefined" ? '&nbsp;' : changeData(arrOdds[5][2])) + '</td>');
    html.push(' </tr>');
    html.push('<tr>');
    noData = typeof (arrOdds[4][0]) === "undefined";
    html.push('<td bgcolor="#4864B7" class="li_ti">大' + (noData ? '' : '<a href="/odds/3in1Odds.aspx?companyid=' + cid + '&t=1&id=' + scheduleId + '" target="_blank"><font color=yellow>走势</font></a>') +'</td>');
    if (hasRunning) {
        typeof (arrOdds[4][6]) === "undefined";
        html.push('<td bgcolor="#ECEDEB">' + (noData ? '&nbsp;' : changeData(arrOdds[4][6])) + '</td>');
        html.push('<td bgcolor="#ECEDEB">' + (noData ? '&nbsp;' : Goal2GoalCn2(arrOdds[4][7])) + '</td>');
        html.push('<td bgcolor="#ECEDEB">' + (noData ? '&nbsp;' : changeData(arrOdds[4][8])) + '</td>');
    }
    html.push('<td bgcolor="#F2F9FD">' + getStrDiv(arrOdds[4][3], arrOdds[4][0]) + '</td>');
    html.push('<td bgcolor="#F2F9FD">' + (typeof (arrOdds[4][4]) == "undefined" ? '&nbsp;' : getStrDiv2(arrOdds[4][4], arrOdds[4][1], 2)) + '</td>');
    html.push('<td bgcolor="#F2F9FD">' + getStrDiv(arrOdds[4][5], arrOdds[4][2]) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[4][0]) == "undefined" || typeof (arrOdds[4][4]) == "undefined" ? '&nbsp;' : changeData(arrOdds[4][0])) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[4][1]) == "undefined" || typeof (arrOdds[4][4]) == "undefined" ? '&nbsp;' : Goal2GoalCn2(arrOdds[4][1])) + '</td>');
    html.push('<td bgcolor="#FEF7ED">' + (typeof (arrOdds[4][2]) == "undefined" || typeof (arrOdds[4][4]) == "undefined" ? '&nbsp;' : changeData(arrOdds[4][2])) + '</td>');
    html.push(' </tr>');
    html.push('</table>');
    //    html.push("</div>");
    var obj = document.getElementById('sbOddsDetail');
    var pos = getElementPos("sound");
    if (hasRunning)
        obj.style.left = (document.body.clientWidth / 2 - 270) + "px";
    else
        obj.style.left = (document.body.clientWidth / 2 - 160) + "px";
    //    }
    var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (scrollTop == 0) {
        if (event.clientY - pos.y < 247)
            obj.style.top = (scrollTop + event.clientY) + "px";
        else
            obj.style.top = (event.clientY - 230) + "px";
    }
    else {
        if (event.clientY < obj.clientHeight)
            obj.style.top = (scrollTop + event.clientY) + "px";
        else
            obj.style.top = (scrollTop + event.clientY - 230) + "px";
    }
    //-230
    obj.innerHTML = html.join("");
    document.getElementById("ifShow").value = 1;
    MM_showHideLayers('sbOddsDetail', '', 'show');
    showCont++;
}
function getElementPos(elementId) {
    var ua = navigator.userAgent.toLowerCase();
    var isOpera = (ua.indexOf('opera') != -1);
    var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
    var el = document.getElementById(elementId);
    if (el.parentNode === null || el.style.display == 'none') {
        return false;
    }
    var parent = null;
    var pos = [];
    var box;
    if (el.getBoundingClientRect)    //IE
    {
        box = el.getBoundingClientRect();
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        return { x: box.left + scrollLeft, y: box.top + scrollTop };
    } else if (document.getBoxObjectFor)    // gecko
    {
        box = document.getBoxObjectFor(el);
        var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
        var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
        pos = [box.x - borderLeft, box.y - borderTop];
    } else    // safari & opera
    {
        pos = [el.offsetLeft, el.offsetTop];
        parent = el.offsetParent;
        if (parent != el) {
            while (parent) {
                pos[0] += parent.offsetLeft;
                pos[1] += parent.offsetTop;
                parent = parent.offsetParent;
            }
        }
        if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
            pos[0] -= document.body.offsetLeft;
            pos[1] -= document.body.offsetTop;
        }
    }
    if (el.parentNode) {
        parent = el.parentNode;
    } else {
        parent = null;
    }
    while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
        pos[0] -= parent.scrollLeft;
        pos[1] -= parent.scrollTop;
        if (parent.parentNode) {
            parent = parent.parentNode;
        } else {
            parent = null;
        }
    }
    return { x: pos[0], y: pos[1] };
}
function changeData(odds) {
    if (typeof (odds) == "undefined" || odds == "")
        return "";
    var tmp = odds;
    var arrd = odds.toString().split(".");
    if (arrd.length > 1) {
        if (arrd[1].length == 1)
            tmp = tmp + "0";
    }
    else
        tmp = tmp + ".00";
    return tmp;
}
function getStrDiv(odds1, odds2) {
    if (typeof (odds1) == "undefined" || odds1 + "" == "")
        return "";
    var retVal;
    var tmp = changeData(odds1);
    if (parseFloat(odds1) > parseFloat(odds2))
        retVal = '<div class="up_red">' + tmp + '</div>';
    else if (parseFloat(odds1) < parseFloat(odds2))
        retVal = '<div class="down_green">' + tmp + '</div>';
    else
        retVal = tmp;
    return retVal;
}
function getStrDiv2(goal1, goal2, t) {
    if (typeof (goal1) == "undefined" || goal1 + "" == "")
        return "";
    var tmp = "", retVal;
    if (t == 1) tmp = Goal2GoalCn(goal1);
    else tmp = Goal2GoalCn2(goal1);
    if (parseFloat(goal1) != parseFloat(goal2))
        retVal = '<div class="change_yellow">' + tmp + '</div>';
    else
        retVal = tmp;
    return retVal;
}
function getChangeStrDiv(odds1, odds2) {
    var retVal;
    if (typeof (odds1) == "undefined" || odds1 == "")
        return "";
    if (parseFloat(odds1) > parseFloat(odds2))
    // retVal = '<div class="up_red"><span class=up>' + odds1 + '</span></div>';
        retVal = '<div class="up_red">' + odds1 + '</div>';
    else if (parseFloat(odds1) < parseFloat(odds2))
        retVal = '<div class="down_green">' + odds1 + '</div>';
    else
        retVal = odds1;
    return retVal;
}
function getsbxml() {
    try {
        var obj = document.getElementById("ifShow"); //判断是否有显示SB详情赔率浮动窗口
        if (obj.value == "0") {
            window.setTimeout("getsbxml()", 5000);
            return;
        }
        if (Config.companyID == "3")
            sbOddsChangeHttp.open("get", "data/ch_sbOdds.xml?" + Date.parse(new Date()), true);
        else
            sbOddsChangeHttp.open("get", "data/ch_runOdds_" + Config.companyID + ".xml?" + Date.parse(new Date()), true);
        sbOddsChangeHttp.onreadystatechange = sboddsrefresh;
        sbOddsChangeHttp.send(null);
    } catch (e) { }
    window.setTimeout("getsbxml()", 5000);
}
function sboddsrefresh() {
    if (sbOddsChangeHttp.readyState != 4 || (sbOddsChangeHttp.status != 200 && sbOddsChangeHttp.status != 0)) return;
    if (oldXML == sbOddsChangeHttp.responseText) return
    oldXML = sbOddsChangeHttp.responseText;
    var arr, matchState = 0;
    var goal, home, away;
    //亚赔
    if (sbOddsChangeHttp.responseText == null || sbOddsChangeHttp.responseText == "") return;
    var obj = document.getElementById("ifShow"); //判断是否有显示SB详情赔率浮动窗口
    if (obj.value == "0") return;
    obj = document.getElementById("ffOddsDetail"); //全场赔率表格
    if (old == "")
        old = obj.attributes["odds"].value.split(","); //matchid,state,goal,home,away,standard,homewin,guestwin,totalscore,home,away
    var tr1 = obj.rows[1];
    matchState = parseInt(old[1]);
    var root = sbOddsChangeHttp.responseXML.documentElement.childNodes[0]; //让球
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,goal,home,away,state
        if (parseInt(old[0]) == parseInt(arr[0])) {
            if (matchState == 0 && parseInt(arr[4]) > 0) return;
            if (old[2] == arr[1] && old[3] == arr[2] && old[4] == arr[3]) break;
            goal = arr[1];
            home = arr[2];
            away = arr[3];
            for (var j = 2; j <= 3; j++) {
                if (old[j + 1] != "")
                    arr[j] = getChangeStrDiv(arr[j], old[j + 1]);
            }
            tr1.cells[1].innerHTML = arr[2];
            tr1.cells[2].innerHTML = Goal2GoalCn(arr[1]);
            tr1.cells[3].innerHTML = arr[3];
            old[2] = goal;
            old[3] = home;
            old[4] = away;
            old[0] = arr[0];
            break;
        }
    }
    root = sbOddsChangeHttp.responseXML.documentElement.childNodes[1]; //欧赔
    var tr2 = obj.rows[2];
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,homewin,standard,guestwin
        if (parseInt(old[0]) == parseInt(arr[0])) {// && matchState == 0
            if (old[6] == arr[1] && old[5] == arr[2] && old[7] == arr[3]) break;
            goal = arr[2];
            home = arr[1];
            away = arr[3];
            if (old[6] != "")
                arr[1] = getChangeStrDiv(arr[1], old[6]);
            if (old[7] != "")
                arr[3] = getChangeStrDiv(arr[3], old[7]);
            tr2.cells[1].innerHTML = arr[1];
            tr2.cells[2].innerHTML = arr[2];
            tr2.cells[3].innerHTML = arr[3];
            old[5] = goal;
            old[6] = home;
            old[7] = away;
            old[0] = arr[0];
            break;
        }
    }
    root = sbOddsChangeHttp.responseXML.documentElement.childNodes[2]; //大小
    var tr3 = obj.rows[3];
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,totalscore,home,away
        if (parseInt(old[0]) == parseInt(arr[0])) {
            if (old[8] == arr[1] && old[9] == arr[2] && old[10] == arr[3]) break;
            goal = arr[1];
            home = arr[2];
            away = arr[3];
            if (old[9] != "")
                arr[2] = getChangeStrDiv(arr[2], old[9]);
            if (old[10] != "")
                arr[3] = getChangeStrDiv(arr[3], old[10]);
            tr3.cells[1].innerHTML = arr[2];
            tr3.cells[2].innerHTML = Goal2GoalCn2(arr[1]);
            tr3.cells[3].innerHTML = arr[3];
            old[8] = goal;
            old[9] = home;
            old[10] = away;
            old[0] = arr[0];
            break;
        }
    }
    var obj2 = document.getElementById("fhOddsDetail"); //半场赔率表格
    oldHalf = obj2.attributes["odds"].value.split(","); //matchid,goal,home,away,totalscore,home,away,homewin,standoff,guestwin
    var tr4 = obj2.rows[1];
    root = sbOddsChangeHttp.responseXML.documentElement.childNodes[3]; //半场让球
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,goal,home,away
        if (parseInt(old[0]) == parseInt(arr[0])) {
            if (oldHalf[1] == arr[1] && oldHalf[2] == arr[2] && oldHalf[3] == arr[3]) break;
            home = arr[2];
            goal = arr[1];
            away = arr[3];
            if (oldHalf[2] != "")
                arr[2] = getChangeStrDiv(arr[2], oldHalf[2]);
            if (oldHalf[3] != "")
                arr[3] = getChangeStrDiv(arr[3], oldHalf[3]);
            tr4.cells[1].innerHTML = arr[2];
            tr4.cells[2].innerHTML = Goal2GoalCn(arr[1]);
            tr4.cells[3].innerHTML = arr[3];
            oldHalf[2] = home;
            oldHalf[1] = goal;
            oldHalf[3] = away;
            old[0] = arr[0];
            break;
        }
    }
    root = sbOddsChangeHttp.responseXML.documentElement.childNodes[4]; //半场大小
    var tr5 = obj2.rows[3];
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,totalscore,home,away
        if (parseInt(old[0]) == parseInt(arr[0])) {
            if (oldHalf[4] == arr[1] && oldHalf[5] == arr[2] && oldHalf[6] == arr[3]) break;
            home = arr[2];
            goal = arr[1];
            away = arr[3];
            if (oldHalf[5] != "")
                arr[2] = getChangeStrDiv(arr[2], oldHalf[5]);
            if (oldHalf[6] != "")
                arr[3] = getChangeStrDiv(arr[3], oldHalf[6]);
            tr5.cells[1].innerHTML = arr[2];
            tr5.cells[2].innerHTML = Goal2GoalCn2(arr[1]);
            tr5.cells[3].innerHTML = arr[3];
            oldHalf[5] = home;
            oldHalf[4] = goal;
            oldHalf[6] = away;
            old[0] = arr[0];
            break;
        }
    }
    root = sbOddsChangeHttp.responseXML.documentElement.childNodes[5]; //半场欧赔
    var tr6 = obj2.rows[2];
    for (i = 0; i < root.childNodes.length; i++) {
        arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,totalscore,home,away
        if (parseInt(old[0]) == parseInt(arr[0])) {
            if (oldHalf[7] == arr[1] && oldHalf[8] == arr[2] && oldHalf[9] == arr[3]) break;
            home = arr[2];
            goal = arr[1];
            away = arr[3];
            if (oldHalf[7] != "")
                arr[2] = getChangeStrDiv(arr[2], oldHalf[7]);
            if (oldHalf[8] != "")
                arr[3] = getChangeStrDiv(arr[3], oldHalf[8]);
            tr6.cells[1].innerHTML = arr[2];
            tr6.cells[2].innerHTML = arr[1];
            tr6.cells[3].innerHTML = arr[3];
            oldHalf[8] = home;
            oldHalf[7] = goal;
            oldHalf[9] = away;
            old[0] = arr[0];
            break;
        }
    }
}
function restoreSbOddsColor() {
    var obj = document.getElementById("ifShow"); //判断是否有显示SB详情赔率浮动窗口
    if (obj.value == "0") return;
    obj = document.getElementById("ffOddsDetail");
    for (var i = 1; i < obj.rows.length - 1; i++) {
        tr.cells[1].innerHTML = tr.cells[1].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
        tr.cells[2].innerHTML = tr.cells[2].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
        tr.cells[3].innerHTML = tr.cells[3].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
    }
    obj = document.getElementById("fhOddsDetail");
    for (var i = 1; i < obj.rows.length - 1; i++) {
        tr.cells[1].innerHTML = tr.cells[1].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
        tr.cells[2].innerHTML = tr.cells[2].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
        tr.cells[3].innerHTML = tr.cells[3].innerHTML.toLowerCase().replace(/<span class=up>/g, "").replace(/<span class=down>/g, "").replace(/<\/span>/g, "");
    }
}

function getTopHeight() {
    var adTop = 0;
    if (document.documentElement && document.documentElement.scrollTop)
        adTop = document.documentElement.scrollTop;
    else if (document.body)
        adTop = document.body.scrollTop
    else
        adTop = window.pageYOffset;

    return adTop;
}

function returnTop() {
    var top = getTopHeight();
    var rt = document.getElementById("ToTop");
    if (top > 150 && document.body.clientWidth > 1024) {
        rt.style.display = "";
        rt.style.left = (480 + document.body.clientWidth / 2) + "px";
    }
    else rt.style.display = "none";
    setTimeout("returnTop();", 100);
}
function IsType(obj, type) {
    return (type === "Null" && obj === null) ||
        (type === "Undefined" && obj === void 0) ||
        (type === "Number" && isFinite(obj)) ||
        Object.prototype.toString.call(obj).slice(8, -1) === type;
}
function removeTV(tv) {
    if (tv != "") {
        tv = tv.replace(/<a [^>]*?href=["']*([^"'\s]*)[^>]*>(?:<font [^>]*>|)([^<>]*).*?<\/a>/ig,
            function (strObj, $1, $2) {
                if (typeof (removeTV.hrefJson) === "undefined") {
                    var guess = ["http://guess.nowscore.com/", "有奖竞猜"];
                    removeTV.hrefJson = { "http://guess2.win007.com/guess/ranking.aspx?t=1": guess, "http://a.haocai138.com/forum/bocai/2016092697.html": "http://www.nowscore.com/news/692967.htm", "http://www.haocai138.com/info/HelpInfo/Act.aspx": guess, "http://www.saiday.com": ["http://www.nowscore.com/wap.aspx", "手机看比分"] };
                }
                if (typeof (removeTV.hrefJson[$1]) !== "undefined") {
                    var value = removeTV.hrefJson[$1];
                    if (value instanceof Array) {
                        strObj = strObj.replace($1, value[0]);
                        strObj = strObj.replace($2, value[1]);
                    } else strObj = strObj.replace($1, value);
                }
                var temp = strObj.toLowerCase();
                if (temp.indexOf("310tv") > -1)
                    strObj = strObj.replace("blue", "red");
                else if (temp.indexOf("007.com") > -1 || temp.indexOf("365rich") > -1 || temp.indexOf("haocai138") > -1 || temp.indexOf("saiday.com") > -1 || temp.indexOf("iwintv.com") > -1)
                    strObj = "";
                return strObj;
            });
        tv = tv.replace(/(^(?:\s|<br\/>|&nbsp;)+)|((?:\s|<br\/>|&nbsp;)+$)/ig, "");
    }
    return tv;
}
function getTeamName(ifAlias, name, alias) {
    if (!ifAlias)
        return name;
    var str = "";
    var mv = name.match(/<[^>]*>\([^\)]*\)<[^>]*>$/);
    if (mv != null)
        str=mv[0];
    return alias instanceof Array ? (alias[0] + str)  : name;
}