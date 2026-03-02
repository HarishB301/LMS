import React, { useEffect, useRef, useState } from 'react'
import {navbarStyles } from '../assets/dummyStyles'
import logo from '../assets/logo.png'
import {Bookmark, BookOpen, Contact, Home, Menu, Users,X} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import {useClerk,useUser,useAuth,UserButton} from '@clerk/clerk-react'
const navItems=[
  {name:"Home",icon:Home,href:'/'}, 
  {name:"Courses",icon:BookOpen,href:'/courses'},
  {name:"About",icon:Bookmark,href:'/about'},
  {name:"Faculty",icon:Users,href:'/faculty'},
  {name:"Contact",icon:Contact,href:'/contact'}
]

const NavBar = () => {

  const{openSignUp} = useClerk();
  const{isSignedIn}= useUser();
  const{getToken}= useAuth();

  //for mobile toggle
  const[isOpen,setIsopen]=useState(false)
  const[lastScrollY,setLastScrollY]=useState(0);
  const menuRef =useRef(null);
  const isLoggedIn = isSignedIn && Boolean(localStorage.getItem('token'))

  const[isScrolled,setIsScrolled]=useState(false)
  const[showNavbar,setShowNavbar]=useState(true)

  //fetch Token
  useEffect(()=>{
    const loadToken = async()=>{
      if(isSignedIn){
        const token = await getToken();
        localStorage.setItem("token",token);
        console.log("clerk Login Token:",token);
        
      }
    }
    loadToken()
  },[isSignedIn,getToken])

  useEffect(()=>{
    if(!isSignedIn){
      localStorage.removeItem('token')
      console.log("Clerk Token Removed");
      
    }
  },[isSignedIn])

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      console.log("Token removed instantly on Clerk logout event");
    };

    window.addEventListener("user:signed_out", handleLogout);
    return () => window.removeEventListener("user:signed_out", handleLogout);
  }, []);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (scrollY > lastScrollY && scrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsopen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

 
  
  const desktopLinkClass=(isActive)=>
   `${navbarStyles.desktopNavItem} ${
    isActive ? navbarStyles.desktopNavItemActive:""
   }`;
   
   const mobileLinkClass = (isActive)=>
    `${navbarStyles.mobileMenuItem} ${
      isActive ? navbarStyles.mobileMenuItemActive:navbarStyles.mobileMenuItemHover
    }`
  

  return (
    <nav className={`${navbarStyles.navbar}
      ${showNavbar ? navbarStyles.navbarVisible:navbarStyles.navbarHidden}
      ${isScrolled ? navbarStyles.navbarScrolled: navbarStyles.navbarDefault}
     `}>
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          <div className="flex items-center gap3 select-none">
            <img src={logo} alt="logo" className='w-12 h-12 ' />
            <div className='text-xl font-bold bg-clip-text text-transparent bg-linear-to-r
            from-sky-700 to-cyan-600 font-serif leading-[0.95]'>
              SkillForge
            </div>
          </div>

          {/*Desktop nav*/}
          <div className={navbarStyles.desktopNav}>
            <div className={navbarStyles.desktopNavContainer}>
                {
                  navItems.map((item)=>{
                     const Icon = item.icon;
                     return(
                      <NavLink key={item.name} to={item.href} end={item.href==='/' }
                        className={({isActive})=> desktopLinkClass(isActive)}>
                          <div className='flex items-center space-x-2'>
                              <Icon size={16} className={navbarStyles.desktopNavIcon}> </Icon>
                                <span className={navbarStyles.desktopNavText}>{item.name}</span>
                          </div>
                      </NavLink>
                     )
                  })
                }
            </div>
                {/* Right Side*/}
            
          </div>  

          <div className={navbarStyles.authContainer}>
                {!isSignedIn ? 
                (<button type='button' onClick={()=>openSignUp({})} 
                className={navbarStyles.createAccountButton ?? navbarStyles.loginButton}>
                  <span>Create Account</span>
                </button>)
                :
               ( <>
                  <div className='flex items-center'>
                    <UserButton  afterSignOutUrl='/'></UserButton>
                  </div>
               </>)}

               {/*toggle*/}
               <button onClick={()=> setIsopen(!isOpen)} 
               className={navbarStyles.mobileMenuButton}>
                {isOpen ? <X size={20}/> : <Menu size={20}/>}
               </button>
            </div>        
        </div>
        {/*Mobile Navigation*/}
        <div ref={menuRef} className={`${navbarStyles.mobileMenu} ${
          isOpen ? navbarStyles.mobileMenuOpen : navbarStyles.mobileMenuClosed
        }`}>
        <div className={navbarStyles.mobileMenuContainer}>
          <div className={navbarStyles.mobileMenuItem}>
            {
              navItems.map((item)=>{
                   const Icon = item.icon;
                   return(
                    <NavLink key={item.name} to={item.href} end={item.href === '/'}
                    className={({isActive})=> mobileLinkClass(isActive)} 
                    onClick={()=> setIsopen(false)}>

                     <div className='flex flex-row'>
                       <div className={navbarStyles.mobileMenuIconContainer}>
                        <Icon size={18} className={navbarStyles.mobileMenuIcon}></Icon>
                      </div>
                      <span className={navbarStyles.mobileMenuText}>
                        {item.name}
                      </span>
                     </div>
         
                    </NavLink>
                   )
              })
            }
             {!isSignedIn ? 
                (<button type='button' onClick={()=>{openSignUp({}); setIsopen(false)}} 
                className={navbarStyles.mobileCreateAccountButton ?? navbarStyles.mobileLoginButton}>
                  <span>Create Account</span>
                </button>)
                :
               ( <>
                  <div className='px-4 py-2'>
                    <UserButton  afterSignOutUrl='/'></UserButton>
                  </div>
               </>)}

          </div>
        </div>
        </div>
      </div> 
      <div className={navbarStyles.backgroundPattern}>
        <div className={navbarStyles.pattern}></div>
      </div>
    </nav>
  )
}

export default NavBar
