# 2016 triplus @ FreeCAD
# Macro Show/Hide Workbench Toolbars
# Adapted from TabBar codebase


from PySide import QtGui

# =====================
# Mode 0: Hide toolbars
# Mode 1: Show toolbars

# =====================

mw = FreeCADGui.getMainWindow()


def hideAllToolbars(mode = 0 ):
	for i in mw.findChildren(QtGui.QAction):
		if i.objectName() == "Std_ToolBarMenu":
			menu = i.menu()
		else:
			pass
	
	tempButton = QtGui.QPushButton(mw)
	tempButton.clicked.connect(menu.aboutToShow)
	tempButton.click()
	tempButton.deleteLater()
	
	toolbarList = []
	menuActions = menu.actions()
	for i in menuActions:
		if i.isEnabled():
			toolbarList.append(i.text())
		else:
			pass
	
	for i in mw.findChildren(QtGui.QToolBar):
		if i.windowTitle() in toolbarList:
			if mode == 0:
				# Don't hide ToolBar named ShowHide.
				if i.windowTitle() != "ShowHide":
					i.setVisible(False)
				else:
					pass
			elif mode == 1:
				i.setVisible(True)
			else:
				pass
		else:
			pass

hideAllToolbars()