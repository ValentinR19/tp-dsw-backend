-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: world
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_id` mediumint unsigned NOT NULL,
  `state_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` mediumint unsigned NOT NULL,
  `country_code` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `native` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timezone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'IANA timezone identifier (e.g., America/New_York)',
  `translations` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT '2014-01-01 06:31:01',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `flag` tinyint(1) NOT NULL DEFAULT '1',
  `wikiDataId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Rapid API GeoDB Cities',
  PRIMARY KEY (`id`),
  KEY `cities_test_ibfk_1` (`state_id`),
  KEY `cities_test_ibfk_2` (`country_id`),
  CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`),
  CONSTRAINT `cities_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=157077 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES
-- CABA
(900001,'Buenos Aires',4880,'C',11,'AR',-34.61315000,-58.37723000,'Buenos Aires','America/Argentina/Buenos_Aires',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Provincia de Buenos Aires (id 3656, code 'B')
(900010,'La Plata',3656,'B',11,'AR',-34.92145000,-57.95453000,'La Plata','America/Argentina/Buenos_Aires',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),
(900011,'Mar del Plata',3656,'B',11,'AR',-38.00228000,-57.55754000,'Mar del Plata','America/Argentina/Buenos_Aires',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),
(900012,'Bahía Blanca',3656,'B',11,'AR',-38.71960000,-62.27240000,'Bahía Blanca','America/Argentina/Buenos_Aires',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Córdoba (id 3642, code 'X')
(900020,'Córdoba',3642,'X',11,'AR',-31.41667000,-64.18333000,'Córdoba','America/Argentina/Cordoba',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),
(900021,'Río Cuarto',3642,'X',11,'AR',-33.12320000,-64.34930000,'Río Cuarto','America/Argentina/Cordoba',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),
(900022,'Villa María',3642,'X',11,'AR',-32.40700000,-63.24020000,'Villa María','America/Argentina/Cordoba',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Santa Fe (id 3641, code 'S')
(900030,'Rosario',3641,'S',11,'AR',-32.94682000,-60.63932000,'Rosario','America/Argentina/Cordoba',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),
(900031,'Santa Fe',3641,'S',11,'AR',-31.63333000,-60.70000000,'Santa Fe','America/Argentina/Cordoba',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Mendoza (id 3646, code 'M')
(900040,'Mendoza',3646,'M',11,'AR',-32.88946000,-68.84584000,'Mendoza','America/Argentina/Mendoza',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),
(900041,'San Rafael',3646,'M',11,'AR',-34.61320000,-68.34300000,'San Rafael','America/Argentina/Mendoza',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Tucumán (id 3637, code 'T')
(900050,'San Miguel de Tucumán',3637,'T',11,'AR',-26.82414000,-65.22260000,'San Miguel de Tucumán','America/Argentina/Tucuman',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Salta (id 3643, code 'A')
(900060,'Salta',3643,'A',11,'AR',-24.78590000,-65.41170000,'Salta','America/Argentina/Salta',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Río Negro (id 3639, code 'R')
(900070,'San Carlos de Bariloche',3639,'R',11,'AR',-41.13400000,-71.30800000,'San Carlos de Bariloche','America/Argentina/Salta',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Neuquén (id 3648, code 'Q')
(900080,'Neuquén',3648,'Q',11,'AR',-38.95160000,-68.05910000,'Neuquén','America/Argentina/Salta',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Corrientes (id 3638, code 'W')
(900090,'Corrientes',3638,'W',11,'AR',-27.46920000,-58.83060000,'Corrientes','America/Argentina/Cordoba',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Misiones (id 3644, code 'N')
(900100,'Posadas',3644,'N',11,'AR',-27.36710000,-55.89610000,'Posadas','America/Argentina/Cordoba',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Jujuy (id 3645, code 'Y')
(900110,'San Salvador de Jujuy',3645,'Y',11,'AR',-24.18580000,-65.29950000,'San Salvador de Jujuy','America/Argentina/Jujuy',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- La Pampa (id 3655, code 'L')
(900120,'Santa Rosa',3655,'L',11,'AR',-36.61670000,-64.28330000,'Santa Rosa','America/Argentina/Buenos_Aires',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Entre Ríos (id 3654, code 'E')
(900130,'Paraná',3654,'E',11,'AR',-31.74440000,-60.51750000,'Paraná','America/Argentina/Cordoba',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- San Luis (id 3636, code 'D')
(900140,'San Luis',3636,'D',11,'AR',-33.29620000,-66.33560000,'San Luis','America/Argentina/San_Luis',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- Catamarca (id 3647, code 'K')
(900150,'San Fernando del Valle de Catamarca',3647,'K',11,'AR',-28.46960000,-65.78520000,'San Fernando del Valle de Catamarca','America/Argentina/Catamarca',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL),

-- La Rioja (id 3653, code 'F')
(900160,'La Rioja',3653,'F',11,'AR',-29.41310000,-66.85580000,'La Rioja','America/Argentina/La_Rioja',NULL,'2014-01-01 06:31:01','2025-10-27 00:00:00',1,NULL);
