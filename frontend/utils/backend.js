import axios from 'axios'

//For Logging in and signing up as an authorized user 

export async function signUp(user) {
    const { data } = await axios.post('/mongo/users/signup', user)
    return data
}

export async function logIn(user) {
    const { data } = await axios.post('/mongo/users/login', user)
    return data
}

export async function getUser(email) {
    const data = await axios.get('/mongo/users/finduser/'+ email)
    return data.data
}
//For Spotify Commands

export async function addCodeVerifier(response_data){
    const data = await axios.post ('/mongo/users/addcodeverifier', response_data)
    return data
}

export async function getUserCodeVerifier(email){
    const {data} = await axios.get ('/mongo/users/newcodeverifier/' + email)
    return data
}




//For Full Crud on comments (User must be logged in to do any Updates,Deletes or Creating)
export async function getUserComments(userId) {
    const {data} = await axios.get('/mongo/comments/user/'+ userId)
    return data
}

export async function getComments(contentName) {
    const { data } = await axios.get(`/mongo/comments/${contentName}`)
    return data
}

export async function postComment(comment) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.post('/mongo/comments', comment, authHeader)
    return data
}

export async function updateComment(comment, id) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.put(`/mongo/comments/${id}`, comment, authHeader)
    return data
}

export async function deleteComment(id) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.delete(`/mongo/comments/${id}`, authHeader)
    return data
}



//Create Events Through Calender Page
export async function getUserEvents() {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const  {data}  = await axios.get('/mongo/events', authHeader)
    return data
}
export async function postEvent(eventData) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.post('/mongo/events', eventData, authHeader)
    return data
}
export async function editEvent(eventData, id) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.put(`/mongo/events/${id}`, eventData, authHeader)
    return data
}
export async function deleteEvent(id) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.delete(`/mongo/events/${id}`, authHeader)
    return data
}