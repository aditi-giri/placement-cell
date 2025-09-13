import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '@/Components/Footer';
import { createEvent, deleteEvent, getAllEvents } from '@/config/redux/action/authAction';

export default function SidebarLayout({ children }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const events = useSelector((state) => state.auth.events || []);// Fetch events from Redux
    console.log("Eventsss:", events);
    


    const [newEvent, setNewEvent] = useState({ title: '', description: '' });
    
    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    useEffect(() => {
        console.log("Redux Events:", events);
    }, [events]);


    const handleAddEvent = () => {
        if (newEvent.title && newEvent.description) {
            console.log("Dispatching event:", newEvent);
            dispatch(createEvent({
                token: authState.token, // Ensure token is passed
                title: newEvent.title,
                description: newEvent.description, // Default or add input field
               
            })).then(() => {
                console.log("Event dispatched successfully!");
                dispatch(getAllEvents()); // Fetch updated events after adding
            }).catch((error) => {
                console.error("Error dispatching event:", error);
            });
            setNewEvent({ title: '', description: '' });
        }
        else {
            console.log("Event data missing!", newEvent);
        }
    };

    const handleDeleteEvent = (eventId) => {
        dispatch(deleteEvent({ eventId }))
          .then(() => {
            console.log("Event deleted successfully!");
            dispatch(getAllEvents()); // Refresh event list
          })
          .catch((error) => {
            console.error("Error deleting event:", error);
          });
      };
      
      
    
    
    // Determine active route for sidebar highlighting
    const isActive = (path) => {
        return router.pathname === path ? `${styles.sideBarOption} ${styles.active}` : styles.sideBarOption;
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.homeContainer}>
                    {/* Left Sidebar */}
                    <div className={styles.homeContainer__leftBar}>
                        {authState.loggedIn && (
                            <div onClick={() => router.push('/home')} className={isActive('/home')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <p>Home</p>
                            </div>
                        )}

                        {authState.loggedIn ? (
                            authState.isAdmin ? (
                                <div
                                    onClick={() => router.push('/dashboard/admin')}
                                    className={isActive('/dashboard/admin')}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                        />
                                    </svg>
                                    <p>Jobs</p>
                                </div>
                            ) : (
                                <div
                                    onClick={() => router.push('/dashboard/student')}
                                    className={isActive('/dashboard/student')}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                        />
                                    </svg>
                                    <p>Jobs</p>
                                </div>
                            )
                        ) : null}

                        {authState.loggedIn && authState.isAdmin && (
                            <div onClick={() => router.push('/students')} className={isActive('/students')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                </svg>
                                <p>Students</p>
                            </div>
                        )}

                        {authState.loggedIn && (
                            <div onClick={() => router.push('/feedback')} className={isActive('/feedback')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                <p>Queries</p>
                            </div>
                        )}

                        {authState.loggedIn && (
                            <div onClick={() => router.push('/our_team')} className={isActive('/our_team')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                </svg>
                                <p>Our Team</p>
                            </div>
                        )}
                        
                        {authState.loggedIn && (
                            <div onClick={() => router.push('/recruitment_process')} className={isActive('/recruitment_process')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
                                <p>Recruitment Process</p>
                            </div>
                        )}
                        
                        {authState.loggedIn && (
                            <div onClick={() => router.push('/our_recruiters')} className={isActive('/our_recruiters')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>
                                <p>Our Recruiters</p>
                            </div>
                        )}
                    </div>

                    {/* Main Content Area */}
                    <div className={styles.homeContainer__feedContainer}>
                        {children}
                    </div>
                    
                    {/* New Right Section */}
                    {authState.loggedIn && (
                        <div className={styles.homeContainer__rightSection}>
                            <div className={styles.rightWidget}>
                            <div className={styles.rightWidget__title}>Upcoming Events</div>
                                {events.length > 0 ? (
                                    events.map((event) => (
                                        <div key={event._id} className={styles.eventItem}>
                                            <p>{event.title}</p>
                                            <small>{event.description}</small>
                                            {/* {authState.isAdmin && (
                                                <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                                            )} */}
                                        </div>
                                    ))
                                ) : (
                                    <p>No upcoming events</p>
                                )}

                                {authState.isAdmin && (
                                    <div className={styles.addEventForm}>
                                        <input
                                            type="text"
                                            placeholder="Event Title"
                                            value={newEvent.title}
                                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Event Description"
                                            value={newEvent.description}
                                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                        />
                                        <button onClick={handleAddEvent}>Add Event</button>
                                    </div>
                                )}
            
                            </div>
                            
                            <div className={styles.rightWidget}>
                                <div className={styles.rightWidget__title}>Recent Notifications</div>
                                <div className={styles.notificationItem}>
                                    <p>New job posting from BNY</p>
                                    <small>Job role mentioned in detail</small>
                                </div>
                                <div className={styles.notificationItem}>
                                    <p>Grooming Workshop</p>
                                    <small>1st March, 2025</small>
                                </div>
                            </div>
                            
                            <div className={styles.rightWidget}>
                                <div className={styles.rightWidget__title}>Quick Stats</div>
                                <div className={styles.statItem}>
                                    <p>Total Comapnies</p>
                                    <span>12</span>
                                </div>
                                <div className={styles.statItem}>
                                    <p>Students Placed</p>
                                    <span>58</span>
                                </div>
                                <div className={styles.statItem}>
                                    <p>Interns Hired</p>
                                    <span>27</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {!authState.loggedIn && <Footer />}
        </div>
    );
}