import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Container from "./components/Container";


export default function Home() {
  return (
    <div id ='main-wrapper' className='DAO__main-wrapper bg-primary-pink-3000 home'>
      <Head>
        <title>SportFantasy</title>
        <meta
          name="SportFantasy"
          content="Play prediction game to earn and buying NFT card game"
        />
        <link rel="icon" href="./logo-crop.png" />
      </Head>
      <Container></Container>
    </div>
  );
}
