# js_project

lien vers [npm](https://www.npmjs.com/)

lien vers [le sujet](https://github.com/sfrenot/javascript/tree/master/projet4)

**Todooo**

- No html pas de carte qui flip (la tuile)
- modéliser un jeu de carte
    - fonctions associées :
    - piocher
    - mélanger
    - défausse
- modéliser les **joueurs** : liste 
- modéliser les jeux des joueurs : écrire dans un fichier séparé  : function: add_card(player, card)
- fonction de **comparaison des cartes** (si deux identiques → True)
- fonction **tour** pour chaque joueur, premier tour = le jouer reste forcément
- **calcul de score** (pour une manche = tester la fin de partie) : lecture du fichier des jeux des joueur·se·s

- **calcul de score** du total des manches : lecture du fichier retraçant l'historique des manches 

## Description d'une partie

**conditions de départ** : nombre joueurs, scores à 0, jeu complet et mélangé.

### Manche

1. **Premier tour** : tour spécial, distribuer une carte à chaque joueur et appliquer les actions
2. **Suite du jeu** Répéter jusqu'à : un joueur a 7 cartes OU il n'ya plus de joueur actif
    - joueur après joueur : 
        - joueur choisi si il tire une carte ou pas
        - si il quitte : changer l'état du joueur 
        - si il reste : 
        - vérifier si il reste des cartes, sinon mélanger
        - piocher une carte
        - effectuer l'action : comparer les cartes / actions spéciales (à détailler)
3. écrire les scores dans un fichier
4. calculer le total des score (si 200 ou plus → game over)