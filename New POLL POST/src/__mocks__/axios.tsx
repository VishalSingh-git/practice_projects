const axios={
    get:jest.fn(()=>{
       return Promise.resolve({})
    })
}
export default axios
