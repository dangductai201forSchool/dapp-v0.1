import { useAccount, useContractRead,useSwitchNetwork } from 'wagmi'
import { useState } from 'react';

import { BigNumber, utils } from 'ethers';

import Header from './Header';
import Home from './Home';
import NFTCard from './NFTCard';
import PredictionNow from './PredictionNow';
import config from "../contracts/config.json";


export default function Container() {
    let faucet = config['faucet'];
    let docs = config['docs'];
    let community = config['community'];
    let website = config['website'];
    let twiter = config['twiter'];
    let pancake = config['pancake'];
    
    const [dashboardClicked, setDashboardClicked] = useState(1);
    const [isLeftMenuDisplay,setIsLeftMenuDisplay] = useState(false);

    //child component
    const Dashboard = () => {
        const SideBarTop = () => {
            return (
                <div className='sidebar__top md:p-3 text-center'>
                    <span className='box--logo max-w-[120px] hidden md:inline-block'>
                        <img className='img--logo' src="/logo.png"></img>
                    </span>
                    <span className='block text-left pt-3 pl-6 md:hidden' onClick ={() => setIsLeftMenuDisplay(false)}>
                        <i className='las la-times text-rose-3000 text-2xl'></i>
                    </span>
                </div>
            );
        }
        
        const SideBarContent = () => {
            return (
                <div className='sidebar__content mt-3 ml-3 mb-4'>
                    <ul className='sidebar__list-nav font-easport !space-y-3'>
                        <li className={dashboardClicked === 1 ? 'sidebar__item-nav rounded-tl-3xl rounded-bl-3xl bg-gradient-primary-pink-white hover:bg-gradient-to-r from-[#ab033e] to-[#ffffff] cursor-pointer' : 'sidebar__item-nav rounded-tl-3xl rounded-bl-3xl false hover:bg-gradient-to-r from-[#ab033e] to-[#ffffff] cursor-pointer'}>
                            <a target="_self" className={dashboardClicked === 1 ? 'item--link font-easport w-full block py-2 pl-3 text-white' : 'item--link font-easport w-full block py-2 pl-3 text-rose-2000'}
                                onClick={() => setDashboardClicked(1)}>
                                Home
                            </a>
                        </li>
                        <li className={dashboardClicked === 2 ? 'sidebar__item-nav rounded-tl-3xl rounded-bl-3xl bg-gradient-primary-pink-white hover:bg-gradient-to-r from-[#ab033e] to-[#ffffff] cursor-pointer' : 'sidebar__item-nav rounded-tl-3xl rounded-bl-3xl false hover:bg-gradient-to-r from-[#ab033e] to-[#ffffff] cursor-pointer'}>

                            <a target="_self" className={dashboardClicked === 2 ? 'item--link font-easport w-full block py-2 pl-3 text-white' : 'item--link font-easport w-full block py-2 pl-3 text-rose-2000'}
                                onClick={() => setDashboardClicked(2)}>
                                Predict now!
                            </a>
                        </li>
                        <li className={dashboardClicked === 3 ? 'sidebar__item-nav rounded-tl-3xl rounded-bl-3xl bg-gradient-primary-pink-white hover:bg-gradient-to-r from-[#ab033e] to-[#ffffff] cursor-pointer' : 'sidebar__item-nav rounded-tl-3xl rounded-bl-3xl false hover:bg-gradient-to-r from-[#ab033e] to-[#ffffff] cursor-pointer'}>

                            <a target="_self" className={dashboardClicked === 3 ? 'item--link font-easport w-full block py-2 pl-3 text-white' : 'item--link font-easport w-full block py-2 pl-3 text-rose-2000'}
                                onClick={() => setDashboardClicked(3)}>
                                NFT Card game
                            </a>
                        </li>
                        <li className='sidebar__item-nav rounded-tl-3xl rounded-bl-3xl false hover:bg-gradient-to-r from-[#ab033e] to-[#ffffff] cursor-pointer'>

                            <a target="_blank" rel="noreferrer" href={docs} className='item--link font-easport w-full block py-2 pl-3 text-rose-2000'>
                                Docs
                            </a>
                        </li>
                        <li className='sidebar__item-nav rounded-tl-3xl rounded-bl-3xl false hover:bg-gradient-to-r from-[#ab033e] to-[#ffffff] cursor-pointer'>

                            <a target="_blank" rel="noreferrer" href={community} className='item--link font-easport w-full block py-2 pl-3 text-rose-2000'>
                                Community
                            </a>
                        </li>

                        <li className='sidebar__item-nav rounded-tl-3xl rounded-bl-3xl false hover:bg-gradient-to-r from-[#ab033e] to-[#ffffff] cursor-pointer'>

                            <a target="_blank" rel="noreferrer" href={faucet}  className='item--link font-easport w-full block py-2 pl-3 text-rose-2000' >
                                Get 1000 SFS (Testnet)
                            </a>
                        </li>
                    </ul>
                </div>
            );
        }
        const SideBarFooter = () => {
            return (
                <div className='sidebar--footer bg-primary-pink-5000 round-social '>
                    <div className='socials--box'>
                        <ul className='socials--list flex space-x-3 px-3 py-2.5'>
                        <li className='social--item bg-primary-white-1000 rounded-full px-2 py-1'>
                                <a target="_blank" rel="noreferrer" href={website}>
                                    <span>
                                        <i className='las la-globe text-2xl'>
        
                                        </i>
                                    </span>
                                </a>
                            </li>
                            <li className='social--item bg-primary-white-1000 rounded-full px-2 py-1'>
                                <a target="_blank" rel="noreferrer" href={twiter}>
                                    <span>
                                        <i className='lab la-twitter text-2xl'>
        
                                        </i>
                                    </span>
                                </a>
                            </li>
                            <li className='social--item bg-primary-white-1000 rounded-full px-2 py-1'>
                                <a target="_blank" rel="noreferrer" href={community}>
                                    <span>
                                        <i className='lab la-telegram text-2xl'>
        
                                        </i>
                                    </span>
                                </a>
                            </li>
                            <li className='social--item bg-primary-white-1000 rounded-full px-2 py-1'>
                                <a target="_blank" rel="noreferrer" href={pancake}>
                                    <span>
                                        <i className='las la-dollar-sign text-2xl'>
        
                                        </i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }

        return (
            <div className= {isLeftMenuDisplay?('DAO__main-left min-w-[240px] w-[240px] md:block fixed md:static top-0 z-[999] right-0 h-screen md:h-auto md:shadow-none bg-[#fff] md:bg-transparent transition-all'):('DAO__main-left min-w-[240px] w-[240px] md:block fixed md:static top-0 z-[999] right-0 hidden h-screen md:h-auto shadow-[0_0_10px_3px_#e293ae] md:shadow-none bg-[#fff] md:bg-transparent transition-all')}>
                <div className='DAO__sidebar rounded-2xl relative border-[5px]'>
                    <SideBarTop></SideBarTop>
                    <SideBarContent></SideBarContent>
                    <SideBarFooter></SideBarFooter>
                </div>
            </div>
        );

    }

    const WapperMain = () => {
        
        const LeftMenuButton =() =>{
            return (
                <div className="menu-nav fixed top-0 right-0 md:hidden navbar-toggler-div" onClick ={() => setIsLeftMenuDisplay(true)}>
                    <img src="/menu.png" alt="" className="navbar-toggler"/>
                </div>
            );
        }


        const Content = () => {
            const { chains, error, isLoading, pendingChainId, switchNetwork } =useSwitchNetwork()
            return (
                <div className='DAO__content'>
                    
                    {(dashboardClicked === 1 || isLoading) ? (<Home></Home>)
                        : (
                            dashboardClicked === 2 ? (
                                <PredictionNow></PredictionNow>
                            ) : (<NFTCard></NFTCard>)
                        )}

                </div>
            );
        }


        return (<div className='DAO__main-center flex-grow'>
            <div id='DAO__wrapper-main' className='DAO__wrapper-main bg-primary-white-1000 rounded-2xl border-[5px]'>
                <LeftMenuButton></LeftMenuButton>
                <Header></Header>
                <Content></Content>
            </div>
        </div>);
    }

    return (<div className='DAO__container flex pl-4 pr-4 py-3 mb-5 lg:px-11 md:space-x-3'>
        <Dashboard></Dashboard>
        <WapperMain></WapperMain>
    </div>);
}

