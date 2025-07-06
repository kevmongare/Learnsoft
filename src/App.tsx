import './App.css'
import { motion} from "framer-motion";
import { useEffect } from 'react';
import Learnsoft from './assets/learnsoft.png'
import SchoolErp from './assets/ERP-Webpage-Graphic-1.png'

function App() {

  
   // ✅ Proper way to interact with the DOM in React
  useEffect(() => {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    const toggleMenu = () => {
      if (menu) {
        menu.classList.toggle('hidden');
      }
    };

    if (menuBtn) {
      menuBtn.addEventListener('click', toggleMenu);
    }

  //avoiding memory leaks
    return () => {
      if (menuBtn) {
        menuBtn.removeEventListener('click', toggleMenu);
      }
    };
  }, []); // Runs once after component mounts

  const phoneNumber = "254706384510"; 
  const message = "Hello! I'm interested in your services.";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  //whatsapp link for the float icon

  return (
    <>
      {/* ✅ Sticky Menu Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-md">
        <div className="px-5 md:px-20 py-4 flex justify-between items-center">
          <h1 className="font-extrabold text-3xl cursor-pointer text-blue-950">
            Learn<span className="text-orange-500">Soft</span>
            <span className="text-xs font-light">solutions</span>
          </h1>

          <nav className=" hidden md:flex absolute top-16 left-0 w-full bg-blue-950  md:bg-transparent md:static  md:space-x-6 md:items-center md:w-auto py-3 px-3 space-x-4"
          id='menu'>
            <a href="#" className="md:text-gray-900  text-white hover:text-orange-600">Home</a>
            <a href="#Overview" className="md:text-gray-900  text-white hover:text-orange-600">Overview</a>
            <a href="#Aboutus" className="md:text-gray-900  text-white hover:text-orange-600">About Us</a>
            <a href="#" className="md:text-gray-900  text-white hover:text-orange-600">Products</a>
            <a href="#services" className="md:text-gray-900  text-white hover:text-orange-600">Services</a>
            <a href="#contact" className="md:text-gray-900  text-white hover:text-orange-600">Contact Us</a>
            <a
              href="#"
              className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium"
            >
              Access Demo
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="border border-orange-600 rounded-full py-1 px-4 hover:bg-orange-600 hover:text-white"
            id='menu-btn'>
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* ✅ Hero Section with External CSS background linked on the app.css*/}
      <motion.section 
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="relative w-full h-full md:h-[70vh] hero-bg px-5 items-center justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full md:px-20 grid md:flex  text-white justify-between py-16 lg:px-20 px-4">
          <div className='pt-5 text-center md:text-start'>
            <h1 className="text-4xl md:text-7xl text-start font-semibold mb-4">
              Game-Changing<br />
              ERP <br />
              <span className="text-orange-500">Solutions</span>
            </h1>
            <motion.p 
            initial={{ x: -100 }}
            animate={{ x: 0 }}
              className="font-light md:text-lg  mb-6 text-start">
              Through our solutions, we empower organizations to realize<br />
              a Return On Investment (ROI) and make informed decisions.
            </motion.p>
            <motion.a
            whileTap={{ scale: 0.8 }}
            
              href="/courses"
              className="inline-block bg-orange-500 text-white px-6 py-3 mt-5 rounded hover:bg-orange-600 w-fit"
            >
              Explore Our Products
            </motion.a>
          </div>

          <div>
            <img src={Learnsoft} alt=""  className='hidden md:block h-100 rounded-2xl'/>
          </div>
        </div>
      </motion.section>

      {/* overview section */}

  <section id="Overview" className="w-full bg-white">
            {/* Section 1: What is ERP */}
            <div className="max-w-7xl mx-auto py-20 px-4 lg:px-20">
              <h1 className="text-4xl font-bold text-black mb-6">
                What is Enterprise Resource Planning (E.R.P) Software?
              </h1>
              <div className='justify-between md:flex grid'>
                <motion.p 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-gray-700 text-lg leading-relaxed font-medium max-w-5xl">
                  Enterprise Resource Planning (ERP) software is a powerful all-in-one system that helps businesses manage their daily operations — including sales, inventory, accounting, payroll, human resources, and customer relationships — all from a single, connected platform.
                  <br /><br />
                  At <span className="text-blue-950 font-semibold">Learnsoft Beliotech Solutions</span>, our ERP systems bring all your key business functions together in one place. With real-time visibility, streamlined workflows, and enhanced collaboration across departments, our ERP helps your team reduce manual work, make smarter decisions, and operate more efficiently. It’s the foundation for modern, scalable business growth.
                </motion.p>
                <img src={SchoolErp} alt="" className='mx-auto h-60 md:h-80 pl-5'/>
                
              </div>
            </div>

            {/* Section 2: Why You Need ERP */}
            <div className="max-w-7xl mx-auto py-16 px-4 lg:px-20 bg-gray-50 shadow-md">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Why Your Business Needs ERP
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed font-medium max-w-5xl">
                No more juggling between disconnected systems. With ERP, your team works with the same real-time data — reducing errors, saving time, and improving accuracy across the board. From sales and finance to HR and inventory, you gain a clear and unified view of your business performance.
                <br /><br />
                ERP empowers your business to automate repetitive tasks, reduce operational costs, and keep every department aligned. Whether you're a fast-growing startup or an established company, ERP gives you the control and flexibility to scale confidently — acting as the command center for smarter, more strategic growth.
              </p>
            </div>
     </section>


      {/* About Us */}
      <section id='Aboutus' className='w-ful'>
        <div className='max-w-7xl mx-auto font-bold py-20 lg:px-30 px-4'>
          <h1 className='text-4xl text-black mb-6'>About Us</h1>
          <p></p>
        </div>
      </section>

      {/* products */}
      

      {/* services */}

      {/* contaact Us */}
       <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-50 bg-orange-500 text-white rounded-full p-4 shadow-lg hover:bg-orange-600  transition  animate-pulse"
    >
       <motion.svg
       whileTap={{ scale: 0.8 }}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-8 h-8"
      >
        <path d="M12.04 2.01A10 10 0 0 0 2 12.06a9.84 9.84 0 0 0 1.37 5.09L2 22l5.07-1.33a9.95 9.95 0 0 0 4.96 1.28H12A10 10 0 0 0 12.04 2zM12 20.08a8.07 8.07 0 0 1-4.1-1.13l-.3-.17-3.02.79.8-2.94-.2-.31a8.04 8.04 0 1 1 14.9-4.27 8.03 8.03 0 0 1-8.08 8.03zm4.62-6.03c-.26-.13-1.5-.74-1.73-.83s-.4-.13-.57.13-.66.83-.81 1-.3.2-.56.07a6.6 6.6 0 0 1-1.94-1.2 7.4 7.4 0 0 1-1.37-1.7c-.14-.26 0-.4.12-.53.12-.13.26-.3.4-.45.14-.15.2-.26.3-.43a.5.5 0 0 0-.02-.48c-.07-.14-.57-1.37-.78-1.87s-.4-.42-.56-.43h-.48a.92.92 0 0 0-.67.31 2.78 2.78 0 0 0-.86 2.06c0 1.22.87 2.4 1 2.57.13.17 1.7 2.6 4.13 3.64.58.25 1.04.4 1.4.51a3.35 3.35 0 0 0 1.56.1 2.66 2.66 0 0 0 1.75-1.22c.22-.3.22-.54.16-.74s-.24-.17-.5-.3z" />
      </motion.svg>
    </a>


      {/* Subscription Form */}
      <div className="bg-blue-950 p-6 text-white placeholder:text-white">
      <div className='max-w-6xl mx-auto'>
        <h2 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h2>
        <form
          action="https://YOUR-USERNAME.usX.list-manage.com/subscribe/post?u=XXXXXXX&amp;id=XXXXXXX"
          method="post"
          target="_blank"
          rel="noopener noreferrer"
          className='grid'
        >
          <input
            type="email"
            name="EMAIL"
            placeholder="Enter your email"
            required
            className="p-2 border border-gray-300 rounded w-100 mb-3"
          />
          <button
            type="submit"
            className="w-fit bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
          >
            Subscribe
          </button>
          </form>
      </div>
      
        <hr className='max-w-7xl mx-auto my-5 text-gray-400'/>
        <footer className='justify-between flex mx-auto max-w-6xl'>
        <p className='text-sm text-start font-extralight max-w-6xl  text-gray-400'>&copy; Learnsoft Beliotech Solutions Limited, All Right Reserved. 2025</p>
        <div>
          <a href="" className='text-gray-400'>FAQ's</a>
        </div>
      </footer>
      </div>
    </>
  )
}

export default App
