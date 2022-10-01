const SideBarFooter = () => {
    return (
        <div className='sidebar--footer bg-primary-pink-5000 rounded-2xl mx-3 mx-md-0 absolute -bottom-[22px] md:-left-3 md:w-[240px]'>
            <div className='socials--box'>
                <ul className='socials--list flex justify-center space-x-3 px-3 py-2.5'>
                    <li className='social--item bg-primary-white-1000 rounded-full px-2 py-1'>
                        <a target="_blank" href="/">
                            <span>
                                <i className='lab la-twitter text-2xl'>

                                </i>
                            </span>
                        </a>
                    </li>
                    <li className='social--item bg-primary-white-1000 rounded-full px-2 py-1'>
                        <a target="_blank" href="/">
                            <span>
                                <i className='lab la-twitter text-2xl'>

                                </i>
                            </span>
                        </a>
                    </li>
                    <li className='social--item bg-primary-white-1000 rounded-full px-2 py-1'>
                        <a target="_blank" href="/">
                            <span>
                                <i className='lab la-telegram text-2xl'>

                                </i>
                            </span>
                        </a>
                    </li>
                    <li className='social--item bg-primary-white-1000 rounded-full px-2 py-1'>
                        <a target="_blank" href="/">
                            <span>
                                <i className='lab la-twitter text-2xl'>

                                </i>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBarFooter;