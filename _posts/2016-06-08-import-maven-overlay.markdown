---
layout: post
title:  "Import classes from a jar with Maven"
date:   2016-06-08 14:00:00 +0200
categories: maven java
---

Pour pouvoir importer des classes spécifiques d'un jar qui est une dépendance du projet, il faut utiliser la balise overlays du plugin maven maven-war-plugin.

```
  <overlays>
    <overlay>
        <groupId>monGroupId</groupId>
        <artifactId>monArtifactId</artifactId>
        <type>jar</type>
        <includes>
            <include>xx/yyyy/*</include>
        </includes>
        <targetPath>WEB-INF/classes</targetPath>
    </overlay>
  </overlays>
```

Tous les fichiers présents dans le répertoire xx/yyyy de la lib monArtifactId sera recopiée dans le répertoire WEB-INF/classes du package courant.
