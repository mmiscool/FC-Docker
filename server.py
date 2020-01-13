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
	
	

	#errorDialog(myReturnList)
	
	commandsListingArry = []
	commandsListingArry.append(Gui.activeWorkbench().name())
	
	for i in actions:
		if (actions[i].isEnabled() == True):
			commandsListingArry.append(actions[i].objectName() + "@")
		else:
			commandsListingArry.append(actions[i].objectName())
	
	
	return json.dumps(commandsListingArry)


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
mw.findChild(QtGui.QDockWidget, "Combo View").show()


#--------------------------------------------------Server stuff
currentWorkbenchName = ""
currentWorkbenchNameKnown = False
myReturnMSG = ""


import time
import _thread
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import unquote




class Serv(BaseHTTPRequestHandler):

	def do_GET(self):
		#global Gui
		global freeCadCommandToRun, currentWorkbenchName, currentWorkbenchNameKnown, myReturnMSG
		print("getting the URL")
		print(self.path)

		myReturnMSG = "***UNKNOWN***"
		try:
			commandToRun = str(unquote(self.path))
			commandToRun = commandToRun[1:]
			
			if (commandToRun != "favicon.ico"):
				if (commandToRun == "listCommands"):
					myReturnMSG = str(Gui.listCommands())
				if (commandToRun == "listWorkbenches"):
					myReturnMSG = str(Gui.listWorkbenches())
				if (commandToRun[0:6] == "python"):
					freeCadCommandToRun = commandToRun
					while myReturnMSG == "***UNKNOWN***":
						print("checking for workbench name change")
				else:
					freeCadCommandToRun = commandToRun
					currentWorkbenchNameKnown = False
					while myReturnMSG == "***UNKNOWN***":
						print("waiting for return msg")
					while currentWorkbenchNameKnown == False:
						print("checking for workbench name change")
					myReturnMSG += "***" + currentWorkbenchName + "***"


		except:
			print("failed command exicution")
			myReturnMSG = "Error od some type"
		
		self.send_response(200)
		self.end_headers()
		self.wfile.write(bytes(myReturnMSG, 'utf-8'))

def runTheServer():
	httpd = HTTPServer(('0.0.0.0', 8000), Serv)
	httpd.serve_forever()




_thread.start_new_thread(runTheServer,())





import sys
from io import StringIO
import contextlib

@contextlib.contextmanager
def stdoutIO(stdout=None):
    old = sys.stdout
    if stdout is None:
        stdout = StringIO()
    sys.stdout = stdout
    yield stdout
    sys.stdout = old







while 1:
	FreeCADGui.updateGui()
	if (currentWorkbenchName != Gui.activeWorkbench().name()):
		currentWorkbenchNameKnown = False
	if (currentWorkbenchNameKnown == False):
		currentWorkbenchName = Gui.activeWorkbench().name()
		currentWorkbenchNameKnown = True
		hideAllToolbars()
	
	
	#time.sleep(.001)
	if (freeCadCommandToRun != ""):
		if (freeCadCommandToRun[0:6] == "python"):
			freeCadCommandToRun = freeCadCommandToRun[7:]
			#errorDialog(commandToRun)
			#print("the command sent :" + commandToRun)
			##myReturnMSG = str(eval(freeCadCommandToRun))
			with stdoutIO() as s:
				try:
					exec(freeCadCommandToRun)
				except:
					print("Something wrong with the code")
			print("out:", s.getvalue())
			myReturnMSG = str(s.getvalue())
			freeCadCommandToRun = ""

		else:
			hideAllToolbars()
			
			
			blablablabla = freeCadCommandToRun
			freeCadCommandToRun = ""
			
			try:
				dir(Gui.runCommand(blablablabla))
				FreeCADGui.updateGui()
				myReturnMSG = ""
			except:
				myReturnMSG = "####ERROR, Some thing did not work : " + blablablabla
				print(myReturnMSG )
			
			FreeCADGui.updateGui()
			hideAllToolbars()
	FreeCADGui.updateGui()
	

	