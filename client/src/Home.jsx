import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Users, Search, Filter, Heart, Check, X } from 'lucide-react';

function Home() {
  // Simulando funciones de autenticación para el ejemplo
 const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
    alert('Sesión cerrada correctamente');
  };

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('restaurants'); 
  const [reservations, setReservations] = useState([]); // Estado para guardar las reservas

  const restaurants = [
    {
      id: 1,
      name: "La Terraza Gourmet",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      rating: 4.8,
      cuisine: "Italiana",
      priceRange: "150.000-1.500.000 COP",
      location: "El Poblado, Medellin",
      availableTimes: ["19:00", "19:30", "20:00", "20:30"],
      description: "Auténtica cocina italiana con ambiente elegante"
    },
    {
      id: 2,
      name: "Sushi Zen",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      rating: 4.9,
      cuisine: "Japonesa",
      priceRange: "190.000-1.500.000 COP",
      location: "Rionegro, Antioquia",
      availableTimes: ["18:30", "19:00", "21:00", "21:30"],
      description: "Experiencia culinaria japonesa premium"
    },
    {
      id: 3,
      name: "Café Central",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
      rating: 4.6,
      cuisine: "Colombiana",
      priceRange: "500.000-4.500.000 COP",
      location: "La Candelaria, Medellin",
      availableTimes: ["12:00", "13:00", "18:00", "19:00"],
      description: "Sabores tradicionales colombianos"
    },
    {
      id: 4,
      name: "Steakhouse Prime",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      rating: 4.9,
      cuisine: "Americana",
      priceRange: "400.000-9.500.000 COP",
      location: "Poblado, Medellin",
      availableTimes: ["19:00", "20:00", "21:00"],
      description: "Los mejores cortes de carne premium"
    },
    {
      id: 5,
      name: "Colosal Restaurante",
      image: "https://images.unsplash.com/photo-1623800330578-2cd67efaec75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
      cuisine: "Americana",
      priceRange: "400.000-9.500.000 COP",
      location: "Poblado, Medellin",
      availableTimes: ["19:00", "21:00", "22:00"],
      description: "Los mejores cortes de carne premium"
    },
    {
      id: 6,
      name: "Dos santos Restaurante",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
      cuisine: "Americana",
      priceRange: "400.000-9.500.000 COP",
      location: "Provenza, Medellin",
      availableTimes: ["19:00", "21:00", "22:00"],
      description: "Los mejores cortes de carne premium"
    }
  ];

  const handleReservation = (restaurantId, time) => {
    if (!selectedDate) {
      alert('Por favor selecciona una fecha');
      return;
    }

    const restaurant = restaurants.find(r => r.id === restaurantId);
    const newReservation = {
      id: Date.now(), // ID único basado en timestamp
      restaurantId: restaurantId,
      restaurantName: restaurant.name,
      restaurantImage: restaurant.image,
      cuisine: restaurant.cuisine,
      location: restaurant.location,
      date: selectedDate,
      time: time,
      guests: guests,
      status: 'confirmada',
      createdAt: new Date().toLocaleString()
    };

    setReservations(prevReservations => [...prevReservations, newReservation]);
    alert(`¡Reserva confirmada! ${restaurant.name} el ${selectedDate} a las ${time} para ${guests} personas`);
  };

  const cancelReservation = (reservationId) => {
    setReservations(prevReservations => 
      prevReservations.map(reservation => 
        reservation.id === reservationId 
          ? { ...reservation, status: 'cancelada' }
          : reservation
      )
    );
  };

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🍽️ RestReserva YR</h1>
            </div>
            <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
              <button 
                onClick={() => setCurrentView('restaurants')}
                className={`hover:text-stone-600 transition-colors w-40 ${currentView === 'restaurants' ? 'text-stone-600 font-semibold' : ''}`}
              >
                Restaurantes
              </button>
              <button 
                onClick={() => setCurrentView('reservations')}
                className={`hover:text-stone-600 transition-colors ${currentView === 'reservations' ? 'text-stone-600 font-semibold' : ''}`}
              >
                Mis Reservas ({reservations.length})
              </button>
            </nav>
            <button style={{ borderRadius: '12px' }}
              onClick={handleLogout}
              className="bg-black text-white px-6 py-3 transition-all duration-300 font-semibold shadow-lg"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {currentView === 'restaurants' ? (
        <>
          {/* Hero Section */}
          <section className="relative bg-black text-white py-20 overflow-hidden">
            <div className="absolute inset-0 bg-stone 950 z-0" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 font-roboto">Reserva tu Mesa Perfecta</h2>
              <p className="text-xl mb-8 opacity-90 ">Descubre los mejores restaurantes de Medellin y haz tu reserva en segundos</p>
            </div>
          </section>

          {/*  Section buscar y filtros */}
          <section className="bg-white shadow-lg -mt-10 relative z-10 mx-4 md:mx-8 lg:mx-auto lg:max-w-6xl rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar restaurante..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Hora</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option value="1">1 persona</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4 personas</option>
                  <option value="5">5+ personas</option>
                </select>
              </div>

           <button style={{ borderRadius: '12px' }} className="bg-black text-white px-6 py-3 transition-all duration-300 font-semibold shadow-lg">
           Buscar
        </button>

            </div>
          </section>

          {/* Restaurants Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Restaurantes Disponibles</h3>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filtros</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                      {restaurant.priceRange}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-gray-900">{restaurant.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-700">{restaurant.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                    <p className="text-gray-500 text-sm mb-4">{restaurant.description}</p>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      {restaurant.location}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Horarios disponibles:</p>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleReservation(restaurant.id, time)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button style={{ borderRadius: '12px' }} 
                      onClick={() => handleReservation(restaurant.id, restaurant.availableTimes[0])}
                      className="bg-black text-white px-6 py-3 transition-all duration-300 font-semibold shadow-lg"
                    >
                      Reservar Mesa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Mis Reservas Section */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mis Reservas </h2>
            <p className="text-gray-600">Gestiona tus reservas de restaurantes</p>
          </div>

          {reservations.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tienes reservas aún</h3>
              <p className="text-gray-600 mb-6">¡Explora nuestros restaurantes y haz tu primera reserva!</p>
              <button 
                onClick={() => setCurrentView('restaurants')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Explorar Restaurantes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={reservation.restaurantImage}
                      alt={reservation.restaurantName}
                      className="w-full h-32 object-cover"
                    />
                    <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${
                      reservation.status === 'confirmada' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {reservation.status === 'confirmada' ? (
                        <div className="flex items-center space-x-1">
                          <Check className="h-3 w-3" />
                          <span>Confirmada</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <X className="h-3 w-3" />
                          <span>Cancelada</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{reservation.restaurantName}</h4>
                    <p className="text-gray-600 text-sm mb-2">{reservation.cuisine}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{formatDate(reservation.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">{reservation.time}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm">{reservation.guests} personas</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{reservation.location}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">
                      Reservado el: {reservation.createdAt}
                    </div>

                    {reservation.status === 'confirmada' && (
                      <button 
                        onClick={() => cancelReservation(reservation.id)}
                        className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                      >
                        Cancelar Reserva
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">RestauReserva</h4>
              <p className="text-gray-400">La mejor plataforma para reservar mesas en los restaurantes más exclusivos de Medellín.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Enlaces</h5>
              <ul className="space-y-4 text-gray-400">
                <li><p className="hover:text-white transition-colors">Sobre Nosotros</p></li>
                <li><p className="hover:text-white transition-colors">Contacto</p></li>
                <li><p className="hover:text-white transition-colors">Ayuda</p></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Para Restaurantes</h5>
              <ul className="space-y-2 text-gray-400">
                <li><p className= "hover:text-white transition-colors no-underline ">Únete a nosotros</p></li>
                <li><p className="hover:text-white transition-colors">Panel de Control</p></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Síguenos</h5>
              <div className="flex space-x-4">
                <p className="text-gray-400 hover:text-white transition-colors">Facebook</p>
                <p className="text-gray-400 hover:text-white transition-colors">Instagram</p>
                <p className="text-gray-400 hover:text-white transition-colors">Twitter</p>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RestauReserva. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;