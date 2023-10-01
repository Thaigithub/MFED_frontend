import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import Chart from './tabs/chart'

export default function Dashboard(){
    const router = useNavigate();
    useEffect(()=>{
        const accessToken = sessionStorage.getItem('accessToken');
        if(!accessToken){
            router('/');
            return;
        }
    });
    const [tab,setTab] = useState('chart')
    function handleTab(e){
        setTab(e.target.id)
    }
    return (
        <div className="w-screen h-screen">
            <div className="w-24 h-full left-0 top-0 absolute flex flex-col justify-start items-center bg-white px-3">
                <div className="flex w-full justify-center items-center border-b-2 border-black py-7">
                    <img
                        src='/logo.png'
                        alt='Logo'
                        width={30}
                        height={30}
                    />
                </div>
                <div className={`flex w-full justify-center items-center hover:bg-stone-100 rounded-lg my-5 h-16 ${tab==='chart'? 'bg-stone-200' : 'bg-white'}`} id='chart' onClick={handleTab}>
                    <FontAwesomeIcon icon={faChartSimple} className="h-8"/>
                </div>
            </div>
            <div className="h-full w-[calc(100vw - 96px)] ml-24">
                {tab==='chart'?<Chart/>:<div></div>}
            </div>
        </div>
    )
}