
CREATE TABLE `datasource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `database` varchar(255) NOT NULL,
  `host` varchar(255) NOT NULL,
  `port` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `args` varchar(255) NOT NULL,
  `timeout` int(11) NOT NULL,
  `login_timeout` int(11) NOT NULL,
  `interval` int(11) NOT NULL,
  `buffer` int(11) NOT NULL,
  `blob_buffer` int(11) NOT NULL,
  `enable_clob` tinyint(1) NOT NULL,
  `enable_blob` tinyint(1) NOT NULL,
  `pooling` tinyint(1) NOT NULL,
  `alter` tinyint(1) NOT NULL,
  `grant` tinyint(1) NOT NULL,
  `update` tinyint(1) NOT NULL,
  `delete` tinyint(1) NOT NULL,
  `create` tinyint(1) NOT NULL,
  `storedproc` tinyint(1) NOT NULL,
  `insert` tinyint(1) NOT NULL,
  `drop` tinyint(1) NOT NULL,
  `revoke` tinyint(1) NOT NULL,
  `select` tinyint(1) NOT NULL,
  `disable` tinyint(1) NOT NULL DEFAULT '0',
  `disable_autogenkeys` tinyint(1) NOT NULL,
  `validationQuery` varchar(255) NOT NULL,
  `enablemaxconnections` tinyint(1) NOT NULL,
  `maxconnections` int(11) NOT NULL,
  `version` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `link_server_datasource`;
CREATE TABLE `link_server_datasource` (
  `datasource_id` int(11) NOT NULL,
  `server_id` int(11) NOT NULL,
  KEY `datasource_id` (`datasource_id`),
  KEY `server_id` (`server_id`),
  CONSTRAINT `datasource_id` FOREIGN KEY (`datasource_id`) REFERENCES `datasource` (`id`),
  CONSTRAINT `server_id` FOREIGN KEY (`server_id`) REFERENCES `server` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `server`;
CREATE TABLE `server` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(32) NOT NULL,
  `address` varchar(500) NOT NULL,
  `password` varchar(32) NOT NULL,
  `comment` longtext,
  `disabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
