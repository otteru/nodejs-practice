const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.use(express.urlencoded({extended: false}));
// 들어오는 모든 요청을 살펴보고 찾는 요청이면 자바스크립트로 변형해주는 코드

app.get("/currenttime", function(req, res){
	res.send("<h1>" + new Date().toISOString() + "</h1>");
}); // localhost:3000/currenttime

app.get("/", function(req, res) {
	res.send("<form action='/store-user' method='POST'><label>Your Name</label><input type='text'name='username'><button>Submit</button></form>");
}); // localhost:3000/

app.post("/store-user", function(req, res) {
	const userName = req.body.username;
	
	const filePath = path.join(__dirname, "data", "users.json");
	//파일 경로를 설정
	
	const fileData = fs.readFileSync(filePath); //동기적인 방식으로 파일을 읽어들이는 부분
	const existingUsers = JSON.parse(fileData); //읽어들인 파일 데이터를 JSON 형식으로 파싱하는 부분
	
	existingUsers.push(userName);
	
	fs.writeFileSync(filePath, JSON.stringify(existingUsers));
	//JSON.stringify(existingUsers) 자바 스크립트가 아니라 스트링을 보내야 해서 이 작업을 ㅎ
	res.send("<h1>Username stored!</h1>");
});

app.listen(3000);

// function handleRequest(request, response) {
	
// 	if(request.url === "/currenttime") {
// 		response.statusCode = 200
// 		response.end("<h1>" + new Date().toISOString() + "</h1>"); 
// 	}else if(request.url == "/"){
// 		response.statusCode = 200; 
// 		//statusCode - 현재 접속상태(200-정상 4xx-client error 5xx-sever error)
// 		response.end("<h1>Hello World!</h1>"); // 답변 보내는 것	
// 	}	
// }

// const server = http.createServer(handleRequest);
// /*createServer 메서드의 콜백 함수인 handleRequest 함수에는 보통 두 개의 매개변수가 전달됩니다.다.
// 이들은 request와 response 객체입니다.*/
// server.listen(3000);