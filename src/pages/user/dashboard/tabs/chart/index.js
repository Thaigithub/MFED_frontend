import { useEffect, useState, useRef } from 'react'
import ChartComponent from './component'
import axios from 'axios'
import api from '../../../../../assets/api'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'
export default function Chart(){
    const endTime = new Date()
    const startTime = new Date(endTime.getTime() - 72 * 60 * 60 * 1000)
    const [typechart, setTypeChart] = useState('temperature')
    const [time, setTime] = useState({
        from: startTime,
        to: endTime,
    })
    const [parentDimensions, setParentDimensions] = useState({
        width: 0,
        height: 0,
      });
    const [data, setData] = useState({
        'real':[],
        'forecast':[]
    })
    const chartcontainerRef = useRef(null)
    useEffect(()=>{
        const request = {
            from: time.from.toISOString(),
            to: time.to.toISOString(),
            type: typechart,
        }
        console.log(request)
        axios.get(api.BACKEND_API+`data/query`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            },
            params: request
        })
        .then(response => {
            const newdata = response.data
            newdata.real = newdata.real.map(item =>({
                time: new Date(item.time),
                data: item.data
            }))
            newdata.forecast = newdata.forecast.map(item =>({
                time: new Date(item.time),
                data: item.data
            }))
            newdata.forecast.unshift(newdata.real[newdata.real.length-1])
            setData(newdata)
        })
        .catch(error=>console.error(error))
    },[time, typechart]);
    function handleChangeTimeTo(date){
        setTime({
            from: time.from,
            to: date,
        })
    }
    function handleChangeTimeFrom(date){
        setTime({
            from: date,
            to: time.to,
        })
    }
    useEffect(() => {
        const handleResize = (entries) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            setParentDimensions({ width, height });
          }
        };
    
        const resizeObserver = new ResizeObserver(handleResize);
        if (chartcontainerRef.current) {
          resizeObserver.observe(chartcontainerRef.current);
        }
    
        return () => {
          resizeObserver.disconnect();
        };
      }, []);
    return(
        <div className="flex flex-col w-full h-full bg-gray-200 p-8">
            <div className='font-bold text-4xl'>
                Biểu đồ
            </div>
            <div className='flex flex-col w-full my-2 bg-white py-3 border-t-4 border-[#3c8dbc] '>
                <div className='flex flex-row w-full items-center justify-center my-2'>
                    <div className='flex w-full justify-center items-center'>
                        <DatePicker
                            selected={time.from}
                            onChange={handleChangeTimeFrom}
                            showTimeSelect
                            timeFormat="HH:mm:ss"
                            timeIntervals={60}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-fit rounded-lg outline-none focus:border-blue-500 border-[#3c8dbc] border-2 p-2"
                        />
                    </div>
                    <div className='flex w-full justify-center items-center'>
                        <DatePicker
                            selected={time.to}
                            onChange={handleChangeTimeTo}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="rounded-lg outline-none focus:border-blue-500 border-[#3c8dbc] border-2 p-2 w-fit"
                        />
                    </div>
                </div>
                <div className='flex w-full items-center justify-center'>
                    <select value={typechart}  onChange={(e) => setTypeChart(e.target.value)} className='outline-none border-2 border-[#3c8dbc] rounded-lg p-2'>
                        <option value="temperature" >Nhiệt độ</option>
                        <option value="salinity">Độ mặn</option>
                        <option value="ph">Độ pH</option>
                        <option value="turbidity">Độ đục</option>
                        <option value="do">Độ bão hòa Oxy</option>
                    </select>
                </div>
            </div>
            <div ref={chartcontainerRef} className='flex w-full h-full bg-white justify-center items-center'>
                <ChartComponent data={data} width={parentDimensions.width} height={parentDimensions.height}/>
            </div>
        </div>
    )
}