-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: דצמבר 02, 2024 בזמן 09:41 PM
-- גרסת שרת: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamecreator-db`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(100) NOT NULL,
  `categoryImg` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`, `categoryImg`) VALUES
(1, 'AppBackground', ''),
(2, 'gameBackgrounds', '/media/icons/galleryicon.webp'),
(3, 'characters', '/media/categoresImg/characters.webp'),
(4, 'animals', '/media/categoresImg/animals.webp'),
(5, 'fruits&vegetables', '/media/categoresImg/fruits&vegetables.webp'),
(6, 'grids', '/media/categoresImg/grids.webp'),
(7, 'virables', '/media/categoresImg/virables.webp');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `code_shapes`
--

CREATE TABLE `code_shapes` (
  `shapeId` int(11) NOT NULL,
  `shapeName` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `code` text DEFAULT NULL,
  `inputType` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `code_shapes`
--

INSERT INTO `code_shapes` (`shapeId`, `shapeName`, `url`, `code`, `inputType`) VALUES
(1, 'For', '/media/codeShapes/shape1.webp', 'for(let i=0;i< inputValue ;i++){}', 'int'),
(2, 'While', '/media/codeShapes/shape2.webp', 'while( condition ){}', 'condition'),
(3, 'If', '/media/codeShapes/shape3.webp', 'if( condition ){}', 'condition'),
(4, 'Move Media', '/media/codeShapes/shape11.webp', 'if (e && e.key) {\r\n  switch (e.key) {\r\n    case \'ArrowUp\':\r\n      position.y -= 10;\r\n      break;\r\n    case \'ArrowDown\':\r\n      position.y += 10;\r\n      break;\r\n    case \'ArrowLeft\':\r\n      position.x -= 10;\r\n      break;\r\n    case \'ArrowRight\':\r\n      position.x += 10;\r\n      break;\r\n    default:\r\n      break;\r\n  }\r\n}', NULL),
(5, 'Random Position', '/media/codeShapes/shape10.webp', 'position.x = Math.floor(Math.random() * screenRect.width);\r\n          position.y= Math.floor(Math.random() * screenRect.height);\r\n', NULL),
(6, 'Visible', '/media/codeShapes/shape5.webp', ' display = \'visible\';\r\n    setDisplay(inputValue, display);\r\n', 'media'),
(7, 'Hidden', '/media/codeShapes/shape6.webp', ' display = \'hidden\';\r\n    setDisplay(inputValue, display);', 'media'),
(8, 'Decrement', '/media/codeShapes/shape7.webp', '   dynamicObject.inputValue --;\r\n   handleVariableChange(\"inputValue\", dynamicObject.inputValue);', 'variable'),
(9, 'Increment', '/media/codeShapes/shape8.webp', 'dynamicObject.inputValue ++;\r\n   handleVariableChange (\"inputValue\", dynamicObject.inputValue);', 'variable'),
(10, 'On Click', '	\r\n/media/codeShapes/shape14.webp', '\r\nconst characterElement =\r\n    document.querySelector(`[data-id=\"${index}\"]`);\r\n      if (characterElement) {\r\n        characterElement.addEventListener(\'click\', () => {});}', NULL);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `conditions`
--

CREATE TABLE `conditions` (
  `conditionId` int(11) NOT NULL,
  `conditionName` varchar(255) DEFAULT NULL,
  `needsInput` tinyint(1) DEFAULT 0,
  `conditionTxt` text NOT NULL,
  `condInputType` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `conditions`
--

INSERT INTO `conditions` (`conditionId`, `conditionName`, `needsInput`, `conditionTxt`, `condInputType`) VALUES
(1, 'true', 0, 'true', 'null'),
(2, 'Collision', 1, 'Math.abs(position.x - prevState.gameCharacters[ conditionInput ].mediaPos.x) <40 && Math.abs(position.y - prevState.gameCharacters[ conditionInput ].mediaPos.y) <40 ', 'media'),
(3, 'less than', 1, 'dynamicObject[character.mediaData.variableName]< conditionInput', 'int'),
(4, 'greater than', 1, 'dynamicObject[character.mediaData.variableName]> conditionInput', 'int'),
(5, 'equality', 1, 'dynamicObject[character.mediaData.variableName]==conditionInput', 'int');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `element_in_game`
--

CREATE TABLE `element_in_game` (
  `id` int(11) NOT NULL,
  `gameId` int(11) NOT NULL,
  `mediaId` int(11) NOT NULL,
  `mediaPos` varchar(255) DEFAULT NULL,
  `draggable` tinyint(1) DEFAULT NULL,
  `display` tinyint(1) DEFAULT NULL,
  `codeShapes` text DEFAULT NULL,
  `extraContent` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `element_in_game`
--

INSERT INTO `element_in_game` (`id`, `gameId`, `mediaId`, `mediaPos`, `draggable`, `display`, `codeShapes`, `extraContent`) VALUES
(3691, 4, 22, '{\"x\":10,\"y\":10}', 0, 0, '[]', ''),
(3692, 4, 61, '{\"x\":50,\"y\":20}', 0, 0, '[]', ''),
(3693, 4, 61, '{\"x\":50,\"y\":110}', 0, 0, '[]', ''),
(3694, 4, 61, '{\"x\":50,\"y\":200}', 0, 0, '[]', ''),
(3695, 4, 61, '{\"x\":150,\"y\":20}', 0, 0, '[]', ''),
(3696, 4, 61, '{\"x\":150,\"y\":110}', 0, 0, '[]', ''),
(3697, 4, 61, '{\"x\":150,\"y\":200}', 0, 0, '[]', ''),
(3698, 4, 61, '{\"x\":250,\"y\":20}', 0, 0, '[]', ''),
(3699, 4, 61, '{\"x\":250,\"y\":110}', 0, 0, '[]', ''),
(3700, 4, 61, '{\"x\":250,\"y\":200}', 0, 0, '[]', ''),
(3701, 4, 61, '{\"x\":350,\"y\":20}', 0, 0, '[]', ''),
(3702, 4, 61, '{\"x\":350,\"y\":110}', 0, 0, '[]', ''),
(3703, 4, 61, '{\"x\":350,\"y\":200}', 0, 0, '[]', ''),
(3704, 4, 32, '{\"x\":41,\"y\":202}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":598,\"y\":119},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"13\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":442,\"y\":218},\"size\":{\"width\":293,\"height\":293},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":9,\"position\":{\"x\":477,\"y\":251},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"astro\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":6,\"position\":{\"x\":592,\"y\":273},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"13\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":492,\"y\":356},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', ''),
(3705, 4, 32, '{\"x\":241,\"y\":109}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":514,\"y\":114},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"14\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":422,\"y\":212},\"size\":{\"width\":320,\"height\":320},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":9,\"position\":{\"x\":457,\"y\":240},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"astro\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":6,\"position\":{\"x\":582,\"y\":254},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"14\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":474,\"y\":335},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', ''),
(3706, 4, 34, '{\"x\":148,\"y\":201}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":528,\"y\":149},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"15\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":422,\"y\":254},\"size\":{\"width\":304,\"height\":304},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":9,\"position\":{\"x\":460,\"y\":274},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"girl\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":6,\"position\":{\"x\":594,\"y\":292},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"15\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":476,\"y\":371},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', ''),
(3707, 4, 34, '{\"x\":242,\"y\":18}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":514,\"y\":107},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"16\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":425,\"y\":216},\"size\":{\"width\":306,\"height\":306},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":9,\"position\":{\"x\":449,\"y\":237},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"girl\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":6,\"position\":{\"x\":582,\"y\":253},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"16\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":460,\"y\":327},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', ''),
(3708, 4, 42, '{\"x\":41,\"y\":23}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":508,\"y\":117},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"17\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":447,\"y\":221},\"size\":{\"width\":279,\"height\":279},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":9,\"position\":{\"x\":472,\"y\":245},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"cat\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":6,\"position\":{\"x\":614,\"y\":256},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"17\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":484,\"y\":331},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', ''),
(3709, 4, 42, '{\"x\":243,\"y\":199}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":563,\"y\":124},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"18\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":412,\"y\":234},\"size\":{\"width\":324,\"height\":324},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":9,\"position\":{\"x\":484,\"y\":278},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"cat\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":6,\"position\":{\"x\":624,\"y\":286},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"18\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":492,\"y\":363},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', ''),
(3710, 4, 55, '{\"x\":344,\"y\":112}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":510,\"y\":117},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"19\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":434,\"y\":215},\"size\":{\"width\":306,\"height\":306},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":6,\"position\":{\"x\":613,\"y\":242},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"19\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":488,\"y\":256},\"size\":{\"width\":53,\"height\":53},\"inputValue\":\"pump\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":475,\"y\":323},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', ''),
(3711, 4, 55, '{\"x\":343,\"y\":15}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":549,\"y\":130},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"20\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":488,\"y\":254},\"size\":{\"width\":246,\"height\":246},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":6,\"position\":{\"x\":626,\"y\":258},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"20\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":506,\"y\":269},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"pump\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":517,\"y\":347},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":2,\"conditionInputType\":null}]', ''),
(3712, 4, 52, '{\"x\":344,\"y\":210}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":554,\"y\":150},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"21\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":437,\"y\":239},\"size\":{\"width\":303,\"height\":303},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":9,\"position\":{\"x\":480,\"y\":258},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"eggp\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":6,\"position\":{\"x\":600,\"y\":263},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"21\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":484,\"y\":352},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', ''),
(3713, 4, 52, '{\"x\":142,\"y\":115}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":583,\"y\":123},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"22\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":457,\"y\":236},\"size\":{\"width\":287,\"height\":287},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":9,\"position\":{\"x\":510,\"y\":270},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"eggp\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":6,\"position\":{\"x\":624,\"y\":284},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"22\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":512,\"y\":347},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":2,\"conditionInputType\":null}]', ''),
(3714, 4, 44, '{\"x\":42,\"y\":107}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":507,\"y\":121},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"23\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":430,\"y\":222},\"size\":{\"width\":311,\"height\":311},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":9,\"position\":{\"x\":468,\"y\":254},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"deer\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":6,\"position\":{\"x\":597,\"y\":268},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"23\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":496,\"y\":323},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":2,\"conditionInputType\":null}]', ''),
(3715, 4, 44, '{\"x\":141,\"y\":18}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":504,\"y\":100},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"24\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":10,\"position\":{\"x\":438,\"y\":225},\"size\":{\"width\":307,\"height\":307},\"inputValue\":null,\"conditionInput\":null,\"level\":0},{\"shapeId\":9,\"position\":{\"x\":484,\"y\":253},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"deer\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":6,\"position\":{\"x\":595,\"y\":277},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"24\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":9,\"position\":{\"x\":486,\"y\":375},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"clicks\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', ''),
(3716, 4, -1, '{\"x\":422.72918701171875,\"y\":177}', 0, 0, '[]', '{\"mediaId\":-1,\"categoryId\":7,\"variableName\":\"cat\",\"initialValue\":\"0\"}'),
(3717, 4, -1, '{\"x\":422.72918701171875,\"y\":147}', 0, 0, '[]', '{\"mediaId\":-1,\"categoryId\":7,\"variableName\":\"deer\",\"initialValue\":\"0\"}'),
(3718, 4, -1, '{\"x\":422.72918701171875,\"y\":117}', 0, 0, '[]', '{\"mediaId\":-1,\"categoryId\":7,\"variableName\":\"astro\",\"initialValue\":\"0\"}'),
(3719, 4, -1, '{\"x\":422.72918701171875,\"y\":82}', 0, 0, '[]', '{\"mediaId\":-1,\"categoryId\":7,\"variableName\":\"girl\",\"initialValue\":\"0\"}'),
(3720, 4, -1, '{\"x\":420.35418701171875,\"y\":209}', 0, 0, '[]', '{\"mediaId\":-1,\"categoryId\":7,\"variableName\":\"eggp\",\"initialValue\":\"0\"}'),
(3721, 4, -1, '{\"x\":419,\"y\":42}', 0, 0, '[]', '{\"mediaId\":-1,\"categoryId\":7,\"variableName\":\"pump\",\"initialValue\":0}'),
(3722, 4, -1, '{\"x\":10,\"y\":10}', 0, 0, '[{\"shapeId\":3,\"position\":{\"x\":442,\"y\":199},\"size\":{\"width\":268,\"height\":268},\"inputValue\":\"greater than\",\"conditionInput\":\"5\",\"level\":0,\"conditionInputType\":\"int\"},{\"shapeId\":6,\"position\":{\"x\":469,\"y\":238},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"13\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', '{\"mediaId\":-1,\"categoryId\":7,\"variableName\":\"clicks\",\"initialValue\":0}'),
(3723, 4, 35, '{\"x\":192,\"y\":103}', 0, 0, '[]', ''),
(3731, 3, 23, '{\"x\":10,\"y\":10}', 0, 0, '[]', ''),
(3732, 3, 31, '{\"x\":8,\"y\":175}', 0, 0, '[{\"shapeId\":4,\"position\":{\"x\":508,\"y\":187},\"size\":{\"width\":80,\"height\":80},\"inputValue\":null,\"conditionInput\":null,\"level\":0}]', ''),
(3733, 3, 53, '{\"x\":124,\"y\":197}', 0, 0, '[{\"shapeId\":3,\"position\":{\"x\":430,\"y\":247},\"size\":{\"width\":270,\"height\":270},\"inputValue\":\"Collision\",\"conditionInput\":\"1\",\"level\":0,\"conditionInputType\":\"media\"},{\"shapeId\":9,\"position\":{\"x\":468,\"y\":328},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"score\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":5,\"position\":{\"x\":587,\"y\":361},\"size\":{\"width\":80,\"height\":80},\"inputValue\":null,\"conditionInput\":null,\"level\":1}]', ''),
(3734, 3, 53, '{\"x\":195,\"y\":96}', 0, 0, '[{\"shapeId\":3,\"position\":{\"x\":402,\"y\":206},\"size\":{\"width\":292,\"height\":292},\"inputValue\":\"Collision\",\"conditionInput\":\"1\",\"level\":0,\"conditionInputType\":\"media\"},{\"shapeId\":5,\"position\":{\"x\":557,\"y\":260},\"size\":{\"width\":80,\"height\":80},\"inputValue\":null,\"conditionInput\":null,\"level\":1},{\"shapeId\":9,\"position\":{\"x\":441,\"y\":261},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"score\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', ''),
(3735, 3, 53, '{\"x\":315,\"y\":191}', 0, 0, '[{\"shapeId\":3,\"position\":{\"x\":398,\"y\":198},\"size\":{\"width\":346,\"height\":346},\"inputValue\":\"Collision\",\"conditionInput\":\"1\",\"level\":0,\"conditionInputType\":\"media\"},{\"shapeId\":9,\"position\":{\"x\":436,\"y\":258},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"score\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":5,\"position\":{\"x\":614,\"y\":325},\"size\":{\"width\":80,\"height\":80},\"inputValue\":null,\"conditionInput\":null,\"level\":1}]', ''),
(3736, 3, 55, '{\"x\":29,\"y\":37}', 0, 0, '[{\"shapeId\":7,\"position\":{\"x\":542,\"y\":153},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"5\",\"conditionInput\":null,\"level\":0,\"conditionInputType\":null},{\"shapeId\":3,\"position\":{\"x\":414,\"y\":275},\"size\":{\"width\":252,\"height\":252},\"inputValue\":\"Collision\",\"conditionInput\":\"1\",\"level\":0,\"conditionInputType\":\"media\"},{\"shapeId\":9,\"position\":{\"x\":462,\"y\":360},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"score\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null},{\"shapeId\":5,\"position\":{\"x\":564,\"y\":374},\"size\":{\"width\":80,\"height\":80},\"inputValue\":null,\"conditionInput\":null,\"level\":1},{\"shapeId\":9,\"position\":{\"x\":448,\"y\":424},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"score\",\"conditionInput\":null,\"level\":2,\"conditionInputType\":null}]', ''),
(3737, 3, -1, '{\"x\":10,\"y\":10}', 0, 0, '[{\"shapeId\":3,\"position\":{\"x\":428,\"y\":218},\"size\":{\"width\":282,\"height\":282},\"inputValue\":\"greater than\",\"conditionInput\":\"10\",\"level\":0,\"conditionInputType\":\"int\"},{\"shapeId\":6,\"position\":{\"x\":464,\"y\":280},\"size\":{\"width\":80,\"height\":80},\"inputValue\":\"5\",\"conditionInput\":null,\"level\":1,\"conditionInputType\":null}]', '{\"mediaId\":-1,\"categoryId\":7,\"variableName\":\"score\",\"initialValue\":0}');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `forms`
--

CREATE TABLE `forms` (
  `formId` int(11) NOT NULL,
  `formName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `forms`
--

INSERT INTO `forms` (`formId`, `formName`) VALUES
(1, 'LoginForm'),
(2, 'SignUpForm'),
(3, 'ContactUsForm');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `forms_inputs`
--

CREATE TABLE `forms_inputs` (
  `inputId` int(11) NOT NULL,
  `formId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `forms_inputs`
--

INSERT INTO `forms_inputs` (`inputId`, `formId`) VALUES
(-1, 1),
(-1, 2),
(-1, 3),
(11, 2),
(11, 3),
(12, 2),
(12, 3),
(13, 1),
(13, 2),
(13, 3),
(14, 1),
(14, 2),
(15, 2),
(16, 3),
(22, 1);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `games`
--

CREATE TABLE `games` (
  `gameId` int(11) NOT NULL,
  `gameName` varchar(100) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `games`
--

INSERT INTO `games` (`gameId`, `gameName`, `userId`) VALUES
(3, 'Mushroom picker ', 0),
(4, 'memory game ', 0);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `inputs`
--

CREATE TABLE `inputs` (
  `inputId` int(11) NOT NULL,
  `inputName` varchar(100) NOT NULL,
  `inputType` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `iconUrl` varchar(255) DEFAULT NULL,
  `text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `inputs`
--

INSERT INTO `inputs` (`inputId`, `inputName`, `inputType`, `url`, `iconUrl`, `text`) VALUES
(-1, 'submit', 'submit', NULL, '/media/icons/sendIcon.png', NULL),
(11, 'firstName', 'input', NULL, '/media/icons/personalDetailsIcon.png', 'First Name:'),
(12, 'lastName', 'input', NULL, NULL, 'Last Name:'),
(13, 'email', 'input', NULL, '/media/icons/emailIcon.jpg', 'Email:'),
(14, 'password', 'input', NULL, '/media/icons/passwordIcon.webp', 'Password:'),
(15, 'confirmPassword', 'input', NULL, '/media/icons/confirmPassIcon.webp', 'Confirm Password:'),
(16, 'message', 'input', NULL, '/media/icons/messageIcon.jpg', 'Message:'),
(17, 'gameBackgrounds', 'button', NULL, '/media/icons/galleryicon.webp', NULL),
(18, 'gameGallery', 'button', NULL, '/media/icons/characters.png', NULL),
(19, 'saveButton', 'button', NULL, '/media/icons/saveIcon.jpg', 'Save'),
(20, 'home', 'link', '/', '/media/icons/homeIcon.png', 'Home'),
(21, 'login', 'link', '/loginPage', '/media/icons/loginIcon.png', 'Login'),
(22, 'signUp', 'link', '/signUpPage', '/media/icons/signupIcon.png', 'Sign Up'),
(23, 'aboutUs', 'link', '/aboutUsPage', '/media/icons/aboutUsIcon.png', 'About Us'),
(24, 'contactUs', 'link', '/contactUsPage', '/media/icons/contactIcon.png', 'Contact Us'),
(25, 'letsCreate', 'link', '/creatorPage', '/media/icons/LetsCreatIcon.webp', 'Let\'s Create'),
(26, 'creativePlay', 'link', '/creativPlay', '/media/icons/playIcon.webp', 'Creative Play'),
(27, 'socialPanel', 'link', '/NoPage', '/media/icons/sochialpanelIcon.webp', 'Social Panel');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `media`
--

CREATE TABLE `media` (
  `mediaId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `mediaName` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `columns` int(11) DEFAULT NULL,
  `rows` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `media`
--

INSERT INTO `media` (`mediaId`, `categoryId`, `mediaName`, `url`, `columns`, `rows`) VALUES
(-1, 7, 'variable', '/media/categoresImg/virables.webp', 0, 0),
(11, 1, 'logo', '/media/Appbackgound/logo.png', 0, 0),
(12, 1, 'cloud', '/media/Appbackgound/cloud.webp', 0, 0),
(13, 1, 'turtle', '/media/Appbackgound/turtle.png', 0, 0),
(14, 1, 'homeBackground', '/media/Appbackgound/marioBackground.JPEG', 0, 0),
(15, 1, 'contactUsImg', '/media/Appbackgound/mario and Luigi.png', 0, 0),
(16, 1, 'signUpImg', '/media/Appbackgound/mario.png', 0, 0),
(17, 1, 'loginImg', '/media/Appbackgound/mario2.png', 0, 0),
(18, 1, 'aboutUsImg', '/media/Appbackgound/tree.png', 0, 0),
(19, 1, 'profilIcon', '/media/Appbackgound/profilIcon.png', 0, 0),
(21, 2, 'background1', '/media/gameMedia/gameBackgrounds/background1.jpeg', 0, 0),
(22, 2, 'background2', '/media/gameMedia/gameBackgrounds/background2.png', 0, 0),
(23, 2, 'background3', '/media/gameMedia/gameBackgrounds/background3.jpg', 0, 0),
(24, 2, 'background4', '/media/gameMedia/gameBackgrounds/background4.png', 0, 0),
(31, 3, 'boy', '/media/gameMedia/characters/boy.webp', 0, 0),
(32, 3, 'astronaut', '/media/gameMedia/characters/astronaut.webp', 0, 0),
(33, 3, 'boy2', '/media/gameMedia/characters/boy2.png', 0, 0),
(34, 3, 'cute-girl', '/media/gameMedia/characters/cute-girl.webp', 0, 0),
(35, 3, 'mario', '/media/gameMedia/characters/mario.png', 0, 0),
(36, 3, 'luigi', '/media/gameMedia/characters/luigi.png', 0, 0),
(41, 4, 'bear', '/media/gameMedia/animals/bear.webp', 0, 0),
(42, 4, 'cat', '/media/gameMedia/animals/cat.webp', 0, 0),
(43, 4, 'deer', '/media/gameMedia/animals/deer.webp', 0, 0),
(44, 4, 'deer2', '/media/gameMedia/animals/deer2.webp', 0, 0),
(45, 4, 'fox', '/media/gameMedia/animals/fox.webp', 0, 0),
(46, 4, 'lion', '/media/gameMedia/animals/lion.webp', 0, 0),
(51, 5, 'apple', '/media/gameMedia/fruits&vegetables/apple.webp', 0, 0),
(52, 5, 'eggplant', '/media/gameMedia/fruits&vegetables/eggplant.webp', 0, 0),
(53, 5, 'mushrooms', '/media/gameMedia/fruits&vegetables/mushrooms.webp', 0, 0),
(54, 5, 'pepper', '/media/gameMedia/fruits&vegetables/pepper.webp', 0, 0),
(55, 5, 'pumpkin', '/media/gameMedia/fruits&vegetables/pumpkin.webp', 0, 0),
(61, 6, '1X1', '/media/gameMedia/grids/1x1.jpeg', 1, 1),
(62, 6, '1X3', '/media/gameMedia/grids/1x3.jpeg', 3, 1);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `media_in_pages`
--

CREATE TABLE `media_in_pages` (
  `mediaId` int(11) NOT NULL,
  `pageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `media_in_pages`
--

INSERT INTO `media_in_pages` (`mediaId`, `pageId`) VALUES
(11, -1),
(12, -1),
(13, -1),
(14, 1),
(15, 5),
(16, 4),
(17, 3),
(18, 2),
(19, -1);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `menus`
--

CREATE TABLE `menus` (
  `menuId` int(11) NOT NULL,
  `menuName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `menus`
--

INSERT INTO `menus` (`menuId`, `menuName`) VALUES
(1, 'headerMenu'),
(2, 'homeMenu'),
(3, 'creatorMenu');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `menus_inputs`
--

CREATE TABLE `menus_inputs` (
  `inputId` int(11) NOT NULL,
  `menuId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `menus_inputs`
--

INSERT INTO `menus_inputs` (`inputId`, `menuId`) VALUES
(17, 3),
(18, 3),
(19, 3),
(20, 1),
(21, 2),
(23, 1),
(24, 1),
(25, 2),
(26, 2),
(27, 2);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `pages`
--

CREATE TABLE `pages` (
  `pageId` int(11) NOT NULL,
  `pageName` varchar(50) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `pages`
--

INSERT INTO `pages` (`pageId`, `pageName`, `url`, `title`, `content`) VALUES
(-2, 'footer', NULL, NULL, '[\"Since 2024 - Israel\",\"All rights reserved (c)\"]'),
(-1, 'header', NULL, NULL, NULL),
(1, 'homePage', NULL, NULL, NULL),
(2, 'aboutUsPage', NULL, 'Welcome to our website !', '[\"At \'wizGame\' we believe in the power of children to create and cope through play.\", \"Through our gaming platform, we provide children with the opportunity to be the game developers of their future and create unique and fascinating games themselves.\", \"What do we do on the site?\", \"• Game Creation: Through our user-friendly creation tools, children can create their own games easily and enjoyably. They can choose from a wide variety of backgrounds, characters, features, and effects to create the game that suits them best.\", \"• Share and Play: After creating their games, children can share them with their friends and compete with each other. This is an excellent way to encourage children to develop their creativity and interact positively and creatively with their peers.\", \"• Integrated Learning: In addition to being game developers, children also learn technological and creative skills while creating their games. They practice smart thinking, problem-solving, and creative ability.\", \"• Support Community: Our support team is available for any questions or issues that may arise while using the site. We are committed to providing a positive and professional experience for all users.\", \"In summary, at \'wizGame\' we believe in the creative and adaptive ability of children and offer them an accessible and enjoyable platform to create their own games. With support and inspiration, we help them develop and grow through play.\", \"If you have any questions, suggestions, or requests, please contact us, and we will be happy to assist you!\", \"Best regards, \'wizGame\' Team\"]'),
(3, 'loginPage', '/loginPage', 'Login', NULL),
(4, 'singUpPage', '/singUpPage', 'Sign Up', NULL),
(5, 'contactUsPage', '/contactUsPage', 'contact us', 'Feel free to get in touch with us to ask questions, make suggestions, or share any requests you may have!'),
(6, 'profilePage', '/profilePage', NULL, NULL),
(7, 'creatorPage', '/creatorZone', NULL, NULL);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `pages_forms`
--

CREATE TABLE `pages_forms` (
  `pageId` int(11) NOT NULL,
  `formId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `pages_forms`
--

INSERT INTO `pages_forms` (`pageId`, `formId`) VALUES
(3, 1),
(4, 2),
(5, 3);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `pages_menus`
--

CREATE TABLE `pages_menus` (
  `pageId` int(11) NOT NULL,
  `menuId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `pages_menus`
--

INSERT INTO `pages_menus` (`pageId`, `menuId`) VALUES
(-1, 1),
(1, 2),
(7, 3);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(0, 'Yara', 'Alman', 'yaraalmanbl@gmail.com', '$2b$10$2sEprQMM6Z5z2GZPMxdZk.DcLYr5npsQTVRPYDzKyBPtUsvIVaWk2', 'admin');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- אינדקסים לטבלה `code_shapes`
--
ALTER TABLE `code_shapes`
  ADD PRIMARY KEY (`shapeId`);

--
-- אינדקסים לטבלה `conditions`
--
ALTER TABLE `conditions`
  ADD PRIMARY KEY (`conditionId`);

--
-- אינדקסים לטבלה `element_in_game`
--
ALTER TABLE `element_in_game`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_media` (`mediaId`),
  ADD KEY `fk_game` (`gameId`);

--
-- אינדקסים לטבלה `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`formId`);

--
-- אינדקסים לטבלה `forms_inputs`
--
ALTER TABLE `forms_inputs`
  ADD PRIMARY KEY (`inputId`,`formId`),
  ADD KEY `formId` (`formId`);

--
-- אינדקסים לטבלה `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`gameId`),
  ADD KEY `userId` (`userId`);

--
-- אינדקסים לטבלה `inputs`
--
ALTER TABLE `inputs`
  ADD PRIMARY KEY (`inputId`);

--
-- אינדקסים לטבלה `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`mediaId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- אינדקסים לטבלה `media_in_pages`
--
ALTER TABLE `media_in_pages`
  ADD PRIMARY KEY (`mediaId`,`pageId`),
  ADD KEY `pageId` (`pageId`);

--
-- אינדקסים לטבלה `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`menuId`);

--
-- אינדקסים לטבלה `menus_inputs`
--
ALTER TABLE `menus_inputs`
  ADD PRIMARY KEY (`inputId`,`menuId`),
  ADD KEY `menuId` (`menuId`);

--
-- אינדקסים לטבלה `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`pageId`);

--
-- אינדקסים לטבלה `pages_forms`
--
ALTER TABLE `pages_forms`
  ADD PRIMARY KEY (`pageId`,`formId`),
  ADD KEY `formId` (`formId`);

--
-- אינדקסים לטבלה `pages_menus`
--
ALTER TABLE `pages_menus`
  ADD PRIMARY KEY (`pageId`,`menuId`),
  ADD KEY `menuId` (`menuId`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conditions`
--
ALTER TABLE `conditions`
  MODIFY `conditionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `element_in_game`
--
ALTER TABLE `element_in_game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3738;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `gameId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `menuId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `element_in_game`
--
ALTER TABLE `element_in_game`
  ADD CONSTRAINT `fk_game` FOREIGN KEY (`gameId`) REFERENCES `games` (`gameId`),
  ADD CONSTRAINT `fk_gameId` FOREIGN KEY (`gameId`) REFERENCES `games` (`gameId`),
  ADD CONSTRAINT `fk_media` FOREIGN KEY (`mediaId`) REFERENCES `media` (`mediaId`),
  ADD CONSTRAINT `fk_mediaId` FOREIGN KEY (`mediaId`) REFERENCES `media` (`mediaId`);

--
-- הגבלות לטבלה `forms_inputs`
--
ALTER TABLE `forms_inputs`
  ADD CONSTRAINT `forms_inputs_ibfk_1` FOREIGN KEY (`inputId`) REFERENCES `inputs` (`inputId`),
  ADD CONSTRAINT `forms_inputs_ibfk_2` FOREIGN KEY (`formId`) REFERENCES `forms` (`formId`);

--
-- הגבלות לטבלה `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `games_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- הגבלות לטבלה `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);

--
-- הגבלות לטבלה `media_in_pages`
--
ALTER TABLE `media_in_pages`
  ADD CONSTRAINT `media_in_pages_ibfk_1` FOREIGN KEY (`mediaId`) REFERENCES `media` (`mediaId`),
  ADD CONSTRAINT `media_in_pages_ibfk_2` FOREIGN KEY (`pageId`) REFERENCES `pages` (`pageId`);

--
-- הגבלות לטבלה `menus_inputs`
--
ALTER TABLE `menus_inputs`
  ADD CONSTRAINT `menus_inputs_ibfk_1` FOREIGN KEY (`inputId`) REFERENCES `inputs` (`inputId`),
  ADD CONSTRAINT `menus_inputs_ibfk_2` FOREIGN KEY (`menuId`) REFERENCES `menus` (`menuId`);

--
-- הגבלות לטבלה `pages_forms`
--
ALTER TABLE `pages_forms`
  ADD CONSTRAINT `pages_forms_ibfk_1` FOREIGN KEY (`pageId`) REFERENCES `pages` (`pageId`),
  ADD CONSTRAINT `pages_forms_ibfk_2` FOREIGN KEY (`formId`) REFERENCES `forms` (`formId`);

--
-- הגבלות לטבלה `pages_menus`
--
ALTER TABLE `pages_menus`
  ADD CONSTRAINT `pages_menus_ibfk_1` FOREIGN KEY (`pageId`) REFERENCES `pages` (`pageId`),
  ADD CONSTRAINT `pages_menus_ibfk_2` FOREIGN KEY (`menuId`) REFERENCES `menus` (`menuId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
