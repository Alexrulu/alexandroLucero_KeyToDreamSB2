-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: keytodreamdb
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
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ownerId` varchar(36) DEFAULT NULL,
  `type` int NOT NULL,
  `model` int NOT NULL,
  `adress` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `m2tot` decimal(10,2) NOT NULL,
  `m2cov` decimal(10,2) NOT NULL,
  `ambiente` int NOT NULL,
  `bathroom` int NOT NULL,
  `cars` int NOT NULL,
  `bedroom` int NOT NULL,
  `kitchen` int NOT NULL,
  `pool` int NOT NULL,
  `balcony` int NOT NULL,
  `grill` int NOT NULL,
  `laundry` int NOT NULL,
  `vigilance` int NOT NULL,
  `principalImage` varchar(255) DEFAULT NULL,
  `secondaryImages` json DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `contact` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `personalName` varchar(255) DEFAULT NULL,
  `phoneBusiness` varchar(20) DEFAULT NULL,
  `phonePersonal` varchar(20) DEFAULT NULL,
  `price` decimal(15,2) NOT NULL,
  `description` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,'1',1,1,'Alameda 22','Nordelta, Tigre, Buenos Aires',362.00,298.00,4,6,4,4,1,1,1,1,1,1,'/images/alameda1.jpg','[\"/images/alameda2.jpg\", \"/images/alameda3.jpg\", \"/images/alameda4.jpg\", \"/images/alameda5.jpg\"]','/videos/nordelta.mp4',1,'example@gmail.com','TIZADO PROPERTIESS','44551234','1123456789',299999.00,'Gran calidad constructiva y excelente lote con un fondo con quincha y lugar para asador!!!! La galeria con una gran parrilla y muy espaciosa! La casa esta impecable por donde la mires, tiene una gran cocina, impecable, un Family pegado a la cocina y salida a la galeria que hace que se viva permanentemente en este lugar. Losa radiante, lote ubicado cercano a la guardia y próximo a la laguna del barrio.','2025-03-06 06:57:18','2025-03-07 03:12:18'),(2,'1',2,2,'Avenida Corrientes 348','Buenos Aires, Argentina',236.00,328.00,5,4,2,4,1,2,1,1,1,1,'/images/canal1.jpg','[\"/images/canal2.jpg\", \"/images/canal3.jpg\", \"/images/canal4.jpg\", \"/images/canal5.jpg\"]','/videos/nordelta.mp4',1,'example@gmail.com','AB BROKERS','44551234','1123456789',4500.00,'Living comedor con espectacular vista al agua. Cocina integrada. Mesada con isla de silestone. Muy luminoso con gran vista desde todo el ambiente. Dependencia y Lavadero. Dos dormitorios en suite con salida al balcón. Suite principal con vestidor y baño con box de ducha revestido en porcelanato.','2025-03-06 06:57:18','2025-03-07 05:30:21'),(3,'1',1,1,'Avenida Liniers 1300','Tigre, Buenos Aires, Argentina',136.00,128.00,6,4,3,6,1,1,1,1,1,1,'/images/barbara1.jpg','[\"/images/barbara2.jpg\", \"/images/barbara3.webp\", \"/images/barbara4.jpg\", \"/images/barbara5.jpg\"]','/videos/nordelta.mp4',2,'example@gmail.com','Esteban Quito','44551234','1123456789',149999.00,'Hermosa casa tecnológica totalmente automatizada con sistema ALEXA. Todos los sistemas eléctricos y electrónicos se pueden activar por comandos de voz y desde el celular a distancia. Riego, televisores, luminarias, aires acondicionados, lavarropas, cafetera, etc. La casa está toda reciclada a nueva, en impecable estado y armoniosamente decorada, totalmente amoblada y equipada.','2025-03-06 06:57:18','2025-03-07 05:49:32'),(4,'1',1,1,'Avenida Rivadavia 321','Ciudad de Buenos Aires, Argentina',150.00,140.00,5,3,2,4,1,1,1,1,1,1,'/images/rivadavia1.jpg','[\"/images/rivadavia2.jpg\", \"/images/rivadavia3.jpg\", \"/images/rivadavia4.jpg\", \"/images/rivadavia5.jpg\"]','/videos/rivadavia.mp4',1,'contact@inmobiliaria.com','BLANCO PROPERTIESS','44223344','1122334455',215000.00,'Amplia casa con excelente distribución, patio interno, sistema de cámaras de seguridad y cerramientos modernos.','2025-03-06 06:57:18','2025-03-07 03:15:28'),(5,'1',2,2,'Avenida del Libertador 1000','Buenos Aires',80.00,75.00,3,2,1,2,1,0,1,0,1,0,'/images/libertador1.jpg','[\"/images/libertador2.jpg\", \"/images/libertador3.jpg\", \"/images/libertador4.jpg\", \"/images/libertador5.jpg\"]','/videos/libertador.mp4',1,'ventas@inmobiliaria.com','Laura Gómez','44112233','1133445566',1000.00,'Cómodo departamento en zona céntrica con excelentes accesos y cercanía a todos los servicios. Consta de 2 habitaciones, amplio balcón y espacio de cochera.','2025-03-06 06:57:18','2025-03-07 03:14:04'),(6,'1',1,1,'Avenida Santa Fe 2050','Ciudad de Buenos Aires',200.00,180.00,7,5,4,6,1,1,1,1,1,1,'/images/santafe1.jpg','[\"/images/santafe2.jpg\", \"/images/santafe3.jpg\", \"/images/santafe4.jpg\", \"/images/santafe5.jpg\"]','/videos/santafe.mp4',2,'contacto@dueño.com','TIZ4DO','45554433','1133224433',500000.00,'Casa en venta con piscina, jardín amplio, parrilla y cochera para varios autos. Ideal para familias grandes que busquen comodidad y tranquilidad.','2025-03-06 06:57:18','2025-03-07 03:15:54'),(7,'1',2,2,'Avenida Cabildo 1500','Buenos Aires',60.00,55.00,3,1,1,2,1,0,1,0,1,0,'/images/cabildo1.jpg','[\"/images/cabildo2.jpg\", \"/images/cabildo3.jpg\", \"/images/cabildo4.jpg\", \"/images/cabildo5.jpg\"]','/videos/cabildo.mp4',1,'info@inmobiliaria.com','METRO REALTY','44113344','1122336677',750.00,'Departamento de 2 habitaciones, cocina independiente, con balcón y cochera. Ideal para parejas o personas solas que busquen comodidad y buena ubicación.','2025-03-06 06:57:18','2025-03-07 03:16:21'),(8,'1',2,1,'San Martín 1234','Córdoba, Argentina',120.00,110.00,4,2,2,3,1,1,1,1,1,1,'/images/libertadorr1.jpg','[\"/images/libertadorr2.jpg\", \"/images/libertadorr3.jpg\", \"/images/libertadorr4.jpg\", \"/images/libertadorr5.jpg\"]','/videos/libertador2.mp4',2,'juanperez@inmobiliaria.com','Juan Pérez','45556677','1144332255',1300.00,'Hermosa casa con jardín, piscina, parrilla y cochera. Ubicada en zona residencial tranquila y segura. Perfecta para familias que busquen un espacio amplio y cómodo.','2025-03-06 06:57:18','2025-03-07 05:31:52'),(11,'69dd363f-4355-4839-8320-0591aa007165',1,1,'Belgrano 567','Rosario, Argentina',123.00,123.00,2,2,2,2,1,1,0,0,0,0,'/images/th.outside1328x548.d3d69c2ec7e122a243f11e0ff190129513bfb2b6.webp','[\"/images/th.outside1328x548.9f33911690c40801525a868ccd1f530196c52267.webp\", \"/images/th.outside1328x548.48ca972691cb2651785b18d6fc48bbcda87984d9.webp\", \"/images/th.outside1328x548.051ab75f94d7448ae038bb1f7e9bda6e560ccbc2.webp\", \"/images/th.outside1328x548.d9120b255a09cea5f4e5b6261c2d3791d8b06c95.webp\"]',NULL,1,'alexandro1@gmail.com','Alexandro Lucero','123123123',NULL,320000.00,'Hermosa casa, diseñada por el Capitan America y construida por Superman.','2025-03-06 23:36:05','2025-03-07 05:33:11');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `userType` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `razonSocial` varchar(255) DEFAULT NULL,
  `fiscalCondition` int DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `cellphone` varchar(20) DEFAULT NULL,
  `favoritos` json DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1',0,'alexandro@gmail.com','$2b$10$I3Mu3.aAOucoIQJCZQYbKe4hL9IO3Q58m6evvXQVDVzOO2u2q7J.a','Administrador','Administrador',0,'00000000','123456789','987654321','[2]','2025-03-06 06:57:18','2025-03-07 19:50:58'),('69dd363f-4355-4839-8320-0591aa007165',1,'alexandro1@gmail.com','$2b$10$4ssg2TbKic.95B.va.RygefI.l90xMGyQSglmOVGe7WAniP0oOIOy','Alexandro Lucero','123123123',1,'123123','1141232323','123123123','[7, 1]','2025-03-06 06:57:18','2025-03-08 23:30:15');
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

-- Dump completed on 2025-03-09  0:38:34
