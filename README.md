# ProjetJS Taqu'ISEN
Projet JS fin d'année : Taquin   Mory Mathis / Vico Robin / L'Hermitte Clément / Debril Julien

## Description
Taqu'ISEN est une application web qui propose un jeu de taquin interactif et personnalisable. Le but du jeu est de résoudre le puzzle soit en rangeant les cases dans l'ordre :

[1,2,3]

[4,5,6]

[7,8, ],

ou alors en s'aidant de l'image de fond.

Les utilisateurs peuvent choisir entre différentes configurations de grille et options de jeu pour tester leur logique et leur rapidité.

## Fonctionnalités
- **Modes de Jeu Variés** : Les utilisateurs peuvent choisir des grilles de différentes tailles (3x3, 4x4, 5x5, 6x6) pour augmenter la difficulté du jeu.
- **Options de Personnalisation** :
  - Avec Image : Le joueur jour avec une image de fond et des chiffres pour l'aider.
  - Sans Chiffres : Les cases sont vides pour un défi visuel supplémentaire.
  - Standard : Jeu de taquin classique avec des chiffres et sans image.
- **Chronomètre** : Un chronomètre intégré qui mesure le temps écoulé depuis le début du jeu jusqu'à la résolution de la grille.
- **Rejouer** : Les joueurs peuvent redémarrer le jeu à tout moment pour tenter d'améliorer leur temps.
- **Leaderboard** : Après avoir gagné une partie, le joueur peut entrer son nom pour sauvegarder son score dans le leaderboard. Les scores sont triés dans l'ordre. Ce classement est déterminé en fonction du meilleur chrono.

## Difficultés Rencontrées

Au cours du développement de Taqu'ISEN, nous avons été confrontés à plusieurs difficultés, notamment :

### Intégration d'une fonctionnalité de personnalisation d'image
L'une des fonctionnalités les plus ambitieuses que nous souhaitions intégrer était la possibilité pour les utilisateurs d'uploader leurs propres images pour personnaliser le taquin. Cependant, nous avons rencontré des difficultés techniques liées à la gestion des formats d'image et à leur découpage en carrés en fonction de la taille de la grille choisie. 

### Implémentation du mélange aléatoire de tuiles
Nous avons également ajouté une option pour que les taquins qui sont créés soient générés de manière aléatoire. Cela fonctionnait, mais lorsque nous avons implémenté la possibilité de créer des taquins avec une image plutôt que des chiffres avec des couleurs, pour une raison quelconque dans notre code, les taquins étaient déjà dans l'ordre, ce qui est évidemment problématique. Cependant, cela a été corrigé.

