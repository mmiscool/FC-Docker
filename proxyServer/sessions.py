#(C) Michael Molinari 2019

print("hello world")

import subprocess

startAdockerCommand = '''docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'  $(docker run -d kewl) '''

ListAdockerCommand = '''docker inspect  $(docker ps -q)'''




#--------------------------------------------------Server stuff

import time
import _thread
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import unquote



class Serv(BaseHTTPRequestHandler):

	def do_GET(self):

		myReturnMSG = "***UNKNOWN***"
		try:
			commandToRun = str(unquote(self.path))
			commandToRun = commandToRun[1:]
			
			if (commandToRun != "favicon.ico"):
				if   (commandToRun == "listSessions"):
					myReturnMSG = str(subprocess.getoutput( ListAdockerCommand ))
				elif (commandToRun == "newSession"):
					myReturnMSG = str(subprocess.getoutput(startAdockerCommand ))
				else:
					myReturnMSG = "Action dose not exist" + commandToRun 
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
			myReturnMSG = "Error of some type"
		
		self.send_response(200)
		self.end_headers()
		self.wfile.write(bytes(myReturnMSG, 'utf-8'))
	def log_message(self, format, *args):
		return

def runTheServer():
	httpd = HTTPServer(('0.0.0.0', 8888), Serv)
	httpd.serve_forever()


runTheServer()