## Installation

1. Clonez le dépôt :

    ```bash
    git clone https://github.com/Khaouniaicha/map-application-.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd map-application--main
    ```

3. Activez l'environnement virtuel :

    ```bash
    .\env\scripts\activate
    ```

4. Installez les dépendances :

    ```bash
    pip install -r requirements.txt
    ```

## Utilisation

1. Exécutez l'application avec la commande suivante :

    ```bash
    flask app.py
    ```

2. Accédez à l'application dans votre navigateur à l'adresse [http://localhost:5000](http://localhost:5000).

## Routes

- `/` : Page d'accueil.
- `/login` : Page de connexion.
- `/mapp` : Page de la carte.
- `/register` : Page d'inscription.
- `/home.html` : Page d'accueil alternative.

## Structure du Projet

- `app.py`: Fichier principal de l'application.
- `templates/`: Dossier contenant les fichiers HTML.
- `firebase.json`: Fichier de configuration Firebase.
- `requirements.txt`: Liste des dépendances.
