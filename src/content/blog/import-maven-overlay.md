---
title: "Importer des classes d'un jar avec Maven"
description: "Importer des classes spécifiques d'un jar avec Maven grâce aux overlays du maven-war-plugin."
date: 2016-06-08
tags: ["maven", "java"]
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
