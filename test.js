let arr = [null ,null, null]
arr.forEach((item, index,arr)=> {
    console.log(item)
    arr[index] = '123'
})
console.log(arr)
