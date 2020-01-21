server {
	listen 80 default_server;
	listen [::]:80 default_server;
	server_name _;

	root /html/;
	
	location ~ /ip/(.)$ {
		proxy_pass   http://$1; 
		auth_request /auth;
	}
    
}


if ($('#currentWorkbench').has('option').length > 0) await loadWorkbenches();