import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-demons-default-rtdb.firebaseio.com'
})

export default journalApi