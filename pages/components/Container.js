import { useAccount, useContractRead } from 'wagmi'
import { useState } from 'react';

import { BigNumber, utils } from 'ethers';

import SideBarTop from './SideBarTop';
import SideBarFooter from './SideBarFooter';
import Header from './Header';
import Home from './Home';
import NFTCard from './NFTCard';
import PredictionNow from './PredictionNow';

export default function Container() {
    const [dashboardClicked, setDashboardClicked] = useState(1);

    const Dashboard = () => {
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

                            <a target="_blank" className='item--link font-easport w-full block py-2 pl-3 text-rose-2000' href="/"
                            >
                                Docs
                            </a>
                        </li>
                        <li className='sidebar__item-nav rounded-tl-3xl rounded-bl-3xl false hover:bg-gradient-to-r from-[#ab033e] to-[#ffffff] cursor-pointer'>

                            <a target="_blank" className='item--link font-easport w-full block py-2 pl-3 text-rose-2000' href="/">
                                Community
                            </a>
                        </li>

                        <li className='sidebar__item-nav rounded-tl-3xl rounded-bl-3xl false hover:bg-gradient-to-r from-[#ab033e] to-[#ffffff] cursor-pointer'>

                            <a target="_blank" className='item--link font-easport w-full block py-2 pl-3 text-rose-2000' href="/">
                                Get 1000 SFS (Testnet)
                            </a>
                        </li>
                    </ul>
                </div>
            );
        }

        return (
            <div className='DAO__main-left min-w-[240px] w-[240px] md:block fixed md:static top-0 z-[999] right-0 h-screen hidden md:h-auto shadow-[0_0_10px_3px_#e293ae] md:shadow-none bg-[#fff] md:bg-transparent transition-all'>
                <div className='DAO__sidebar border-rose-3000 border-[5px] bg-primary-white-1000 rounded-2xl relative'>
                    <SideBarTop></SideBarTop>
                    <SideBarContent></SideBarContent>
                    <SideBarFooter></SideBarFooter>
                </div>
            </div>
        );

    }

    const WapperMain = () => {
        const { address, isConnected } = useAccount();
        const Content = () => {
            
            return (
                <div className='DAO__content'>
                    {dashboardClicked === 1 ? (<Home></Home>)
                        : (
                            dashboardClicked === 2 ? (
                                <PredictionNow></PredictionNow>
                            ) : (<NFTCard></NFTCard>)
                        )}

                </div>
            );
        }


        return (<div className='DAO__main-center flex-grow'>
            <div id='DAO__wrapper-main' className='DAO__wrapper-main bg-primary-white-1000 rounded-2xl border-rose-3000 border-[5px]'>
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

