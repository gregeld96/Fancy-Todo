const axios = require('axios')

class boredomController {
    static findActivity(req, res, next){
        axios({
            method: 'GET',
            url: 'http://www.boredapi.com/api/activity/'
        })
        .then(response => {
            let { data } = response
            res.status(200).json({activity: data})
        })
        .catch(err => {
            next(err);
        })
    }

    static activityType(req, res, next){
        const { type } = req.params
        axios({
            method: 'GET',
            url: `http://www.boredapi.com/api/activity?type=${type}`
        })
        .then(response => {
            let { data } = response
            if(data.error) throw ({status: 404, msg: data.error})
            else res.status(200).json({activity: data})
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = boredomController;