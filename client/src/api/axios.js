import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5077/api'
})

export default instance