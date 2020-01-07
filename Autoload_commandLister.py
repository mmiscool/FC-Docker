App.newDocument("Unnameed")
Gui.activateWorkbench("PartDesignWorkbench")


#----------------------------------Alert window stuff



from PySide import QtCore, QtGui
 
def errorDialog(msg):
	# Create a simple dialog QMessageBox
	# The first argument indicates the icon used: one of QtGui.QMessageBox.{NoIcon, Information, Warning, Critical, Question}
	diag = QtGui.QMessageBox(QtGui.QMessageBox.Warning, 'Error in macro MessageBox', msg)
	diag.setWindowModality(QtCore.Qt.ApplicationModal)
	diag.exec_()


#-----------------------------------------








import os
os.system("clear")
from PySide import QtGui
mw = Gui.getMainWindow()
import json







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
	
	
	myReturnList = Gui.activeWorkbench().name() + "<hr> "
	#errorDialog(myReturnList)
	
	commandsListingArry = []
	commandsListingArry.append(Gui.activeWorkbench().name())
	
	for i in actions:
		#print(dir(actions[i]))

		myReturnList = myReturnList + actions[i].objectName()
		
		if (actions[i].isEnabled() == True):
			myReturnList = myReturnList + "@"
			commandsListingArry.append(actions[i].objectName() + "@")
		else:
			commandsListingArry.append(actions[i].objectName())
		myReturnList = myReturnList + ","
		#print(dir(actions[i]))
		#print(actions[i].objectName())
		#print(actions[i].isEnabled())
		#myReturnList
		#print(dir(i))
		#print(i.objectName)
		#print(i.isEnabled())
	
	hideAllToolbars()
	return json.dumps(commandsListingArry)
	return myReturnList(myReturnList)

#actionList()




freeCadCommandToRun = ""


#--------------------------------------------------Hide all of the tool bars
# 2016 triplus @ FreeCAD
# Macro Show/Hide Workbench Toolbars
# Adapted from TabBar codebase


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

#-------------------------------------------set to full screen mode
hideAllToolbars()
mw.showFullScreen()
#mw.menuBar().hide()



#--------------------------------------------------Server stuff
import time
import _thread
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import unquote


class Serv(BaseHTTPRequestHandler):
	print("Hello world")

	def do_GET(self):
		#global Gui
		global freeCadCommandToRun
		print("getting the URL")
		print(self.path)
		#errorDialog(self.path)
		try:
			commandToRun = str(unquote(self.path))
			commandToRun = commandToRun[1:]
			#errorDialog(commandToRun)
			
			if (commandToRun.startswith("~") == True):
				ShellCommandToRun = commandToRun[1:]
				#errorDialog(ShellCommandToRun)
				os.system(ShellCommandToRun)
			else:
				if (commandToRun != "favicon.ico"):
					freeCadCommandToRun = commandToRun
				else:
					freeCadCommandToRun = ""
			#errorDialog(commandToRun)
			#Gui.runCommand(commandToRun)
		except:
			print("failed command exicution")
		self.send_response(200)
		self.end_headers()
		file_to_open = actionList()
		self.wfile.write(bytes(file_to_open, 'utf-8'))

def runTheServer():
	httpd = HTTPServer(('0.0.0.0', 8000), Serv)
	httpd.serve_forever()




_thread.start_new_thread(runTheServer,())

while 1:
	#time.sleep(.001)
	if (freeCadCommandToRun != ""):
		blablablabla = freeCadCommandToRun
		freeCadCommandToRun = ""
		dir(Gui.runCommand(blablablabla))
	FreeCADGui.updateGui()
	

	