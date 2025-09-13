import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import UserLayout from "@/layout/StudentLayout";

export default function Home() {
  const router = useRouter();

  return (
    <UserLayout>
      <Head>
        <title>BMCC Placement Cell</title>
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
          rel="stylesheet"
        />
      </Head>

      <div className="min-vh-100">
        {/* Navigation already in UserLayout */}

        {/* Hero Section */}
        <section id="home" className="position-relative" style={{ height: '600px', marginTop: '56px' }}>
          <div className="position-relative h-100">
            <Image
              src="/images/campus.jpg"
              alt="College Campus"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div 
              className="position-absolute w-100 h-100" 
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <div className="position-absolute top-50 start-50 translate-middle text-center text-white w-100">
                <h1 className="display-4 fw-bold mb-4">Welcome to BMCC Placement Cell</h1>
                <p className="lead mb-4">Building Careers, Creating Leaders</p>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => router.push('/login')}
                >
                  Explore Opportunities
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-5 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold">About BMCC</h2>
              <p className="text-muted">A Legacy of Excellence Since 1943</p>
            </div>
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="position-relative" style={{ height: '400px' }}>
                  <Image
                    src="/images/college.jpg"
                    alt="College Building"
                    layout="fill"
                    objectFit="cover"
                    className="rounded shadow"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h3 className="fw-bold mb-4">Brihan Maharashtra College of Commerce</h3>
                <p className="lead mb-4">
                  BMCC has been at the forefront of commerce education in India for over 75 years. 
                  Our placement cell serves as a bridge between academia and industry, helping students 
                  transform into industry-ready professionals.
                </p>
                <ul className="list-unstyled">
                  {[
                    'Industry-aligned curriculum',
                    'Expert faculty members',
                    'State-of-the-art infrastructure'
                  ].map((item, index) => (
                    <li key={index} className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section id="stats" className="py-5 bg-primary text-white">
          <div className="container">
            <div className="row text-center">
              {[
                { number: '100+', label: 'Companies Visited' },
                { number: '95%', label: 'Placement Rate' },
                { number: '₹9 LPA', label: 'Highest Package' },
                { number: '300+', label: 'Students Placed' }
              ].map((stat, index) => (
                <div key={index} className="col-md-3 mb-4 mb-md-0">
                  <h2 className="display-6 fw-bold mb-2">{stat.number}</h2>
                  <p className="lead">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Recruiters */}
        <section id="recruiters" className="py-5">
          <div className="container">
            <h2 className="display-5 fw-bold text-center mb-5">Our Top Recruiters</h2>
            <div className="row">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="col-md-3 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body p-4">
                      <div style={{ height: '80px', position: 'relative' }}>
                        <Image
                          src={`/images/company-${num}.png`}
                          alt={`Company ${num}`}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-dark text-white py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <h4 className="mb-4">Contact Us</h4>
                <p>BMCC Road, Pune - 411004</p>
                <p>Maharashtra, India</p>
                <p>Email: placements@bmcc.edu</p>
                <p>Phone: +91-XX-XXXXXXXX</p>
              </div>
              <div className="col-md-4 mb-4 mb-md-0">
                <h4 className="mb-4">Quick Links</h4>
                <ul className="list-unstyled">
                  {['Home', 'About', 'Statistics', 'Recruiters'].map((link, index) => (
                    <li key={index} className="mb-2">
                      <a 
                        href={`#${link.toLowerCase()}`} 
                        className="text-white text-decoration-none"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-4">
                <h4 className="mb-4">Connect With Us</h4>
                <div className="d-flex gap-3">
                  <a href="#" className="text-white fs-4">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="text-white fs-4">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="text-white fs-4">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </UserLayout>
  );
}