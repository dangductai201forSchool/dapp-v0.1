import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Container from "./components/Container";


export default function Home() {
  return (
    <div id ='main-wrapper' className='DAO__main-wrapper bg-primary-pink-3000 home'>
      <Head>
        <title>RainbowKit Demo</title>
        <meta
          name="description"
          content="Demo app part of a tutorial on adding RainbowKit to a React application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container></Container>
    </div>
  );
}
