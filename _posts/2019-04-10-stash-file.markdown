---
layout: post
title:  "Exporter un stash dans un fichier"
date:   2019-04-10 10:00:00 +0200
categories: Git
---

Quand on travaille sur plusieurs ordinateurs et qu'on souhaite continuer un développement sans avoir à pusher des développements non fini, il peut s'avérer util de pouvoir sauvegarder son développement pour l'exporter sur un autre poste.
Dans un premier temps, il faut sauvegarder le travail stashé dans un fichier avec la commande suivante :

```git
git stash show -p > patch
```
Le ficher 'patch' va être créé et il faut le copier sur l'autre poste sur lequel on veut récupéré le développement en cours.

Ensuite, une fois dans le bon répo git :
```git
git apply patch
```
Et le code en cours de développement est appliqué à la branche sur laquelle vous travaillez.
