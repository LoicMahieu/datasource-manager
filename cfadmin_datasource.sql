/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50529
Source Host           : localhost:3306
Source Database       : igloo_cfadmin

Target Server Type    : MYSQL
Target Server Version : 50529
File Encoding         : 65001

Date: 2013-03-20 14:51:34
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
) ENGINE=InnoDB AUTO_INCREMENT=386 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cfadmin_datasource
-- ----------------------------
INSERT INTO `cfadmin_datasource` VALUES ('326', '50pluslifestyle', '50pluslifestyle', 'mysql.igloo.be', '3306', '50pluslifestyle', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('327', 'abrobvro', 'abrobvro', 'mysql.igloo.be', '3306', 'abrobvro', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('328', 'adhocsailing', 'adhocsailing', 'mysql.igloo.be', '3306', 'adhocsailing', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('329', 'aopobbvoos', 'aopobbvoos', 'mysql.igloo.be', '3306', 'aopobbvoos', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('330', 'arbredevie', 'arbredevie', 'mysql.igloo.be', '3306', 'arbredevie', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('331', 'bioticas', 'bioticas', 'mysql.igloo.be', '3306', 'bioticas', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('332', 'bioticg5', 'bioticg5', 'mysql.igloo.be', '3306', 'bioticg5', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('333', 'breeders', 'rc_breeders', 'mysql.igloo.be', '3306', 'rc_breeders', '', 'RC\r\n', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('334', 'capokaz', 'capokaz', 'mysql.igloo.be', '3306', 'capokaz', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('335', 'cfvar', 'cfvar', 'mysql.igloo.be', '3306', 'cfvar', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('336', 'clubs', 'rc_clubs', 'mysql.igloo.be', '3306', 'rc_clubs', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('337', 'degre12', 'degre12', 'mysql.igloo.be', '3306', 'degre12', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('338', 'dermato', 'rc_dermato', 'mysql.igloo.be', '3306', 'rc_dermato', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('339', 'efolder', 'rc_efolder', 'mysql.igloo.be', '3306', 'rc_efolder', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('340', 'eteduchat', 'rc_eteduchat', 'mysql.igloo.be', '3306', 'rc_eteduchat', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('341', 'expert', 'rc_expert', 'mysql.igloo.be', '3306', 'rc_expert', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('342', 'gallery', 'rc_galleries', 'mysql.igloo.be', '3306', 'rc_galleries', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('343', 'gardendeco', 'gardendeco', 'mysql.igloo.be', '3306', 'gardendeco', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('344', 'gattofamily', 'antoine_gattofamily', 'mysql.igloo.be', '3306', 'gattofamily', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('345', 'greenpeace_support', 'greenpeace_support', 'mysql.igloo.be', '3306', 'greenpeace_sup', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('346', 'hifivid', 'hifivid', 'mysql.igloo.be', '3306', 'hifivid', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('347', 'ifolder', 'rc_ifolder', 'mysql.igloo.be', '3306', 'rc_ifolder', '', 'RC', '', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('348', 'igloo', 'igloo', 'mysql.igloo.be', '3306', 'igloo', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('349', 'igloo_promo_mail', 'igloo_promo_mail', 'mysql.igloo.be', '3306', 'igloo_promo_mail', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('350', 'kiavo', 'kiavo', 'mysql.igloo.be', '3306', 'kiavo', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('351', 'lesuco', 'lesuco', 'mysql.igloo.be', '3306', 'lesuco', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('352', 'ltbjobe', 'ltbjobe', 'mysql.igloo.be', '3306', 'ltbjobe', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('353', 'martinsport', 'martinsport', 'mysql.igloo.be', '3306', 'martinsport', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('354', 'maxivins', 'maxivins', 'mysql.igloo.be', '3306', 'maxivins', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('355', 'mobility', 'rc_mobility', 'mysql.igloo.be', '3306', 'rc_mobility', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('356', 'movepet', 'rc_movepet', 'mysql.igloo.be', '3306', 'rc_movepet', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('357', 'mysphere', 'mysphere', 'mysql.igloo.be', '3306', 'mysphere', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('358', 'neutered', 'rc_neutered', 'mysql.igloo.be', '3306', 'rc_neutered', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('359', 'nurses', 'rc_nurses', 'mysql.igloo.be', '3306', 'rc_nurses', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('360', 'offer', 'rc_offer', 'mysql.igloo.be', '3306', 'rc_offer', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('361', 'offeruk', 'rc_uk_offer', 'mysql.igloo.be', '3306', 'rc_uk_offer', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('362', 'order', 'rc_order', 'mysql.igloo.be', '3306', 'rc_order', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('363', 'petmobil', 'rc_petmobility', 'mysql.igloo.be', '3306', 'rc_petmobility', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('364', 'presence', 'presence', 'mysql.igloo.be', '3306', 'presence', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('365', 'rc_jdpc2012', 'rc_jdpc2012', 'mysql.igloo.be', '3306', 'rc_jdpc2012', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('366', 'rc_journeeduchat', 'rc_journeeduchat', 'mysql.igloo.be', '3306', 'rc_journeeduchat', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('367', 'rc_kiosk', 'rc_kiosk', 'mysql.igloo.be', '3306', 'rc_kiosk', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('368', 'rc_linear', 'rc_linear', 'mysql.igloo.be', '3306', 'rc_linear', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('369', 'rc_offer_mobile', 'rc_offer_mobile', 'mysql.igloo.be', '3306', 'rc_offermobile', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('370', 'rc_tempdog', 'rc_tempdog', 'mysql.igloo.be', '3306', 'rc_tempdog', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('371', 'rc_tools', 'rc_tools', 'mysql.igloo.be', '3306', 'rc_tools', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('372', 'rc_tv', 'rc_tv', 'mysql.igloo.be', '3306', 'rc_tv', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('373', 'rc_vetfidelity', 'rc_vetfidelity', 'mysql.igloo.be', '3306', 'rc_vetfidelity', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('374', 'rcbe', 'rc_be', 'mysql.igloo.be', '3306', 'rc_be', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('375', 'rcbeftp', 'rc_be_ftp', 'mysql.igloo.be', '3306', 'rc_be_ftp', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('376', 'rcrotationalert', 'rc_rotationalert', 'mysql.igloo.be', '3306', 'rc_rotationalert', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('377', 'royalcanin-kiosk', 'rc_kiosk', 'mysql.igloo.be', '3306', 'root_igloo', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('378', 'seniorconsult', 'rc_seniorconsult', 'mysql.igloo.be', '3306', 'rc_seniorconsult', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('379', 'sonycenter', 'sonycenter', 'mysql.igloo.be', '3306', 'sonycenter', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('380', 'support', 'rc_support', 'mysql.igloo.be', '3306', 'rc_support', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('381', 'sybermat', 'sybermat', 'mysql.igloo.be', '3306', 'sybermat', '', '', '', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('382', 'urinary', 'rc_urinary', 'mysql.igloo.be', '3306', 'rc_urinary', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('383', 'vassart', 'vassart', 'mysql.igloo.be', '3306', 'vassart', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('384', 'vetexper', 'rc_vetexpert', 'mysql.igloo.be', '3306', 'rc_vetexpert', '', 'RC', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
INSERT INTO `cfadmin_datasource` VALUES ('385', 'yachtingsud', 'yachtingsud', 'mysql.igloo.be', '3306', 'yachtingsud', '', '', 'zeroDateTimeBehavior=convertToNull', '1200', '30', '420', '64000', '64000', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', 'SELECT 1 = 1', '0', '0');
