import './App.css'
import { motion} from "framer-motion";
import { useEffect} from 'react';
import Learnsoft from './assets/learnsoft.png'
import SchoolErp from './assets/ERP-Webpage-Graphic-1.png'
import { FaMobileAlt, FaLaptopCode, FaCloud, FaCogs } from "react-icons/fa";


//services

const services = [
  {
    title: "Mobile App Development",
    icon: <FaMobileAlt className="text-4xl text-orange-500 animate-bounce" />,
    description:
      "Custom mobile applications tailored for both Android and iOS platforms.",
  },
  {
    title: "Web App Development",
    icon: (
      <FaLaptopCode className="text-4xl text-orange-500 animate-spin-slow" />
    ),
    description:
      "Responsive and scalable web platforms using the latest tech stacks.",
  },
  {
    title: "Cloud Services",
    icon: <FaCloud className="text-4xl text-orange-500 animate-pulse" />,
    description:
      "Secure cloud infrastructure setup and management for modern scalability.",
  },
  {
    title: "IT Consulting",
    icon: <FaCogs className="text-4xl text-orange-500 animate-wiggle" />,
    description:
      "Professional advisory for transforming and optimizing your tech operations.",
  },
];

//Products

const products = [
  {
    title: "ERP System",
    description:
      "A powerful all-in-one platform to manage sales, inventory, payroll, HR, and finance.",
    image:
      "https://images.ctfassets.net/lzny33ho1g45/1FzzuoyZ554G7ApEDxJZJJ/e8f00ca2c12848541ae01a2dee00f003/0aca5b23-e069-40b7-abce-a0fc846cd857.png",
  },
  {
    title: "School Management System",
    description:
      "Modernize school operations with digital attendance, grading, timetabling, and more.",
    image:
      "https://i0.wp.com/inceptor.co.ke/wp-content/uploads/2019/09/school-management-system-in-Kenya-Inceptor.png?ssl=1",
  },
  {
    title: "Healthcare Software",
    description:
      "Manage patient records, appointments, and billing with ease and security.",
    image:
      "https://images.ctfassets.net/lzny33ho1g45/1FzzuoyZ554G7ApEDxJZJJ/e8f00ca2c12848541ae01a2dee00f003/0aca5b23-e069-40b7-abce-a0fc846cd857.png",
  },
  {
    title: "HR & Payroll System",
    description:
      "Streamline your human resource operations including payroll and performance tracking.",
    image:
      "https://uk.adp.com/-/media/adpuk/redesign2019/images/what-we-offer/products/ihcm/new-ihcm2/ihcm2-corehr.png?rev=2d7b935fcbf8479e94c88ac082bb83b4&la=en&h=348&w=586&hash=2E478FDC38FADA316F7CA1ADA3C9E412",
  },
];
//

function App() {

  
   // mobile menu
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

  //whatsapp connection contact and message
  const phoneNumber = "254706384510"; 
  const message = "Hello! I'm interested in your services.";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  //whatsapp link for the float icon

  // //mailchimp initialization
  // const [email, setEmail] = useState("");
  // const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  // const [emailMessage, setMessage] = useState("");
  

  

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
            <a href="#" className="md:text-gray-900  text-white hover:text-orange-600">Products</a>
            <a href="#services" className="md:text-gray-900  text-white hover:text-orange-600">Services</a>
            <a href="#Aboutus" className="md:text-gray-900  text-white hover:text-orange-600">About Us</a>
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
              className="font-light md:text-lg  mb-6 text-start ">
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


      {/* services */}
      <section
      id="services"
      className="bg-gradient-to-b from-gray-50 to-white py-20 px-5 lg:px-20"
    >
      <h2 className="text-4xl font-bold text-center text-blue-950 mb-16">
        Our Services
      </h2>
      <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            className="bg-white rounded-xl p-6 w-72 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-lg font-bold text-blue-900 mb-2 text-center">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm text-center">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
    {/* products */}
    <section id="products" className="bg-white py-20 px-5 lg:px-20">
      <h2 className="text-4xl font-bold text-center text-blue-950 mb-16">
        Our Products
      </h2>
      <div className="flex flex-col gap-16 max-w-6xl mx-auto">
        {products.map((product, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-64 w-full md:w-1/2 object-cover rounded-xl shadow-md"
            />
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                {product.title}
              </h3>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <a
                href="#"
                className="inline-block bg-orange-500 text-white py-2 px-5 rounded-lg hover:bg-orange-600 transition"
              >
                Request Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
      
      {/* <div>
        <h2 className="text-4xl font-bold text-center text-blue-950 mb-16">
        Our Products
      </h2>
        <div className="flex columns-auto max-w-7xl mx-auto px-5 py-8">
        
              <div className="overflow-hidden hover:shadow-lg bg-white mx-2 my-8  border-2 border-gray-100 w-80 rounded-xl pb-5 hover:scale-105 hover:border-0" >
        
                  <img src="4.jpeg" alt=""
                  className="h-50 object-cover mx-auto  w-80"/>
        
                  <h1 className="ml-5 text-2xl font-semibold text-black pt-5">Project Management</h1>
                  <p className="text-gray-600 p-2 ml-5 text-sm"> ERP
                  </p>
                  <a href="" className="text-orange-600 border-2 border-orange-500 rounded-full text-1xl px-2 py-1 font-bold ml-5 hover:bg-orange-600 hover:text-white"> Book Now</a>
              </div>
              <div className="overflow-hidden hover:shadow-lg bg-white mx-2 my-8  border-2 border-gray-100 w-80 rounded-xl pb-5 hover:scale-105 hover:border-0" >
        
                  <img src="" alt=""
                  className="h-50 object-cover mx-auto  w-80"/>
                  <h1 className="ml-5 text-2xl font-semibold text-black pt-5">School ERP</h1>
                  <p className="text-gray-600 p-2 ml-5 text-sm"> ERP
                  </p>
                  <a href="" className="text-orange-600 border-2 border-orange-500 rounded-full text-1xl px-2 py-1 font-bold ml-5 hover:bg-orange-600 hover:text-white"> Book Now</a>
              </div>
              <div className="overflow-hidden hover:shadow-lg bg-white mx-2 my-8  border-2 border-gray-100 w-80 rounded-xl pb-5 hover:scale-105 hover:border-0" >
        
                  <img src="" alt=""
                  className="h-50 object-cover mx-auto  w-80"/>
                  <h1 className="ml-5 text-2xl font-semibold text-black pt-5"> HR</h1>
                  <p className="text-gray-600 p-2 ml-5 text-sm"> ERP
                  </p>
                  <a href="" className="text-orange-600 border-2 border-orange-500 rounded-full text-1xl px-2 py-1 font-bold ml-5 hover:bg-orange-600 hover:text-white"> Book Now</a>
              </div>
              <div className=" overflow-hidden hover:shadow-lg bg-white mx-2 my-8  border-2 border-gray-100 w-80 rounded-xl pb-5 hover:scale-105 hover:border-0" >
        
                  <img src ="/1.jpeg" alt=""
                  className="h-50 object-cover mx-auto  w-80"/>
                  <h1 className="ml-5 text-2xl font-semibold text-black pt-5">supply chain</h1>
                  <p className="text-gray-600 p-2 ml-5 text-sm"> ERP
                  </p>
                  <a href="" className="text-orange-600 border-2 border-orange-500 rounded-full text-1xl px-2 py-1 font-bold ml-5 hover:bg-orange-600 hover:text-white"> Book Now</a>
              </div>
          </div>
      </div> */}


      {/* About us */}
      <section id="Aboutus" className="bg-white py-20 px-5 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-blue-950">Who We Are</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Learnsoft Beliotech Solutions is a forward-thinking tech company
            revolutionizing how businesses operate through innovative digital
            solutions.
          </p>
        </motion.div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-10 items-start mb-20">
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-orange-50 p-6 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold text-orange-500 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To empower organizations of all sizes by delivering cutting-edge,
              user-friendly digital products that streamline operations and
              accelerate growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-blue-50 p-6 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To become Africa’s leading software innovation hub by building
              scalable and impactful digital ecosystems that shape the future.
            </p>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { title: "10+", subtitle: "Years of Experience" },
            { title: "500+", subtitle: "Clients Served" },
            { title: "20+", subtitle: "Enterprise Solutions" },
            { title: "100%", subtitle: "Customer Satisfaction" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition"
            >
              <h4 className="text-3xl font-bold text-blue-950">{item.title}</h4>
              <p className="text-gray-600 mt-2">{item.subtitle}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

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
        className="w-6 h-6 md:w-8 md:h-8"
      >
        <path d="M12.04 2.01A10 10 0 0 0 2 12.06a9.84 9.84 0 0 0 1.37 5.09L2 22l5.07-1.33a9.95 9.95 0 0 0 4.96 1.28H12A10 10 0 0 0 12.04 2zM12 20.08a8.07 8.07 0 0 1-4.1-1.13l-.3-.17-3.02.79.8-2.94-.2-.31a8.04 8.04 0 1 1 14.9-4.27 8.03 8.03 0 0 1-8.08 8.03zm4.62-6.03c-.26-.13-1.5-.74-1.73-.83s-.4-.13-.57.13-.66.83-.81 1-.3.2-.56.07a6.6 6.6 0 0 1-1.94-1.2 7.4 7.4 0 0 1-1.37-1.7c-.14-.26 0-.4.12-.53.12-.13.26-.3.4-.45.14-.15.2-.26.3-.43a.5.5 0 0 0-.02-.48c-.07-.14-.57-1.37-.78-1.87s-.4-.42-.56-.43h-.48a.92.92 0 0 0-.67.31 2.78 2.78 0 0 0-.86 2.06c0 1.22.87 2.4 1 2.57.13.17 1.7 2.6 4.13 3.64.58.25 1.04.4 1.4.51a3.35 3.35 0 0 0 1.56.1 2.66 2.66 0 0 0 1.75-1.22c.22-.3.22-.54.16-.74s-.24-.17-.5-.3z" />
      </motion.svg>
    </a>


      {/* Subscription Form */}
      <div className="bg-blue-950 p-6 text-white placeholder:text-white ">
        <div className='max-w-7xl md:flex md:justify-center grid mx-auto gap-x-[10px]'>
          <div>
            <h2 className="text-2xl font-bold text-center text-white mb-6">Address</h2>
              <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 9V7a5 5 0 00-10 0v2M5 9h14v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9z" />
                  </svg>
                  <p className="text-gray-400">
                      Westwoods Building, Parklands - Nairobi<br />
                      Nairobi, Kenya
                  </p>
                  </div>
                  <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 12h2a2 2 0 012 2v6a2 2 0 01-2 2h-2M8 12H6a2 2 0 00-2 2v6a2 2 0 002 2h2m8-14V6a4 4 0 00-8 0v2h8z" />
                  </svg>
                  <a href="info@learnsoftbeliotechsolutions.co.ke" className="text-white hover:underline">info@learnsoftbeliotechsolutions.co.ke</a>
                  </div>
                  <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5h2l3.6 7.59a1 1 0 00.9.41h7.02a1 1 0 00.92-.61l3.38-7.09M16 21a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  <a href="tel:+254712345678" className="text-white hover:underline">+254 712 345 678</a>
                  </div>
                  <div className="mt-6">
              </div>
              </div>
          </div>
                <iframe className = "w-80 md:w-150 h=150 shadow-2xl rounded-2xl referrerpolicy="
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.853898546794!2d36.801161674879594!3d-1.259804998728201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f176ab788de03%3A0x6ce6930ee66eeb8c!2sThe%20Westwood!5e0!3m2!1sen!2ske!4v1752008415264!5m2!1sen!2ske">
          
              </iframe>
        </div>
         </div>
      <footer className='justify-between flex mx-auto  bg-blue-950 w-full'>
        <hr className='max-w-7xl mx-auto my-5 text-gray-400'/>
        <p className=' text-[8px] md:text-sm text-start font-extralight max-w-6xl  text-gray-400'>&copy; Learnsoft Beliotech Solutions Limited, All Right Reserved. 2025</p>
        <div>
          <a href="" className='text-gray-400'>FAQ's</a>
        </div>
      </footer>
    </>
  )
}

export default App
