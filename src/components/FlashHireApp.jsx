import React, { useState, useEffect, useRef } from 'react';
import { Search, Star, MapPin, Clock, User, Briefcase, Bell, Home, MessageCircle, Calendar, ChevronLeft, Send } from 'lucide-react';

const FlashHireApp = () => {
    const [currentView, setCurrentView] = useState('welcome');
    const [userType, setUserType] = useState(null);
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [applications, setApplications] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [chatWith, setChatWith] = useState(null);
    const [currentMessage, setCurrentMessage] = useState('');
    // Usar refs para los formularios para evitar re-renders
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const experienceRef = useRef('');
    const locationRef = useRef('');

    // Datos iniciales
    useEffect(() => {
        const savedUser = localStorage.getItem('flashHireUser');
        const savedJobs = localStorage.getItem('flashHireJobs');
        const savedWorkers = localStorage.getItem('flashHireWorkers');
        const savedApplications = localStorage.getItem('flashHireApplications');
        const savedNotifications = localStorage.getItem('flashHireNotifications');
        const savedMessages = localStorage.getItem('flashHireMessages');

        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setUserType(userData.type);
            setCurrentView('home');
        }

        if (savedJobs) {
            setJobs(JSON.parse(savedJobs));
        } else {
            const initialJobs = [
                {
                    id: 1,
                    title: 'Mesero - Cafetería Downtown',
                    location: 'Miraflores',
                    hours: '4 horas',
                    payment: 'S/. 60',
                    rating: 4.8,
                    description: 'Se busca mesero con experiencia para turno de tarde. Ambiente dinámico y equipo joven.',
                    requirements: 'Experiencia mínima 6 meses, disponibilidad inmediata',
                    employer: 'Café Central',
                    employerRating: 4.5,
                    urgent: true
                },
                {
                    id: 2,
                    title: 'Barista - Coffee Shop',
                    location: 'San Isidro',
                    hours: '6 horas',
                    payment: 'S/. 90',
                    rating: 4.6,
                    description: 'Barista para turno matutino, conocimiento en café de especialidad requerido.',
                    requirements: 'Experiencia como barista, conocimiento en latte art',
                    employer: 'Starbucks Partner',
                    employerRating: 4.7,
                    urgent: false
                },
                {
                    id: 3,
                    title: 'Ayudante de Cocina',
                    location: 'Barranco',
                    hours: '5 horas',
                    payment: 'S/. 75',
                    rating: 4.3,
                    description: 'Apoyo en cocina para evento especial el fin de semana.',
                    requirements: 'Disponibilidad inmediata, experiencia en cocina',
                    employer: 'Restaurante Fusion',
                    employerRating: 4.2,
                    urgent: true
                }
            ];
            setJobs(initialJobs);
            localStorage.setItem('flashHireJobs', JSON.stringify(initialJobs));
        }

        if (savedWorkers) {
            setWorkers(JSON.parse(savedWorkers));
        } else {
            const initialWorkers = [
                {
                    id: 1,
                    name: 'María González',
                    rating: 4.9,
                    experience: 'Mesera - 2 años',
                    location: 'Miraflores',
                    availability: 'Disponible hoy',
                    skills: ['Atención al cliente', 'Manejo de POS', 'Trabajo en equipo'],
                    hourlyRate: 'S/. 15/hora',
                    completedJobs: 25
                },
                {
                    id: 2,
                    name: 'Carlos Ruiz',
                    rating: 4.7,
                    experience: 'Barista - 3 años',
                    location: 'San Isidro',
                    availability: 'Disponible mañana',
                    skills: ['Café de especialidad', 'Latte Art', 'Atención al cliente'],
                    hourlyRate: 'S/. 18/hora',
                    completedJobs: 42
                },
                {
                    id: 3,
                    name: 'Ana Torres',
                    rating: 4.8,
                    experience: 'Ayudante de cocina - 1 año',
                    location: 'Barranco',
                    availability: 'Disponible ahora',
                    skills: ['Preparación de alimentos', 'Limpieza', 'Organización'],
                    hourlyRate: 'S/. 14/hora',
                    completedJobs: 18
                }
            ];
            setWorkers(initialWorkers);
            localStorage.setItem('flashHireWorkers', JSON.stringify(initialWorkers));
        }

        if (savedApplications) {
            setApplications(JSON.parse(savedApplications));
        }

        if (savedNotifications) {
            setNotifications(JSON.parse(savedNotifications));
        }

        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    const saveToStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    // Optimizamos el manejo del formulario sin estado reactivo
    const handleLogin = (type) => {
        const name = nameRef.current?.value || '';
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        const experience = experienceRef.current?.value || '';
        const location = locationRef.current?.value || '';

        if (!name || !email) return;

        const newUser = { name, email, password, experience, location, type, id: Date.now() };
        setUser(newUser);
        setUserType(type);
        saveToStorage('flashHireUser', newUser);
        setCurrentView('home');

        // Limpiar los campos
        if (nameRef.current) nameRef.current.value = '';
        if (emailRef.current) emailRef.current.value = '';
        if (passwordRef.current) passwordRef.current.value = '';
        if (experienceRef.current) experienceRef.current.value = '';
        if (locationRef.current) locationRef.current.value = '';
    };

    const handleApplyJob = (jobId) => {
        const newApplication = {
            id: Date.now(),
            jobId,
            workerId: user.id,
            status: 'pending',
            appliedAt: new Date().toISOString()
        };
        const updatedApplications = [...applications, newApplication];
        setApplications(updatedApplications);
        saveToStorage('flashHireApplications', updatedApplications);

        const newNotification = {
            id: Date.now(),
            title: 'Postulación enviada',
            message: 'Tu postulación ha sido enviada exitosamente',
            type: 'success',
            timestamp: new Date().toISOString()
        };
        const updatedNotifications = [...notifications, newNotification];
        setNotifications(updatedNotifications);
        saveToStorage('flashHireNotifications', updatedNotifications);
    };

    const handleContactWorker = (workerId) => {
        const worker = workers.find(w => w.id === workerId);
        setChatWith(worker);
        setCurrentView('chat');
    };

    const sendMessage = () => {
        if (!currentMessage.trim()) return;

        const newMessage = {
            id: Date.now(),
            senderId: user.id,
            receiverId: chatWith.id,
            message: currentMessage,
            timestamp: new Date().toISOString()
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        saveToStorage('flashHireMessages', updatedMessages);
        setCurrentMessage('');
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    // Welcome Screen
    const WelcomeScreen = () => (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Flash Hire</h1>
                    <p className="text-gray-600">Conecta con oportunidades laborales al instante</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => setCurrentView('login-employer')}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Soy Empleador
                    </button>
                    <button
                        onClick={() => setCurrentView('login-worker')}
                        className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-200"
                    >
                        Soy Trabajador
                    </button>
                </div>
            </div>
        </div>
    );

    // Login Forms optimizado
    const LoginForm = ({ type }) => {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <button
                        onClick={() => setCurrentView('welcome')}
                        className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Volver
                    </button>

                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {type === 'employer' ? 'Registro Empleador' : 'Registro Trabajador'}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <input
                            ref={nameRef}
                            type="text"
                            placeholder="Nombre completo"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            autoComplete="name"
                        />
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            autoComplete="email"
                        />
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Contraseña"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            autoComplete="new-password"
                        />
                        <input
                            ref={experienceRef}
                            type="text"
                            placeholder={type === 'employer' ? 'Nombre del negocio' : 'Experiencia laboral'}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            autoComplete="organization"
                        />
                        <input
                            ref={locationRef}
                            type="text"
                            placeholder="Ubicación"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            autoComplete="address-level2"
                        />
                        <button
                            onClick={() => handleLogin(type)}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Home Screen for Workers
    const WorkerHome = () => (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">¡Hola, {user.name}!</h1>
                        <p className="text-gray-600">Encuentra tu próximo trabajo</p>
                    </div>
                    <div className="relative">
                        <Bell className="w-6 h-6 text-gray-600" />
                        {notifications.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
                        )}
                    </div>
                </div>
            </header>

            <div className="p-4">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar trabajos..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex space-x-2 mb-6 overflow-x-auto">
                    {['Todos', 'Mesero', 'Barista', 'Cocina'].map((filter) => (
                        <button
                            key={filter}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-full whitespace-nowrap hover:bg-blue-50 hover:border-blue-300"
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => {
                                setSelectedJob(job);
                                setCurrentView('job-detail');
                            }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-800">{job.title}</h3>
                                {job.urgent && (
                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Urgente
                  </span>
                                )}
                            </div>

                            <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{job.location}</span>
                                <Clock className="w-4 h-4 ml-4 mr-1" />
                                <span className="text-sm">{job.hours}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {renderStars(job.rating)}
                                    <span className="ml-2 text-sm text-gray-600">{job.rating}</span>
                                </div>
                                <span className="font-bold text-green-600">{job.payment}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Home Screen for Employers
    const EmployerHome = () => (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Panel Empleador</h1>
                        <p className="text-gray-600">Gestiona tu equipo</p>
                    </div>
                    <button
                        onClick={() => setCurrentView('post-job')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Publicar Trabajo
                    </button>
                </div>
            </header>

            <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Trabajadores Disponibles</h3>
                        <p className="text-3xl font-bold text-blue-600">{workers.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Trabajos Activos</h3>
                        <p className="text-3xl font-bold text-green-600">{jobs.length}</p>
                    </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-4">Trabajadores Destacados</h2>
                <div className="space-y-4">
                    {workers.map((worker) => (
                        <div
                            key={worker.id}
                            className="bg-white rounded-lg shadow-md p-4"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-800">{worker.name}</h3>
                                <div className="flex items-center">
                                    {renderStars(worker.rating)}
                                    <span className="ml-2 text-sm text-gray-600">{worker.rating}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-2">{worker.experience}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                                {worker.skills.slice(0, 2).map((skill, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {skill}
                  </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{worker.location}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleContactWorker(worker.id)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-200"
                                    >
                                        Contactar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Job Detail View
    const JobDetail = () => (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm p-4">
                <button
                    onClick={() => setCurrentView('home')}
                    className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Volver
                </button>
                <h1 className="text-xl font-bold text-gray-800">{selectedJob?.title}</h1>
            </header>

            <div className="p-4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedJob?.title}</h2>
                            <p className="text-gray-600 mb-2">{selectedJob?.employer}</p>
                            <div className="flex items-center">
                                {renderStars(selectedJob?.employerRating)}
                                <span className="ml-2 text-sm text-gray-600">{selectedJob?.employerRating}</span>
                            </div>
                        </div>
                        <span className="text-2xl font-bold text-green-600">{selectedJob?.payment}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-2" />
                            <span>{selectedJob?.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Clock className="w-5 h-5 mr-2" />
                            <span>{selectedJob?.hours}</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Descripción</h3>
                        <p className="text-gray-600">{selectedJob?.description}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 mb-2">Requisitos</h3>
                        <p className="text-gray-600">{selectedJob?.requirements}</p>
                    </div>

                    <button
                        onClick={() => handleApplyJob(selectedJob?.id)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Postular Ahora
                    </button>
                </div>
            </div>
        </div>
    );

    // Chat View
    const ChatView = () => {
        const chatMessages = messages.filter(m =>
            (m.senderId === user.id && m.receiverId === chatWith.id) ||
            (m.senderId === chatWith.id && m.receiverId === user.id)
        );

        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <header className="bg-white shadow-sm p-4">
                    <button
                        onClick={() => setCurrentView('home')}
                        className="flex items-center text-gray-600 hover:text-gray-800 mb-2"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Volver
                    </button>
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800">{chatWith?.name}</h2>
                            <p className="text-sm text-gray-600">{chatWith?.experience}</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {chatMessages.length === 0 && (
                        <div className="text-center text-gray-500 mt-8">
                            <p>Inicia una conversación</p>
                        </div>
                    )}
                    {chatMessages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs px-4 py-2 rounded-lg ${
                                    message.senderId === user.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-800 shadow-md'
                                }`}
                            >
                                <p>{message.message}</p>
                                <p className={`text-xs mt-1 ${message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'}`}>
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white border-t p-4">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Bottom Navigation
    const BottomNavigation = () => (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="flex justify-around py-2">
                <button
                    onClick={() => setCurrentView('home')}
                    className={`flex flex-col items-center py-2 px-4 ${currentView === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
                >
                    <Home className="w-6 h-6" />
                    <span className="text-xs mt-1">Inicio</span>
                </button>
                <button
                    onClick={() => setCurrentView('search')}
                    className={`flex flex-col items-center py-2 px-4 ${currentView === 'search' ? 'text-blue-600' : 'text-gray-600'}`}
                >
                    <Search className="w-6 h-6" />
                    <span className="text-xs mt-1">Buscar</span>
                </button>
                <button
                    onClick={() => setCurrentView('notifications')}
                    className={`flex flex-col items-center py-2 px-4 ${currentView === 'notifications' ? 'text-blue-600' : 'text-gray-600'}`}
                >
                    <Bell className="w-6 h-6" />
                    <span className="text-xs mt-1">Alertas</span>
                </button>
                <button
                    onClick={() => setCurrentView('profile')}
                    className={`flex flex-col items-center py-2 px-4 ${currentView === 'profile' ? 'text-blue-600' : 'text-gray-600'}`}
                >
                    <User className="w-6 h-6" />
                    <span className="text-xs mt-1">Perfil</span>
                </button>
            </div>
        </div>
    );

    // Render main content
    const renderMainContent = () => {
        switch (currentView) {
            case 'welcome':
                return <WelcomeScreen />;
            case 'login-employer':
                return <LoginForm type="employer" />;
            case 'login-worker':
                return <LoginForm type="worker" />;
            case 'home':
                return userType === 'worker' ? <WorkerHome /> : <EmployerHome />;
            case 'job-detail':
                return <JobDetail />;
            case 'chat':
                return <ChatView />;
            case 'notifications':
                return (
                    <div className="min-h-screen bg-gray-50 p-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Notificaciones</h1>
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div key={notification.id} className="bg-white rounded-lg shadow-md p-4">
                                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                                    <p className="text-gray-600">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {new Date(notification.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                            {notifications.length === 0 && (
                                <div className="text-center text-gray-500 mt-8">
                                    <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p>No tienes notificaciones</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'profile':
                return (
                    <div className="min-h-screen bg-gray-50 p-4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                                <p className="text-gray-600">{user?.experience}</p>
                                <p className="text-gray-600">{user?.location}</p>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">Información de Cuenta</h3>
                                    <p className="text-gray-600">Email: {user?.email}</p>
                                    <p className="text-gray-600">Tipo: {userType === 'worker' ? 'Trabajador' : 'Empleador'}</p>
                                </div>
                                {userType === 'worker' && (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-800 mb-2">Estadísticas</h3>
                                        <p className="text-gray-600">Postulaciones enviadas: {applications.length}</p>
                                        <p className="text-gray-600">Trabajos completados: 0</p>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    localStorage.clear();
                                    setUser(null);
                                    setUserType(null);
                                    setCurrentView('welcome');
                                }}
                                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200 mt-6"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                );
            case 'search':
                return (
                    <div className="min-h-screen bg-gray-50 p-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Buscar {userType === 'worker' ? 'Trabajos' : 'Trabajadores'}</h1>

                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder={`Buscar ${userType === 'worker' ? 'trabajos' : 'trabajadores'}...`}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-800 mb-3">Filtros</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                                    <option>Ubicación</option>
                                    <option>Miraflores</option>
                                    <option>San Isidro</option>
                                    <option>Barranco</option>
                                </select>
                                <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                                    <option>Horario</option>
                                    <option>Mañana</option>
                                    <option>Tarde</option>
                                    <option>Noche</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {userType === 'worker' ? (
                                jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                                        onClick={() => {
                                            setSelectedJob(job);
                                            setCurrentView('job-detail');
                                        }}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-800">{job.title}</h3>
                                            {job.urgent && (
                                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Urgente
                        </span>
                                            )}
                                        </div>

                                        <div className="flex items-center text-gray-600 mb-2">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span className="text-sm">{job.location}</span>
                                            <Clock className="w-4 h-4 ml-4 mr-1" />
                                            <span className="text-sm">{job.hours}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                {renderStars(job.rating)}
                                                <span className="ml-2 text-sm text-gray-600">{job.rating}</span>
                                            </div>
                                            <span className="font-bold text-green-600">{job.payment}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                workers.map((worker) => (
                                    <div
                                        key={worker.id}
                                        className="bg-white rounded-lg shadow-md p-4"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-800">{worker.name}</h3>
                                            <div className="flex items-center">
                                                {renderStars(worker.rating)}
                                                <span className="ml-2 text-sm text-gray-600">{worker.rating}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-2">{worker.experience}</p>
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {worker.skills.slice(0, 3).map((skill, index) => (
                                                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                <span className="text-sm">{worker.location}</span>
                                            </div>
                                            <button
                                                onClick={() => handleContactWorker(worker.id)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-200"
                                            >
                                                Contactar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            default:
                return <WelcomeScreen />;
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen relative">
            {renderMainContent()}
            {user && !['welcome', 'login-employer', 'login-worker', 'chat'].includes(currentView) && (
                <div className="pb-16">
                    <BottomNavigation />
                </div>
            )}
        </div>
    );
};

export default FlashHireApp;