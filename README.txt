-------------Introduction-------------

J'ai réalisé un jeu de casse briques en gardant le gameplay traditionnel comme base.
J'ai programmé ce jeu avec le langage Javascript, html5 et 
l'IDE Visual Studio Code.
Pour les graphismes je les ai réalisé moi-même avec PixelEdit.


---------Déroulement du jeu----------------

	----menu----
Quand on lance le projet, on arrive directement sur l'écran de menu. Cet écran est 
très simple: j'ai juste ajouté un titre et une petite phrase en dessous pour indiquer
au joueur qu'il faut cliquer sur la touche entrée du clavier pour jouer.


	-----jeu----
Une fois qu'on a cliquer sur la touche entrée, on arrive sur l'écran de jeu.

Après une animation qui ce joue à chaque début de niveau, on peut commencer à jouer.

Au début la balle est posée sur la raquette, il faut cliquer sur la souris pour la
faire partir.


	[Règles]

Le but du jeu est de casser toutes les briques du niveau sans perdre la balle.
Pour perdre la balle il suffit qu'elle dépasse le bas de l'écran de jeu.

Certaines briques sont plus facile que d'autres à détruire(nécessite un ou plusieurs
coups). Quand on détruit une brique on gagne 10 points.

Pour éviter de perdre la balle, il faut l'empêchait de dépasser le bas de l'écran 
avec la raquette. On peut la déplacer(la raquette) de droite à gauche avec le 
déplacement de la souris(la raquette prend la place du curseur de la souris 
pendant le jeu).

La balle rebondit donc sur la raquette, sur les briques et sur les bords de l'écran
(sauf le bas).

Si on perd notre balle et qu'on a plus de balles en stock, on a perdu(on retourne dans le 
menu).

En haut à gauche de l'écran il y a notre score(nombre de briques détruites) et en 
haut à droite de l'écran il y notre nombre de vies(nombre de balles qu'on a en stock).
En début de niveau on a qu'une balle.



	[objets à ramasser]

Durant le jeu, en haut de l'écran il y a des objets qui tombe vers le bas de 
l'écran de manière aléatoire. On peut ramasser un objet avec notre raquette.
Ces objet servent d'aide lors du jeu.

Selon l'objet qu'on ramasse, on aura une aide différente:

-la pièce(objet jaune): notre score augmente de 10 points.

-le coeur(objet rouge): notre nombre de balles(de vies donc) augmente de 1.

-le losange(objet violet): un bouclier ce positionne en bas de l'écran pour permettre
à la balle de rebondir dessus. Comme cela on a plus besoin de la raquette pour empêcher
la balle de dépasser le bas de l'écran. Attention cette aide est temporaire, au 
bout de trois collisions avec la balle, le bouclier s'efface.

-le carré(objet vert): permet à la raquette de s'agrandir(jusqu'à un certain point).

-le cône(objet orange): permet à la raquette de lancer deux projectiles lorqu'on
ramasse cette objet. Ces projectiles, si elle collisonne avec une brique aura le
même impact sur cette brique que la balle.

-l'éclair(objet bleu): permet à la balle d'augmenter sa vitesse lorsque qu'elle
rebondit sur la raquette après avoir ramasser cette objet. Attention cette aide
est temporaire, après trois collisions avec la raquette, la balle retrouve sa 
vitesse initiale.	

Si on arrive a terminer un niveau, on passe automatiquement au niveau suivant.

 