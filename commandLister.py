print("running")
import os
os.system("clear")
from PySide import QtGui
mw = Gui.getMainWindow()

def actionList():
    """Create a dictionary of unique actions. Exclude command names
       containing . to prevent domain name system clash. Exclude
       command names containing , to prevent possible join and split
       related issues. Exclude actions with no text, as that can
       result in ambiguity, when selecting the command."""
    actions = {}
    duplicates = []
    dir(mw.findChildren(QtGui.QAction))
    for i in mw.findChildren(QtGui.QAction):
        name = i.objectName()
        #os.system("clear")
        #print(i.objectName())
        #print(i.isEnabled())
        #print(dir(i))
        if (name and
                i.text() and
                "." not in name and
                "," not in name):
            if name in actions:
                if name not in duplicates:
                    duplicates.append(name)
            else:
                actions[name] = i
    for d in duplicates:
        del actions[d]
    print( dir(actions))
    for i in actions:
        #print(dir(actions[i]))
        print(dir(actions[i]))
        print(actions[i].objectName())
        print(actions[i].isEnabled())
        #print(dir(i))
        #print(i.objectName)
        #print(i.isEnabled())
    return actions
actionList()




