CREATE TABLE IF NOT EXISTS `cards` (
  `Task` varchar(255) DEFAULT NULL,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `board_id` varchar(255) DEFAULT NULL,
  `position` int(11) NOT NULL DEFAULT 100,
  `id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;