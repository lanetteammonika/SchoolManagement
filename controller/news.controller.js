const news=require('./../schema/news.schema');
const {db} = require('../config/database');

exports.insert = (body,done) => {
    news.create(body).then((newNews)=>{
        done(null,newNews);
    }).catch((err)=>{
        done(err);
    })
};

exports.getAll = (done) => {
    news.findAll({
        where:{
            is_active : 1
        }
    }).then((newsData) => {
        done(null, newsData)
    }).catch((err) => {
        done(err)
    })
}

exports.get = (id, done) => {
    news.find({
        where:{
            id: id,
            is_active: 1
        }
    }).then((data) => {
        done(null, data)
    }).catch((err) => {
        done(err)
    })
}

exports.remove = (id, done) => {
    news.find({
        where: {
            id: id,
            is_active: 1
        }
    }).then((newsData) => {
        if(newsData){
            newsData.updateAttributes({
                is_active: 0
            }).then((deletedNews) => {
                done(null, "News deleted successfully")
            }).catch((err) => {
                done(err)
            })
        }  else {
            done("No news available")
        }
    }).catch((err) => {
        done(err)
    })
}

exports.update = (id, body, done) => {
    news.update(body,{
        where:{
            id: id,
            is_active: 1
        }
    }).then((updatedNews) => {
        if(updatedNews){
            news.find({
                where:{
                    id:id
                }
            }).then((data) => {
                done(null, data)
            }).catch((err) => {
                done(err)
            })
        }else {
            done("Problem updating news")
        }
    }).catch((err) => {
        done(err)
    })
}