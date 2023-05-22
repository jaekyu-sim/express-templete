import { Router } from "express";
//test controller
class TestDataController{
    router;
    path = "/datas";
    testDatas = [
        {
            id : 1,
            name : "jaekyu",
            age : 34
        }
    ];
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){
        //router 등록
        this.router.get("/", this.getDatas.bind(this));
        this.router.get("/detail/:id", this.getData.bind(this));
        this.router.post("/", this.createData.bind(this));
        this.router.delete("/detail/:id", this.deleteData.bind(this));
    }

    getDatas(req, res, next){
        res.status(200).json({testDatas : this.testDatas})
    }

    getData(req, res, next){
        try{
            const { id } = req.params;
            const testData = this.testDatas.find((data) => data.id === Number(id));
            if(!testData){
                throw{status: 404, message : "유저를 찾을 수 없습니다."}
            }
            res.status(200).json({testData : testData})
        }
        catch(err)
        {
            next(err);
        }
        
    }

    createData(req, res, next){
        const { name, age } = req.body;

        this.testDatas.push({
            id : this.testDatas[this.testDatas.length - 1].id + 1,
            name : name,
            age : age

        })
        res.status(201).json({testData : this.testDatas})
    }

    deleteData(req, res, next){
        const { id } = req.params;
        console.log(id);

        const buffer = this.testDatas.filter((data) => data.id !== Number(id));

        this.testDatas = buffer;

        res.status(201).json({buffer})

    }
}

const testDataController = new TestDataController();

export default testDataController;