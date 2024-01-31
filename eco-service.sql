-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 31 jan. 2024 à 08:53
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
  `description` text,
  `note` int NOT NULL,
  `date_avis` datetime NOT NULL,
  `id_utilisateur` int NOT NULL,
  `id_produit` int DEFAULT NULL,
  `id_tuto` int DEFAULT NULL,
  PRIMARY KEY (`id_avis`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_produit` (`id_produit`),
  KEY `id_tuto` (`id_tuto`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `ext_image` varchar(5) NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Structure de la table `commande_satut_association`
--

DROP TABLE IF EXISTS `commande_satut_association`;
CREATE TABLE IF NOT EXISTS `commande_satut_association` (
  `id_commande` int NOT NULL,
  `id_statut` int NOT NULL,
  `date_statut` datetime NOT NULL,
  PRIMARY KEY (`id_commande`,`id_statut`),
  KEY `id_statut` (`id_statut`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `ext` varchar(5) NOT NULL,
  `id_produit` int DEFAULT NULL,
  PRIMARY KEY (`id_image`),
  KEY `id_produit` (`id_produit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `id_produit` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `quantite` int NOT NULL,
  `prix` int NOT NULL,
  `promo` int DEFAULT NULL,
  `date_fin_promo` datetime DEFAULT NULL,
  `id_categorie` int NOT NULL,
  PRIMARY KEY (`id_produit`),
  KEY `id_categorie` (`id_categorie`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `statut`
--

DROP TABLE IF EXISTS `statut`;
CREATE TABLE IF NOT EXISTS `statut` (
  `id_statut` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id_statut`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tuto`
--

DROP TABLE IF EXISTS `tuto`;
CREATE TABLE IF NOT EXISTS `tuto` (
  `id_tuto` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(50) NOT NULL,
  `description` text,
  `ext_image` varchar(5) NOT NULL,
  `video` varchar(50) DEFAULT NULL,
  `date_tuto` datetime NOT NULL,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id_tuto`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `mot_de_passe` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pays` varchar(50) DEFAULT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `code_postal` varchar(50) DEFAULT NULL,
  `complement_adresse` varchar(50) DEFAULT NULL,
  `est_admin` tinyint(1) DEFAULT NULL,
  `date_creation` datetime NOT NULL,
  `etat` smallint NOT NULL,
  PRIMARY KEY (`id_utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `mail`, `prenom`, `nom`, `mot_de_passe`, `pays`, `ville`, `code_postal`, `complement_adresse`, `est_admin`, `date_creation`, `etat`) VALUES
(1, 'admin@gmail.com', 'Admin', 'Admin', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'France', 'Paris', '75001', 'Appartement 1', 1, '2023-12-20 18:04:53', 1),
(2, 'user@gmail.com', 'Jean', 'Michel', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'France', 'Lyon', '69001', 'Appartement 2', 0, '2023-12-20 18:04:53', 1),
(3, 'user2@gmail.com', 'Lucas', 'Dupond', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'Germany', 'Berlin', '10115', 'Apartment 3', 0, '2023-12-20 18:04:53', 1),
(4, 'test@gmail.com', 'Jean', 'Durand', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'France', 'Marseille', '13000', '4 Avenue de la république', 0, '2024-01-31 09:11:59', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
