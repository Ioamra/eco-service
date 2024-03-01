-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 01 mars 2024 à 09:42
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `eco-service`
--

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

DROP TABLE IF EXISTS `avis`;
CREATE TABLE IF NOT EXISTS `avis` (
  `id_avis` int NOT NULL AUTO_INCREMENT,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `note` int NOT NULL,
  `date_avis` datetime NOT NULL,
  `id_utilisateur` int NOT NULL,
  `id_produit` int DEFAULT NULL,
  `id_tuto` int DEFAULT NULL,
  PRIMARY KEY (`id_avis`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_produit` (`id_produit`),
  KEY `id_tuto` (`id_tuto`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `avis`
--

INSERT INTO `avis` (`id_avis`, `description`, `note`, `date_avis`, `id_utilisateur`, `id_produit`, `id_tuto`) VALUES
(1, 'Tres bonne recette, parfait !', 5, '2024-02-01 15:10:27', 1, NULL, 1),
(2, 'Tres bon savon, parfait !', 5, '2024-02-01 15:13:02', 1, 1, NULL),
(3, 'Tres bon savon !', 4, '2024-02-01 15:13:15', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ext_image` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `nom`, `ext_image`) VALUES
(1, 'savon', 'jpg'),
(4, 'Céréale', 'jpg'),
(5, 'Bougies', 'jpg');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id_commande` int NOT NULL AUTO_INCREMENT,
  `date_commande` date DEFAULT NULL,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id_commande`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `date_commande`, `id_utilisateur`) VALUES
(8, '2024-02-28', 2);

-- --------------------------------------------------------

--
-- Structure de la table `commande_produit_association`
--

DROP TABLE IF EXISTS `commande_produit_association`;
CREATE TABLE IF NOT EXISTS `commande_produit_association` (
  `id_commande` int NOT NULL,
  `id_produit` int NOT NULL,
  `quantite_commander` int DEFAULT NULL,
  PRIMARY KEY (`id_commande`,`id_produit`),
  KEY `id_produit` (`id_produit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commande_produit_association`
--

INSERT INTO `commande_produit_association` (`id_commande`, `id_produit`, `quantite_commander`) VALUES
(8, 1, 2),
(8, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `commande_statut_association`
--

DROP TABLE IF EXISTS `commande_statut_association`;
CREATE TABLE IF NOT EXISTS `commande_statut_association` (
  `id_commande` int NOT NULL,
  `id_statut` int NOT NULL,
  `date_statut` datetime NOT NULL,
  PRIMARY KEY (`id_commande`,`id_statut`),
  KEY `id_statut` (`id_statut`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commande_statut_association`
--

INSERT INTO `commande_statut_association` (`id_commande`, `id_statut`, `date_statut`) VALUES
(8, 1, '2024-02-28 17:58:16');

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `ext` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_produit` int DEFAULT NULL,
  PRIMARY KEY (`id_image`),
  KEY `id_produit` (`id_produit`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`id_image`, `ext`, `id_produit`) VALUES
(1, 'png', 1),
(2, 'png', 1),
(3, 'png', 2),
(4, 'jpg', 3),
(5, 'jpg', 4),
(6, 'jpg', 5),
(7, 'jpg', 6),
(8, 'jpg', 7),
(9, 'png', 8),
(10, 'png', 9);

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `id_produit` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `quantite` int NOT NULL,
  `prix` int NOT NULL,
  `promo` int DEFAULT NULL,
  `date_fin_promo` datetime DEFAULT NULL,
  `id_categorie` int NOT NULL,
  PRIMARY KEY (`id_produit`),
  KEY `id_categorie` (`id_categorie`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id_produit`, `nom`, `description`, `quantite`, `prix`, `promo`, `date_fin_promo`, `id_categorie`) VALUES
(1, 'Savon de Marseille (300g)', 'Authentique cube de savon Savon de Marseille à l\'huile végétale.', 50, 6, 20, '2024-02-20 00:00:00', 1),
(2, 'Copeaux savon de Marseille nature blanc 1kg', 'Copeaux de savon de Marseille nature blanc Le Sérail .Sans huile de palme\r\nHuiles végétales, sans parfum, sans colorant, sans conservateur ni fixateur.', 20, 11, NULL, NULL, 1),
(3, 'Flocons D\'avoine Sans Gluten 500g Bio', 'L’avoine est souvent considérée à tort comme une céréale contenant du gluten car elle est souvent contaminée en France par d’autres céréales lors de sa production. L’avoine contient une protéine proche du gluten, l’avenine qui est tolérée par la majorité des malades coeliaques (sous avis médical).\r\n\r\nGrillon d’Or a sélectionné des producteurs capables de garantir de l’avoine sans gluten afin de proposer une gamme toujours plus variée à ses consommateurs. Les filières « avoine » choisies ont développé des procédés très rigoureux et contraignants afin de garantir une avoine sans gluten.\r\n\r\nCertifié Agriculture Biologique.', 27, 4, NULL, NULL, 4),
(4, 'Corn Flakes Nature 500g Bio', 'Pétales de maïs nature.\r\n\r\nNaturalia est partenaire de Cereco, situé à Domagné en Bretagne et spécialisé dans la fabrication de produits bio à base de céréales.\r\n\r\nDepuis sa création en 1973, NATURALIA entretient des relations durables avec les producteurs pionniers de la BIO.\r\n\r\nCes partenariats garantissent la qualité de nos produits.', 12, 5, NULL, NULL, 4),
(5, 'Muesli Chocolat Noir Sans Gluten 450g Bio', 'De généreuses pépites de céréales accompagnées de morceaux de chocolat noir pour un moment intensément croustillant et tonifiant.\r\n\r\nSans gluten. Riche en fibre. Aux céréales complètes.\r\n\r\nCe produit est issu de l\'agriculture biologique.', 37, 7, NULL, NULL, 4),
(6, 'Muesli Croustillant Caramel Chocolat Amandes 450g ', 'Découvrez ces gourmandes céréales complètes croustillantes au chocolat, amandes et caramel beurre salé. Idéal pour le petit-déjeuner pour démarrer la journée. \r\n\r\nCe produit est issu de l\'agriculture biologique.', 12, 7, NULL, NULL, 4),
(7, '14 Bougies de ménage dîner', 'Combustion propre, Anti-goutte, Sans fumée, Inodore, Non toxique', 7, 19, NULL, NULL, 5),
(8, 'Lot de 2 - Bougie striée parfumée blanche H10, 340', 'Parfum : Voile de Coton\r\nNotes olfactives : florale - musquée - poudrée - boisée\r\nUne brise douce et poudrée, danse avec les pétales jasminées et rosées, s’enlaçant tendrement dans un voile musqué et ambré.\r\n\r\nDangereux. Respecter les précautions d\'emploi.\r\nNocif pour les organismes aquatiques, entraîne des effets néfastes à long terme.\r\nContient  : OTNE. Peut produire une réaction allergique.', 24, 12, NULL, NULL, 5),
(9, 'Lot de 2 - Bougie striée parfumée blanche H15, 500', 'Parfum : Voile de Coton\r\nNotes olfactives : florale - musquée - poudrée - boisée\r\nUne brise douce et poudrée, danse avec les pétales jasminées et rosées, s’enlaçant tendrement dans un voile musqué et ambré.\r\n\r\nDangereux. Respecter les précautions d\'emploi.\r\nNocif pour les organismes aquatiques, entraîne des effets néfastes à long terme.\r\nContient  : OTNE. Peut produire une réaction allergique.', 16, 18, NULL, NULL, 5);

-- --------------------------------------------------------

--
-- Structure de la table `statut`
--

DROP TABLE IF EXISTS `statut`;
CREATE TABLE IF NOT EXISTS `statut` (
  `id_statut` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_statut`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `statut`
--

INSERT INTO `statut` (`id_statut`, `nom`) VALUES
(1, 'Dans le panier'),
(2, 'En cours de traitement'),
(3, 'Expédiée'),
(4, 'Livrée');

-- --------------------------------------------------------

--
-- Structure de la table `tuto`
--

DROP TABLE IF EXISTS `tuto`;
CREATE TABLE IF NOT EXISTS `tuto` (
  `id_tuto` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ext_image` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `video` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_tuto` datetime NOT NULL,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id_tuto`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tuto`
--

INSERT INTO `tuto` (`id_tuto`, `titre`, `description`, `ext_image`, `video`, `date_tuto`, `id_utilisateur`) VALUES
(1, 'Nettoyant Maison Polyvalent au Savon de Marseille : Une Recette Simple pour une Fraîcheur Naturelle', 'Dans une casserole, faites chauffer 2 litres d\'eau, puis râpez finement environ 200 g de savon de Marseille que vous ajouterez à l\'eau chaude. Remuez le mélange jusqu\'à ce que le savon soit complètement dissous. Une fois le savon bien incorporé, ajoutez 2 cuillères à soupe de bicarbonate de soude pour renforcer le pouvoir nettoyant. Retirez la casserole du feu et laissez le mélange refroidir à température ambiante.\n\nUne fois refroidi, ajoutez 10 gouttes d\'huile essentielle de citron pour parfumer agréablement votre nettoyant. Transférez ensuite le mélange dans une bouteille ou un bidon refermable. Votre nettoyant tout usage au savon de Marseille est prêt à être utilisé. Avant chaque utilisation, agitez la bouteille pour mélanger les ingrédients. Vous pouvez maintenant employer ce nettoyant pour entretenir diverses surfaces dans la maison, telles que les sols, les plans de travail, les éviers, et bien plus encore.', 'png', 'https://www.youtube.com/watch?v=6N78hBp8Scc', '2024-01-31 13:58:31', 1),
(2, 'Savon de Marseille Magique : Créez Votre Propre Nettoyant Écologique', 'Découvrez une recette simple et efficace pour fabriquer votre nettoyant maison avec le célèbre savon de Marseille. Ce nettoyant polyvalent, alliant les pouvoirs nettoyants du savon traditionnel à des ingrédients naturels, est parfait pour prendre soin de votre maison de manière écologique. De la cuisine à la salle de bain, en passant par les sols et les surfaces, adoptez cette solution DIY pour un nettoyage frais et respectueux de l\'environnement. Suivez notre guide facile et transformez votre routine de nettoyage quotidienne en une expérience naturelle et parfumée.', 'png', 'https://www.youtube.com/watch?v=RwvOKqqe9CQ', '2024-01-31 14:04:28', 1);

-- --------------------------------------------------------

--
-- Structure de la table `tuto_produit_association`
--

DROP TABLE IF EXISTS `tuto_produit_association`;
CREATE TABLE IF NOT EXISTS `tuto_produit_association` (
  `id_produit` int NOT NULL,
  `id_tuto` int NOT NULL,
  PRIMARY KEY (`id_produit`,`id_tuto`),
  KEY `id_tuto` (`id_tuto`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tuto_produit_association`
--

INSERT INTO `tuto_produit_association` (`id_produit`, `id_tuto`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mot_de_passe` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pays` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ville` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `code_postal` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `complement_adresse` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `est_admin` tinyint(1) DEFAULT NULL,
  `date_creation` datetime NOT NULL,
  `etat` smallint NOT NULL,
  PRIMARY KEY (`id_utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `mail`, `prenom`, `nom`, `mot_de_passe`, `pays`, `ville`, `code_postal`, `complement_adresse`, `est_admin`, `date_creation`, `etat`) VALUES
(1, 'admin@gmail.com', 'Admin', 'Admin', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'France', 'Paris', '75001', 'Appartement 1', 1, '2023-12-20 18:04:53', 1),
(2, 'user@gmail.com', 'Jean', 'Michel', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'France', 'Lyon', '69001', 'Appartement 2', 0, '2023-12-20 18:04:53', 1),
(3, 'user2@gmail.com', 'Lucas', 'Dupond', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'Germany', 'Berlin', '10115', 'Apartment 3', 0, '2023-12-20 18:04:53', 1),
(4, 'test@gmail.com', 'Jean', 'Durand', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'France', 'Marseille', '13000', '4 Avenue de la république', 0, '2024-01-31 09:11:59', 1),
(5, 'test3@gmail.com', 'Jean', 'Durand', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'France', 'Marseille', '13000', '4 Avenue de la république', 0, '2024-01-31 11:16:59', 1),
(6, 'test2@gmail.com', 'Jean', 'Durand', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'France', 'Marseille', '13000', '4 Avenue de la république', 0, '2024-01-31 11:39:02', 1),
(7, 'testtest@gmail.com', 'testtest', 'testtest', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'France', 'Aubagne', '13400', '4 Rue de la République', 0, '2024-02-28 12:37:09', 1),
(8, 'jean.dupond@gmail.com', 'Jean', 'Dupond', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'France', 'Aubange', '13400', '4 Rue de la république', 0, '2024-02-29 09:22:53', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
