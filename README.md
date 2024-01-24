# Quiz Game

A quiz app allows users to take multiple-choice quizzes on various topics. You can create your own quizzes or use an API like <a href="https://opentdb.com/api_config.php?ref=altcademy.com" target="_blank">Open Trivia API</a> to fetch quiz questions. Your app should display the quiz questions one at a time, with the user selecting an answer before moving on to the next question. At the end of the quiz, the user should see their score and have the option to retake the quiz.

By building a quiz app, you'll: 
- Practice managing state in a React app, as you'll need to keep track of the user's answers and score. 
- Learn how to create interactive components, like buttons and timers.

This application has been build using <a href="https://symfony.com/" target="_blank">Symfony</a> (for backend) and <a href="https://fr.react.dev/" target="_blank">React</a> (for frontend).

## QUIZ API (possible)

- https://the-trivia-api.com/docs/v2/
- https://opentdb.com/api_config.php

## Authentification

Une fois que la dépendance a été ajouté, il faudra maintenant générer une clé. Cette clé sera ensuite utilisé pour générer les token qui seront envoyer aux utilisateurs de la plateforme (normalement, se ne sera que les admin). Voici la commande pour générer ces clés :

```bash
    php bin/console lexik:jwt:generate-keypair
```

Une fois la commande ci-dessus lancée, elle va créer un sous-dossier jwt dans le dossier config. Dans ce sous-dossier, on aura 2 fichiers, ces 2 fichiers sont les clés privés et publics qui seront utlisé dans les actions de génération du token. A ce niveau, on a rien de plus.

### Générer un mot de passe hashé
```bash
    symfony console security:hash-password
```

## Database

Si la base de données n'est pas créer
```bash
    symfony console doctrine:database:create
```

Ensuite, une fois la BDD créer, il faut maintenant générer les migrations s'il ne sont pas déjà générer. Par défault, les fichiers de migrations sont stockés dans le répertoire migrations à la racine du projet Symfony.
```bash
    symfony console m:migration
```

Une fois les fichiers de migration générer, il faut les executer. Pour faire cela, il faut aller à la racine du projet Symfony, puis executer la commande suivante :
```bash
    symfony console doctrine:migration:migrate
```