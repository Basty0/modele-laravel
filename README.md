

# Documentation du Projet Laravel avec Inertia React

Ce projet utilise **Laravel** comme backend et **Inertia.js** avec **React** pour le frontend. Il inclut une gestion de configuration via la table `Config` et est conçu pour être facilement configurable et extensible.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **PHP** (version 8.0 ou supérieure)
- **Composer** (pour gérer les dépendances PHP)
- **Node.js** et **npm** (pour gérer les dépendances JavaScript)
- **MySQL** ou un autre système de gestion de base de données pris en charge par Laravel
- **Git** (pour cloner le projet)

---

## Installation

1. **Cloner le projet** :
   Clonez le dépôt GitHub sur votre machine locale :

   ```bash
   git clone https://github.com/Basty0/modele-laravel.git
   cd modele-laravel
   ```

2. **Installer les dépendances PHP** :
   Utilisez Composer pour installer les dépendances PHP :

   ```bash
   composer install
   ```

3. **Installer les dépendances JavaScript** :
   Utilisez npm pour installer les dépendances JavaScript :

   ```bash
   npm install
   ```

4. **Configurer l'environnement** :
   Copiez le fichier `.env.example` et renommez-le en `.env`. Ensuite, configurez les variables d'environnement, notamment les informations de connexion à la base de données :

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nom_de_la_base_de_donnees
   DB_USERNAME=utilisateur_mysql
   DB_PASSWORD=mot_de_passe_mysql
   ```

5. **Générer une clé d'application** :
   Générez une clé d'application Laravel :

   ```bash
   php artisan key:generate
   ```

---

## Migration et Initialisation de la Base de Données

1. **Créer la base de données** :
   Assurez-vous que la base de données spécifiée dans `.env` existe sur votre serveur MySQL. Sinon, créez-la manuellement :

   ```sql
   CREATE DATABASE nom_de_la_base_de_donnees;
   ```

2. **Exécuter les migrations** :
   Exécutez les migrations pour créer les tables dans la base de données :

   ```bash
   php artisan migrate
   ```

3. **Décommenter la configuration dans `ConfigServiceProvider.php`** :
   Après avoir exécuté les migrations, décommentez la partie suivante dans `app/Providers/ConfigServiceProvider.php` pour partager les données de configuration avec Inertia :

   ```php
   public function boot(): void
   {
       // Récupérer les données de la table Config
       $config = Config::first();

       // Partager les données avec toutes les vues Inertia
       Inertia::share('config', $config);
   }
   ```

   Cela permettra de partager les données de configuration avec toutes les vues React via Inertia.

---

## Lancer le Projet

1. **Démarrer le serveur Laravel** :
   Démarrez le serveur de développement Laravel :

   ```bash
   php artisan serve
   ```

   Le projet sera accessible à l'adresse `http://localhost:8000`.

2. **Compiler les assets React** :
   Compilez les fichiers JavaScript et CSS avec Vite :

   ```bash
   npm run dev
   ```

   Pour la production, utilisez :

   ```bash
   npm run build
   ```

---

## Structure du Projet

- **Backend (Laravel)** :
  - `app/Models/Config.php` : Modèle pour la table `config`.
  - `app/Providers/ConfigServiceProvider.php` : Provider pour partager les données de configuration avec Inertia.
  - `database/migrations/` : Contient les migrations pour créer les tables de la base de données.

- **Frontend (Inertia + React)** :
  - `resources/js/Pages/` : Contient les composants React pour les pages.
  - `resources/js/Shared/` : Contient les composants React partagés.
  - `resources/js/app.js` : Point d'entrée de l'application React.

---

## Commandes Utiles

- **Créer une migration** :
  ```bash
  php artisan make:migration nom_de_la_migration
  ```

- **Exécuter les migrations** :
  ```bash
  php artisan migrate
  ```

- **Créer un modèle** :
  ```bash
  php artisan make:model NomDuModele
  ```

- **Créer un contrôleur** :
  ```bash
  php artisan make:controller NomDuController
  ```

- **Créer un middleware** :
  ```bash
  php artisan make:middleware NomDuMiddleware
  ```

---

## Contribution

1. **Créer une branche** :
   ```bash
   git checkout -b nom-de-la-branche
   ```

2. **Faire des modifications** :
   Effectuez vos modifications et testez-les localement.

3. **Pousser les modifications** :
   ```bash
   git add .
   git commit -m "Description des modifications"
   git push origin nom-de-la-branche
   ```

4. **Créer une Pull Request** :
   Allez sur GitHub et créez une Pull Request pour fusionner vos modifications dans la branche principale.

---

## Auteurs

- [Basty](https://github.com/Basty0)

---

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## Remarques

- Assurez-vous de toujours exécuter `php artisan migrate` après avoir cloné le projet ou après avoir ajouté de nouvelles migrations.
- Après les migrations, décommentez la partie dans `ConfigServiceProvider.php` pour partager les données de configuration avec Inertia.

---

Cette documentation est un point de départ pour votre projet. N'hésitez pas à l'adapter en fonction de vos besoins spécifiques.
