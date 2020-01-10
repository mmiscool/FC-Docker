#(C) Michael Molinari 2019


#--------------------------------------------------Server stuff
import time
import _thread
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import unquote


class Serv(BaseHTTPRequestHandler):
	print("Hello world")

	def do_GET(self):
		print(self.path)

		try:
			commandToRun = str(unquote(self.path))
			commandToRun = commandToRun[1:]
			if (commandToRun.startswith("~") == True):
				ShellCommandToRun = commandToRun[1:]
				os.system(ShellCommandToRun)
		except:
			print("failed command exicution")
		self.send_response(200)
		self.end_headers()
		myReturnMSG = "Welp we did that action"
		self.wfile.write(bytes(myReturnMSG, 'utf-8'))

def runTheServer():
	httpd = HTTPServer(('0.0.0.0', 8001), Serv)
	httpd.serve_forever()




runTheServer()



	