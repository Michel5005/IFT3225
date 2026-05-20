-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 18, 2026 at 08:20 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `tiles`;
DROP TABLE IF EXISTS `accounts`;
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ift3225_projet_tuiles`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `account_name` varchar(100) NOT NULL,
  `account_passwd` varchar(255) NOT NULL,
  `account_reg_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `account_name`, `account_passwd`, `account_reg_time`, `admin`) VALUES
(2, 'b@b.com', '$2y$10$faGRoX/ZwawEI4XN46rdp.wYUVgKKZooaC24kZA/tsb1WvWn4om9C', '2026-01-27 11:57:26', 0),
(9, 'ift3225@ift3225.com', '$2y$10$wtSijEEqZG3ZS9/IOboyRuMs/.HqRNfxKpWRRPI5ffqEljTtMKwp.', '2026-02-18 13:36:23', 1),
(10, 'admin', '$2y$10$44zOkQ6Uiy/72Oh8UztpR.wHt14Y1ZvZgyipTfu18uLKELjFKTUUq', '2026-02-18 13:37:31', 1),
(11, 'a@a.com', '$2y$10$YLAId.J8/dh5qgmOAynCQul26icxAib5fu0rpzgnGoj039q7sduji', '2026-02-18 15:19:43', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tiles`
--

CREATE TABLE `tiles` (
  `tile_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `tile_date` date NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text NOT NULL,
  `account_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tiles`
--

INSERT INTO `tiles` (`tile_id`, `title`, `tile_date`, `category`, `description`, `account_id`) VALUES
(11, 'Neuromancer', '2026-02-25', 'Science-Fiction', 'Un hacker est engagé pour une mission mystérieuse impliquant une intelligence artificielle et des mégacorporations.', 2),
(12, '1984', '2026-02-25', 'Dystopie', 'Dans un régime totalitaire, un homme tente de préserver sa liberté de pensée face à une surveillance omniprésente.', 2),
(13, 'Brave New World', '2026-02-25', 'Dystopie', 'Une société futuriste où le bonheur est imposé par le conditionnement et la consommation.', 2),
(14, 'The Hobbit', '2026-02-25', 'Fantastique', 'Bilbo Baggins est entraîné dans une aventure inattendue aux côtés de nains cherchant à reconquérir leur royaume.', 2),
(15, 'The Silmarillion', '2026-02-25', 'Fantastique', 'Les mythes fondateurs de la Terre du Milieu, racontant la création et les grandes guerres anciennes.', 2),
(16, 'Le Meilleur des mondes', '2026-02-25', 'Dystopie', 'Une version francophone du monde conditionné où la stabilité sociale prime sur l’individualité.', 2),
(17, 'Snow Crash', '2026-02-25', 'Science-Fiction', 'Un univers cyberpunk où un virus informatique menace autant le monde virtuel que réel.', 2),
(18, 'Hyperion', '2026-02-25', 'Science-Fiction', 'Des pèlerins racontent leurs histoires avant de rencontrer une créature mystérieuse appelée le Gritche.', 2),
(19, 'Le Comte de Monte-Cristo', '2026-02-25', 'Classique', 'Un homme injustement emprisonné prépare une vengeance méthodique après s’être évadé.', 2),
(20, 'Crime et Châtiment', '2026-02-25', 'Classique', 'Un étudiant commet un meurtre et lutte avec la culpabilité et la morale.', 2),
(21, 'La Peste', '2026-02-25', 'Roman', 'Une ville algérienne fait face à une épidémie et révèle la nature humaine.', 2),
(22, 'Solaris', '2026-02-25', 'Science-Fiction', 'Des scientifiques étudient une planète océanique capable de matérialiser leurs souvenirs.', 2),
(23, 'The Left Hand of Darkness', '2026-02-25', 'Science-Fiction', 'Un envoyé diplomatique découvre une société où le genre est fluide, bouleversant ses repères culturels et politiques.', 2),
(24, 'Fahrenheit 451', '2026-02-25', 'Dystopie', 'Dans un futur où les livres sont interdits, un pompier chargé de les brûler commence à douter du système.', 2),
(25, 'Le Petit Prince', '2026-02-25', 'Conte', 'Un aviateur rencontre un petit prince venu d’une autre planète et redécouvre l’essentiel, invisible pour les yeux.', 2),
(26, 'L’Étranger', '2026-02-25', 'Roman', 'Un homme indifférent aux conventions commet un acte irréversible et se heurte à l’absurdité du jugement social.', 2),
(27, 'The Martian', '2026-02-25', 'Science-Fiction', 'Un astronaute laissé pour mort sur Mars improvise des solutions scientifiques pour survivre et signaler sa présence.', 2),
(28, 'Les Misérables', '2026-02-25', 'Classique', 'Après sa libération, un ancien forçat cherche la rédemption tandis qu’un inspecteur le poursuit sans relâche.', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `account_name` (`account_name`);

--
-- Indexes for table `tiles`
--
ALTER TABLE `tiles`
  ADD PRIMARY KEY (`tile_id`),
  ADD KEY `account_id` (`account_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tiles`
--
ALTER TABLE `tiles`
  MODIFY `tile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tiles`
--
ALTER TABLE `tiles`
  ADD CONSTRAINT `tiles_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
