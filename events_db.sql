-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: events_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'sports'),(2,'games'),(3,'relaxation');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Trampoline party','Bounce around with your friends','https://i.pinimg.com/736x/3d/2f/af/3d2faf4e3188d34a9fcdc00df59e77b0.jpg','My back yard','2023-03-10 18:00:00','2023-03-10 19:00:00'),(2,'Laser Tag mania','Let\'s play laser tag!','https://www.ctvnews.ca/polopoly_fs/1.5118552.1600965663!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg','Blinded by the Lights Laser Tag, 15 Main St.','2023-04-06 18:46:00','2023-04-06 19:46:00'),(3,'Badminton game','Hit that shuttle!','https://s3.eu-west-2.amazonaws.com/ws-activestirling/production/Badminton/_1200x630_crop_center-center_none/Badminton-3.jpg','The Park','2023-03-15 12:00:00','2023-03-15 13:30:00'),(4,'Yoga','It\'s a bit of a stretch.','https://ymcasouthflorida.org/wp-content/uploads/2019/12/AA2I8910-scaled.jpg','Shavasana Yoga School','2023-03-09 06:00:00','2023-03-09 07:00:00');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `github_id` varchar(255) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `github_id` (`github_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ignacio_doe','p@ssw0rd1','Ignacio Doe','https://global-uploads.webflow.com/5eecfecbe625d195e35b89f2/624bfb093da7d92733c001c0_Ignacio%20Villafruela%20Rodr%C3%ADguez.jpg',NULL,NULL,NULL),(2,'jane_bennett','p@ssw0rd2','Jane Bennett','https://global-uploads.webflow.com/5eecfecbe625d195e35b89f2/624bfb401d7131c760ca1c63_Elieska%20Lensink.jpg',NULL,NULL,NULL),(3,'DigiFake',NULL,'Ertugrul Yalcin','https://avatars.githubusercontent.com/u/171814386?v=4','171814386','https://github.com/DigiFake',NULL),(4,'DigiFake',NULL,'DigiFake','https://via.placeholder.com/150',NULL,NULL,NULL),(5,'DigiFake',NULL,'DigiFake','https://via.placeholder.com/150',NULL,NULL,NULL),(6,'DigiFake',NULL,'DigiFake','https://via.placeholder.com/150',NULL,'https://github.com/DigiFake',NULL),(7,'DigiFake',NULL,'DigiFake','https://via.placeholder.com/150',NULL,'https://github.com/DigiFake',NULL),(8,'testuser','test1234','Test User',NULL,NULL,NULL,'test@example.com'),(9,'testuser','$2b$10$3A/7EPfTxLeS8ZtavnG3xOSCczl56oFWse5eDeKaN0iybmiesPxMq','testuser',NULL,NULL,NULL,'testuser@example.com'),(10,'DigiFake',NULL,'DigiFake','https://via.placeholder.com/150',NULL,'https://github.com/DigiFake',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16  3:01:56
