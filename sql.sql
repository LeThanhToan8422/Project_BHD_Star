-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.1.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for databasecinema
CREATE DATABASE IF NOT EXISTS `databasecinema` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `databasecinema`;

-- Dumping structure for table databasecinema.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountID` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accountID` (`accountID`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `userID` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.accounts: ~0 rows (approximately)

-- Dumping structure for table databasecinema.cinemas
CREATE TABLE IF NOT EXISTS `cinemas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cinemaID` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `placeID` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cinemaID` (`cinemaID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.cinemas: ~5 rows (approximately)
INSERT INTO `cinemas` (`id`, `cinemaID`, `name`, `address`, `phone`, `image`, `placeID`, `createdAt`, `updatedAt`) VALUES
	(1, 'CNM1', 'Galaxy Quang Trung', 'Lầu 3, TTTM CoopMart Foodcosa số 304A, Quang Trung, P.11, Q. Gò Vấp, Tp.HCM', '1900 2224', 'Galaxy-Quang-Trung.jpg', 'HCM', '2023-09-19 12:10:46', '2023-09-19 12:10:46'),
	(2, 'CNM2', 'Galaxy Tân Bình', '246 Nguyễn Hồng Đào, Q.TB, Tp.HCM', '1900 2224', 'Galaxy-Tan-Binh.jpg', 'HCM', '2023-09-19 12:11:52', '2023-09-19 12:12:40'),
	(3, 'CNM3', 'Galaxy Trường Chinh', 'Tầng 3 - Co.opMart TTTM Thắng Lợi - Số 2 Trường Chinh, Tây Thạnh, Tân Phú, Thành phố Hồ Chí Minh', '19002224', 'Galaxy-Truong-Chinh.jpg', 'HCM', '2023-09-19 12:12:32', '2023-09-19 12:12:46'),
	(5, 'CNM4', 'Galaxy Cà Mau', 'Lầu 2, TTTM Sense City, số 9, Trần Hưng Đạo, P.5, Tp. Cà Mau', '1900 2224', 'Galaxy-Ca-Mau.jpg', 'CM', '2023-09-19 12:14:29', '2023-09-19 12:14:29'),
	(6, 'CNM6', 'Galaxy Nguyễn Du', '116 Nguyễn Du, Quận 1, Tp.HCM', '1900 2224', 'Galaxy-Nguyen-Du.jpg', 'HCM', '2023-09-19 12:15:22', '2023-09-19 12:15:22');

-- Dumping structure for table databasecinema.combos
CREATE TABLE IF NOT EXISTS `combos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comboID` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `cinemaID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comboID` (`comboID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.combos: ~14 rows (approximately)
INSERT INTO `combos` (`id`, `comboID`, `name`, `price`, `cinemaID`) VALUES
	(1, 'CB1', 'iCombo 1 Big Extra STD', 109000, 'CNM6'),
	(2, 'CB2', 'iCombo 1 Big STD', 89000, 'CNM6'),
	(3, 'CB3', 'iCombo Optimus Prime 1', 369000, 'CNM6'),
	(4, 'CB4', 'iCombo Optimus Prime 2', 379000, 'CNM6'),
	(5, 'CB5', 'iCombo 2 Big Extra STD', 129000, 'CNM6'),
	(6, 'CB6', 'iCombo 2 Big STD', 109000, 'CNM6'),
	(7, 'CB7', 'iCombo Optimus Prime Promotion 299K', 299000, 'CNM6'),
	(8, 'CB8', 'iCombo DnD Dice Tower Promotion 299K', 299000, 'CNM6'),
	(9, 'CB9', 'iCombo 1 Big Extra STD', 109000, 'CNM1'),
	(10, 'CB10', 'iCombo 1 Big STD', 89000, 'CNM1'),
	(11, 'CB11', 'iCombo Optimus Prime 1', 369000, 'CNM1'),
	(12, 'CB12', 'iCombo Optimus Prime 2', 379000, 'CNM1'),
	(13, 'CB13', 'iCombo 2 Big Extra STD', 129000, 'CNM1'),
	(14, 'CB14', 'iCombo 2 Big STD', 109000, 'CNM1'),
	(15, 'CB15', 'iCombo Optimus Prime Promotion 299K', 299000, 'CNM1'),
	(16, 'CB16', 'iCombo DnD Dice Tower Promotion 299K', 299000, 'CNM1');

-- Dumping structure for table databasecinema.detailmovies
CREATE TABLE IF NOT EXISTS `detailmovies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `detailMovieID` varchar(255) NOT NULL,
  `movieContent` varchar(255) DEFAULT NULL,
  `movieID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `detailMovieID` (`detailMovieID`),
  UNIQUE KEY `movieID` (`movieID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.detailmovies: ~0 rows (approximately)

-- Dumping structure for table databasecinema.fares
CREATE TABLE IF NOT EXISTS `fares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fareID` varchar(255) NOT NULL,
  `isAdult` tinyint(1) DEFAULT NULL,
  `isBeforeFiveHours` tinyint(1) DEFAULT NULL,
  `pricesOfMonWednesThursDay` int(11) DEFAULT NULL,
  `pricesOfTuesDay` int(11) DEFAULT NULL,
  `pricesOfFriSaturSunHoliDay` int(11) DEFAULT NULL,
  `pricesOfGratitudeDay` int(11) DEFAULT NULL,
  `cinemaID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fareID` (`fareID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.fares: ~4 rows (approximately)
INSERT INTO `fares` (`id`, `fareID`, `isAdult`, `isBeforeFiveHours`, `pricesOfMonWednesThursDay`, `pricesOfTuesDay`, `pricesOfFriSaturSunHoliDay`, `pricesOfGratitudeDay`, `cinemaID`) VALUES
	(1, 'FR1', 1, 1, 55000, 50000, 70000, 50000, 'CNM6'),
	(2, 'FR2', 1, 0, 60000, 50000, 75000, 50000, 'CNM6'),
	(3, 'FR3', 1, 1, 50000, 50000, 70000, 50000, 'CNM1'),
	(4, 'FR4', 1, 0, 55000, 50000, 75000, 50000, 'CNM1');

-- Dumping structure for table databasecinema.moviedates
CREATE TABLE IF NOT EXISTS `moviedates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movieDateID` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  `cinemaID` varchar(255) DEFAULT NULL,
  `movieID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `movieDateID` (`movieDateID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.moviedates: ~12 rows (approximately)
INSERT INTO `moviedates` (`id`, `movieDateID`, `date`, `cinemaID`, `movieID`) VALUES
	(1, 'MD1', '2023-09-29 00:00:00', 'CNM6', 'MV1'),
	(2, 'MD2', '2023-09-30 00:00:00', 'CNM1', 'MV1'),
	(3, 'MD3', '2023-09-29 00:00:00', 'CNM6', 'MV2'),
	(4, 'MD4', '2023-09-30 00:00:00', 'CNM1', 'MV2'),
	(5, 'MD5', '2023-09-29 00:00:00', 'CNM6', 'MV3'),
	(6, 'MD6', '2023-09-30 00:00:00', 'CNM1', 'MV3'),
	(7, 'MD7', '2023-09-29 00:00:00', 'CNM6', 'MV4'),
	(8, 'MD8', '2023-09-30 00:00:00', 'CNM1', 'MV4'),
	(9, 'MD9', '2023-09-29 00:00:00', 'CNM6', 'MV5'),
	(10, 'MD10', '2023-09-30 00:00:00', 'CNM1', 'MV5'),
	(12, 'MD11', '2023-09-29 00:00:00', 'CNM6', 'MV6'),
	(13, 'MD13', '2023-09-30 00:00:00', 'CNM1', 'MV6');

-- Dumping structure for table databasecinema.movies
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movieID` varchar(255) NOT NULL,
  `nameEN` varchar(255) DEFAULT NULL,
  `nameVN` varchar(255) DEFAULT NULL,
  `evaluate` int(11) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `actor` varchar(255) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `producer` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `premiereDate` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `contentFilm` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `movieID` (`movieID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.movies: ~11 rows (approximately)
INSERT INTO `movies` (`id`, `movieID`, `nameEN`, `nameVN`, `evaluate`, `time`, `actor`, `director`, `producer`, `category`, `country`, `premiereDate`, `image`, `contentFilm`, `createdAt`, `updatedAt`) VALUES
	(1, 'MV1', 'THE NUN II', 'ÁC QUỶ MA SƠ II', NULL, '110 phút', 'Storm Reid, Bonnie Aarons, Anna Popplewell, Taissa Farmiga', 'Michael Chaves', 'Warner Bros', 'Kinh Dị', 'US', '2023-09-04 00:00:00', 'THENUNII.jpg', 'Lấy bối cảnh nước Pháp năm 1956, cùng cái chết bí ẩn của một linh mục, một giai thoại đáng sợ và ám ảnh sẽ mở ra. Phần phim tiếp tục xoay quanh nhân vật chính - Sơ Irene - do Taissa Farmiga thủ vai.  Là phần phim tiếp nối câu chuyện năm 2019 của The Nun, bộ phim hứa hẹn sẽ tiếp tục hé lộ đến khán giả những khía cạnh mới đằng sau câu chuyện về hồn ma nữ tu từng reo rắc biết bao nỗi ám ảnh này. Bầu không khí u ám, quỷ dị vốn là điểm mạnh của các bộ phim thuộc thương hiệu The Conjuring sẽ tiếp tục được thể hiện trong The Nun II. Điều này khiến tựa phim về ma sơ Valak hứa hẹn sẽ trở thành tác phẩm kinh dị nổi bật bậc nhất nửa cuối năm nay.  Phim mới Ác Quỷ Ma Sơ II ra mắt tại các rạp chiếu phim từ 08.09.2023', '2023-09-19 11:40:22', '2023-09-19 11:44:12'),
	(2, 'MV2', 'A HAUNTING IN VENICE', 'ÁN MẠNG Ở VENICE', NULL, '102 phút', 'Kenneth Branagh, Kelly Reilly, Dương Tử Quỳnh', 'Kenneth Branagh', '20th Century Studios', 'Kinh Dị, Tâm Lý, Tội Phạm', 'US', '2023-09-15 00:00:00', 'AHAUNTINGINVENICE.jpg', 'Án Mạng Ở Venice lấy bối cảnh hậu Thế Chiến II tại thành phố Venice vào đêm Halloween. Thám tử lừng danh Hercule Poirot bất đắc dĩ phải tham dự một buổi cầu hồn với sự xuất hiện của bà đồng “Dương Tử Quỳnh” tại một dinh thự hoang tàn và u ám. Khi một trong những vị khách bị giết chết, vị thám tử này bị ép buộc rơi vào một thế giới đầy bóng tối và ngập tràn những bí mật.  Phim mới Án Mạng Ở Venice ra mắt tại các rạp chiếu phim từ 15.09.2023', '2023-09-19 11:43:22', '2023-09-19 11:43:54'),
	(3, 'MV3', 'DON\'T BUY THE SELLER', 'ĐƠN HÀNG TỪ SÁT NHÂN', NULL, '101 phút', 'Kim Sung Kyun, Shin Hye Sun', 'Park Hee Kon', 'Hàn Quốc', 'Kinh Dị', 'Korean', '2023-09-15 00:00:00', 'DON\'TBUYTHESELLER.jpg', 'Như bao cô gái chốn công sở, Soo-hyun dù luôn quay cuồng với deadline nhưng vẫn không quên đam mê shopping online của mình. Sau khi mua nhầm một đơn hàng "chất lượng kém, xứng đáng 1 sao", Soo-hyun không ngờ rằng đánh giá chân thật của mình đã làm một tên sát nhân máu lạnh nổi điên! Phim mới Đơn Hàng Từ Sát Nhân dự kiến ra mắt tại các rạp chiếu phim toàn quốc từ 15.09.2023.', '2023-09-19 11:45:53', '2023-09-19 12:04:43'),
	(4, 'MV4', 'RETRIBUTION', 'TRỪNG PHẠT', NULL, '91 phút', 'Liam Neeson, Jack Champion, Matthew Modine', 'Nimrod Antal', 'Ombra Films', 'Tội Phạm, Hành Động', 'US', '2023-09-15 00:00:00', 'RETRIBUTION.jpg', 'Matt Turner (Liam Neeson) là một doanh nhân người Mỹ thành đạt sống ở Berlin, đang phải cân bằng giữa sự nghiệp tài chính đang bùng nổ và trách nhiệm gia đình. Một buổi sáng đang lái xe đưa con đến trường, Matt nhận được một cuộc điện thoại từ một giọng nói bí ẩn: có một quả bom dưới ghế của anh ấy sẽ phát nổ trừ khi anh ấy hoàn thành một loạt nhiệm vụ cụ thể, và nhanh chóng.  Bị mắc kẹt trong một cuộc rượt đuổi tốc độ cao khắp thành phố, Matt phải làm theo chỉ dẫn ngày càng nguy hiểm của “kẻ lạ mặt” trong cuộc chạy đua với thời gian để bảo vệ gia đình và tìm lời giải đáp cho những bí ẩn đang diễn ra.  Phim mới Trừng Phạt ra mắt tại các rạp chiếu phim từ 15.09.2023.', '2023-09-19 11:47:34', '2023-09-19 11:47:48'),
	(5, 'MV5', 'BẾN PHÀ XÁC SỐNG', 'BẾN PHÀ XÁC SỐNG', NULL, '83 phút', 'Ốc Thanh Vân, La Thành, Huỳnh Đông', 'Nguyễn Thành Nam', 'Việt Nam', 'Kinh Dị', 'VietNam', '2023-09-01 00:00:00', 'BENPHAXACSONG.jpg', 'Là phần tiếp theo Cù Lao Xác Sống, Bến Phà Xác Sống tiết lộ hành trình mới về cuộc tháo chạy của Công và những người bạn khỏi sự tấn công của đại dịch Zombie, đồng thời úp mở về tình tiết liên quan đến sự biến đổi của chủng xác sống mới.  Nhóm người của Công (Huỳnh Đông) trốn tránh sự bùng phát của dịch bệnh và cố gắng chạy đến chuyến phà cuối cùng ở vùng hạ lưu sông Mekong. Thế nhưng, trong quá trình chạy trốn, họ một lần thất lạc khi xuất hiện sự biến chất và phá bĩnh của Diễm (Ốc Thanh Vân) khiến nhóm người buộc phải tách ra. Và cuộc tấn công của Zombie đổ bộ cù lao, đối mặt giữa sống và chết, các nhân vật nhận ra không phải dịch bệnh, chính sự tồn tại của tính ích kỷ và oán hận mới là thứ đẩy họ vào những thử thách sống còn. Phim mới Bến Phà Xác Sống dự kiến ra mắt tại các rạp chiếu phim toàn quốc từ 01.09.2023.', '2023-09-19 11:49:30', '2023-09-19 11:49:49'),
	(6, 'MV6', 'CONCRETE UTOPIA ', 'ĐỊA ĐÀNG SỤP ĐỔ', NULL, '129 phút', 'Park Seo Joon, Lee Byung Hun, Park Bo Young', 'Um Tae Hwa', 'Climax Studio', 'Giật Gân, Hành Động', 'VietNam', '2023-09-01 00:00:00', 'CONCRETEUTOPIA.jpg', 'Được nhận xét là một “chuẩn mực mới về phản địa đàng trong dòng phim thảm họa Hàn Quốc”, bom tấn Địa Đàng Sụp Đổ xoay quanh cơn đại địa chấn san bằng Seoul thành bình địa và hành trình sinh tồn của những người sống sót. Phim mới Địa Đàng Sụp Đổ ra mắt tại các rạp chiếu phim từ 01.09.2023.', '2023-09-19 11:51:34', '2023-09-19 11:51:46'),
	(7, 'MV7', 'IMMERSION', 'HỌA QUỶ', NULL, '107 phút', 'Daigo Nishihata, Mizuki Yamamoto, Inori Kirara', 'Takashi Shimizu', 'Toei Company', 'Kinh Dị', 'VietNam', '2023-09-22 00:00:00', 'IMMERSION.jpg', 'Nhà khoa học thiên tài Tomohiko Kataoka được trưởng nhóm nghiên cứu Synthekai VR yêu cầu tham gia cùng họ trên Đảo Abominable. Ở đó, họ đã tạo ra một không gian ảo cho toàn bộ hòn đảo và họ muốn Tomohiko sử dụng các kỹ thuật tiên tiến của mình để nâng cấp dự án. Tuy nhiên, khi Tomohiko đeo kính VR và bước vào thế giới ảo, trời đột nhiên trở nên tối tăm và một người phụ nữ bí ẩn xuất hiện. Những cái chết bí ẩn xảy ra với nhân viên công ty công nghệ VR. Có một nỗi sợ hãi chưa từng có đang chờ đợi giữa thực tế và thế giới ảo. Phim mới Họa Quỷ dự kiến ra mắt tại các rạp chiếu phim toàn quốc từ 22.09.2023.', '2023-09-19 11:53:40', '2023-09-19 11:53:51'),
	(8, 'MV8', 'PAST LIVES', 'MUÔN KIẾP NHÂN DUYÊN', NULL, '0 phút', 'Greta Lee, Teo Yoo', 'Celine Song', 'A24', 'Tâm Lý, Lãng Mạn', 'VietNam', '2023-09-28 00:00:00', 'PASTLIVES.jpg', 'Muôn Kiếp Nhân Duyên xoay quanh hai nhân vật chính - Nora (Greta Lee) và Hae Sung (Teo Yoo). Tình bạn thân thiết của họ bị chia cắt khi Nora theo gia đình di cư khỏi Hàn Quốc vào năm 12 tuổi. 20 năm sau, như một mối duyên tiền định, họ gặp lại nhau tại Mỹ, nhưng lúc này, Nora đã trở thành vợ của Arthur (John Magaro). Nhìn lại quá khứ, nói về hiện tại và hướng đến tương lai - những cuộc trò chuyện nhẹ nhàng giữa Nora và Hae Sung trong 1 tuần ngắn ngủi ở New York được đan xen bởi các khoảng lặng, khiến người xem chìm đắm vào suy ngẫm về cuộc sống, số phận và tình yêu. Phim mới Muôn Kiếp Nhân Duyên dự kiến ra mắt tại các rạp chiếu phim toàn quốc từ 29.09.2023.', '2023-09-19 11:55:59', '2023-09-19 11:56:13'),
	(9, 'MV9', 'GODLESS', 'VŨ ĐIỆU QUỶ DỮ', NULL, '0 phút', 'Georgia Eyers, Dan Ewing, Tim Pocock', 'Nick Kozakis', '  Iris Arc Pictures', 'Kinh Dị', 'VietNam', '2023-09-29 00:00:00', 'GODLESS.jpg', 'Sau một biến cố đau thương, Lara liên tục gặp phải những ảo giác đầy kinh hãi và dần mất kiểm soát tinh thần. Những vũ điệu cuồng loạn, sự xuất hiện của quỷ dữ khiến chồng cô đặt niềm tin cứu rỗi linh hồn của vợ vào một nhóm trừ tà. Niềm tin tôn giáo sẽ chiến thắng hay sự cuồng tín sẽ dẫn đến thảm kịch đau lòng hơn? Phim mới Vũ Điệu Quỷ Dữ dự kiến ra mắt tại các rạp chiếu phim toàn quốc từ 29.09.2023.', '2023-09-19 11:58:10', '2023-09-19 11:58:21'),
	(10, 'MV10', 'CHALLENGERS', 'NHỮNG KẺ THÁCH ĐẤU', NULL, '0 phút', 'Josh O\'Connor, Mike Faist, Zendaya', 'Luca Guadagnino', 'Warner Bros', 'Lãng Mạn, Tâm Lý, Thể Thao', 'US', '2023-10-06 00:00:00', 'CHALLENGERS.jpg', 'Theo chân ba tay vợt quen biết nhau khi còn là thanh thiếu niên đến khi họ thi đấu trong một giải đấu quần vợt để trở thành người chiến thắng giải Grand Slam nổi tiếng thế giới, đồng thời khơi lại những kỳ phùng địch thủ cũ trong và ngoài sân đấu. Phim mới Những Kẻ Thách Đấu khởi chiếu 06.10.2023 tại rạp chiếu phim toàn quốc.', '2023-09-19 11:59:59', '2023-09-19 12:00:12'),
	(11, 'MV11', 'WONKA', 'WONKA', NULL, '0 phút', 'Olivia Colman, Timothée Chalamet, Rowan Atkinson', 'Paul King', 'Warner Bros', 'Hài, Giả Tưởng', 'US', '2023-12-15 00:00:00', 'WONKA.jpg', 'Câu chuyện sẽ tập trung vào Willy Wonka trẻ tuổi và cách anh ấy gặp các Oompa-Loompa trong những cuộc phiêu lưu đầu tiên của mình. Phim mới Wonka ra mắt tại các rạp chiếu phim từ 15.12.2023.', '2023-09-19 12:01:43', '2023-09-19 12:01:56'),
	(12, 'MV12', 'NAPOLEON', 'NAPOLEON', NULL, '0 phút', 'Vanessa Kirby, Joaquin Phoenix, Ludivine Sagnier', 'Ridley Scott', 'Apple Studios', 'Tâm Lý, Hành Động, Tiểu Sử', 'US', '2023-12-01 00:00:00', 'NAPOLEON.jpg', 'Bộ phim là cái nhìn nguyên bản và cá nhân về nguồn gốc của Napoléon Bonaparte và quá trình leo lên ngôi hoàng đế nhanh chóng, tàn nhẫn của ông. Câu chuyện được kể qua lăng kính của vợ ông, mối quan hệ phức tạp và thường xuyên bất ổn, cùng Josephine, một tình yêu đích thực. Phim mới Napoleon ra mắt tại các rạp chiếu phim từ 01.12.2023.', '2023-09-19 12:03:06', '2023-09-19 12:03:21');

-- Dumping structure for table databasecinema.places
CREATE TABLE IF NOT EXISTS `places` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `placeID` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `placeID` (`placeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.places: ~0 rows (approximately)

-- Dumping structure for table databasecinema.seats
CREATE TABLE IF NOT EXISTS `seats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seatID` varchar(255) NOT NULL,
  `numberSeat` varchar(255) DEFAULT NULL,
  `showTimeID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `seatID` (`seatID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.seats: ~0 rows (approximately)

-- Dumping structure for table databasecinema.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table databasecinema.sequelizemeta: ~12 rows (approximately)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('account.js'),
	('cinema.js'),
	('combo.js'),
	('detailMovie.js'),
	('fare.js'),
	('movie.js'),
	('movieDate.js'),
	('place.js'),
	('seat.js'),
	('showTime.js'),
	('ticket.js'),
	('user.js');

-- Dumping structure for table databasecinema.showtimes
CREATE TABLE IF NOT EXISTS `showtimes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `showTimeID` varchar(255) NOT NULL,
  `time` time DEFAULT NULL,
  `quality` varchar(255) DEFAULT NULL,
  `movieDateID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `showTimeID` (`showTimeID`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.showtimes: ~34 rows (approximately)
INSERT INTO `showtimes` (`id`, `showTimeID`, `time`, `quality`, `movieDateID`) VALUES
	(1, 'ST1', '16:30:00', 'LT', 'MD1'),
	(2, 'ST2', '18:30:00', 'LT', 'MD1'),
	(3, 'ST3', '20:30:00', 'LT', 'MD1'),
	(4, 'ST4', '16:30:00', 'LT', 'MD2'),
	(5, 'ST5', '19:30:00', 'LT', 'MD2'),
	(6, 'ST6', '22:30:00', 'LT', 'MD2'),
	(7, 'ST7', '19:30:00', 'LT', 'MD3'),
	(8, 'ST8', '20:30:00', 'LT', 'MD3'),
	(9, 'ST9', '22:30:00', 'LT', 'MD3'),
	(10, 'ST10', '19:30:00', 'LT', 'MD4'),
	(11, 'ST11', '21:30:00', 'LT', 'MD4'),
	(12, 'ST12', '23:30:00', 'LT', 'MD4'),
	(13, 'ST13', '19:30:00', 'LT', 'MD5'),
	(14, 'ST14', '22:30:00', 'LT', 'MD5'),
	(15, 'ST15', '23:30:00', 'LT', 'MD5'),
	(16, 'ST16', '19:30:00', 'LT', 'MD6'),
	(17, 'ST17', '20:30:00', 'LT', 'MD6'),
	(18, 'ST18', '22:30:00', 'LT', 'MD6'),
	(19, 'ST19', '19:30:00', 'LT', 'MD7'),
	(20, 'ST20', '20:30:00', 'LT', 'MD7'),
	(21, 'ST21', '22:30:00', 'LT', 'MD7'),
	(22, 'ST22', '19:30:00', 'LT', 'MD8'),
	(23, 'ST23', '20:30:00', 'LT', 'MD8'),
	(24, 'ST24', '22:30:00', 'LT', 'MD8'),
	(25, 'ST25', '19:30:00', 'LT', 'MD9'),
	(26, 'ST26', '20:30:00', 'LT', 'MD9'),
	(27, 'ST27', '22:30:00', 'LT', 'MD9'),
	(28, 'ST28', '19:30:00', 'LT', 'MD9'),
	(29, 'ST29', '19:30:00', 'LT', 'MD10'),
	(30, 'ST30', '20:32:00', 'LT', 'MD10'),
	(31, 'ST31', '22:32:00', 'LT', 'MD10'),
	(32, 'ST32', '19:33:00', 'LT', 'MD11'),
	(33, 'ST33', '20:33:00', 'LT', 'MD11'),
	(34, 'ST34', '22:33:00', 'LT', 'MD11'),
	(35, 'ST35', '19:34:00', 'LT', 'MD13'),
	(36, 'ST36', '20:33:00', 'LT', 'MD13'),
	(37, 'ST37', '22:33:00', 'LT', 'MD13');

-- Dumping structure for table databasecinema.tickets
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticketID` varchar(255) NOT NULL,
  `quantityTickets` int(11) DEFAULT NULL,
  `seats` varchar(255) DEFAULT NULL,
  `combos` varchar(255) DEFAULT NULL,
  `totalPrices` int(11) DEFAULT NULL,
  `userID` varchar(255) DEFAULT NULL,
  `movieID` varchar(255) DEFAULT NULL,
  `cinemaID` varchar(255) DEFAULT NULL,
  `movieDateID` varchar(255) DEFAULT NULL,
  `showTimeID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ticketID` (`ticketID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.tickets: ~0 rows (approximately)

-- Dumping structure for table databasecinema.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `dateOfBirth` datetime DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userID` (`userID`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table databasecinema.users: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
