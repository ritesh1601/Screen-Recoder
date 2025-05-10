import React from 'react'
import Header from "@/components/Header";
const Page =async ({params}:ParamsWithSearch) => {
    const {id} =  await params;
    return (
        <div className="wrapper page">
            <Header subHeader="riteshsaini1601@gmail.com" title="Ritesh Saini" userImg="/assets/images/dummy.jpg"/>
            <h1 className="font-karla text-2xl">USER ID : {id}</h1>
        </div>
    )
}
export default Page

