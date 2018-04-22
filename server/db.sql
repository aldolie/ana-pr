-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2018 at 08:21 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.1.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ana-pr`
--

-- --------------------------------------------------------

--
-- Table structure for table `analysis`
--

CREATE TABLE `analysis` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `priviledge` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `analysis`
--

INSERT INTO `analysis` (`id`, `name`, `value`, `priviledge`) VALUES
(1, 'Swing Trade', 'Berikut info swing trade minggu ini:', 1),
(2, 'Trade Analysis', 'Berikut info trade analysis minggu ini:', 2);

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `payment_proof` text NOT NULL,
  `priviledge` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `responded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `user_id`, `bank_name`, `account_name`, `account_number`, `payment_proof`, `priviledge`, `status`, `responded_at`) VALUES
(1, 1, 'BCA', 'Andi', '123123', '', 3, 3, '2018-04-22 12:19:57'),
(2, 2, 'BCA', 'Budi', '123456', '', 1, 2, '2018-04-22 12:20:06'),
(3, 3, 'BCA', 'Kiki', '234123', '', 3, 3, '2018-04-22 12:19:57'),
(4, 1, 'BCA', 'Caca', '232312', '', 3, 2, '2018-04-22 12:19:57'),
(5, 1, 'BCA', 'Andi', '123123', '', 1, 3, '2018-04-22 13:51:56'),
(6, 1, 'BCA', 'Andi', '123123', '', 1, 2, '2018-04-22 12:20:06'),
(7, 2, 'BCA', 'Budi', '234234', '', 1, 3, '2018-04-22 12:20:06'),
(8, 2, 'BCA', 'Bakri', '345345', '', 1, 4, '2018-04-22 12:20:06'),
(9, 1, 'BCA', 'Andi', '123123', '', 3, 3, '2018-04-22 12:19:57'),
(10, 1, 'BCA', 'Andi', '123123', '', 1, 4, '2018-04-22 12:20:06'),
(11, 2, 'BCA', 'Budi', '234234', '', 1, 4, '2018-04-22 12:20:06'),
(12, 2, 'BCA', 'Bakri', '345345', '', 3, 2, '2018-04-22 12:19:57'),
(13, 1, 'CIMB', 'Andi', '123123', '', 3, 4, '2018-04-22 13:52:00'),
(14, 1, 'CIMB', 'Budi', '234234', '', 1, 1, '2018-04-22 12:20:06'),
(15, 3, 'BCA', 'AAA', '123123', '', 3, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `activation_token` char(36) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `priviledge` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `date_of_birth` date DEFAULT NULL,
  `country` varchar(255) NOT NULL DEFAULT '',
  `region` varchar(255) NOT NULL DEFAULT '',
  `postal_code` varchar(10) NOT NULL DEFAULT '',
  `phone_number` varchar(20) NOT NULL DEFAULT '',
  `expired_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`, `activation_token`, `active`, `priviledge`, `name`, `date_of_birth`, `country`, `region`, `postal_code`, `phone_number`, `expired_at`) VALUES
(1, 'test@test.com', '21232f297a57a5a743894a0e4a801fc3', 1, NULL, 1, 3, '', NULL, '', '', '', '', '2018-04-22 07:38:20'),
(2, 'testbasic@test.com', 'cc03e747a6afbbcbf8be7668acfebee5', 2, NULL, 1, 1, 'Test Basic', NULL, '', '', '', '', '2018-04-22 12:06:25'),
(3, 'testpro@test.com', 'cc03e747a6afbbcbf8be7668acfebee5', 2, NULL, 1, 3, 'Test Pro', NULL, '', '', '', '', '2018-04-22 12:06:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `analysis`
--
ALTER TABLE `analysis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `analysis`
--
ALTER TABLE `analysis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;