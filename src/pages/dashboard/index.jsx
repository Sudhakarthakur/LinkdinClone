// import { useRouter } from 'next/router'
import { BASE_URL } from "@/config"
import { getAllUsers } from '@/config/redux/action/authAction';
import { getAboutUser, getAllPost } from '@/config/redux/action/postAction';
import DashboardLayout from '@/layout/dashboardLayout';
import UserLayout from '@/layout/userLayout';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./index.module.css"
import { ST } from "next/dist/shared/lib/utils";

export default function Dashboard() {

    const authState = useSelector((state) => state.auth)
    const router = useRouter();
    const dispatch = useDispatch();



    useEffect(() => {
        if (authState.isTokenThere) {
            dispatch(getAllPost())
            dispatch(getAboutUser({ token: localStorage.getItem("token") }))
        }
        if (!authState.all_profiles_fetched) {
            dispatch(getAllUsers());
        }
    }, [authState.isTokenThere])


    const [postContent, setPostContent] = useState("");
    const [fileContent, setFileContent] = useState();

    // console.log(`${BASE_URL}/${authState.user.userId.profilePicture}`)


    // console.log(`${BASE_URL}/${authState.user.all_profiles_fetched}`)

    if (authState.user) {

        return (
            <UserLayout>
                <DashboardLayout>
                    <div className={styles.scrollComponent}>
                        <div className={styles.createPostContainer}>
                            <img className={styles.userProfile} width={"200"}
                                src={`${BASE_URL}/${authState.user.userId.profilePicture}`} />
                            {/* src="logoimage.png" /> */}
                            <textarea onChange={(e) => setPostContent(e.target.value)} value={postContent} placeholder="Write something about post" className={styles.textArea} name="" id="" />
                            <label htmlFor="fileUpload" >
                                <div className={styles.feb}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>
                            </label>
                            <input onChange={(e) = setFileContent(e.target.files[0])} type="file" hidden id="fileUpload" />
                            {postContent.length > 0 &&
                                <div className={styles.uploadButton}>Post</div>
                            }
                        </div>

                    </div>
                </DashboardLayout>
            </UserLayout>
        )
    } else {
        return (
            <UserLayout>
                <DashboardLayout>
                    <h2>
                        Loading....
                    </h2>
                </DashboardLayout>
            </UserLayout>
        )
    }
}
