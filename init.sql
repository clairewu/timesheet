SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for status_desc
-- ----------------------------
DROP TABLE IF EXISTS `status_desc`;
CREATE TABLE `status_desc` (
  `id` int(1) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

INSERT INTO status_desc VALUES(0, 'To do');
INSERT INTO status_desc VALUES(1, 'In Progress');
INSERT INTO status_desc VALUES(2, 'To Verify');
INSERT INTO status_desc VALUES(3, 'Completed');

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(100),
  `password` varchar(100),
  `first_name` varchar(300) default NULL,
  `last_name` varchar(300) default NULL,
  `email` varchar(300) default NULL,
  `phone` varchar(300) default NULL,
  `mobile` varchar(300) default NULL,
  `access_level` int(11) default 1,
  `post_date` datetime default NULL,
  PRIMARY KEY  (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(300) default NULL,
  `leader` varchar(300) default NULL,
  `description` varchar(300) default NULL,
  `estimate_start_dt datetime default NULL,
  `estimate_end_dt datetime default NULL,
  `actual_start_dt datetime default NULL,
  `actual_end_dt datetime default NULL,
  `post_date` datetime default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(11) NOT NULL auto_increment,
  `project_id` int(11) NOT NULL,
  `name` varchar(300) default NULL,
  `description` varchar(300) default NULL,
  `estimate_start_dt datetime default NULL,
  `estimate_end_dt datetime default NULL,
  `actual_start_dt datetime default NULL,
  `actual_end_dt datetime default NULL,
  `post_date` datetime default NULL,
  `status_type_id` int(1) default 0,
  `pourcentage_done` int(1) default 0,
  PRIMARY KEY  (`id`),
  FOREIGN KEY (`status_type_id`) REFERENCES status_desc(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

