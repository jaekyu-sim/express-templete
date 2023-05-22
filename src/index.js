import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dayjs from 'dayjs';

//import TestDataController from "./controllers/testDatas";
import Controllers from './controllers';

const app = express();
//const app2  express();

//app.use -> 미들웨어 사용을 위한 함수
app.use(
    cors({
        origin: "*", // "" 안에 naver.com 을 넣으면 naver.com 에서 오는 요청만 처리하겠다는 뜻. * 로 표기하여 모든 도메인에서 오는 요청 다 처리하겠다는 뜻.
    })
)
app.use(helmet()); // 보안 강화용 미들웨어

const today = new Date();
const todayToDayjs = dayjs(today).format("YYYY-MM-DD");
console.log(todayToDayjs);
//아래 middleware 선언해야 json body 값을 입력으로 받을 수 있음.
app.use(express.json()); 
app.use(express.urlencoded({ extended : true, limit: "700mb"}))



Controllers.forEach((controller) => {
    app.use(controller.path, controller.router);
})

app.use((err, req, res, next) => {
    //res.status(404).json({message: "에러 발생했습니다. 404 입니다."});
    console.log(err);
    //res.status(500).json({message: "에러 발생했습니다. 500 입니다."});
    
    res.status(err.status || 500)
    .json({message : err.message || "서버에서 에러가 발생하였습니다"})
})

app.listen(8000, ()=>{
    console.log("서버가 시작되었습니다.");
});

