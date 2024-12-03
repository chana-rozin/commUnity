"use client"
import http from '../services/http'
import axios from 'axios'
async function getUser(){
    const result  =  await axios.get('http://localhost:3000/api/users/674ed9fb04a9dba04cdfaea7');
    return result.data;
    
}

export default await getUser();

