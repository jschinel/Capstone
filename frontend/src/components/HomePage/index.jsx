import { useEffect, useState} from "react"
import { Routes, Route, Link, useNavigate} from "react-router-dom";


export default function HomePage({setNoReload}) 
{

    return (
        <>
            <div className="pt-40">
                <p className="text-center text-6xl">Welcome to my capstone site!!</p>
                <br />
                <br />
                <br />
                <p className="text-center text-4xl">Sift through 1000s of different jokes, solve some riddles or maybe try to learn some new words! Log in or create an account to gain access to your personal spotify music and calender!</p>
            </div>
        </>
    )
}
