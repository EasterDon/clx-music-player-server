-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: clx_music
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app`
--

DROP TABLE IF EXISTS `app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `announcement` text NOT NULL DEFAULT '',
  `app_version` text NOT NULL DEFAULT '',
  `app_download_link` text NOT NULL DEFAULT '',
  `app_version_description` text NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app`
--

LOCK TABLES `app` WRITE;
/*!40000 ALTER TABLE `app` DISABLE KEYS */;
INSERT INTO `app` VALUES
(1,'Ciallo～ (∠・ω< )⌒★','0.0.1','','');
/*!40000 ALTER TABLE `app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `songs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `notation` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `author` text DEFAULT NULL,
  `cover_url` text NOT NULL,
  `mp3_url` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `chk_music_array` CHECK (`notation` is null or json_valid(`notation`))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES
(1,'星如雨','[\"adq\",245,\"w\",245,\"t\",245,\"w\",245,\"e\",245,\"dt\",245,\"dw\",245,\"e\",245,\"t\",245,\"w\",245,\"he\",245,\"gt\",245,\"ndq\",245,\"w\",245,\"e\",245,\"q\",245,\"w\",245,\"dt\",245,\"dq\",245,\"w\",245,\"e\",245,\"q\",245,\"sq\",245,\"de\",245,\"vnq\",245,\"w\",245,\"t\",245,\"q\",245,\"w\",245,\"nt\",245,\"dq\",245,\"w\",245,\"y\",245,\"q\",245,\"w\",245,\"nt\",245,\"nhw\",245,\"q\",245,\"w\",245,\"t\",245,\"w\",245,\"e\",245,\"cw\",245,\"q\",245,\"w\",245,\"cns\",245,\"bd\",245,\"cg\",245,\"vfh\",367,\"z\",367,\"c\",367,\"nh\",367,\"cnah\",735,\"s\",184,\"a\",184,\"nd\",184,\"b\",184,\"cbg\",367,\"m\",367,\"x\",367,\"bg\",367,\"xcbg\",735,\"d\",367,\"g\",184,\"d\",184,\"xs\",367,\"zn\",367,\"xb\",367,\"ba\",367,\"bs\",367,\"m\",367,\"xns\",367,\"vag\",367,\"z\",367,\"ca\",367,\"b\",367,\"n\",367,\"zcbq\",1632,\"bg\",184,\"nh\",184,\"aq\",367,\"zaw\",92,\"e\",92,\"w\",184,\"c\",184,\"q\",184,\"bh\",367,\"za\",184,\"q\",184,\"vfw\",184,\"n\",184,\"z\",184,\"v\",184,\"bg\",184,\"nh\",184,\"aq\",367,\"bgw\",367,\"m\",184,\"q\",184,\"sw\",367,\"b\",184,\"e\",184,\"nd\",184,\"aq\",184,\"cj\",184,\"bh\",184,\"bw\",184,\"ne\",184,\"at\",367,\"vfw\",184,\"z\",184,\"v\",184,\"bq\",184,\"nw\",184,\"b\",184,\"v\",184,\"zq\",184,\"bw\",184,\"x\",184,\"b\",184,\"nq\",184,\"mw\",184,\"ne\",184,\"bt\",184,\"xy\",184,\"nhqe\",184,\"c\",184,\"n\",184,\"a\",184,\"dw\",184,\"ne\",184,\"dw\",184,\"aq\",184,\"bh\",184,\"m\",184,\"s\",184,\"b\",184,\"xg\",184,\"ch\",184,\"bq\",367,\"vfh\",367,\"a\",184,\"q\",184,\"dq\",367,\"n\",184,\"w\",184,\"vfw\",367,\"m\",367,\"sq\",184,\"w\",184,\"be\",367,\"bmsy\",367,\"t\",367,\"cbme\",367,\"w\",367,\"zcnq\",816,\"vaq\",367,\"z\",367,\"nsw\",367,\"de\",367,\"bgt\",367,\"x\",367,\"vsw\",735,\"za\",184,\"a\",184,\"cf\",184,\"g\",184,\"bs\",184,\"c\",184,\"zb\",184,\"a\",184,\"f\",184,\"g\",184,\"t\",735,\"vafq\",735,\"sgw\",367,\"dhe\",367,\"gjet\",735,\"w\",367,\"s\",905,\"zq\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\",184,\"d\",184,\"s\",184,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",735,\"z\",184,\"a\",184,\"s\",184,\"d\",184,\"g\",184,\"h\"]','龚淑均&薄彩生','/1/music.jpg','/1/music.mp3');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'clx_music'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-11 15:28:51
