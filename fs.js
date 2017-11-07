const fs = require('fs')
// Ignore two first argument node and filename
const rootDir = process.argv[2]
const years = [2013, 2014, 2015, 2016, 2017]
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
console.log('rootDir', rootDir)
fs.readdir(rootDir, (err, files)=>{
    if (err){
        console.log('Err', err)
        return
    }
    years.forEach(year=>{
        months.forEach(month=>{
            let re = new RegExp(year+'-'+month)
            let monthData = files.filter(item=>item.match(re))
            if (monthData && monthData.length >0){
                let newDir = rootDir+'/'+year.toString()+month.toString()
                console.log('New Dir', newDir)
                !fs.existsSync(newDir) && fs.mkdirSync(newDir)
                monthData.forEach(gpx=>{
                    fs.renameSync(rootDir+'/'+gpx, newDir+'/'+gpx)
                })
            }
        })
    })
})