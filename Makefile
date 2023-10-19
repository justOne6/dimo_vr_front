build: 
	docker build -it dev_dimovr_front -f dev.Dockerfile .
launch: 
	docker run --name dimovr_frontend \
		-p 8080:8080 \
		-v $$PWD/:/app \
		-it dev_dimovr_front \
		/bin/bash