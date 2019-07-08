---
layout: post
title:  "Changer de version de Java rapidement"
date:   2019-07-08 10:00:00 +0200
categories: Java Ubuntu
---

Si vous devez changer régulièrement de version de Java (pour tester la migration d'un projet sur une version plus récente par exemple) et si vous êtes sur Linux, voici une commande qui devrait bien vous aider :

```bash
sudo update-alternatives --config java
```
Ensuite, vous avez juste à sélectionner la version que vous souhaitez utiliser et les liens symboliques seront modifiés automatiquement.

```bash
Il existe 2 choix pour l\'alternative java (qui fournit /usr/bin/java).

  Sélection   Chemin                                               Priorité  État
------------------------------------------------------------
* 0            /usr/lib/jvm/adoptopenjdk-11-hotspot-amd64/bin/java   1111      mode automatique
  1            /usr/lib/jvm/adoptopenjdk-11-hotspot-amd64/bin/java   1111      mode manuel
  2            /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java        1081      mode manuel

Appuyez sur <Entrée> pour conserver la valeur par défaut[*] ou choisissez le numéro sélectionné :
```
