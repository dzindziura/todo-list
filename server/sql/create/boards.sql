CREATE TABLE IF NOT EXISTS `boards` (
  `id` int(11) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;