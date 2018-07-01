-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: skilltree
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `arbre`
--

DROP TABLE IF EXISTS `arbre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arbre` (
  `idarbre` int(11) NOT NULL AUTO_INCREMENT,
  `comp1` int(11) DEFAULT NULL,
  `comp2` int(11) DEFAULT NULL,
  `comp3` int(11) DEFAULT NULL,
  `comp4` int(11) DEFAULT NULL,
  `comp5` int(11) DEFAULT NULL,
  `comp6` int(11) DEFAULT NULL,
  `comp7` int(11) DEFAULT NULL,
  `comp8` int(11) DEFAULT NULL,
  `comp9` int(11) DEFAULT NULL,
  `comp10` int(11) DEFAULT NULL,
  PRIMARY KEY (`idarbre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arbre`
--

LOCK TABLES `arbre` WRITE;
/*!40000 ALTER TABLE `arbre` DISABLE KEYS */;
/*!40000 ALTER TABLE `arbre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `simplonien`
--

DROP TABLE IF EXISTS `simplonien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `simplonien` (
  `idsimplonien` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mdp` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idsimplonien`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `simplonien`
--

LOCK TABLES `simplonien` WRITE;
/*!40000 ALTER TABLE `simplonien` DISABLE KEYS */;
/*!40000 ALTER TABLE `simplonien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vote` (
  `idvote` int(11) NOT NULL AUTO_INCREMENT,
  `idsimplonien` int(11) NOT NULL,
  `uservoté` int(11) DEFAULT NULL,
  `idarbre` int(11) NOT NULL,
  `note` int(11) NOT NULL,
  PRIMARY KEY (`idvote`),
  KEY `uservoté` (`uservoté`),
  KEY `idsimplonien` (`idsimplonien`),
  KEY `idarbre` (`idarbre`),
  CONSTRAINT `vote_ibfk_1` FOREIGN KEY (`uservoté`) REFERENCES `simplonien` (`idsimplonien`),
  CONSTRAINT `vote_ibfk_2` FOREIGN KEY (`idsimplonien`) REFERENCES `simplonien` (`idsimplonien`),
  CONSTRAINT `vote_ibfk_3` FOREIGN KEY (`idarbre`) REFERENCES `arbre` (`idarbre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-27 23:31:52
