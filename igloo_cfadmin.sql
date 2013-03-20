/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50529
Source Host           : localhost:3306
Source Database       : igloo_cfadmin

Target Server Type    : MYSQL
Target Server Version : 50529
File Encoding         : 65001

Date: 2013-03-20 14:44:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cfadmin_datasource`
-- ----------------------------
DROP TABLE IF EXISTS `cfadmin_datasource`;
CREATE TABLE `cfadmin_datasource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `database` varchar(255) NOT NULL,
  `host` varchar(255) NOT NULL,
  `port` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `args` varchar(255) NOT NULL,
  `timeout` int(11) NOT NULL,
  `login_timeout` int(11) NOT NULL,
  `interval` int(11) NOT NULL,
  `buffer` int(11) NOT NULL,
  `blob_buffer` int(11) NOT NULL,
  `enable_clob` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `enable_blob` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `pooling` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `alter` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `grant` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `update` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `delete` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `create` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `storedproc` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `insert` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `drop` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `revoke` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `select` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `disable` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `disable_autogenkeys` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `validationQuery` varchar(255) NOT NULL,
  `enablemaxconnections` int(11) NOT NULL,
  `maxconnections` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cfadmin_datasource
-- ----------------------------

-- ----------------------------
-- Table structure for `cfadmin_link`
-- ----------------------------
DROP TABLE IF EXISTS `cfadmin_link`;
CREATE TABLE `cfadmin_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datasource_id` int(11) NOT NULL,
  `server_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `datasource_id` (`datasource_id`),
  KEY `server_id` (`server_id`),
  CONSTRAINT `datasource_id` FOREIGN KEY (`datasource_id`) REFERENCES `cfadmin_datasource` (`id`),
  CONSTRAINT `server_id` FOREIGN KEY (`server_id`) REFERENCES `cfadmin_server` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cfadmin_link
-- ----------------------------

-- ----------------------------
-- Table structure for `cfadmin_server`
-- ----------------------------
DROP TABLE IF EXISTS `cfadmin_server`;
CREATE TABLE `cfadmin_server` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(32) NOT NULL,
  `address` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `comment` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cfadmin_server
-- ----------------------------
