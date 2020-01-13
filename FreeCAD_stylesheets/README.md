About
-------
version 2.05

QT themes (stylesheet) specially developed for **FreeCAD** (http://www.freecadweb.org/).
They might work with other software that uses QT styling.

Dark style example:
![Dark-Blue stylesheet](/../multimedia/img/stylesheet_dark-blue.png?raw=true "Dark-Blue stylesheet")

Light style example:
![Dark-Blue stylesheet](/../multimedia/img/stylesheet_light-blue.png?raw=true "Dark-Blue stylesheet")

Installation
------
**If you use FreeCAD 0.16 or higher you don't need to download the stylesheets, they are bundled with official release**.

In case you want to manually install them do the following:

1. Place the downloaded .qss files and /images/ folder in the path that fits your OS:
  - **OSX** = /Users/[YOUR_USER_NAME]/Library/Preferences/FreeCAD/Gui/Stylesheets/
  - **WINDOWS** = C:/[INSTALLATION_PATH]/FreeCAD/data/Gui/Stylesheets/
  - **LINUX** = /home/[YOUR_USER_NAME]/.FreeCAD/Gui/Stylesheets/

2. Only if you are using FreeCAD 0.15 or lower: images used in the theme need full paths to be found by FreeCAD, so you should search the string **qss:images** and replace with the real path of your computer. It should be done with all the .qss files you want to install-use
    - **find** = qss:images
    - **replace** = /Users/myName/Library/Preferences/FreeCAD/Gui/Stylesheets/images

Known bugs and TO DOs
------
Please, follow the [link to get updated information](http://forum.freecadweb.org/viewtopic.php?f=10&t=14690)

License
------
Copyright (c) 2016 Pablo Gil Fernández.

![Attribution-ShareAlike 4.0 International](http://i.creativecommons.org/l/by-sa/3.0/88x31.png)
This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
