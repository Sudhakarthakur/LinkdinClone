import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import UserLayout from "@/layout/userLayout";


export default function Home() {

  const router = useRouter();
  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.maninContainer__left}>
            <p>Connect with friends without Exaggeration</p>
            <p>A true social media platform , with stories no blufs !</p>
            <div onClick={() => {
              router.push("/login")
            }} className={styles.buttonjoin}>
              <p>Join now</p>
            </div>
          </div>
          <div className={styles.mainContainer__right}>
            <img src="images/logoimage.png" alt="" />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
