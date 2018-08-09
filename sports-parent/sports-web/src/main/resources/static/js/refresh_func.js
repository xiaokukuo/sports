 setInterval(function (){
	 $.get('/sportweb/odds', function (data) {
		 $.each(data,function(index,value){  
             $("#hs_"+value.indexId).text(value.score1);
             $("#gs_"+value.indexId).text(value.score2);
             
             $("#ov1_"+value.indexId).text(value.over1);
             $("#wg1_"+value.indexId).text(value.webGoal1);
             $("#ud1_"+value.indexId).text(value.under1);
         
             $("#ov2_"+value.indexId).text(value.over2);
             $("#wg2_"+value.indexId).text(value.webGoal2);
             $("#ud2_"+value.indexId).text(value.under2);
             
             $("#ov3_"+value.indexId).text(value.over3);
             $("#wg3_"+value.indexId).text(value.webGoal3);
             $("#ud3_"+value.indexId).text(value.under3);
             
             $("#ov4_"+value.indexId).text(value.over4);
             $("#wg4_"+value.indexId).text(value.webGoal4);
             $("#ud4_"+value.indexId).text(value.under4);
             
             $("#ov5_"+value.indexId).text(value.over5);
             $("#wg5_"+value.indexId).text(value.webGoal5);
             $("#ud5_"+value.indexId).text(value.under5);
		 });
	 });
 },5000);