

const prepareData = function(data) {
    data.name = "John"
}

const load = function() {
    let data = { name: "David", age: 20 }

    prepareData(data)

    newData = data
    console.log(newData)
}

load()

var someData = null
const assignNull = function(nullData) {
    let x
    if (x = nullData) {
        console.log("xxxx")
    } else {
        console.log("~~~~~~~~")
    }
}

assignNull()
