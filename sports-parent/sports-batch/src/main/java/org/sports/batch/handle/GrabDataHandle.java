package org.sports.batch.handle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.sports.batch.constant.SplitConstant;
import org.sports.batch.https.HttpTool;
import org.sports.batch.po.League;
import org.sports.batch.po.MatchGame;
import org.sports.batch.po.Odds1x2;
import org.sports.batch.po.OddsAsian;
import org.sports.batch.po.OddsOU;
import org.sports.core.model.FootballIndex;
import org.sports.core.service.FootballIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GrabDataHandle {

    @Autowired
    private FootballIndexService indexService;

    public static Map<String,League> leagueMap = new HashMap<String,League>();
    public static Map<String,MatchGame> matchMap = new HashMap<String,MatchGame>();

    static Map<String,OddsAsian> odds1Map = new HashMap<String,OddsAsian>();
    static Map<String,Odds1x2> odds2Map = new HashMap<String,Odds1x2>();
    static Map<String,OddsOU> odds3Map = new HashMap<String,OddsOU>();

    static String[] company = new String[]{"足彩","澳彩","波音","Crown","立博","云鼎",
            "SNAI","Bet365","威廉","易胜博","韦德","SSP","明陞", "Eurobet", "Interwetten", "10Bet",
            "金宝博", "12bet","乐天堂", "利记", "永利高", "盈禾"};


    public void grab(){
        String strCompanyId = "1,12,8,3,24";
        String[] SelCompany = strCompanyId.split(",");
        String data = HttpTool.getOdds("http://score.nowscore.com/odds/xml/odds.aspx?companyID=,"+strCompanyId+",&t="+System.currentTimeMillis());

        //分隔大数据域
        String[] domains = data.split(SplitConstant.splitDomain);

        League leagueItem;
        OddsAsian odds1;
        //Odds1x2 odds2;
        OddsOU odds3;
        MatchGame matchItem;
        //matchItem, companyItem, nd;

        //处理联赛数据域
        String[] leagueDomain = domains[0].split(SplitConstant.splitRecord);
        for (int i = 0; i < leagueDomain.length; i++) {
            leagueItem = new League(leagueDomain[i]);
            leagueMap.put(leagueItem.getLid(), leagueItem);
        }
        //处理亚赔数据域
        String[] oddsAsDomain = domains[2].split(SplitConstant.splitRecord);
        for (int i = 0; i < oddsAsDomain.length; i++) {
            odds1 = new OddsAsian(oddsAsDomain[i]);
            odds1Map.put(odds1.getMid() + "_" + odds1.getCid(), odds1);
        }
        //处理大小球数据域
        String[] oddsOuDomain = domains[4].split(SplitConstant.splitRecord);
        for (int i = 0; i < oddsOuDomain.length; i++) {
            odds3 = new OddsOU(oddsOuDomain[i]);
            odds3Map.put(odds3.getMid() + "_" + odds3.getCid(), odds3);
        }


        //处理比赛数据
        String[] matchDomain = domains[1].split(SplitConstant.splitRecord);
        //matchdata.MatchNum = 0;

        List<FootballIndex> list = new ArrayList<>();
        FootballIndex football = null;
        for (int i = 0; i < matchDomain.length; i++) {
            football = new FootballIndex();

            matchItem = new MatchGame(matchDomain[i]);
            leagueItem = leagueMap.get(matchItem.getlId());

            football.setLeagueName(leagueItem.getCnName());

            football.setStartTime(matchItem.getTime());
            football.setEndTime(matchItem.getTime2());
            football.setTeamName1(matchItem.getT1CnName());
            football.setScore1(matchItem.getHomeScore());
            football.setTeamName2(matchItem.getT2CnName());
            football.setScore2(matchItem.getGuestScore());


            for (int j = 0; j < SelCompany.length; j++) {
                switch (j){
                    case 0:
                        football.setWeb1(SelCompany[j]);
                        break;
                    case 1:
                        football.setWeb2(SelCompany[j]);
                        break;
                    case 2:
                        football.setWeb3(SelCompany[j]);
                        break;
                    case 3:
                        football.setWeb4(SelCompany[j]);
                        break;
                    case 4:
                        football.setWeb5(SelCompany[j]);
                        break;
                }//oddsA
                odds3 = odds3Map.get(matchItem.getmId() + "_" + SelCompany[j]);// 大小球
                if(odds3 == null){
                    continue;
                }
                //odds1 = odds1Map.get(matchItem.getmId() + "_" + SelCompany[j]);// 让球
                switch (j){
                    case 0:
                        football.setWebGoal1(odds3.getGoal());
                        football.setOver1(odds3.getOver());
                        football.setUnder1(odds3.getUnder());
                        //football.setZoudi1(odds3.get);
                        break;
                    case 1:
                        football.setWebGoal2(odds3.getGoal());
                        football.setOver2(odds3.getOver());
                        football.setUnder2(odds3.getUnder());
                        break;
                    case 2:
                        football.setWebGoal3(odds3.getGoal());
                        football.setOver3(odds3.getOver());
                        football.setUnder3(odds3.getUnder());
                        break;
                    case 3:
                        football.setWebGoal4(odds3.getGoal());
                        football.setOver4(odds3.getOver());
                        football.setUnder4(odds3.getUnder());
                        break;
                    case 4:
                        football.setWebGoal5(odds3.getGoal());
                        football.setOver5(odds3.getOver());
                        football.setUnder5(odds3.getUnder());
                        break;
                }
            }

            list.add(football);

        }

        indexService.save(list);
        System.out.println("sdf");
    }

}
