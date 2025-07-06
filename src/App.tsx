import './App.css'
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
      <section className="relative w-full h-full md:h-[70vh] hero-bg px-5 items-center justify-center">
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
            <p className="font-light md:text-lg  mb-6">
              Through our solutions, we empower organizations to realize<br />
              a Return On Investment (ROI) and make informed decisions.
            </p>
            <a
              href="/courses"
              className="inline-block bg-orange-500 text-white px-6 py-3 mt-5 rounded hover:bg-orange-600 w-fit"
            >
              Explore Our Products
            </a>
          </div>

          <div>
            <img src={Learnsoft} alt=""  className='hidden md:block h-100 rounded-2xl'/>
          </div>
        </div>
      </section>

      {/* overview section */}

  <section id="Overview" className="w-full bg-white">
            {/* Section 1: What is ERP */}
            <div className="max-w-7xl mx-auto py-20 px-4 lg:px-20">
              <h1 className="text-4xl font-bold text-black mb-6">
                What is Enterprise Resource Planning (E.R.P) Software?
              </h1>
              <div className='justify-between md:flex grid'>
                <p className="text-gray-700 text-lg leading-relaxed font-medium max-w-5xl">
                  Enterprise Resource Planning (ERP) software is a powerful all-in-one system that helps businesses manage their daily operations — including sales, inventory, accounting, payroll, human resources, and customer relationships — all from a single, connected platform.
                  <br /><br />
                  At <span className="text-blue-950 font-semibold">Learnsoft Beliotech Solutions</span>, our ERP systems bring all your key business functions together in one place. With real-time visibility, streamlined workflows, and enhanced collaboration across departments, our ERP helps your team reduce manual work, make smarter decisions, and operate more efficiently. It’s the foundation for modern, scalable business growth.
                </p>
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
      <hr className='max-w-6xl mx-auto my-5 text-gray-400'/>
      <p className='text-start font-extralight max-w-6xl mx-auto text-gray-400'>&copy; Learnsoft Beliotech Solutions Limited, All Right Reserved. 2025</p>
        </div>
    </>
  )
}

export default App
