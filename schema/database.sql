CREATE TABLE administrator (
    `id` VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE users (
    `user_id` VARCHAR(100) NOT NULL,
    `organization_name` VARCHAR(200) NOT NULL,
    `user_name` VARCHAR(200) NOT NULL,
    `user_password` VARCHAR(200) NOT NULL,
    `link` VARCHAR(200) NOT NULL,
    `price_per_vote` FLOAT NOT NULL,
    `about` LONGTEXT NOT NULL,
    `vote_deadline` DATE NOT NULL,
    `status`    VARCHAR(20) NOT NULL,
    `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE category (
    `category_id` VARCHAR(100) NOT NULL,
    `category_name` VARCHAR(400) NOT NULL,
    `user_id` VARCHAR(100) NOT NULL,
    `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`category_id`),
    FOREIGN KEY `fk_category_user` (`user_id`) REFERENCES users(`user_id`)
);

CREATE TABLE candidate (
    `candidate_id` VARCHAR(100) NOT NULL,
    `candidate_name` VARCHAR(255) NOT NULL,
    `candidate_profile` VARCHAR(800),
    `user_id` VARCHAR(100) NOT NULL,
    `category_id` VARCHAR(100) NOT NULL,
    `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`candidate_id`),
    FOREIGN KEY `fk_candidate_user` (`user_id`) REFERENCES users(`user_id`),
    FOREIGN KEY `fk_candidate_category` (`category_id`) REFERENCES category(`category_id`) ON DELETE CASCADE
);

CREATE TABLE vote (
    `vote_id` VARCHAR(100) NOT NULL,
    `candidate_id` VARCHAR(80) NOT NULL,
    `number_of_vote` INTEGER NOT NULL DEFAULT 0,
    `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`vote_id`),
    FOREIGN KEY `fk_vote_candidate` (`candidate_id`) REFERENCES candidate(`candidate_id`)
);

CREATE TABLE verificationcode (
    `code_id` INT AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL,
    `user_id` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`code_id`)
);

CREATE TABLE onetimeverification (
    `otp_id` INT AUTO_INCREMENT,
    `otp_code` VARCHAR(20) NOT NULL,
    `user_name` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`otp_id`)
);

CREATE TABLE transaction (
    `transaction_id` VARCHAR(100) NOT NULL,
    `candidate_id` VARCHAR(80) NOT NULL,
    `amount` INT NOT NULL,
    `reference_id` INTEGER NOT NULL DEFAULT 0,
    `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`transaction_id`),
    FOREIGN KEY `fk_transaction_candidate` (`candidate_id`) REFERENCES candidate(`candidate_id`)
);