#(C) Michael Molinari 2019

print("hello world")

import subprocess

startAdockerCommand = '''docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}:{{.ID}}'  $(docker run -d -v /fcUsers/***userName***:/root/files/ mmiscool/fc-docker ) '''

ListAdockerCommand = '''docker inspect --format='{{.Name}} {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q -f ancestor=mmiscool/fc-docker)'''





userList = []  

class user:  
    def __init__(self, userName, ip):  
        self.userName = userName  
        self.dockerIP = ip 

import os 
for obj in os.listdir("/fcUsers"):
	userList.append( user(obj, "") ) 


def findUser(userName):
	global userList
	print (len(userList))
	
	
	for x in range(0, len(userList)):

		if (userList[x].userName == userName):
			return x
	return None



def ensure_dir(file_path):
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)




#--------------------------------------------------Server stuff

import time
import _thread
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import unquote

returnCode = 200

class Serv(BaseHTTPRequestHandler):

	def do_GET(self):
		global returnCode, listOfUsers
		print(self.path)
		#print(dir(self))
		myReturnMSG = "***UNKNOWN***"
		try:
			commandToRun = str(unquote(self.path))
			commandToRun = commandToRun[1:] + "/ / /"
			
			commandToRunArray = commandToRun.split("/")
			
			print(0, commandToRunArray[0])
			print(1, commandToRunArray[1])
			print(2, commandToRunArray[2])
			print(3, commandToRunArray[3])

			
			
			if (commandToRunArray[0] != "favicon.ico"):
				if   (commandToRunArray[0] == "listSessions"):
					myReturnMSG = str(subprocess.getoutput( ListAdockerCommand ))
				elif (commandToRunArray[0] == "good"):
					returnCode = 200
				elif (commandToRunArray[0] == "bad"):
					returnCode = 404
				elif   (commandToRunArray[0] == "auth"):
					self.send_response(returnCode)
					self.end_headers()
					self.wfile.write(bytes(myReturnMSG, 'utf-8'))
				elif   (commandToRunArray[0] == "newUser"):
					currentUserIdNo = findUser(commandToRunArray[1])
					if (currentUserIdNo is None):
						print(userList) 
						ensure_dir("/fcUsers/" + commandToRunArray[1] +"/")
						userList.append( user(commandToRunArray[1], "") ) 
						myReturnMSG = "User Created : " + commandToRunArray[1]
					else:
						myReturnMSG = "User Exists : " + commandToRunArray[1]
				elif (commandToRunArray[0] == "newSession"):
					currentUserIdNo = findUser(commandToRunArray[1])
					if (currentUserIdNo is None):
						print(userList)
						myReturnMSG = "User dose not exist ::::: " + commandToRunArray[1]
					else:
						if (userList[currentUserIdNo].dockerIP == ""):
							resultList = subprocess.getoutput(startAdockerCommand.replace("***userName***", commandToRunArray[1]) ).split(":")
							print(resultList)
							userList[currentUserIdNo].dockerIP = resultList[0]
						myReturnMSG = userList[currentUserIdNo].dockerIP
				else:
					myReturnMSG = "Action dose not exist" + commandToRunArray[0] + commandToRunArray[1]
					print(myReturnMSG)

		except Exception as e: # (as opposed to except Exception, e:)
			# ^ that will just look for two classes, Exception and e
			# for the repr
			print(repr(e))
			# for just the message, or str(e), since print calls str under the hood
			print(e)
			# the arguments that the exception has been called with. 
			# the first one is usually the message. (OSError is different, though)
			print(e.args)
			myReturnMSG = str(repr(e))
		
		self.send_response(200)
		self.end_headers()
		self.wfile.write(bytes(myReturnMSG, 'utf-8'))
	def log_message(self, format, *args):
		return

def runTheServer():
	httpd = HTTPServer(('0.0.0.0', 8888), Serv)
	httpd.serve_forever()


runTheServer()
