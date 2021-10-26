// socket 구현
import fetch from "node-fetch";
import app from "./server";
import SocketIO from "socket.io";
import http from "http";
import dotdev from "dotenv";
dotdev.config();

const server = http.createServer(app);
const io = SocketIO(server);

// searchPlace 비동기 사용해서 검색 결과 반환
async function searchPlace(keyword){
    const searchResults = [];
    const baseURL = "https://dapi.kakao.com/v2/local/search/keyword.json";
    const config = {
        query : keyword,
        x : "126.54220428695811",
        y : "33.395088234717406",
        rect : "126.12717034442123,33.57731072530017,127.00740156999781,33.259875411548975"
    }
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    const result = await (
            await fetch (finalURL, {
            method : "GET",
            headers : {
                Authorization : `KakaoAK ${process.env.KAKAO_KEY}`
            },
        })
    ).json();
    
    result["documents"].forEach((document) => { 
            searchResults.push(document);
    });

    return searchResults;
}

async function sendSearchResults(keyword, socket){
    const searchResults = await(searchPlace(keyword));
    socket.emit("search_result", searchResults);
}

function addPlaceToDataBase(){
    // DATABASE 작업
}

function delPlaceFromDataBase(){
    // DATABASE 작업
}

io.on("connection", (socket) => {
    //무슨 event가 일어났는지 확인하는 용도(추후 삭제)
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
      });
    // plan id 로 만든 room에 join
    socket.on("join_room", (planId, init) => {
        socket.join(planId);
        init();
    });
    //search_keyword로 찾기
    socket.on("search_keyword", (keyword) => {
        sendSearchResults(keyword, socket);

    });
    
    socket.on("add_to_placelist", (placeObj) => {
        //database 작업
        
        io.emit("place_add_map", placeObj);
    });

    
    socket.on("del_from_placelist", (coordinates) => {
        //database 작업
        // list에서 해당 좌표를 가진 place 삭제
        io.emit("place_delete_map", coordinates);
    })

    socket.on("send_chatting_msg", (msgObj) => {
        io.emit("print_chatting_msg", msgObj);
    })

});

export default server;

