CREATE TABLE `batch_task_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
	task_name  varchar(20)  NOT NULL,
	task_group  varchar(20)  NOT NULL,
	task_type  varchar(2)  NOT NULL,
	cron  varchar(20)  NOT NULL,
	class_name  varchar(100)  NOT NULL,
	status  varchar(20)  NOT NULL,
	lastest_time  datetime  NOT NULL,
	`desc` varchar(1000) ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `exponent_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` varchar(20) NOT NULL,
  `data` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `football_index` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `league_name` varchar(20) NOT NULL,
  `start_date` varchar(20) DEFAULT NULL,
  `start_time` varchar(20) NOT NULL,
  `end_time` varchar(20) DEFAULT NULL,
  `team_name1` varchar(100) NOT NULL,
  `score1` varchar(2) DEFAULT NULL,
  `team_name2` varchar(100) NOT NULL,
  `score2` varchar(2) DEFAULT NULL,
  `web1` varchar(3) NOT NULL,
  `zoudi1` tinyint(1) NOT NULL,
  `web_goal1` varchar(16) DEFAULT NULL,
  `over1` double DEFAULT NULL,
  `under1` double DEFAULT NULL,
  `web2` varchar(3) NOT NULL,
  `zoudi2` tinyint(1) NOT NULL,
  `web_goal2` varchar(16) DEFAULT NULL,
  `over2` double DEFAULT NULL,
  `under2` double DEFAULT NULL,
  `web3` varchar(3) NOT NULL,
  `zoudi3` tinyint(1) NOT NULL,
  `web_goal3` varchar(16) DEFAULT NULL,
  `over3` double DEFAULT NULL,
  `under3` double DEFAULT NULL,
  `web4` varchar(3) NOT NULL,
  `zoudi4` tinyint(1) NOT NULL,
  `web_goal4` varchar(16) DEFAULT NULL,
  `over4` double DEFAULT NULL,
  `under4` double DEFAULT NULL,
  `web5` varchar(3) NOT NULL,
  `zoudi5` tinyint(1) NOT NULL,
  `web_goal5` varchar(16) DEFAULT NULL,
  `over5` double DEFAULT NULL,
  `under5` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
