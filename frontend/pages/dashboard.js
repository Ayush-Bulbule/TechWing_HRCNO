"use client";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { UserAuth } from '@/utils/auth';
import React, { useEffect } from 'react';
import Card from '@/components/Card';
import { MdAdd } from 'react-icons/md';
import Loading from '@/components/Loading';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import publicUrl from '@/utils/publicUrl';
import { initialData } from '@/constants/data';
import { useRouter } from 'next/router';


const Dashboard = () => {
    const router = useRouter();
    const { user, setUser, signOut } = UserAuth();
    const [notes, setNotes] = React.useState([]);
    useEffect(() => {
        console.log(user);
        const fetchData = async () => {
            console.log(user);
            if (user) {
                const res = await axios.get(`${publicUrl()}/get-notes/${user.uid}`);
                const data = await res.data;
                console.log(data);
                setNotes(data);
            }
        };
        fetchData();
    }, [user]);

    const handleNewNote = async () => {
        const docId = Math.floor(Math.random() * 10000000);
        try {
            const res = await axios.post(`${publicUrl()}/note`, {
                docId: docId.toString(),
                title: "New Note",
                content: initialData,
                uid: user.uid,
                category: "frontend",
                tags: ["tag"]
            });


            console.log(res);

            router.push(`/edit/123456798`);
        } catch (error) {
            console.log(error);
            return;

        }

    };

    return (
        <>
            {
                user ?
                    <main className='conatiner flex bg-gray-100 h-screen'>
                        < Sidebar />
                        <div className="w-5/6 overflow-y-scroll ">
                            <div className="px-6">
                                <Navbar />
                                {/* Heading Section */}
                                <Header />
                                {/* Notes Section */}
                            </div>
                            <div className="notes px-6 py-4  mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {/* Add New Note */}
                                <button onClick={handleNewNote}>
                                    <div className=" cursor-pointer note-card flex items-center justify-center bg-white rounded-lg shadow-md flex-col p-4">
                                        <div className="border-2 flex items-center justify-center border-dashed border-blue-400 rounded-full h-32 w-32">
                                            <MdAdd className='text-3xl' />
                                        </div>
                                        <p className='text-blue-400 font-medium mt-4'>Add Note</p>
                                    </div>
                                </button>
                                {
                                    notes.map((note) => {
                                        return <Card key={note._id} id={note.docId} category={note.category} title={note.content[0].content} content={note.content[1].content} timestamp={note.timestamp} displayName={user.displayName} />;
                                    })
                                }
                            </div>
                            <Footer />
                        </div>
                    </main >
                    :
                    <Loading />

            }
        </>
    );
};

export default Dashboard


