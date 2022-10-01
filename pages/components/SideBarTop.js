const SideBarTop = () => {
    return (
        <div className='sidebar__top md:p-3 text-center'>
            <span className='box--logo max-w-[120px] hidden md:inline-block'>
                <img className='img--logo' src="/logo.png"></img>
            </span>
            <span className='block text-left pt-3 pl-6 md:hidden'>
                <i className='fa fa-times text-rose-3000 text-2xl'></i>
            </span>
        </div>
    );
}

export default SideBarTop;