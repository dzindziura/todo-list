CREATE TABLE `cards` (
  `Task` varchar(255) DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `board_id` varchar(255) DEFAULT NULL,
  `position` int(11) NOT NULL DEFAULT 100,
  `id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;