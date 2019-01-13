-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 19, 2018 at 09:52 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laiterekisteri`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategoria`
--

DROP TABLE IF EXISTS `kategoria`;
CREATE TABLE IF NOT EXISTS `kategoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kategoria` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kategoria`
--

INSERT INTO `kategoria` (`id`, `kategoria`) VALUES
(1, 'puhelin'),
(2, 'kannettava tietokone'),
(3, 'hiiri'),
(4, 'näppäimistö'),
(5, 'kamera'),
(6, 'tabletti'),
(7, 'pöytätietokone');

-- --------------------------------------------------------

--
-- Table structure for table `kayttaja`
--

DROP TABLE IF EXISTS `kayttaja`;
CREATE TABLE IF NOT EXISTS `kayttaja` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tunnus` varchar(64) NOT NULL,
  `salasana` varchar(64) NOT NULL,
  `nimi` varchar(64) NOT NULL,
  `poistettu` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tunnus` (`tunnus`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kayttaja`
--

INSERT INTO `kayttaja` (`id`, `tunnus`, `salasana`, `nimi`, `poistettu`) VALUES
(1, 'sfalconer0', 'bAZIj4D', 'Stefania Falconer', 0),
(2, 'leagles1', 'R5Gb7DNU', 'Lemmie Eagles', 0),
(3, 'kdanick2', 'Le4PHjb05VD1', 'Kirk Danick', 0),
(4, 'wstott3', '7IZgyzbt1Et', 'Wynn Stott', 0),
(5, 'hthames4', 't0bTPR4', 'Hurley Thames', 0),
(6, 'elisciandri5', 'mNgmrH0Oz', 'Eleanora Lisciandri', 0),
(7, 'mtremoille6', '1AAL8fs', 'Melodee Tremoille', 0),
(8, 'asanthouse7', 'wMDWYL', 'Aliza Santhouse', 0),
(9, 'acatanheira8', 'mZZzFImcJF', 'Austin Catanheira', 0),
(10, 'jcutler9', 'QyBopDi', 'Jackqueline Cutler', 0),
(11, 'halanbrookea', 'yNc4MN8oF5jf', 'Hatti Alanbrooke', 0),
(12, 'jjosephb', '8029cxn', 'Jasmin Joseph', 0),
(13, 'jrountreec', 'iDdy1a01qKZf', 'Jody Rountree', 0),
(14, 'hgassond', 'PIxplt', 'Huberto Gasson', 0),
(15, 'klargente', '8G0Yt7Km8q9h', 'Karie Largent', 0),
(16, 'mpetersenf', 'wjidy5gLhtv', 'Malcolm Petersen', 0),
(17, 'jmarcosg', '9hgLKDs', 'James Marcos', 0),
(18, 'tgaberh', 'HCCsJNwRLgw', 'Tami Gaber', 0),
(19, 'lclaridgei', 'Xm3w6RhTzi', 'Letti Claridge', 0),
(20, 'ldorsayj', 'VMT4xQ7u', 'Lawry D\'orsay', 0),
(21, 'cmckernank', 'urJFHfy', 'Clarissa McKernan', 0),
(22, 'pperol', 'T4ODmWg', 'Phylys Pero', 0),
(23, 'aweedsm', 'zOLnpmJHKK', 'Anne-corinne Weeds', 0),
(24, 'hyendalln', 'YF3P4ee', 'Heda Yendall', 0),
(25, 'bbyko', 'tuiYeIrUg0', 'Boony Byk', 0),
(26, 'wgoldap', 'Z2vGrIE', 'Willow Golda', 0),
(27, 'gpresswellq', 'BpVr8ZyuC8JP', 'Gwenora Presswell', 0),
(28, 'lduminir', 'nme7lB5cP', 'Letty Dumini', 0),
(29, 'eowbridges', 'E5jYPGKqp', 'Edie Owbridge', 0),
(30, 'kiacopot', '2q5Xx1kc', 'Kerr Iacopo', 0),
(31, 'azorziu', 'VkudHc3', 'Antonio Zorzi', 0),
(32, 'spollyv', 'SSJs3m4Tte', 'Samuele Polly', 0),
(33, 'mstanesbyw', '3rAEunopY1Zq', 'Mirabel Stanesby', 0),
(34, 'elippox', 'NNcrO65i', 'Emlynn Lippo', 0),
(35, 'mcongravey', '4tKG32', 'Mary Congrave', 0),
(36, 'aruxtonz', 'mQMy34cn0', 'Aksel Ruxton', 0),
(37, 'mgaiter10', 'rcsqhOAgL2', 'Mariejeanne Gaiter', 0),
(38, 'gsallans11', 'Oe8pB1Nq', 'Gerek Sallans', 0),
(39, 'kwiffler12', 'sWeqFnqEkj', 'Kevyn Wiffler', 0),
(40, 'dbate13', 'Yy0iwqu', 'Donetta Bate', 0),
(41, 'tlummasana14', 'IgRoaC3MpSk', 'Terence Lummasana', 0),
(42, 'eascrofte15', 'r0j0b7RlXPv4', 'Eugenia Ascrofte', 0),
(43, 'iclemoes16', 'dpPxU3T937hj', 'Ignazio Clemoes', 0),
(44, 'mminico17', 'A6RMQ3NLqs', 'Mark Minico', 0),
(45, 'ade18', 'yAFhurM9Z', 'Ashley De Gowe', 0),
(46, 'tnorheny19', 'Y4STq0CJs', 'Therine Norheny', 0),
(47, 'gbowart1a', '5uNyho1Tvxh', 'Garret Bowart', 0),
(48, 'lmccaskell1b', 'U0LfmepA9l', 'Lucian McCaskell', 0),
(49, 'bcrumbie1c', 'Xgfcabg', 'Benedick Crumbie', 0),
(50, 'oelph1d', '6Xcyfer', 'Osmond Elph', 0),
(51, 'super', '', '', 0),
(52, 'admin', 'adminn', '', 0),
(53, 'jaska', 'jaska', '', 0),
(54, 'antti', 'antti', '', 0),
(55, 'jonne', 'jonne', '', 0),
(56, 'ville', 'ville', 'ville', 0),
(57, 'eetukay', 'Tunnus', 'Eetu Pekka Käyhkö', 0);

-- --------------------------------------------------------

--
-- Stand-in structure for view `kayttajanakyma`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `kayttajanakyma`;
CREATE TABLE IF NOT EXISTS `kayttajanakyma` (
`id` int(11)
,`Nimi` varchar(64)
,`Tunnus` varchar(64)
,`salasana` varchar(64)
,`poistettu` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `laite`
--

DROP TABLE IF EXISTS `laite`;
CREATE TABLE IF NOT EXISTS `laite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kategoria_id` int(11) DEFAULT NULL,
  `merkki` varchar(64) DEFAULT NULL,
  `malli` varchar(64) DEFAULT NULL,
  `sijainti` varchar(64) DEFAULT NULL,
  `status` bit(1) NOT NULL DEFAULT b'0',
  `omistaja_id` int(11) DEFAULT NULL,
  `poistettu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `omistaja` (`omistaja_id`) USING BTREE,
  KEY `kategoria` (`kategoria_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `laite`
--

INSERT INTO `laite` (`id`, `kategoria_id`, `merkki`, `malli`, `sijainti`, `status`, `omistaja_id`, `poistettu`) VALUES
(5, 5, 'acergbhb', 'iconia', 'Finland', b'1', 7, 0),
(7, 6, 'acer', 'iconia', 'Sweden', b'0', 4, 0),
(8, 4, 'huawei', 'iconia', 'Sweden', b'1', 19, 0),
(9, 3, 'nokia', 'maxtrack', 'Sweden', b'1', 10, 0),
(10, 5, 'lenovo', 'ideapad', 'Sweden', b'0', 4, 0),
(11, 4, 'nokia', 'galaxy', 'Sweden', b'1', 10, 0),
(12, 3, 'nokia', 'ideapad', 'Sweden', b'0', 11, 0),
(13, 5, 'hp', 'maxtrack', 'Finland', b'1', 18, 0),
(14, 3, 'nokia', 'envy', 'Sweden', b'0', 7, 0),
(15, 4, 'samsung', 'mediapad', 'Sweden', b'1', 18, 0),
(16, 7, 'sony', 'galaxy', 'Sweden', b'0', 12, 0),
(17, 1, 'htc', 'iconia', 'Finland', b'0', 13, 0),
(18, 3, 'htc', 'spin', 'Sweden', b'0', 9, 0),
(19, 2, 'htc', 'iconia', 'Sweden', b'0', 18, 0),
(20, 6, 'asus', 'm171', 'Sweden', b'0', 11, 0),
(21, 5, 'sony', 'sandstorm', 'Sweden', b'0', 13, 0),
(22, 1, 'samsung', 'mediapad', 'Sweden', b'0', 18, 0),
(23, 1, 'asus', 'maxtrack', 'Sweden', b'0', 14, 0),
(24, 5, 'hp', 'm171', 'Sweden', b'0', 12, 0),
(25, 3, 'hp', 'galaxy', 'Sweden', b'0', 13, 0),
(26, 1, 'asus', 'm171', 'Sweden', b'0', 17, 0),
(27, 4, 'lenovo', 'mediapad', 'Sweden', b'0', 18, 0),
(28, 4, 'hp', 'iconia', 'Sweden', b'0', 12, 0),
(29, 7, 'htc', 'envy', 'Sweden', b'0', 6, 0),
(30, 2, 'sony', 'm100', 'Sweden', b'0', 7, 0),
(31, 6, 'huawei', 'mediapad', 'Sweden', b'0', 14, 0),
(32, 1, 'hp', 'maxtrack', 'Sweden', b'0', 10, 0),
(33, 7, 'sony', 'maxtrack', 'Sweden', b'0', 9, 0),
(34, 7, 'sony', 'sandstorm', 'Sweden', b'0', 20, 0),
(35, 1, 'htc', 'm100', 'Sweden', b'0', 3, 0),
(36, 1, 'hp', 'm100', 'Finland', b'0', 10, 0),
(37, 3, 'lenovo', 'm171', 'Finland', b'0', 6, 0),
(38, 5, 'acer', 'maxtrack', 'Sweden', b'0', 2, 0),
(39, 3, 'hp', 'sandstorm', 'Sweden', b'0', 13, 0),
(40, 6, 'huawei', 'maxtrack', 'Sweden', b'0', 12, 0),
(41, 1, 'sony', 'sandstorm', 'Sweden', b'0', 20, 0),
(42, 6, 'asus', 'galaxy', 'Sweden', b'0', 17, 0),
(43, 5, 'htc', 'sandstorm', 'Sweden', b'0', 8, 0),
(44, 2, 'samsung', 'ideapad', 'Sweden', b'0', 20, 0),
(45, 1, 'lenovo', 'm171', 'Sweden', b'0', 6, 0),
(46, 7, 'acer', 'galaxy', 'Sweden', b'0', 15, 0),
(47, 5, 'samsung', 'ideapad', 'Sweden', b'0', 5, 0),
(48, 5, 'htc', 'ideapad', 'Finland', b'0', 14, 0),
(49, 5, 'acer', 'swift', 'Sweden', b'0', 17, 0),
(50, 4, 'samsung', 'sandstorm', 'Sweden', b'0', 13, 0),
(51, 3, 'nokia', 'ideapad', 'Sweden', b'0', 16, 0),
(52, 3, 'asus', 'm171', 'Sweden', b'0', 13, 0),
(53, 1, 'huawei', 'swift', 'Sweden', b'0', 13, 0),
(54, 4, 'samsung', 'spin', 'Finland', b'0', 11, 0),
(55, 1, 'hp', 'iconia', 'Sweden', b'0', 4, 0),
(56, 5, 'acer', 'm171', 'Sweden', b'0', 20, 0),
(57, 7, 'samsung', 'galaxy', 'Sweden', b'0', 3, 0),
(58, 4, 'nokia', 'sandstorm', 'Sweden', b'0', 7, 0),
(59, 6, 'huawei', 'iconia', 'Sweden', b'0', 4, 0),
(60, 4, 'acer', 'ideapad', 'Sweden', b'0', 3, 0),
(61, 1, 'huawei', 'm100', 'Finland', b'0', 17, 0),
(62, 3, 'huawei', 'galaxy', 'Sweden', b'0', 15, 0),
(63, 3, 'sony', 'm100', 'Sweden', b'0', 20, 0),
(64, 1, 'sony', 'sandstorm', 'Sweden', b'0', 5, 0),
(65, 2, 'samsung', 'swift', 'Finland', b'0', 4, 0),
(66, 3, 'samsung', 'sandstorm', 'Sweden', b'0', 6, 0),
(67, 7, 'asus', 'm100', 'Sweden', b'0', 12, 0),
(68, 5, 'htc', 'swift', 'Sweden', b'0', 2, 0),
(69, 5, 'asus', 'm100', 'Finland', b'0', 9, 0),
(70, 1, 'hp', 'mediapad', 'Sweden', b'0', 4, 0),
(71, 1, 'asus', 'galaxy', 'Sweden', b'0', 17, 0),
(72, 2, 'huawei', 'mediapad', 'Sweden', b'0', 11, 0),
(73, 5, 'sony', 'spin', 'Sweden', b'0', 17, 0),
(74, 2, 'sony', 'ideapad', 'Sweden', b'0', 19, 0),
(75, 4, 'nokia', 'spin', 'Sweden', b'0', 2, 0),
(76, 2, 'samsung', 'spin', 'Sweden', b'0', 17, 0),
(77, 7, 'lenovo', 'spin', 'Sweden', b'0', 2, 0),
(78, 5, 'asus', 'sandstorm', 'Sweden', b'1', 18, 0),
(79, 2, 'nokia', 'ideapad', 'Sweden', b'0', 6, 0),
(80, 3, 'samsung', 'maxtrack', 'Finland', b'0', 17, 0),
(81, 1, 'asus', 'm171', 'Sweden', b'0', 1, 0),
(82, 7, 'hp', 'ideapad', 'Sweden', b'0', 8, 0),
(83, 6, 'lenovo', 'spin', 'Sweden', b'0', 14, 0),
(84, 2, 'lenovo', 'maxtrack', 'Sweden', b'0', 2, 0),
(85, 7, 'asus', 'ideapad', 'Sweden', b'0', 9, 0),
(86, 2, 'htc', 'swift', 'Sweden', b'0', 20, 0),
(87, 6, 'htc', 'envy', 'Sweden', b'0', 9, 0),
(88, 7, 'asus', 'm100', 'Sweden', b'0', 19, 0),
(89, 5, 'sony', 'envy', 'Sweden', b'0', 9, 0),
(90, 7, 'htc', 'm100', 'Sweden', b'0', 18, 0),
(91, 7, 'huawei', 'spin', 'Sweden', b'0', 6, 0),
(92, 7, 'samsung', 'm100', 'Sweden', b'0', 6, 0),
(93, 6, 'hp', 'swift', 'Sweden', b'0', 17, 0),
(94, 5, 'htc', 'maxtrack', 'Sweden', b'0', 1, 0),
(95, 4, 'acer', 'spin', 'Sweden', b'0', 17, 0),
(96, 1, 'samsung', 'm171', 'Finland', b'0', 8, 0),
(97, 6, 'samsung', 'iconia', 'Sweden', b'0', 13, 0),
(98, 5, 'nokia', 'ideapad', 'Sweden', b'0', 3, 0),
(99, 4, 'acer', 'galaxy', 'Sweden', b'0', 20, 0),
(100, 2, 'nokia', 'sandstorm', 'Finland', b'0', 20, 0),
(101, 1, 'Pörpö', 'Örpö', 'Pörpölä', b'0', 19, 0);

-- --------------------------------------------------------

--
-- Stand-in structure for view `laitenakyma`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `laitenakyma`;
CREATE TABLE IF NOT EXISTS `laitenakyma` (
`Kategoria` text
,`Merkki` varchar(64)
,`id` int(11)
,`Malli` varchar(64)
,`Sijainti` varchar(64)
,`Omistaja` text
,`Status` bit(1)
,`CASE laite.status WHEN 0 THEN "vapaa" ELSE "lainassa" END` varchar(8)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `laitenakymabakup`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `laitenakymabakup`;
CREATE TABLE IF NOT EXISTS `laitenakymabakup` (
`Kategoria` text
,`Merkki` varchar(64)
,`id` int(11)
,`Malli` varchar(64)
,`Sijainti` varchar(64)
,`Omistaja` text
);

-- --------------------------------------------------------

--
-- Table structure for table `omistaja`
--

DROP TABLE IF EXISTS `omistaja`;
CREATE TABLE IF NOT EXISTS `omistaja` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nimi` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `omistaja`
--

INSERT INTO `omistaja` (`id`, `nimi`) VALUES
(1, 'Sonny Treves'),
(2, 'Dion Biddell'),
(3, 'Lorenza Trayes'),
(4, 'Rolland Sheircliffe'),
(5, 'Wrennie Mitford'),
(6, 'Violette Durbin'),
(7, 'Celestia Bountiff'),
(8, 'Charley Revens'),
(9, 'Madelyn Theakston'),
(10, 'Wilona Mell'),
(11, 'Noble Genney'),
(12, 'Camille Pimme'),
(13, 'Annis Goddert.sf'),
(14, 'Shandy Liddon'),
(15, 'Jobye Cerro'),
(16, 'Delly McGlew'),
(17, 'Harold Lindeboom'),
(18, 'Arabelle Bachshell'),
(19, 'Emilia Yarn'),
(20, 'Shelden Byron');

-- --------------------------------------------------------

--
-- Table structure for table `varaus`
--

DROP TABLE IF EXISTS `varaus`;
CREATE TABLE IF NOT EXISTS `varaus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `laite_id` int(11) NOT NULL,
  `kayttaja_id` int(11) NOT NULL,
  `alkupvm` date DEFAULT NULL,
  `loppupvm` date DEFAULT NULL,
  `status` tinyint(3) NOT NULL DEFAULT '0',
  `poistettu` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `laite_id` (`laite_id`) USING BTREE,
  KEY `kayttaja_id` (`kayttaja_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `varaus`
--

INSERT INTO `varaus` (`id`, `laite_id`, `kayttaja_id`, `alkupvm`, `loppupvm`, `status`, `poistettu`) VALUES
(1, 28, 27, '2018-12-04', '2018-12-19', 1, 0),
(2, 51, 44, '2017-09-13', '2018-01-30', 1, 0),
(3, 39, 34, '2016-11-07', '2017-12-20', 1, 0),
(4, 78, 12, '2018-12-19', '2018-12-21', 2, 0),
(6, 77, 19, '2018-12-19', '2018-12-21', 1, 0),
(10, 11, 50, '2018-12-19', '2018-12-27', 2, 0),
(11, 23, 26, '2016-12-13', '2018-11-05', 0, 0),
(13, 10, 11, '2016-12-22', '2018-07-30', 0, 0),
(16, 48, 24, '2017-07-29', '2017-12-26', 0, 0),
(18, 45, 8, '2017-01-25', '2018-08-13', 0, 0),
(20, 24, 41, '2017-04-11', '2018-08-19', 0, 0),
(22, 55, 39, '2016-11-20', '2018-02-04', 0, 0),
(23, 43, 16, '2017-10-03', '2017-11-07', 0, 0),
(25, 22, 30, '2017-04-16', '2018-02-06', 0, 0),
(26, 20, 20, '2016-12-13', '2018-10-05', 0, 0),
(28, 30, 4, '2016-11-17', '2018-04-13', 0, 0),
(29, 40, 48, '2017-08-28', '2018-10-30', 0, 0),
(31, 33, 1, '2017-03-18', '2017-11-22', 0, 0),
(32, 89, 15, '2017-10-23', '2018-05-17', 0, 0),
(33, 65, 29, '2016-12-09', '2018-07-26', 0, 0),
(34, 84, 45, '2017-04-27', '2017-11-30', 0, 0),
(37, 29, 47, '2017-08-06', '2017-11-08', 0, 0),
(41, 52, 5, '2017-02-03', '2018-09-10', 0, 0),
(53, 77, 19, '2017-08-31', '2017-12-28', 0, 0),
(54, 28, 8, '2016-11-09', '2018-11-01', 0, 0),
(55, 77, 44, '2017-06-28', '2018-01-03', 0, 0),
(56, 82, 19, '2017-07-10', '2017-12-13', 0, 0),
(57, 11, 50, '2017-04-21', '2018-04-13', 0, 0),
(58, 23, 26, '2016-12-13', '2018-11-05', 0, 0),
(60, 10, 11, '2016-12-22', '2018-07-30', 0, 0),
(61, 72, 50, '2017-04-30', '2018-07-04', 0, 0),
(63, 48, 24, '2017-07-29', '2017-12-26', 0, 0),
(64, 77, 40, '2017-07-23', '2018-07-09', 0, 0),
(65, 45, 8, '2017-01-25', '2018-08-13', 0, 0),
(66, 49, 24, '2017-03-26', '2018-02-13', 0, 0),
(67, 24, 41, '2017-04-11', '2018-08-19', 0, 0),
(68, 77, 20, '2017-08-14', '2018-03-19', 0, 0),
(69, 55, 39, '2016-11-20', '2018-02-04', 0, 0),
(70, 43, 16, '2017-10-03', '2017-11-07', 0, 0),
(72, 22, 30, '2017-04-16', '2018-02-06', 0, 0),
(73, 20, 20, '2016-12-13', '2018-10-05', 0, 0),
(74, 78, 44, '2017-05-03', '2018-01-03', 0, 0),
(75, 30, 4, '2016-11-17', '2018-04-13', 0, 0),
(76, 40, 48, '2017-08-28', '2018-10-30', 0, 0),
(77, 81, 39, '2017-01-08', '2018-10-28', 0, 0),
(78, 33, 1, '2017-03-18', '2017-11-22', 0, 0),
(79, 89, 15, '2017-10-23', '2018-05-17', 0, 0),
(80, 65, 29, '2016-12-09', '2018-07-26', 0, 0),
(81, 84, 45, '2017-04-27', '2017-11-30', 0, 0),
(83, 86, 50, '2017-08-12', '2018-04-27', 0, 0),
(84, 29, 47, '2017-08-06', '2017-11-08', 0, 0),
(85, 45, 15, '2016-11-13', '2018-06-20', 0, 0),
(86, 78, 41, '2017-08-17', '2017-12-17', 0, 0),
(87, 80, 35, '2017-02-20', '2018-03-21', 0, 0),
(88, 52, 5, '2017-02-03', '2018-09-10', 0, 0),
(89, 76, 20, '2017-02-03', '2018-08-25', 0, 0),
(90, 15, 1, '2017-11-01', '2018-02-24', 1, 0),
(91, 49, 19, '2016-12-11', '2018-07-07', 0, 0),
(92, 29, 36, '2017-03-30', '2018-11-05', 0, 0),
(93, 10, 47, '2017-05-23', '2018-08-05', 0, 0),
(94, 11, 7, '2017-06-30', '2018-07-17', 0, 0),
(95, 50, 8, '2017-09-19', '2018-05-09', 0, 0),
(96, 68, 15, '2016-11-23', '2017-11-08', 0, 0),
(97, 51, 21, '2017-06-03', '2018-01-23', 0, 0),
(98, 20, 37, '2017-04-11', '2017-12-20', 0, 0),
(99, 88, 43, '2017-10-17', '2018-08-22', 0, 0),
(100, 41, 17, '2017-08-04', '2018-10-29', 0, 0),
(101, 41, 24, '2017-07-18', '2018-09-17', 0, 0),
(102, 67, 8, '2016-11-12', '2018-06-11', 0, 0),
(103, 77, 40, '2017-01-10', '2018-03-20', 0, 0),
(104, 52, 4, '2016-11-29', '2018-06-08', 0, 0),
(105, 82, 11, '2017-11-02', '2018-09-12', 0, 0),
(106, 85, 48, '2017-01-09', '2018-01-31', 0, 0),
(107, 36, 12, '2017-03-25', '2017-12-11', 0, 0),
(108, 89, 46, '2017-08-08', '2017-11-27', 0, 0),
(109, 32, 48, '2017-06-04', '2018-10-31', 0, 0),
(110, 77, 23, '2017-03-21', '2018-03-24', 0, 0),
(111, 28, 46, '2017-06-14', '2017-11-08', 0, 0),
(112, 63, 38, '2017-10-01', '2018-09-28', 0, 0),
(113, 29, 44, '2016-12-16', '2017-11-14', 0, 0),
(114, 23, 35, '2016-12-10', '2018-06-25', 0, 0),
(115, 25, 30, '2017-02-24', '2018-09-18', 0, 0),
(116, 50, 11, '2017-08-27', '2018-02-04', 0, 0),
(118, 17, 10, '2017-03-22', '2018-06-24', 0, 0),
(119, 52, 21, '2017-10-19', '2018-10-23', 0, 0),
(120, 65, 43, '2017-02-07', '2017-12-26', 0, 0),
(121, 51, 40, '2017-08-14', '2018-05-24', 0, 0),
(122, 12, 37, '2016-11-06', '2018-07-16', 0, 0),
(123, 22, 9, '2017-09-22', '2018-04-09', 0, 0),
(124, 31, 47, '2017-09-28', '2018-02-10', 0, 0),
(125, 63, 24, '2017-08-14', '2018-07-31', 0, 0),
(126, 80, 3, '2017-10-20', '2018-07-08', 0, 0),
(127, 53, 35, '2017-04-08', '2018-02-20', 0, 0),
(128, 35, 50, '2017-06-23', '2018-02-11', 0, 0),
(129, 36, 48, '2016-12-10', '2018-10-08', 0, 0),
(130, 27, 1, '2017-01-19', '2018-05-29', 0, 0),
(131, 87, 19, '2017-02-14', '2018-06-06', 0, 0),
(132, 86, 8, '2017-02-28', '2018-06-10', 0, 0),
(133, 10, 22, '2017-07-11', '2017-11-19', 0, 0),
(134, 41, 38, '2017-06-15', '2018-05-24', 0, 0),
(135, 90, 16, '2017-01-30', '2018-07-26', 0, 0),
(136, 42, 25, '2016-11-08', '2018-01-17', 0, 0),
(137, 11, 16, '2017-08-05', '2018-04-15', 0, 0),
(138, 72, 7, '2017-05-28', '2018-09-05', 0, 0),
(139, 72, 50, '2017-02-05', '2018-01-05', 0, 0),
(140, 87, 11, '2017-08-05', '2018-08-17', 0, 0),
(141, 27, 34, '2017-04-03', '2018-01-13', 0, 0),
(142, 40, 2, '2017-10-13', '2018-03-24', 0, 0),
(143, 78, 23, '2016-12-12', '2018-06-01', 0, 0),
(145, 14, 26, '2017-04-18', '2018-06-16', 0, 0),
(146, 11, 27, '2017-03-26', '2017-11-24', 0, 0),
(147, 42, 38, '2017-08-02', '2018-10-15', 0, 0),
(148, 73, 20, '2016-11-17', '2018-10-13', 0, 0),
(150, 35, 20, '2017-01-01', '2018-01-11', 0, 0),
(151, 76, 31, '2017-05-25', '2018-10-08', 0, 0),
(153, 54, 36, '2017-02-20', '2018-03-10', 0, 0),
(154, 59, 3, '2017-09-06', '2018-07-13', 0, 0),
(155, 87, 20, '2017-09-06', '2018-06-25', 0, 0),
(156, 7, 34, '2017-08-10', '2018-07-28', 0, 0),
(157, 84, 10, '2016-12-12', '2018-10-25', 0, 0),
(158, 79, 5, '2017-10-18', '2018-10-07', 0, 0),
(159, 50, 8, '2017-08-16', '2018-04-01', 0, 0),
(160, 49, 35, '2017-04-30', '2018-07-02', 0, 0),
(161, 44, 8, '2017-03-20', '2018-07-25', 0, 0),
(162, 58, 14, '2017-09-22', '2018-08-22', 0, 0),
(163, 80, 16, '2017-08-11', '2018-04-29', 0, 0),
(164, 60, 38, '2017-09-16', '2018-05-16', 0, 0),
(165, 60, 22, '2017-06-09', '2018-08-31', 0, 0),
(166, 79, 46, '2017-06-28', '2018-04-16', 0, 0),
(167, 56, 50, '2017-05-13', '2018-09-16', 0, 0),
(168, 55, 3, '2017-06-15', '2018-09-18', 0, 0),
(169, 9, 6, '2017-09-10', '2017-12-24', 0, 0),
(170, 87, 48, '2017-07-12', '2017-11-11', 0, 0),
(171, 85, 49, '2017-03-16', '2018-01-09', 0, 0),
(172, 19, 48, '2017-06-14', '2017-12-23', 0, 0),
(173, 17, 4, '2017-09-16', '2018-09-05', 0, 0),
(174, 12, 24, '2016-11-29', '2018-05-25', 1, 0),
(175, 37, 46, '2017-01-27', '2018-10-13', 0, 0),
(176, 79, 22, '2017-10-19', '2018-08-05', 0, 0),
(177, 29, 38, '2017-01-28', '2018-01-27', 0, 0),
(178, 56, 31, '2017-08-15', '2018-05-20', 0, 0),
(179, 66, 11, '2017-06-12', '2017-12-24', 0, 0),
(180, 72, 33, '2017-04-23', '2018-10-01', 0, 0),
(181, 32, 36, '2017-02-24', '2017-12-13', 0, 0),
(182, 21, 29, '2017-09-22', '2018-09-25', 0, 0),
(183, 67, 24, '2016-11-07', '2017-11-09', 0, 0),
(184, 28, 38, '2017-04-06', '2017-12-16', 0, 0),
(185, 26, 48, '2017-04-18', '2018-02-26', 0, 0),
(186, 16, 36, '2017-03-06', '2018-06-01', 0, 0),
(187, 49, 45, '2017-01-30', '2018-10-17', 0, 0),
(188, 90, 13, '2017-01-20', '2017-11-13', 0, 0),
(189, 31, 27, '2017-07-16', '2018-06-26', 0, 0),
(190, 28, 28, '2017-02-13', '2018-04-04', 0, 0),
(191, 30, 25, '2017-10-12', '2018-01-16', 0, 0),
(192, 55, 9, '2017-07-28', '2018-01-27', 0, 0),
(193, 26, 7, '2017-03-26', '2018-06-04', 0, 0),
(194, 14, 43, '2016-11-24', '2018-07-19', 0, 0),
(195, 84, 22, '2017-04-02', '2018-03-11', 0, 0),
(196, 60, 1, '2016-12-08', '2018-04-05', 0, 0),
(197, 5, 7, '2017-03-06', '2018-01-29', 0, 0),
(198, 9, 52, '2018-12-01', '2018-12-05', 0, 0),
(199, 9, 56, '2018-12-16', '2018-12-20', 0, 0),
(201, 9, 57, '2018-12-15', '2018-12-18', 1, 0),
(204, 28, 57, '2018-12-11', '2018-12-19', 0, 0),
(205, 28, 57, '2018-12-11', '2018-12-19', 0, 0),
(206, 28, 57, '2018-12-05', '2018-12-11', 0, 0),
(207, 28, 57, '2018-12-05', '2018-12-11', 0, 0),
(208, 28, 57, '2018-12-05', '2018-12-07', 0, 0),
(209, 28, 57, '2018-12-04', '2018-12-06', 0, 0),
(210, 28, 57, '2018-12-05', '2018-12-07', 0, 0),
(211, 28, 57, '2018-12-04', '2018-12-06', 0, 0),
(212, 28, 57, '2018-12-04', '2018-12-06', 0, 0),
(213, 28, 57, '2018-12-05', '2018-12-07', 0, 0),
(214, 28, 57, '2018-12-05', '2018-12-06', 0, 0),
(215, 28, 57, '2018-12-05', '2018-12-06', 0, 0),
(216, 28, 57, '2018-12-05', '2018-12-06', 0, 0),
(217, 28, 57, '2018-12-05', '2018-12-06', 0, 0),
(218, 28, 57, '2018-12-04', '2018-12-06', 0, 0),
(219, 28, 57, '2018-12-05', '2018-12-06', 0, 0),
(220, 28, 57, '2018-12-05', '2018-12-06', 0, 0),
(221, 28, 57, '2018-12-05', '2018-12-07', 0, 0),
(222, 28, 52, '2018-12-05', '2018-12-06', 0, 0),
(223, 28, 52, '2018-12-05', '2018-12-06', 0, 0),
(224, 28, 57, '2018-12-05', '2018-12-06', 0, 0),
(225, 28, 57, '2018-12-04', '2018-12-06', 0, 0),
(226, 28, 57, '2018-12-02', '2018-12-20', 0, 0),
(227, 7, 57, '2018-12-04', '2018-12-06', 0, 0),
(228, 7, 57, '2018-12-24', '2018-12-28', 0, 0),
(229, 7, 57, '2019-06-13', '2020-04-09', 0, 0),
(231, 30, 57, '2018-12-19', '2018-12-31', 0, 0),
(232, 35, 57, '2018-12-19', '2018-12-31', 0, 0),
(235, 101, 57, '2018-12-19', '2018-12-31', 0, 0),
(236, 101, 57, '2019-01-13', '2019-01-19', 1, 0);

-- --------------------------------------------------------

--
-- Stand-in structure for view `varausnakyma`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `varausnakyma`;
CREATE TABLE IF NOT EXISTS `varausnakyma` (
`varausid` int(11)
,`laiteid` int(11)
,`kayttajaid` int(11)
,`merkki` varchar(64)
,`malli` varchar(64)
,`alkupvm` date
,`loppupvm` date
,`varaaja` varchar(64)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `varausnakyma1`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `varausnakyma1`;
CREATE TABLE IF NOT EXISTS `varausnakyma1` (
`varausid` int(11)
,`laiteid` int(11)
,`kayttajaid` int(11)
,`merkki` varchar(64)
,`malli` varchar(64)
,`alkupvm` date
,`loppupvm` date
,`varaaja` varchar(64)
,`kategoria` text
,`status` bit(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `varausnakyma2`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `varausnakyma2`;
CREATE TABLE IF NOT EXISTS `varausnakyma2` (
`varausid` int(11)
,`laiteid` int(11)
,`kayttajaid` int(11)
,`merkki` varchar(64)
,`malli` varchar(64)
,`alkupvm` date
,`loppupvm` date
,`varaaja` varchar(64)
,`kategoria` text
,`status` bit(1)
,`varausstatus` tinyint(3)
);

-- --------------------------------------------------------

--
-- Structure for view `kayttajanakyma`
--
DROP TABLE IF EXISTS `kayttajanakyma`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `kayttajanakyma`  AS  select `kayttaja`.`id` AS `id`,`kayttaja`.`nimi` AS `Nimi`,`kayttaja`.`tunnus` AS `Tunnus`,`kayttaja`.`salasana` AS `salasana`,`kayttaja`.`poistettu` AS `poistettu` from `kayttaja` ;

-- --------------------------------------------------------

--
-- Structure for view `laitenakyma`
--
DROP TABLE IF EXISTS `laitenakyma`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `laitenakyma`  AS  select `kategoria`.`kategoria` AS `Kategoria`,`laite`.`merkki` AS `Merkki`,`laite`.`id` AS `id`,`laite`.`malli` AS `Malli`,`laite`.`sijainti` AS `Sijainti`,`omistaja`.`nimi` AS `Omistaja`,`laite`.`status` AS `Status`,(case `laite`.`status` when 0 then 'vapaa' else 'lainassa' end) AS `CASE laite.status WHEN 0 THEN "vapaa" ELSE "lainassa" END` from ((`laite` left join `omistaja` on((`laite`.`omistaja_id` = `omistaja`.`id`))) left join `kategoria` on((`laite`.`kategoria_id` = `kategoria`.`id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `laitenakymabakup`
--
DROP TABLE IF EXISTS `laitenakymabakup`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `laitenakymabakup`  AS  select `kategoria`.`kategoria` AS `Kategoria`,`laite`.`merkki` AS `Merkki`,`laite`.`id` AS `id`,`laite`.`malli` AS `Malli`,`laite`.`sijainti` AS `Sijainti`,`omistaja`.`nimi` AS `Omistaja` from ((`laite` left join `omistaja` on((`laite`.`omistaja_id` = `omistaja`.`id`))) left join `kategoria` on((`laite`.`kategoria_id` = `kategoria`.`id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `varausnakyma`
--
DROP TABLE IF EXISTS `varausnakyma`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `varausnakyma`  AS  select `varaus`.`id` AS `varausid`,`varaus`.`laite_id` AS `laiteid`,`kayttaja`.`id` AS `kayttajaid`,`laite`.`merkki` AS `merkki`,`laite`.`malli` AS `malli`,`varaus`.`alkupvm` AS `alkupvm`,`varaus`.`loppupvm` AS `loppupvm`,`kayttaja`.`nimi` AS `varaaja` from ((`varaus` left join `laite` on((`varaus`.`laite_id` = `laite`.`id`))) left join `kayttaja` on((`varaus`.`kayttaja_id` = `kayttaja`.`id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `varausnakyma1`
--
DROP TABLE IF EXISTS `varausnakyma1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `varausnakyma1`  AS  select `varaus`.`id` AS `varausid`,`varaus`.`laite_id` AS `laiteid`,`varaus`.`kayttaja_id` AS `kayttajaid`,`laite`.`merkki` AS `merkki`,`laite`.`malli` AS `malli`,`varaus`.`alkupvm` AS `alkupvm`,`varaus`.`loppupvm` AS `loppupvm`,`kayttaja`.`nimi` AS `varaaja`,`kategoria`.`kategoria` AS `kategoria`,`laite`.`status` AS `status` from (((`varaus` left join `kayttaja` on((`varaus`.`kayttaja_id` = `kayttaja`.`id`))) left join `laite` on((`varaus`.`laite_id` = `laite`.`id`))) left join `kategoria` on((`laite`.`kategoria_id` = `kategoria`.`id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `varausnakyma2`
--
DROP TABLE IF EXISTS `varausnakyma2`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `varausnakyma2`  AS  select `varaus`.`id` AS `varausid`,`varaus`.`laite_id` AS `laiteid`,`kayttaja`.`id` AS `kayttajaid`,`laite`.`merkki` AS `merkki`,`laite`.`malli` AS `malli`,`varaus`.`alkupvm` AS `alkupvm`,`varaus`.`loppupvm` AS `loppupvm`,`kayttaja`.`nimi` AS `varaaja`,`kategoria`.`kategoria` AS `kategoria`,`laite`.`status` AS `status`,`varaus`.`status` AS `varausstatus` from (((`varaus` left join `laite` on((`varaus`.`laite_id` = `laite`.`id`))) left join `kayttaja` on((`varaus`.`kayttaja_id` = `kayttaja`.`id`))) left join `kategoria` on((`laite`.`kategoria_id` = `kategoria`.`id`))) ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `laite`
--
ALTER TABLE `laite`
  ADD CONSTRAINT `laite_ibfk_2` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `laite_ibfk_3` FOREIGN KEY (`omistaja_id`) REFERENCES `omistaja` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `varaus`
--
ALTER TABLE `varaus`
  ADD CONSTRAINT `varaus_ibfk_1` FOREIGN KEY (`kayttaja_id`) REFERENCES `kayttaja` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `varaus_ibfk_2` FOREIGN KEY (`laite_id`) REFERENCES `laite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
