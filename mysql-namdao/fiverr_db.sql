


CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `skill` varchar(255) DEFAULT NULL,
  `certification` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;;

INSERT INTO `Users` (`user_id`, `user_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `avatar`) VALUES
(2, 'namdao2@gmail.com', 'namdao2@gmail.com', '$2b$04$2thzGqPw7tpY8glB/5klp.O3F3HnqXJzESdD/qY7eh9ED0Lo7Tblm', '0', '1990-02-24', 'male', 'admin', 'abc', 'sdc', '');

CREATE TABLE `Job` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `job_name` varchar(255) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `short_description` varchar(200) DEFAULT NULL,
  `job_rating` int DEFAULT NULL,
  `detail_type_id` int DEFAULT NULL,
  `creator_id` int DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  KEY `detail_type_id` (`detail_type_id`),
  KEY `creator_id` (`creator_id`),
  CONSTRAINT `Job_ibfk_1` FOREIGN KEY (`detail_type_id`) REFERENCES `JobDetailType` (`job_detail_type_id`),
  CONSTRAINT `Job_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;;

INSERT INTO `Job` (`job_id`, `job_name`, `rating`, `price`, `image`, `description`, `short_description`, `job_rating`, `detail_type_id`, `creator_id`) VALUES
(1, 'Developer', 2, 1000, 'string', 'string', 'string', 2, 2, 2);


CREATE TABLE `JobType` (
  `job_type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`job_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;;

INSERT INTO `JobType` (`job_type_id`, `type_name`) VALUES
(2, 'DEV'),
(4, 'Digital maketing'),
(6, 'EDIT VIDEO'),
(7, 'EDIT VIDEO');


CREATE TABLE `JobDetailType` (
  `job_detail_type_id` int NOT NULL AUTO_INCREMENT,
  `detail_name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `job_type_id` int DEFAULT NULL,
  PRIMARY KEY (`job_detail_type_id`),
  KEY `job_type_id` (`job_type_id`),
  CONSTRAINT `JobDetailType_ibfk_1` FOREIGN KEY (`job_type_id`) REFERENCES `JobType` (`job_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;;

INSERT INTO `JobDetailType` (`job_detail_type_id`, `detail_name`, `image`, `job_type_id`) VALUES
(2, 'DEV FULL', '1710425333596z5232928727414_41de5d550023a87a451f9e305a11ba79.jpg', 2),
(3, 'DEV BE', 'string', 2);
CREATE TABLE `HireJob` (
  `hire_job_id` int NOT NULL AUTO_INCREMENT,
  `job_id` int DEFAULT NULL,
  `employer_id` int DEFAULT NULL,
  `hire_date` datetime DEFAULT NULL,
  `completed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`hire_job_id`),
  KEY `job_id` (`job_id`),
  KEY `employer_id` (`employer_id`),
  CONSTRAINT `HireJob_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `Job` (`job_id`),
  CONSTRAINT `HireJob_ibfk_2` FOREIGN KEY (`employer_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;;

INSERT INTO `HireJob` (`hire_job_id`, `job_id`, `employer_id`, `hire_date`, `completed`) VALUES
(4, 1, 2, '2024-03-14 15:30:00', 1),
(8, 1, 2, '2024-03-14 15:30:00', 1),
(9, 1, 2, '2024-03-14 17:45:00', 1);
