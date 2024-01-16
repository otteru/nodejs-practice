const http = require("http");

function handleRequest(request, response) {
	
	if(request.url === "/currenttime") {
		response.statusCode = 200
		response.end("<h1>" + new Date().toISOString() + "</h1>"); 
	}else if(request.url == "/"){
		response.statusCode = 200; 
		//statusCode - 현재 접속상태(200-정상 4xx-client error 5xx-sever error)
		response.end("<h1>Hello World!</h1>"); // 답변 보내는 것	
	}	
}

const server = http.createServer(handleRequest);
/*createServer 메서드의 콜백 함수인 handleRequest 함수에는 보통 두 개의 매개변수가 전달됩니다.다.
이들은 request와 response 객체입니다.*/
server.listen(3000);