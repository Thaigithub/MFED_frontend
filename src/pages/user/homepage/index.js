import {Formik,Form,ErrorMessage,Field} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import api from '../../../assets/api'
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Must be email form').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Homepage(){
    const history = useNavigate();
    const initialvalue = {
        email: '',
        password: '',
      }
    function handleSubmit(values) {
        axios.post(api.BACKEND_API+`auth/login`, values)
        .then(res=>{
            sessionStorage.setItem('accessToken', res.data.accessToken)
            history('/dashboard')
        })
        .catch(err=>{console.log(err)})
    }
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-[url('https://rapido.npnlab.com/Content/img/bg.jpg')] bg-no-repeat bg-center bg-cover fixed-background">
            <div className="flex flex-col w-1/2 items-center justify-center bg-white rounded p-5">
            <div className='flex w-full justify-center font-bold text-xl'>
                Đăng nhập
            </div>
            <div className='flex flex-col w-full border-b border-[#3c8dbc] pb-2'>
                <Formik
                initialValues={initialvalue}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                >
                <Form className="my-1">
                    <div className='flex w-full border-2 rounded-lg px-2 py-3 mt-5'>
                    <Field type="email" id="email" name="email" placeholder="Email" className="flex w-full focus:outline-none"/>
                    </div>
                    <ErrorMessage name="email" component="div" className='text-red-500'/>

                    <div className='flex w-full border-2 rounded-lg px-2 py-3 mt-5'>
                    <Field type="password" id="password" name="password" placeholder="Password" className="flex w-full focus:outline-none"/>
                    </div>
                    <ErrorMessage name="password" component="div" className='text-red-500'/>
                    <button type="submit" className="flex w-full items-center justify-center bg-[#3c8dbc] py-2 font-bold text-white mt-5 hover:bg-[#367fa9]">Đăng nhập</button>
                </Form>
                </Formik>
            </div>
            </div>
        </div>
    )
}