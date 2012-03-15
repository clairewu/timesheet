SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(300) default NULL,
  `leader` varchar(300) default NULL,
  `description` varchar(300) default NULL,
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
  `post_date` datetime default NULL,
  `status_type_id` int(1) default 0,
  `pourcentage_done` int(1) default 0,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

