var matchdate1 = "";
var datecount = 0;
var pageIndex = 4;
function LoadData() {
    //获取数据
    if (SelCompany.length > 6) {
        alert("一次查看的公司次数不能大于6,请重新选择！");
        return;
    }
    var oXmlHttp = zXmlHttp.createRequest();
    oXmlHttp.open("get", "/sportlottery/test/odds", false);  //strCompanyId

    oXmlHttp.send(null);
    var data = oXmlHttp.responseText;

    var recommends = GetRecommend();
    matchdate1 = "";
    strZuodiList = ",";
    matchdata.LeagueList = new _glodds.List();
    matchdata.MatchList = new _glodds.List();
    matchdata.CompanyList = new _glodds.List();
    matchdata.Odds1List = new _glodds.List();
    matchdata.Odds2List = new _glodds.List();
    matchdata.Odds3List = new _glodds.List();

    matchdata.CTypeNum = new Object();

    //分隔大数据域
    var domains = data.split(_glodds.SplitDomain);

    var leagueItem, matchItem, companyItem, nd;

    //处理联赛数据域
    var leagueDomain = domains[0].split(_glodds.SplitRecord);
    matchdata.LeagueNum = leagueDomain.length;
    for (var i = 0; i < leagueDomain.length; i++) {
        leagueItem = new _glodds.League(leagueDomain[i]);
        matchdata.LeagueList.Add(leagueItem.lId, leagueItem);
    }
    //处理亚赔数据域
    var oddsDomain = domains[2].split(_glodds.SplitRecord);
    for (var i = 0; i < oddsDomain.length; i++) {
        oddsItem = new _glodds.OddsAsian(oddsDomain[i]);
        matchdata.Odds1List.Add(oddsItem.mId + "_" + oddsItem.cId, oddsItem);
    }
    //处理大小球数据域
    var oddsDomain = domains[4].split(_glodds.SplitRecord);
    for (var i = 0; i < oddsDomain.length; i++) {
        oddsItem = new _glodds.OddsOU(oddsDomain[i]);
        matchdata.Odds3List.Add(oddsItem.mId + "_" + oddsItem.cId, oddsItem);
    }


    //处理比赛数据
    var matchDomain = domains[1].split(_glodds.SplitRecord);
    matchdata.MatchNum = 0;
    boolshow = new Array(matchDomain.length);
    var html = new Array();
    html.push("<table width='100%'  border=0 cellpadding=0 cellspacing=1 class=b_tab>");
    html.push("<TR class=stit style='line-height:22px;'><TD width=11% colspan=2>联赛</TD><TD>对阵</TD><TD width=6%>时</TD><td width=6%>比分</td>");
    for (i = 0; i < SelCompany.length; i++) {
        html.push("<TD width=10%>" + company[SelCompany[i]] + "</TD>");
    }
    html.push("</TR>");
    document.getElementById("divDaohang").innerHTML = html.join("") + "</table>";
    for (var i = 0; i < matchDomain.length; i++) {
        matchItem = new _glodds.Match(matchDomain[i]);
        if (matchItem.level > level) continue;
        if (level == 0) {
            if (matchItem.level == "-1" && matchType == 2 || matchItem.level == "-2" && matchType == 1) continue;
        }
        else {
            if (matchItem.state == "0" && matchType == 2 || matchItem.state != "0" && matchType == 1) continue;
        }
        //        var haveOdds = false;
        //        for (var j = 0; j < SelCompany.length; j++)
        //            if (matchdata.Odds1List.Get(matchItem.mId + "_" + SelCompany[j]) != null) { haveOdds = true; break; };
        //        if (!haveOdds) continue;
        matchdata.MatchNum++;

        matchdata.MatchList.Add(matchItem.mId, matchItem);
        leagueItem = matchdata.LeagueList.Get(matchItem.lId);
        leagueItem.matchNum++;
        leagueItem.showNum++;

        if (matchItem.level == -1 || matchItem.level == 0)//胜负彩
        {
            leagueItem.shengfu++;
        }
        if (matchItem.level == -2 || matchItem.level == 0)//北京单场
        {
            leagueItem.beidan++;
        }
        if (matchItem.state == 0)
            strNotOpenList += matchItem.mId + ",";
        else if (matchItem.state > 0)
            strRunList += matchItem.mId + ",";

        boolshow[i] = true;

        var date = getDate(matchItem.time);
        if (matchdate1.indexOf(date) < 0) {
            html.push("<TR class='Leaguestitle'><td colspan=" + (5 + SelCompany.length) + " ><table width=100%><tr><td width=97% align=center><B>" + date + "</B></td><td width=3%><a href='javascript:' onclick='CheckDate(\"" + date + "\",false," + datecount + ")' id='collapse" + datecount + "'><img src='images/collapse.gif'/></a><a href='javascript:' onclick='CheckDate(\"" + date + "\",true," + datecount + ")' id='expand" + datecount + "' style='display:none;'><img src='images/expand.gif'/></a></span></td></tr></table></td></tr>");
            datecount++;
            matchdate1 = matchdate1 + date;
        }
        html.push("<TR  style='background-color:white' align=center height=15 id='tr_" + matchItem.mId + "'index=" + i + ">");
        html.push("<td  width=16px><img src='images/lclose.gif' onclick='hidematch(" + i + ")' style='cursor:pointer;'></td>");
        html.push("<TD  width=9% bgColor=" + leagueItem.color + " width=60><FONT color=#ffffff>" + leagueItem.getName() + "<BR><span id='t_" + matchItem.mId + "'>" + _oddsUitl.getDtStr(matchItem.time) + "</span></FONT></TD><td style='text-align:left;'>");


        html.push("<div id='home_" + matchItem.mId + "'>&nbsp;<a href=javascript:TeamPanlu_10(" + matchItem.mId + ")>" + matchItem.getT1Name() + "</a></div>");

        html.push(" &nbsp;<span style='color:#f22' class=blue>[<a href=javascript: onclick=\"AsianOdds(" + matchItem.mId + ");return false\">亚</a>-<a href='javascript:EuropeOdds(" + matchItem.mId + ")'>欧</a>-<a href=javascript: onclick=analysis(" + matchItem.mId + ")>析</a>-<a href=javascript: onclick=showmatchinfo(" + matchItem.mId + ")>现</a>");

        if (recommends.indexOf(matchItem.mId) > -1) {
            html.push("-<a href=javascript: onclick=Recommend(" + matchItem.mId + ")>荐</a>");
        }

        html.push("]</span><br>");

        html.push("<div id='guest_" + matchItem.mId + "'>&nbsp;<a href=javascript:TeamPanlu_10(" + matchItem.mId + ")>" + matchItem.getT2Name() + "</a></div></td>");

        if (matchItem.state == "0")
            html.push("<td><span id=time_" + matchItem.mId + "></span></td><td><span id=hs_" + matchItem.mId + " class='score'></span><BR/><br/><span id=gs_" + matchItem.mId + " class='score'></span></td>");
        else {
            var state = state_ch[parseInt(matchItem.state) + 14].split(",")[lang];
            switch (matchItem.state) {
                case "1":
                    state = Math.floor((new Date() - matchItem.time2 - difftime) / 60000);
                    if (state > 45) state = "45+"
                    if (state < 1) state = "1";
                    state = state + "<img src='images/in.gif'>";
                    break;
                case "3":
                    state = Math.floor((new Date() - matchItem.time2 - difftime) / 60000) + 46;
                    if (state > 90) state = "90+";
                    if (state < 46) state = "46";
                    state = state + "<img src='images/in.gif'>";
                    break;
            }
            html.push("<td onclick=\"showdetail(" + matchItem.mId + ");\"><span id=time_" + matchItem.mId + ">" + state + "</span></td><td><span id=hs_" + matchItem.mId + " class='score'>" + matchItem.homeScore + "</span><BR/><br/><span id=gs_" + matchItem.mId + " class='score'>" + matchItem.guestScore + "</span></td>");
        }
        var haszoudi = false;
        for (j = 0; j < SelCompany.length; j++) {  //oddsA
            var oddsItem = matchdata.Odds3List.Get(matchItem.mId + "_" + SelCompany[j]);
            var oddsItem1 = matchdata.Odds1List.Get(matchItem.mId + "_" + SelCompany[j]);
            html.push("<TD style='text-align:center;' id='odds_" + matchItem.mId + "_" + SelCompany[j] + "' title='" + company[SelCompany[j]] + "' index=" + i + ">");
            if (oddsItem != null) {
                html.push("<a href=javascript: onclick=\"AsianOdds(" + matchItem.mId + ");\" class='sb'><b>" + oddsItem.over + "</b></a><br>");
                html.push("<a href=javascript: onclick=\"AsianOdds(" + matchItem.mId + ");\" class='pk'><b>" + Goal2GoalCn2(oddsItem.goal) + "</b></a>");
                if (oddsItem1 != null && oddsItem1.zoudi == "True") html.push(" <img src='images/t3.gif'>");
                if (parseFloat(oddsItem.goalF) < parseFloat(oddsItem.goal)) html.push(" <span style='cursor:hand;color:red;' title='初盘:" + Goal2GoalCn2(oddsItem.goalF) + "'>升</span>");
                if (parseFloat(oddsItem.goalF) > parseFloat(oddsItem.goal)) html.push(" <span style='cursor:hand;color:red;' title='初盘:" + Goal2GoalCn2(oddsItem.goalF) + "'>降</span>");
                html.push("<br>");
                //if(oddsItem1!=null&&oddsItem1.close=="True") html.push("Close ");
                html.push("<a>" + oddsItem.under + "</a>");
            }
            html.push("</td>");

            if (oddsItem1 != null && oddsItem1.zoudi == "True") {
                haszoudi = haszoudi || true;
            }
        }
        html.push("</tr>");
        if (haszoudi) {
            strZuodiList += matchItem.mId + ",";
        }
        // if (matchdata.MatchNum <= adinfo1.length) {
        // html.push("<tr class='ad_tab' id='tr_ad" + matchdata.MatchNum + "'><td colspan='" + (SelCompany.length + 4) + "'>广告：<a href='" + adinfo1[matchdata.MatchNum - 1] + "' target=_blank style='color:red'><b>" + adinfo2[matchdata.MatchNum - 1] + "</b></a></td></tr>");

        // }
    }
    html.push("</TABLE>");
    leaguecount = matchdata.LeagueNum;
    //}
    if (matchdata.MatchNum == 0) html.push("<div style='line-height:40px; font-size:14px; text-align:center;'>没有符合要求的比赛，您可以选择查看全部赛事。</div>");
    document.getElementById("odds").innerHTML = html.join("");

    var j = 0;
    RenderLeaguelist(pageIndex);

    //if (oldLevel != -1 && oldLevel != level) document.getElementById("matchType" + oldLevel).className = "";
    //if (oldLevel != level) document.getElementById("matchType" + level).className = "selected";
    //oldLevel = level;

    document.getElementById("scoreLoading").style.display = "none";
}


var xml1 = zXmlHttp.createRequest();
var xmlBf = zXmlHttp.createRequest();
var oldXML = "", oldBfXML = "";
function getDate(t) {
    return ((t.getMonth() + 1) + "/" + t.getDate() + "/" + t.getFullYear() + " (" + week[t.getDay()] + ")");
}
function getxml() {
    try {
        xml1.open("get", "/sportlottery/xml/ch_odds?times="+Date.parse(new Date()), true);
        xml1.onreadystatechange = refresh;
        xml1.send(null);
    } catch (e) { }
    window.setTimeout("getxml()", 6000);
}

function refresh() {
    try {
        if (xml1.readyState != 4 || (xml1.status != 200 && xml1.status != 0)) return;
        if (oldXML == xml1.responseText) return
        oldXML = xml1.responseText;

        var arr;
        var havechange;
        var changeIDList = ",";
        var oldgoal = "", oldover = "", oldunder = "";
        var oldgoalF = "", oldoverF = "", oldunderF = "";
        //大小
        var root = xml1.responseXML.documentElement.childNodes[2];
        var playSound = false;
        for (i = 0; i < root.childNodes.length; i++) {
            arr = root.childNodes[i].childNodes[0].nodeValue.split(","); //matchid,companyid,goal,over,under
            if (strCompanyId.indexOf("," + arr[1] + ",") < 0) continue;

            var obj = document.getElementById("odds_" + arr[0] + "_" + arr[1]);
            if (obj == null) continue;
            //		var tr=document.getElementById("odds_" + arr[0] + "_" + arr[1]);
            //		if(tr==null)continue;
            havechange = false;
            oddsItem = matchdata.Odds3List.Get(arr[0] + "_" + arr[1]);
            if (oddsItem != null) {
                oldgoal = oddsItem.goal;
                oldover = oddsItem.over;
                oldunder = oddsItem.under;
                oldgoalF = oddsItem.goalF;
                oldoverF = oddsItem.overF;
                oldunderF = oddsItem.underF;
            }
            if (oldover != arr[3] || oldunder != arr[4] || oldgoal != arr[2] || oddsItem.close != arr[5]) {
                if (oldover > arr[3]) obj.style.backgroundColor = "#88ff88";
                if (oldover < arr[3]) obj.style.backgroundColor = "#ff8888";
                var tmp = arr[0] + "," + arr[1] + "," + oldgoalF + "," + oldoverF + "," + oldunderF + "," + arr[2] + "," + arr[3] + "," + arr[4] + "," + arr[5] + "," + arr[6];
                oddsItem = new _glodds.OddsOU(tmp);
                matchdata.Odds3List.Add(oddsItem.mId + "_" + oddsItem.cId, oddsItem);
                havechange = true;
                if (changeIDList.indexOf("," + arr[0] + "_" + arr[1] + ",") < 0) changeIDList += arr[0] + "_" + arr[1] + ",";
            }
            if (havechange) {
                str = "<a href=javascript: onclick=\"AsianOdds(" + oddsItem.mId + ");\" class='sb'>" + arr[3] + "</a><br><a href=javascript: onclick=\"AsianOdds(" + oddsItem.mId + ");\" class='pk'>";
                if (oldgoal == "" || oldgoal == arr[2])
                    str += Goal2GoalCn2(arr[2]);
                else {
                    str += Goal2GoalCn2(arr[2]);
                    if (parseFloat(oldgoal) < parseFloat(arr[2])) str += " <span style='cursor:hand;color:red;' title='初盘:" + Goal2GoalCn2(oddsItem.goalF) + "'>升</span>" //rise
                    if (parseFloat(oldgoal) > parseFloat(arr[2])) str += " <span style='cursor:hand;color:red;' title='初盘:" + Goal2GoalCn2(oddsItem.goalF) + "'>降</span>"; //fall
                }
                str += "</a>";
                var oddsItem1 = matchdata.Odds1List.Get(arr[0] + "_" + arr[1]);
                if (oddsItem1 != null && oddsItem1.zoudi == "True") str += " <img src='images/t3.gif'>";
                str += "<br>";
                if (oddsItem1 != null && oddsItem1.close == "True") str += "封";
                str += "<a>" + arr[4] + "</a>";
                obj.innerHTML = str;
            }
        }
        window.setTimeout("colors_water('" + changeIDList + "')", 30000);
        if (changeIDList != "," && soundCheck) document.getElementById("sound").innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='0' height='0'><param name='movie' value='images/oddssound.swf'><param name='quality' value='high'><param name=LOOP value='false'><param name='wmode' value='transparent'> <embed src='images/oddssound.swf' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed></object>";
    } catch (e) { }
}
function daohang() {
    var top = document.body.scrollTop;
    if (top == 0) top = document.documentElement.scrollTop;
    if (top > 150) {
        document.getElementById("divDaohang").style.top = top + "px";
        document.getElementById("divDaohang").style.left = (document.documentElement.scrollWidth - 692) / 2 + "px";
        document.getElementById("divDaohang").style.display = "";
    }
    else
        document.getElementById("divDaohang").style.display = "none";
    window.setTimeout("daohang()", 200);
}
function CheckDate(matchdate, isShow, i) {
    var hh = parseInt(document.getElementById("hiddenCount").innerHTML);
    if (isShow) {
        document.getElementById("expand" + i).style.display = "none";
        document.getElementById("collapse" + i).style.display = "";
        for (j = 0; j < matchdata.MatchNum; j++) {
            if (getDate(matchdata.MatchList.items[j].time) == matchdate) {
                if (boolshow[j] == false) hh = hh - 1;
                document.getElementById("tr_" + matchdata.MatchList.items[j].mId).style.display = "";
                boolshow[j] = true;
            }
        }
    } else {
        document.getElementById("expand" + i).style.display = "";
        document.getElementById("collapse" + i).style.display = "none";
        for (j = 0; j < matchdata.MatchNum; j++) {
            if (getDate(matchdata.MatchList.items[j].time) == matchdate) {
                if (boolshow[j] == true) hh = hh + 1;
                document.getElementById("tr_" + matchdata.MatchList.items[j].mId).style.display = "none";
                boolshow[j] = false;
            }
        }
    }
    document.getElementById("hiddenCount").innerHTML = hh;
}
function colors_water(IDList) {
    var A = IDList.split(",");
    var obj;
    for (var i = 1; i < A.length - 1; i++) {
        obj = document.getElementById("odds_" + A[i]);
        if (obj == null) continue;
        obj.style.backgroundColor = "";
    }
}


function getbfxml() {
    xmlBf.open("get", "/sportlottery/data/change?times="+Date.parse(new Date()), true);
    xmlBf.onreadystatechange = bfRefresh;
    xmlBf.send(null);
    window.setTimeout("getbfxml()", 6000);
}
function bfRefresh() {
    if (xmlBf.readyState != 4 || (xmlBf.status != 200 && xmlBf.status != 0)) return;
    if (oldBfXML == xmlBf.responseText || xmlBf.responseText == "") return
    oldBfXML = xmlBf.responseText;
    var root = xmlBf.responseXML.documentElement;

    var D = new Array();
    var matchindex, score1change, score2change, scorechange;
    var goTime, hometeam, guestteam, sclassname, score1, score2, tr;
    var matchNum = 0;
    var notify = document.getElementById("notify").innerHTML;

    for (var i = 0; i < root.childNodes.length; i++) {
        D = root.childNodes[i].childNodes[0].nodeValue.split("^"); //0:ID,1:state,2:score1,3:score2,4:half1,5:half2,6:card1,7:card2,8:time1,9:time2,10:explain,11:lineup

        matchItem = matchdata.MatchList.Get(D[0]);
        if (matchItem == null) continue;

        score1change = false;
        if (matchItem.homeScore != D[2]) {
            matchItem.homeScore = D[2];
            score1change = true;
            document.getElementById("hs_" + matchItem.mId).innerHTML = D[2];
            document.getElementById("home_" + matchItem.mId).style.backgroundColor = "red";
        }
        score2change = false;
        if (matchItem.guestScore != D[3]) {
            matchItem.guestScore = D[3];
            score2change = true;
            document.getElementById("gs_" + matchItem.mId).innerHTML = D[3];
            document.getElementById("guest_" + matchItem.mId).style.backgroundColor = "red";
        }
        scorechange = score1change || score2change;

        //开赛时间
        //if(matchItem.time!=D[8]) document.getElementById("mt_"+ matchItem.mId).innerHTML=D[8];
        //matchItem.time=D[8];
        var t = D[9].split(",");
        matchItem.time2 = new Date(t[0], t[1], t[2], t[3], t[4], t[5]);

        //状态
        if (matchItem.state != D[1]) {
            matchItem.state = D[1];
            switch (matchItem.state) {
                case "0":
                    document.getElementById("hs_" + matchItem.mId).innerHTML = "";
                    document.getElementById("time_" + matchItem.mId).innerHTML = "";
                    document.getElementById("gs_" + matchItem.mId).innerHTML = "";
                    break;
                case "1":
                    document.getElementById("hs_" + matchItem.mId).innerHTML = D[2];
                    document.getElementById("gs_" + matchItem.mId).innerHTML = D[3];
                    goTime = Math.floor((new Date() - matchItem.time2 - difftime) / 60000);
                    if (goTime > 45) goTime = "45+"
                    if (goTime < 1) goTime = "1";
                    document.getElementById("time_" + matchItem.mId).innerHTML = goTime;
                    if (matchType == 1 && level != 0) MoveToBottom(D[0]); //开场隐藏
                    break;
                case "2":
                    document.getElementById("time_" + matchItem.mId).innerHTML = state_ch[parseInt(D[1]) + 14].split(",")[lang];
                    break;
                case "3":
                    goTime = Math.floor((new Date() - matchItem.time2 - difftime) / 60000) + 46;
                    if (goTime > 90) goTime = "90+";
                    if (goTime < 46) goTime = "46";
                    document.getElementById("time_" + matchItem.mId).innerHTML = goTime;
                    break;
                case "-1":
                    document.getElementById("time_" + matchItem.mId).innerHTML = state_ch[parseInt(D[1]) + 14].split(",")[lang];
                    window.setTimeout("MoveToBottom(" + D[0] + ")", 30000);
                    break;
                default:
                    document.getElementById("time_" + matchItem.mId).innerHTML = state_ch[parseInt(D[1]) + 14].split(",")[lang];
                    MoveToBottom(D[0]);
                    break;
            }
        }


        if (scorechange) {
            hometeam = matchItem.getT1Name();
            score1 = D[2];
            score2 = D[3];
            guestteam = matchItem.getT2Name();
            if (score1change) {
                hometeam = "<font color=red>" + matchItem.getT1Name() + "</font>";
                score1 = "<font color=red>" + D[2] + "</font>";
            }
            if (score2change) {
                guestteam = "<font color=red>" + matchItem.getT2Name() + "<font>";
                score2 = "<font color=red>" + D[3] + "</font>";
            }
            window.clearTimeout(nofityTimer);
            if (notify == "") notify = "<font color=#6666FF><B>入球提示：</b></font>";
            notify += hometeam + " <font color=blue>" + score1 + "-" + score2 + "</font> " + guestteam + " &nbsp; ";
            nofityTimer = window.setTimeout("clearNotify()", 20000);

            window.setTimeout("bfcolors_water('" + matchItem.mId + "')", 30000);
            if (soundCheck) document.getElementById("sound").innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='0' height='0'><param name='movie' value='images/sound.swf'><param name='quality' value='high'><param name=LOOP value='false'><param name='wmode' value='transparent'> <embed src='images/sound.swf' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='1' height='1'></embed></object>";
        }
    }
    if (notify != "") document.getElementById("notify").innerHTML = notify;
}

function bfcolors_water(ID) {
    try {
        document.getElementById("home_" + ID).style.backgroundColor = "";
        document.getElementById("guest_" + ID).style.backgroundColor = "";
    } catch (e) { }
}

function MoveToBottom(id) {
    try {
        document.getElementById("tr_" + id).parentElement.insertAdjacentElement("BeforeEnd", document.getElementById("tr_" + id));
        // for (var i = 1; i <= adinfo1.length; i++) {
        // document.getElementById("tr_" + id).parentElement.childNodes[i * 2].insertAdjacentElement("BeforeBegin", document.getElementById("tr_ad" + i));
        //  }
    } catch (e) { }
}

function SelectOK(c) {
    var i, j, inputs;
    var hh = 0;
    var leagueIds = ",";
    var IdList = (sclassSelectNum == 1 ? strZuodiList : sclassSelectNum == 2 ? strNotOpenList : sclassSelectNum == 3 ? strRunList : "");
    inputs = document.getElementById("league").getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
        var obj = inputs[i];
        if (obj.type != "checkbox") continue;
        if (obj.checked) {
            leagueIds += obj.value + ",";
        }
    }

    for (var j = 0; j < matchdata.MatchNum; j++) {
        var matchItem = matchdata.MatchList.items[j];
        if (leagueIds.indexOf("," + matchItem.lId + ",") > -1 && (IdList.indexOf("," + matchItem.mId + ",") > -1 || IdList == "")) {
            document.getElementById("tr_" + matchItem.mId).style.display = "";
            boolshow[i] = true;
        }
        else {
            document.getElementById("tr_" + matchItem.mId).style.display = "none";
            hh++;
            boolshow[i] = false;
        }
    }
    if (!c) {
        writeCookie("sclassSelectNum_" + pageIndex, sclassSelectNum);
        writeCookie("currentLeague_" + pageIndex, leagueIds)
    }
    document.getElementById("hiddenCount").innerHTML = hh;
    document.getElementById("LeagueDiv").style.visibility = "hidden";
}

function hidematch(match_index) {
    document.getElementById("tr_" + matchdata.MatchList.items[match_index].mId).style.display = "none";
    //document.getElementById("tr_" + id).style.display = "none";
    boolshow[match_index] = false;
    document.getElementById("hiddenCount").innerHTML = parseInt(document.getElementById("hiddenCount").innerHTML) + 1;
}

function SetDate(y, m, d) {
    selDate = new Date(y, m - 1, d);
    //writeCookie("currentLeague_" + pageIndex, "");
    LoadData();
}

var soundCheck = getCookie("soundCheck");

function CheckSoundCheck(value) {
    if (value == true) {
        writeCookie("soundCheck", 1)
    }
    else {
        writeCookie("soundCheck", 0)
    }
}
if (soundCheck == null || soundCheck == "") {
    document.getElementById("soundCheck").checked = true;
    soundCheck = 1;
}
else if (soundCheck == 0) {
    document.getElementById("soundCheck").checked = false;
    soundCheck = 0;
}
else if (soundCheck == 1) {
    document.getElementById("soundCheck").checked = true;
    soundCheck = 1;
}

function SelectCompany() {
    var i, inputs;
    var j = 0;
    SelCompany = new Array();
    strCompanyId = ",";
    inputs = document.getElementById("companyList").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox" && inputs[i].checked) {
            SelCompany[j++] = inputs[i].value;
            strCompanyId += inputs[i].value + ",";
        }
    }
    writeCookie("companyOU", strCompanyId.substring(1, strCompanyId.length - 1));
    LoadData();
    document.getElementById("divMatchType5").style.visibility = "hidden";
}

function DefaultCompany() {
    strCompanyId = "1,12,8,3,24";
    SelCompany = strCompanyId.split(",");
    strCompanyId = "," + strCompanyId + ",";
    writeCookie("companyOU", "");
    LoadData();
    inputs = document.getElementById("companyList").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type != "checkbox") continue;
        inputs[i].checked = false;
        if (strCompanyId.indexOf("," + inputs[i].value + ",") >= 0) inputs[i].checked = true;

    }

    for (var i = 0; i < SelCompany.length; i++) {
        document.getElementById("company" + SelCompany[i]).checked = true;
    }
    document.getElementById("divMatchType5").style.visibility = "hidden";
}

var strCompanyId = getCookie("companyOU");
if (strCompanyId == null || strCompanyId == "") strCompanyId = "1,12,8,3,24";
var SelCompany = strCompanyId.split(",");
strCompanyId = "," + strCompanyId + ",";

var soundCheck = true;
var level = getCookie("level");
if (level == null || level == "") level = "2";

var lang = getCookie("lang");
if (lang == null || lang == "") lang = "1";


window.setTimeout("LoadData()", 50);
document.getElementById("Language" + lang).className = "selected";

for (var i = 0; i < SelCompany.length; i++)
    document.getElementById("company" + SelCompany[i]).checked = true;


window.setTimeout("getxml()", 4000);
window.setTimeout("getbfxml()", 4000);

window.setTimeout("setMatchTime()", 30000);
window.setTimeout("daohang()", 200);
window.setTimeout("LoadData()", 3600 * 1000);