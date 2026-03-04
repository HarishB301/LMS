import React from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import HomeCourse from '../components/HomeCourse'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
       <NavBar></NavBar>
       <Banner></Banner>
       <HomeCourse/>
       <Testimonial/>
       <Footer/>
    </div>
  )
}

export default Home
